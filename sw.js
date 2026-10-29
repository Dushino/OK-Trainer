// OK Trainer — service worker pro offline chod apky.
// Strategie: "network-first, cache jako záloha" pro vše kromě fontů —
// pokud je připojení k internetu, apka si vždy natáhne nejčerstvější
// verzi a zároveň si ji uloží do cache. Pokud připojení není, použije
// se poslední úspěšně stažená verze z cache.
// Fonty jsou součástí instalace a nemění se za běhu, takže se naopak
// servírují "cache-first" — nečeká se na síť, aby na slabém spojení
// nedošlo k tomu, že se pro stejný text zkombinují dva různé fonty.

// Na originu dushino.github.io běží i další apky (AddTurn GPX) se společným
// úložištěm cache, proto se při aktivaci mažou jen cache s touto předponou.
const CACHE_PREFIX = "ok-trainer-";
const CACHE_NAME = CACHE_PREFIX + "v6";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./keepalive.wav",
  "./fonts/UbuntuMono-Regular.woff2",
  "./fonts/UbuntuMono-Regular-Latin.woff2",
  "./fonts/UbuntuMono-Bold.woff2",
  "./fonts/UbuntuMono-Bold-Latin.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function isFontRequest(request) {
  return new URL(request.url).pathname.includes("/fonts/");
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (isFontRequest(event.request)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("./index.html"))
      )
  );
});

const CACHE_NAME = "gold-calculator-cache-v1";
const urlsToCache = [
    "/index.html",
    "/style.css",
    "/script.js",
    "/192.png",  
    "/512.png"   
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(err => {
        console.error("Cache addAll failed:", err);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

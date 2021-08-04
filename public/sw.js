let CACHE_NAME = "PWA";
var urlCache = [
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/main.chunk.js",
  "/manifest.json",
  "/logo192.png",
  "/static/media/Poppins-Medium.9e1bb626.ttf",
  "/favicon.ico",
  "/data.json",
  "/",
];

// install serviceWorker
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlCache);
    })
  );
});
// fetch cache data
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        let fUrl = event.request.clone();
        fetch(fUrl);
      })
    );
  }
});

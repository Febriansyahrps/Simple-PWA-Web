//menyimpan aset cache
const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

//menggunakan aset cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheName : CACHE_NAME})
        .then(function(response) {
            if (response){
                console.log("ServiceWorker : Gunakan aset dari chace: ", response.url);
                return response;
            }
            console.log("ServiceWorker : memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});

//Menghapus Caches yg dulu
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker : chace "+ cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// Service

self.addEventListener('install', function(event) {
    console.log("Install Service Worker", event);
})

self.addEventListener('activate', function(event) {
    console.log("Activated Service Worker", event);
    return self.clients.claim();
})

// Fetch Event (For future caching purpose)
self.addEventListener('fetch', function(event){
    event.respondWith(fetch(event.request));
})
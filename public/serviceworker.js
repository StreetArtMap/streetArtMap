// service worker is a javascript file that runs all the time when page is opened and keeps running when page is closed ( allows sending push notifications, showing something while being offline )
//A service worker is a type of web worker. It's essentially a JavaScript file that runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages

const CACHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html']

// this in service worker files represents service worker
const self = this

// Install service worker, open cache - first time running
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// Listen for requests
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match('offline.html'))
    })
  )
})

// Activate service worker / remove all the previous caches and just keeping the new one
self.addEventListener('activate', (event) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})

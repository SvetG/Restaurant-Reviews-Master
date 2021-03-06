const cacheFiles = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service worker: Fetching!');
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches
           .open('v1')
           .then(cache => {
             cache.put(event.request, responseClone);
           });
        return response;
      }).catch(error => caches.match(event.request).then(response => response))
   );
});


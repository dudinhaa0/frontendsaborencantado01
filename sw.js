const CACHE_NAME = 'padaria-cache-v8';
const ASSETS = [
    './',
    './index.html',
    './aula12.html',
    './manifest.json',
    './assets/images/logo.png',
    './assets/images/logopwa.png',
    './assets/images/logopwa512.png',
    './assets/images/banner.png',
    './assets/images/whatsapp.png'
];

//Instala o Service Worker e coloca os arquivos no Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>{
            console.log('Fatiando o Pão no Cache! 🍞');
            return cache.addAll(ASSETS);
        })
    );
});

//Faz as requisições olharem pro cache primeiro
self.addEventListener('fetch', (event) =>{
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

//Remove caches antigos quando atualizar
self.addEventListener('activate', (event) =>{
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))

            );
        })
    );
});
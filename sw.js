const cacheName = 'microgames-cache-v1';

const cacheAssets = /* ASSETS_PLACEHOLDER */;
console.log('Assets to cache:', cacheAssets);
const cachePut = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
}

const cacheAll = async (assets) => {
    const cache = await caches.open(cacheName);
    try {
        await cache.addAll(assets);
    } catch (error) {
        for (const asset of assets) {
            try {
                await cache.add(asset);
            } catch (err) {
                console.error(`Failed to cache ${asset}:`, err);
            }
        }
    }
}

const handleFetch = async (event) => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        return cachedResponse;
    }
    try {
        const response = await fetch(event.request);
        await cachePut(event.request, response.clone());
        return response;
    } catch (error) {
        console.error('Fetch failed; returning offline page instead.', error);
        return new Response('Offline', { status: 408, statusText: 'Request Timeout' });
    }
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAll(cacheAssets));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    handleFetch(event)
  );
});
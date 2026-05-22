// Service Worker — intercepte manifest_current.json et répond avec le manifest en mémoire
let manifestJson = null;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_MANIFEST') {
    manifestJson = event.data.manifest;
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('manifest_current.json')) {
    if (manifestJson) {
      event.respondWith(
        new Response(manifestJson, {
          headers: { 'Content-Type': 'application/json' }
        })
      );
    }
  }
});

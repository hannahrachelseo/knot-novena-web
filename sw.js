// 오프라인에서도 열리도록 앱 파일을 휴대폰에 저장해 두는 코드
const CACHE = "knot-novena-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png", "img/m0-0.webp","img/m0-1.webp","img/m0-2.webp","img/m0-3.webp","img/m0-4.webp","img/m1-0.webp","img/m1-1.webp","img/m1-2.webp","img/m1-3.webp","img/m1-4.webp","img/m2-0.webp","img/m2-1.webp","img/m2-2.webp","img/m2-3.webp","img/m2-4.webp","img/m3-0.webp","img/m3-1.webp","img/m3-2.webp","img/m3-3.webp","img/m3-4.webp","img/mary.jpg","img/mary2.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
// 최신 내용을 먼저 받아오고, 인터넷이 없으면 저장된 것으로 열기
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes("fonts.g"))) {
        const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true}))
  );
});

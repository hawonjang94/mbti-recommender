// 서비스 워커 (Service Worker) - PWA 오프라인 캐싱 및 앱 설치 지원
const CACHE_NAME = 'mind-act-cache-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/static/css/style.css?v=8',
  '/static/js/app.js?v=8',
  '/static/manifest.json',
  '/static/icons/icon-192.png',
  '/static/icons/icon-512.png'
];

// 서비스 워커 설치 시 핵심 파일들 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Some assets failed to cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 활성화 시 이전 버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 네트워크 요청 가로채기 (정적 파일은 캐시 확인, API 요청은 네트워크 직접 연결)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // POST 요청이나 /recommend API는 네트워크 직접 요청
  if (event.request.method === 'POST' || url.pathname.startsWith('/recommend')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 그 외 정적 자원은 네트워크 시도 후 실패 시 캐시 반환 (Network First)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 성공한 응답 복사본 캐시에 업데이트
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

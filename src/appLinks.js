export const APP_STORE_URL = 'https://apps.apple.com/app/reado/id6768102877';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.readoil.app';

// מזהה את מערכת ההפעלה של המכשיר.
// מחזיר null בדסקטופ — שם אי אפשר לדעת איזה טלפון יש למשתמש,
// ולכן צריך להציג לו את שתי החנויות במקום לנחש.
export function getMobilePlatform() {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;

  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';

  // iPadOS 13+ מדווח על עצמו כ-Mac desktop; מסך המגע הוא ההבדל היחיד
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios';

  return null;
}

export function getStoreUrlForPlatform(platform) {
  return platform === 'android' ? GOOGLE_PLAY_URL : APP_STORE_URL;
}

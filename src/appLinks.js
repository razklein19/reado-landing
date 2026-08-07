export const APP_STORE_URL = 'https://apps.apple.com/app/reado/id6768102877';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.readoil.app';

// כפתור "הורד עכשיו" יחיד — מפנה לחנות המתאימה למכשיר של המשתמש
export function getStoreUrl() {
  if (typeof navigator === 'undefined') return APP_STORE_URL;
  return /android/i.test(navigator.userAgent) ? GOOGLE_PLAY_URL : APP_STORE_URL;
}

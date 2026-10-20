import { QUICK_SETTINGS } from '../config';

const P = QUICK_SETTINGS.storagePrefix;

export function readStore(key, fallback, validate) {
  try {
    const raw = localStorage.getItem(P + key);
    if (raw == null) return fallback;
    const value = JSON.parse(raw);
    return validate && !validate(value) ? fallback : value;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    localStorage.setItem(P + key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: the app keeps working in memory */
  }
}

export function clearStore() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(P))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

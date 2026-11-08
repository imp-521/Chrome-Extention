/// <reference types="chrome" />


export const storageGet = async (key: string) => {
  try {
    if (hasChromeStorage) {
      const result = await chrome.storage.local.get(key);
      return result[key] ?? null;
    }

    const raw = localStorage.getItem(key);

    if (raw === null) return null;

    return JSON.parse(raw);
  } catch (error) {
    console.error("Storage read failed:", error);
    return null;
  }
};

export const storageSet = async (key: string, value: unknown) => {
  try {
    if (hasChromeStorage) {
      await chrome.storage.local.set({
        [key]: value,
      });
      return;
    }

    const serialized = JSON.stringify(value);

    if (serialized === undefined) return;

    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("Storage write failed:", error);
  }
};

export const storageRemove = async (key: string) => {
  try {
    if (hasChromeStorage) {
      await chrome.storage.local.remove(key);
      return;
    }

    localStorage.removeItem(key);
  } catch (error) {
    console.error("Storage remove failed:", error);
  }
};

const hasChromeStorage =
  typeof chrome !== "undefined" && !!chrome.storage?.local;

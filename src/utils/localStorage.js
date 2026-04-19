const STORAGE_KEYS = {
  records: 'agricloud_records',
  theme: 'agricloud_theme',
  language: 'agricloud_language',
  seeded: 'agricloud_seeded'
};

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const getRecords = (defaultData = []) => {
  const storedRecords = safeParse(localStorage.getItem(STORAGE_KEYS.records), null);
  const seeded = localStorage.getItem(STORAGE_KEYS.seeded);

  if (!seeded || !Array.isArray(storedRecords)) {
    localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(defaultData));
    localStorage.setItem(STORAGE_KEYS.seeded, 'true');
    return defaultData;
  }

  return storedRecords;
};

export const saveRecords = (records) => {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
};

export const resetRecordsToDefaults = (defaultData = []) => {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(defaultData));
  localStorage.setItem(STORAGE_KEYS.seeded, 'true');
  return defaultData;
};

export const clearAllRecords = () => {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.seeded, 'true');
};

export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.theme) || 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
};

export const getLanguage = () => {
  return localStorage.getItem(STORAGE_KEYS.language) || 'en';
};

export const saveLanguage = (language) => {
  localStorage.setItem(STORAGE_KEYS.language, language);
};
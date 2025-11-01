import { AppSettings } from '../types';

const STORAGE_KEY = 'lock-guardian-settings';

export const loadSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  
  return {
    isMonitoring: false,
    alarmEnabled: false,
    pinCode: '',
    unlockCount: 0,
    lastCheckTime: Date.now(),
  };
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

export const incrementUnlockCount = (): number => {
  const settings = loadSettings();
  settings.unlockCount += 1;
  saveSettings(settings);
  return settings.unlockCount;
};

export const resetUnlockCount = (): void => {
  const settings = loadSettings();
  settings.unlockCount = 0;
  settings.lastCheckTime = Date.now();
  saveSettings(settings);
};

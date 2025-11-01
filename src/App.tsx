import { useState, useEffect } from 'react';
import { AppSettings } from './types';
import { loadSettings, saveSettings } from './utils/storage';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import PinScreen from './components/PinScreen';

type Screen = 'main' | 'settings' | 'pin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [settings, setSettings] = useState<AppSettings>(loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {currentScreen === 'main' && (
        <MainScreen
          settings={settings}
          onNavigate={setCurrentScreen}
          onUpdateSettings={updateSettings}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen
          settings={settings}
          onNavigate={setCurrentScreen}
          onUpdateSettings={updateSettings}
        />
      )}
      {currentScreen === 'pin' && (
        <PinScreen
          settings={settings}
          onNavigate={setCurrentScreen}
          onUpdateSettings={updateSettings}
        />
      )}
    </div>
  );
}

export default App;

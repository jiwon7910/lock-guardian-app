import { useState, useEffect } from 'react';
import { AppSettings } from './types';
import { loadSettings, saveSettings } from './utils/storage';
import { lockDetectionService } from './services/LockDetectionService';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import PinScreen from './components/PinScreen';

type Screen = 'main' | 'settings' | 'pin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [settings, setSettings] = useState<AppSettings>(loadSettings());

  useEffect(() => {
    saveSettings(settings);
    
    // 모니터링 상태에 따라 서비스 시작/중지
    if (settings.isMonitoring) {
      lockDetectionService.startMonitoring();
    } else {
      lockDetectionService.stopMonitoring();
    }
  }, [settings]);

  useEffect(() => {
    // PIN 입력 화면 표시 이벤트 리스너
    const handleShowPin = () => {
      setCurrentScreen('pin');
    };
    
    window.addEventListener('showPinScreen', handleShowPin);
    return () => window.removeEventListener('showPinScreen', handleShowPin);
  }, []);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
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

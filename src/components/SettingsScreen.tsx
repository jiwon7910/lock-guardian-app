import { ArrowLeft, Bell, BellOff, Lock } from 'lucide-react';
import { AppSettings } from '../types';
import { useState } from 'react';

interface SettingsScreenProps {
  settings: AppSettings;
  onNavigate: (screen: 'main' | 'settings' | 'pin') => void;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
}

const SettingsScreen = ({ settings, onNavigate, onUpdateSettings }: SettingsScreenProps) => {
  const [pinInput, setPinInput] = useState(settings.pinCode);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSavePin = () => {
    if (pinInput.length === 4 && /^\d+$/.test(pinInput)) {
      onUpdateSettings({ pinCode: pinInput });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      alert('4자리 숫자를 입력해주세요');
    }
  };

  return (
    <div className="w-full max-w-md fade-in">
      {/* 헤더 */}
      <div className="flex items-center mb-8">
        <button
          className="btn-icon"
          onClick={() => onNavigate('main')}
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h1 className="text-3xl font-bold ml-4 text-white">설정</h1>
      </div>

      <div className="space-y-4">
        {/* PIN 설정 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={24} className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">PIN 설정</h2>
          </div>
          <div className="flex gap-3">
            <input
              type="tel"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-2xl font-bold tracking-widest"
              placeholder="••••"
              style={{ letterSpacing: '0.5em' }}
            />
            <button
              className="btn btn-primary px-6"
              onClick={handleSavePin}
            >
              저장
            </button>
          </div>
          {showSuccess && (
            <p className="text-green-600 text-sm mt-2 text-center font-medium">
              ✓ PIN이 저장되었습니다
            </p>
          )}
          {settings.pinCode && (
            <p className="text-gray-500 text-xs mt-2 text-center">
              현재 PIN: {settings.pinCode.split('').map(() => '•').join('')}
            </p>
          )}
        </div>

        {/* 알람 설정 */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {settings.alarmEnabled ? (
                <Bell size={24} className="text-purple-600" />
              ) : (
                <BellOff size={24} className="text-gray-500" />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">알람 울리기</h2>
                <p className="text-gray-700 text-sm mt-1 font-medium">
                  PIN 미입력 시 알람 발동
                </p>
              </div>
            </div>
            <div
              className={`toggle-switch ${settings.alarmEnabled ? 'active' : ''}`}
              onClick={() => onUpdateSettings({ alarmEnabled: !settings.alarmEnabled })}
            >
              <div className="toggle-knob" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

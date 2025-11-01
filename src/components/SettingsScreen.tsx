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
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-4">설정</h1>
      </div>

      <div className="space-y-4">
        {/* PIN 설정 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={24} className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">PIN 번호 설정</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            잠금 해제 후 5초 안에 입력해야 하는 PIN 번호
          </p>
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
            <div className="flex items-center gap-3">
              {settings.alarmEnabled ? (
                <Bell size={24} className="text-purple-600" />
              ) : (
                <BellOff size={24} className="text-gray-400" />
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-800">알람 울리기</h2>
                <p className="text-gray-600 text-sm mt-1">
                  PIN 미입력 시 시끄러운 알람 발동
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
          {settings.alarmEnabled && !settings.pinCode && (
            <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ PIN 번호를 먼저 설정해주세요
              </p>
            </div>
          )}
        </div>

        {/* 설명 카드 */}
        <div className="card bg-gradient-to-br from-purple-50 to-blue-50">
          <h3 className="font-bold text-gray-800 mb-3">💡 사용 방법</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>메인 화면에서 ON을 켜고 자리를 비웁니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>누군가 폰을 켜면 하트 개수가 늘어납니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>알람 ON 시: 5초 안에 PIN 입력 필요</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

import { Heart, Settings, Shield, ShieldAlert } from 'lucide-react';
import { AppSettings } from '../types';

interface MainScreenProps {
  settings: AppSettings;
  onNavigate: (screen: 'main' | 'settings' | 'pin') => void;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
}

const MainScreen = ({ settings, onNavigate, onUpdateSettings }: MainScreenProps) => {
  const handleToggle = () => {
    const newState = !settings.isMonitoring;
    onUpdateSettings({ isMonitoring: newState });
    
    if (newState) {
      // 모니터링 시작: 카운트 초기화
      onUpdateSettings({ unlockCount: 1, lastCheckTime: Date.now() });
    }
  };

  // 하트 개수 (최소 1개)
  const heartCount = Math.max(1, settings.unlockCount);
  
  return (
    <div className="w-full max-w-md fade-in">
      {/* 상태 표시 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
             style={{ background: settings.isMonitoring 
               ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' 
               : 'rgba(255, 255, 255, 0.2)' }}>
          {settings.isMonitoring ? (
            <Shield size={48} color="white" />
          ) : (
            <ShieldAlert size={48} color="white" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">Lock Guardian</h1>
        <p className="text-lg opacity-90">
          {settings.isMonitoring ? '감시 중...' : '대기 중'}
        </p>
      </div>

      {/* 메인 카드 */}
      <div className="card">
        {/* 하트 표시 */}
        {settings.isMonitoring && (
          <div className="mb-6">
            <p className="text-center text-gray-600 mb-3 text-sm font-medium">
              잠금 해제 횟수
            </p>
            <div className="heart-container">
              {Array.from({ length: heartCount }).map((_, index) => (
                <div
                  key={index}
                  className="heart-indicator"
                  style={{
                    background: `linear-gradient(135deg, 
                      hsl(${index * 40}, 100%, 65%) 0%, 
                      hsl(${index * 40 + 20}, 100%, 55%) 100%)`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <Heart size={24} fill="currentColor" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ON/OFF 토글 */}
        <div className="toggle-container">
          <span className="toggle-label" style={{ color: settings.isMonitoring ? '#38ef7d' : '#999' }}>
            OFF
          </span>
          <div 
            className={`toggle-switch ${settings.isMonitoring ? 'active' : ''}`}
            onClick={handleToggle}
          >
            <div className="toggle-knob" />
          </div>
          <span className="toggle-label" style={{ color: settings.isMonitoring ? '#38ef7d' : '#999' }}>
            ON
          </span>
        </div>

        {/* 설명 */}
        <p className="text-center text-gray-600 mt-6 text-sm leading-relaxed">
          {settings.isMonitoring 
            ? '앱이 백그라운드에서 잠금 해제를 감시합니다'
            : 'ON을 눌러 감시를 시작하세요'}
        </p>

        {/* 설정 버튼 */}
        <button
          className="btn btn-secondary w-full mt-6"
          onClick={() => onNavigate('settings')}
        >
          <Settings size={20} />
          설정
        </button>
      </div>

      {/* 하단 안내 */}
      <div className="text-center mt-6 text-sm opacity-80">
        <p>화장실 다녀올 때, 잠시 자리 비울 때</p>
        <p className="mt-1">누가 내 폰을 봤는지 확인하세요 👀</p>
      </div>
    </div>
  );
};

export default MainScreen;

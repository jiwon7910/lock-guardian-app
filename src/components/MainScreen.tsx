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
      {/* 로고 */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6"
             style={{ background: settings.isMonitoring 
               ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' 
               : 'rgba(255, 255, 255, 0.15)' }}>
          {settings.isMonitoring ? (
            <Shield size={56} color="white" strokeWidth={2.5} />
          ) : (
            <ShieldAlert size={56} color="white" strokeWidth={2.5} />
          )}
        </div>
        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">화면 지킴이</h1>
        <p className="text-white text-lg opacity-90 px-4 leading-relaxed">
          잠시 자리를 비울 때<br/>
          누군가 내 폰을 봤는지 확인하세요
        </p>
      </div>

      {/* 메인 카드 */}
      <div className="card">
        {/* 하트 박동 */}
        {settings.isMonitoring && (
          <div className="flex justify-center mb-6">
            <div className="heart-indicator">
              <Heart size={28} fill="currentColor" />
            </div>
          </div>
        )}
        
        {/* ON/OFF 토글 */}
        <div className="toggle-container" style={{ margin: '20px 0' }}>
          <span className="toggle-label" style={{ color: '#999', fontSize: '28px' }}>
            OFF
          </span>
          <div 
            className={`toggle-switch ${settings.isMonitoring ? 'active' : ''}`}
            onClick={handleToggle}
          >
            <div className="toggle-knob" />
          </div>
          <span className="toggle-label" style={{ color: '#38ef7d', fontSize: '28px' }}>
            ON
          </span>
        </div>

        {/* 설정 버튼 */}
        <button
          className="btn btn-secondary w-full"
          onClick={() => onNavigate('settings')}
        >
          <Settings size={20} />
          설정
        </button>
      </div>
    </div>
  );
};

export default MainScreen;

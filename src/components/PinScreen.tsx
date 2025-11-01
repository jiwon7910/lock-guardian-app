import { useState, useEffect } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { AppSettings } from '../types';

interface PinScreenProps {
  settings: AppSettings;
  onNavigate: (screen: 'main' | 'settings' | 'pin') => void;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
}

const PinScreen = ({ settings, onNavigate }: PinScreenProps) => {
  const [pin, setPin] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && isCorrect === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isCorrect === null) {
      // 시간 초과: 알람 발동
      handleTimeOut();
    }
  }, [timeLeft, isCorrect]);

  const handleTimeOut = () => {
    if (settings.alarmEnabled) {
      // 알람 울리기
      playAlarm();
    }
    setIsCorrect(false);
  };

  const playAlarm = () => {
    // 실제 앱에서는 소리 파일 재생
    alert('🚨 알람! 누군가 당신의 폰을 보고 있습니다!');
  };

  const handleNumberClick = (num: number) => {
    if (pin.length < 4 && isCorrect === null) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        checkPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setIsCorrect(null);
  };

  const checkPin = (enteredPin: string) => {
    if (enteredPin === settings.pinCode) {
      setIsCorrect(true);
      setTimeout(() => onNavigate('main'), 1500);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin('');
        setIsCorrect(null);
      }, 500);
      
      if (settings.alarmEnabled) {
        playAlarm();
      }
    }
  };

  return (
    <div className="w-full max-w-md fade-in">
      {/* 타이머 */}
      <div className="text-center mb-8">
        <div className="timer">{timeLeft}</div>
        <p className="text-lg opacity-90">
          {timeLeft > 0 ? 'PIN을 입력하세요' : '시간 초과!'}
        </p>
      </div>

      {/* PIN 입력 표시 */}
      <div className={`card mb-6 ${shake ? 'shake' : ''}`}>
        <div className="pin-input">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`pin-digit ${pin.length > index ? 'filled' : ''}`}
            >
              {pin.length > index ? '•' : ''}
            </div>
          ))}
        </div>

        {/* 상태 메시지 */}
        {isCorrect === true && (
          <div className="text-center mt-4 text-green-600 font-bold flex items-center justify-center gap-2">
            <Check size={24} />
            <span>인증 성공!</span>
          </div>
        )}
        {isCorrect === false && (
          <div className="text-center mt-4 text-red-600 font-bold flex items-center justify-center gap-2">
            <AlertTriangle size={24} />
            <span>PIN이 틀렸습니다!</span>
          </div>
        )}
      </div>

      {/* 숫자 키패드 */}
      <div className="numpad mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="numpad-btn"
            onClick={() => handleNumberClick(num)}
            disabled={isCorrect !== null}
          >
            {num}
          </button>
        ))}
        <button
          className="numpad-btn"
          onClick={handleBackspace}
          disabled={pin.length === 0 || isCorrect !== null}
          style={{ gridColumn: '1' }}
        >
          ←
        </button>
        <button
          className="numpad-btn"
          onClick={() => handleNumberClick(0)}
          disabled={isCorrect !== null}
        >
          0
        </button>
        <div /> {/* 빈 칸 */}
      </div>

      {/* 경고 메시지 */}
      {settings.alarmEnabled && (
        <div className="card bg-red-50 border-2 border-red-200">
          <p className="text-red-800 text-sm font-medium text-center">
            🚨 알람 모드 활성화됨
          </p>
        </div>
      )}
    </div>
  );
};

export default PinScreen;

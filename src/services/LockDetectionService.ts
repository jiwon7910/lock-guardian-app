import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { incrementUnlockCount, loadSettings } from '../utils/storage';

export class LockDetectionService {
  private static instance: LockDetectionService;
  private isListening = false;
  private notificationIds: number[] = [];

  static getInstance(): LockDetectionService {
    if (!LockDetectionService.instance) {
      LockDetectionService.instance = new LockDetectionService();
    }
    return LockDetectionService.instance;
  }

  async startMonitoring() {
    if (this.isListening) return;

    // 알림 권한 요청
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      alert('알림 권한이 필요합니다');
      return;
    }

    this.isListening = true;

    // 앱 상태 변화 감지
    App.addListener('appStateChange', async (state) => {
      if (state.isActive) {
        // 앱이 활성화될 때 = 잠금 해제로 간주
        await this.onUnlockDetected();
      }
    });

    console.log('Lock detection started');
  }

  async stopMonitoring() {
    this.isListening = false;
    await this.clearAllNotifications();
    App.removeAllListeners();
    console.log('Lock detection stopped');
  }

  private async onUnlockDetected() {
    const settings = loadSettings();
    
    // 잠금 해제 카운트 증가
    const count = incrementUnlockCount();
    
    // 진동
    await Haptics.impact({ style: ImpactStyle.Medium });
    
    // 알림바에 하트 표시
    await this.showHeartNotification(count);
    
    // 알람이 켜져있고 PIN이 설정되어 있으면 PIN 입력 화면 표시
    if (settings.alarmEnabled && settings.pinCode) {
      // PIN 입력 화면으로 이동하는 이벤트 발생
      window.dispatchEvent(new CustomEvent('showPinScreen'));
    }
  }

  private async showHeartNotification(count: number) {
    // 각 잠금 해제마다 다른 색상의 하트를 알림으로 표시
    const notificationId = Date.now();
    this.notificationIds.push(notificationId);

    const heartEmojis = ['💜', '💗', '💙', '💚', '💛', '🧡', '❤️'];
    const heartEmoji = heartEmojis[(count - 1) % heartEmojis.length];

    await LocalNotifications.schedule({
      notifications: [
        {
          id: notificationId,
          title: `${heartEmoji} 잠금 해제 감지`,
          body: `현재 ${count}번 해제되었습니다`,
          ongoing: true, // 지속적 알림 (스와이프로 삭제 불가)
          autoCancel: false,
          smallIcon: 'ic_stat_heart',
          sound: undefined, // 소리 없음
        }
      ]
    });
  }

  private async clearAllNotifications() {
    // 모든 알림 제거
    if (this.notificationIds.length > 0) {
      await LocalNotifications.cancel({
        notifications: this.notificationIds.map(id => ({ id }))
      });
      this.notificationIds = [];
    }
  }

  async playAlarm() {
    // 시끄러운 알람 재생
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 999999,
          title: '🚨 경고!',
          body: '누군가 당신의 폰을 보고 있습니다!',
          sound: 'beep.wav',
          ongoing: true,
          autoCancel: false,
        }
      ]
    });

    // 연속 진동
    for (let i = 0; i < 5; i++) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
}

export const lockDetectionService = LockDetectionService.getInstance();

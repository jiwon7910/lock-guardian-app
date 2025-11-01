export interface AppSettings {
  isMonitoring: boolean; // ON/OFF 상태
  alarmEnabled: boolean; // 알람 설정
  pinCode: string; // PIN 번호
  unlockCount: number; // 잠금 해제 횟수
  lastCheckTime: number; // 마지막 확인 시간
}

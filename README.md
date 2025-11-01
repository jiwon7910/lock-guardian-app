# 🔒 Lock Guardian - 잠금 감시 앱

화장실 다녀오거나 잠시 자리 비울 때, 누가 내 폰을 봤는지 확인하는 앱입니다.

## ✨ 주요 기능

### 🛡️ 잠금 해제 감지
- 백그라운드에서 실행되어 잠금 해제를 감지
- 해제될 때마다 다른 색상의 하트 추가
- 최소 1개의 하트 (본인 해제)

### 🔔 알람 시스템
- 잠금 해제 후 5초 안에 PIN 입력 필요
- PIN 미입력 시 시끄러운 알람 발동
- 틀린 PIN 입력 시에도 알람

### 📱 심플한 UI
- ON/OFF 토글 스위치
- 설정 버튼 (PIN, 알람 on/off)
- 프리미엄 그라데이션 디자인

## 🎯 사용 방법

1. **설정**에서 4자리 PIN 설정
2. **알람 ON/OFF** 선택
3. 메인 화면에서 **ON** 켜기
4. 자리를 비우기
5. 돌아와서 하트 개수 확인!

## 🛠️ 기술 스택

- **Frontend**: React + TypeScript
- **Mobile**: Capacitor (Android Native)
- **Build**: Vite
- **Icons**: Lucide React

## 📦 설치 및 실행

### 웹 개발 서버
```bash
npm install
npm run dev
```

### 안드로이드 앱
```bash
npm run build
npx cap sync
npx cap open android
```

Android Studio에서 실행하거나 APK 빌드

## 🎨 디자인 특징

- **프리미엄 그라데이션**: 보라색 테마
- **부드러운 애니메이션**: 하트 박동 효과
- **직관적인 UI**: 버튼 2개로 모든 기능
- **배포 가능한 퀄리티**: 세밀한 디테일

## 📱 안드로이드 네이티브 기능

- ✅ 백그라운드 서비스
- ✅ 로컬 알림
- ✅ 진동/소리 알람
- ✅ 화면 켜짐 감지
- ✅ 화면 오버레이

## 🚀 배포

### APK 생성
1. Android Studio에서 Build → Generate Signed Bundle/APK
2. APK 선택 후 키스토어 설정
3. Release APK 생성

### Google Play Store
- App Bundle (.aab) 생성
- 업로드 후 배포

## 📄 라이선스

MIT License

---

**Lock Guardian**으로 소중한 폰을 지키세요! 🔐

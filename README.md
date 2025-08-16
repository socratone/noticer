# Noticer

React와 TypeScript로 개발된 Electron 기반 알림 애플리케이션입니다.

## 요구사항

- Node.js
- npm (패키지 매니저)

## 설치

```bash
npm install
```

## 스크립트

### 개발

```bash
npm run dev
```
Vite 개발 서버를 시작합니다.

### 빌드

```bash
npm run build
```
TypeScript 컴파일 후 프로덕션용 빌드를 생성합니다.

### Electron 실행

```bash
npm run electron
```
빌드된 애플리케이션을 Electron으로 실행합니다.

### Electron 배포

```bash
npm run make
```
Electron Forge를 사용하여 배포 가능한 패키지를 생성합니다.

## 기술 스택

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Desktop**: Electron
- **Form**: React Hook Form + Zod
- **Styling**: CSS

## 개발 환경

```bash
# 개발 서버 시작
npm run dev

# 별도 터미널에서 Electron 실행
npm run electron
```

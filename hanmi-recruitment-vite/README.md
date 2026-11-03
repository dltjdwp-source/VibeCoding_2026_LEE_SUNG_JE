# 한미그룹 채용 React 프로젝트

기존 채용 페이지를 Vite와 React 기반으로 구성한 정적 웹 프로젝트입니다. 페이지의 주요 영역은 `src/components/sections/`의 JSX 컴포넌트로 나뉘며, JSON 기반 복지·직무·설명회 화면도 React 컴포넌트에서 렌더링합니다. 기존 CSS와 이미지, Canvas 자산은 `public/`에 있습니다.

## 개발 환경

- Node.js 20.19 이상 (권장: 최신 LTS)
- npm

## 실행

```powershell
npm install
npm run dev
```

Vite가 출력하는 로컬 주소에서 페이지를 확인할 수 있습니다.

## 빌드 및 배포 확인

```powershell
npm run build
npm run preview
```

배포 파일은 `dist/`에 생성됩니다. `vite.config.js`의 상대 경로 설정으로 루트 도메인 및 하위 경로 기반의 정적 호스팅을 지원합니다. 실제 배포 URL에서 데이터 JSON과 Canvas 이미지 시퀀스가 정상 응답되는지 확인하세요.

Canvas 프레임은 무손실 WebP로 배포합니다. 프레임 원본 PNG는 원본 사이트 폴더에 보존되어 있으며, 해당 폴더가 프로젝트 형제 폴더에 있을 때 아래 명령으로 WebP를 다시 생성할 수 있습니다.

```powershell
npm run optimize:canvas
```

원본 폴더 위치가 다르면 `HANMI_SOURCE_DIR` 환경 변수로 경로를 지정하세요. 이 명령은 프로젝트의 `public/`에 있는 변환 전 PNG 사본만 제거합니다.

## 프로젝트 구조

```text
src/
  App.jsx
  components/
    Header.jsx
    Footer.jsx
    MainSections.jsx
    BenefitsList.jsx
    JobBrowser.jsx
    RecruitingSchedule.jsx
    MobileMenu.jsx
    SiteEnhancements.jsx
    sections/       # 페이지의 주요 영역별 JSX
  hooks/
    usePublicJson.js
public/
  css/              # 기존 스타일시트 및 Canvas 스타일
  data/             # 복지, 직무, 설명회 JSON
  images/           # 페이지 이미지
  hanmi-eye-tracking/
  hanmi-reading-eye-tracking/
  js/               # 스크롤, 메뉴, 연혁 등 보조 인터랙션
scripts/
  convert-canvas-assets.mjs
```

# 🌤 위치 기반 날씨 앱

> 내 위치를 기반으로 5일간의 날씨를 보여주는 반응형 날씨 애플리케이션  
> OpenWeather API, React, styled-components, react-leaflet를 사용하여 제작  
> 👉 **[배포된 앱 보러가기 (Vercel)](https://weather-application-eosin-chi.vercel.app/)**

---

## 📌 주요 기능

- 📍 **Geolocation API**를 통해 사용자의 현재 위치 탐지
- 🌦 **OpenWeather API**를 이용한 5일간의 날씨 예보 표시 (매일 12시 기준)
- 💬 **날씨 상태에 따라 이모지 자동 출력** (sun, cloud, rain 등)
- 🗺 **react-leaflet**로 현재 위치를 지도에 마커로 표시
- 🗓 **날짜 포맷**을 `7월 12일 (토)` 형식으로 변환
- 🏙 **Reverse Geocoding**을 통해 정확한 도시 이름 표시
- 📱 **반응형 레이아웃** (5개 → 2개 → 1개 카드 자동 정렬)
- 🎨 **styled-components**를 이용한 모던하고 직관적인 디자인

---

## 🚀 배포

- **Vercel**을 통해 정적 웹사이트로 배포
- 🔗 **URL**: [https://weather-application-eosin-chi.vercel.app/](https://weather-application-eosin-chi.vercel.app/)

---

## 🛠 사용 기술

| 항목            | 사용 기술                                 |
| --------------- | ----------------------------------------- |
| 프레임워크      | React (Vite 기반)                         |
| 스타일링        | styled-components                         |
| 날씨 API        | OpenWeather (forecast, reverse geocoding) |
| 위치 탐색       | Geolocation API                           |
| 지도 표시       | react-leaflet, leaflet                    |
| 요청 라이브러리 | axios                                     |

---

## 📦 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/hannalee7222/Weather_Application.git

# 2. 디렉토리 이동
cd Weather_Application

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

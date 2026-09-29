# 🌿 Mind & Act - AI 성향 분석 & 맞춤 여가 활동 큐레이터

> **Google Gemini AI와 Serper 실시간 검색을 활용한 개인 맞춤형 라이프스타일 추천 웹 애플리케이션**

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://aistudio.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](#)

---

## 📌 프로젝트 소개

**Mind & Act**는 15개의 일상 질문을 통해 사용자의 4대 성향 지표(E/I, S/N, T/F, J/P)의 세부 비율을 정밀 분석하고, **Google Gemini 1.5 Flash AI**가 사용자의 성향에 어울리는 주말/여가 활동 3가지를 큐레이션해 주는 서비스입니다. 

* 💡 **철학**: MBTI는 개인을 가두는 틀이 아니라, 나의 편안한 선호 경향성을 가볍게 돌아보기 위한 나침반입니다.

---

## ✨ 핵심 기능

1. **15문항 인터랙티브 성향 테스트**
   * 에너지 방향(E/I), 인식 방식(S/N), 판단 방식(T/F), 생활 양식(J/P)을 고르게 측정
   * 문항별 실시간 진행률 프로그레스 바(%) 제공
2. **세부 성향 스펙트럼 시각화**
   * 단순 4글자 결과뿐만 아니라, 4개 축의 세부 백분율(%)을 가로 막대 그래프로 시각화
3. **Google Gemini AI 맞춤형 활동 추천**
   * 사용자 성향 맞춤형 캐릭터 칭호 및 따뜻한 요약 코멘트
   * 스트레스 해소와 에너지 충전을 위한 맞춤 활동 3가지 (추천 이유, 실천 팁, 검색 키워드)
4. **Serper 실시간 구글 검색 연동**
   * AI가 추천한 활동 관련 실제 최신 웹 정보 및 추천 장소 링크 자동 제공
5. **결과 공유 및 편의 기능**
   * [결과 요약 복사하기] 버튼으로 클립보드 원클릭 공유
   * [테스트 다시하기] 지원 및 네트워크 오류 시 안전한 대체(Fallback) 데이터 보장

---

## 🛠 기술 스택

* **Backend**: Python, Flask, `python-dotenv`, `requests`
* **AI & Search API**: Google Generative AI (Gemini 1.5 Flash), Serper.dev API
* **Frontend**: HTML5, CSS3 (모던 카드 UI & Progress Bar), Vanilla JavaScript
* **VCS**: Git, GitHub

---

## 📁 프로젝트 구조

```text
mbti-recommender/
├── app.py                 # Flask 백엔드 서버 및 API 연동 로직
├── requirements.txt       # 의존성 패키지 목록
├── .env.example           # 환경변수 양식 템플릿
├── .gitignore             # Git 제외 설정 (.env, venv 등)
├── README.md              # 프로젝트 소개 및 사용 설명서
├── templates/
│   └── index.html         # 메인 웹 페이지 (테스트 UI 및 결과 뷰)
└── static/
    ├── css/
    │   └── style.css      # 반응형 디자인 및 스타일시트
    └── js/
        └── app.js         # 문항 데이터, 인터랙션, 백분율 계산 및 통신
```

---

## 🚀 빠른 시작 가이드 (Getting Started)

### 1. 가상환경 생성 및 활성화

```powershell
# 가상환경 생성
py -m venv venv

# 가상환경 활성화 (Windows PowerShell 기준)
.\venv\Scripts\Activate.ps1
```

### 2. 패키지 설치

```powershell
py -m pip install -r requirements.txt
```

### 3. 환경변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 본인의 API 키를 입력합니다.

```powershell
Copy-Item .env.example .env
notepad .env
```

```env
GEMINI_API_KEY=your_actual_gemini_api_key
SERPER_API_KEY=your_actual_serper_api_key
```

### 4. 웹 서버 실행

```powershell
py app.py
```

브라우저에서 `http://127.0.0.1:5000` 으로 접속합니다.

---

## 📄 라이선스 및 유의사항

* 본 프로젝트의 결과 및 추천 활동은 사용자의 편안한 여가 선택을 돕기 위한 **참고용 가이드**입니다.

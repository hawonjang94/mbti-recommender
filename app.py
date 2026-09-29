import os
import json
import logging
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

# 1. 로깅(Backend Log) 설정 - 서버에서 일어나는 일을 터미널에 기록
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
)
logger = logging.getLogger(__name__)

# 2. .env 파일의 환경변수 로드
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

# 3. Gemini API 초기화
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    logger.info("Gemini API가 성공적으로 설정되었습니다.")
else:
    logger.warning("GEMINI_API_KEY가 .env 파일에 설정되지 않았습니다.")

# 4. Flask 애플리케이션 생성
app = Flask(__name__)

# 유효한 MBTI 목록 (16가지)
VALID_MBTI = {
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
}

def search_serper(query):
    """Serper API를 호출하여 구글 실시간 검색 결과를 가져오는 함수"""
    if not SERPER_API_KEY or SERPER_API_KEY == "your_serper_api_key_here":
        logger.info("SERPER_API_KEY가 없어 검색 보강을 건너뜁니다.")
        return []

    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    payload = json.dumps({
        "q": query,
        "gl": "kr",
        "hl": "ko",
        "num": 3
    })

    try:
        response = requests.post(url, headers=headers, data=payload, timeout=5)
        if response.status_code == 200:
            results = response.json().get("organic", [])
            return [
                {
                    "title": item.get("title", ""),
                    "link": item.get("link", ""),
                    "snippet": item.get("snippet", "")
                }
                for item in results[:3]
            ]
        else:
            logger.error(f"Serper API 호출 실패: 상태코드 {response.status_code}")
            return []
    except Exception as e:
        logger.error(f"Serper API 요청 중 예외 발생: {str(e)}")
        return []


@app.route("/")
def index():
    """메인 화면(HTML)을 보여주는 라우트"""
    return render_template("index.html")


@app.route("/recommend", methods=["POST"])
def recommend():
    """사용자의 MBTI와 성향 비율을 받아 맞춤 활동을 AI로 추천하는 라우트"""
    try:
        data = request.get_json()
        if not data:
            logger.warning("요청 데이터(JSON)가 없습니다.")
            return jsonify({"success": False, "error": "요청 데이터가 올바르지 않습니다."}), 400

        mbti = data.get("mbti", "").upper().strip()
        scores = data.get("scores", {})

        # 입력값 검증 (MBTI 16개 유형 중 하나인지 확인)
        if mbti not in VALID_MBTI:
            logger.warning(f"유효하지 않은 MBTI 입력: {mbti}")
            return jsonify({"success": False, "error": "올바른 MBTI 유형이 아닙니다."}), 400

        logger.info(f"추천 요청 수신 - MBTI: {mbti}, 점수분포: {scores}")

        # 프롬프트 엔지니어링: MBTI가 절대적이지 않고 참고용임을 안내하도록 지시
        system_prompt = f"""
당신은 따뜻하고 전문적인 성향 맞춤형 라이프스타일 큐레이터입니다.
사용자의 MBTI 성향 유형은 [{mbti}] 이며, 각 지표별 세부 비율은 {json.dumps(scores)} 입니다.

[중요 지침]
1. MBTI는 개인을 가두는 절대적인 틀이 아니며, 개인의 현재 선호 경향성을 가볍게 참고하기 위한 가이드일 뿐이라는 점을 친절하게 강조해 주세요.
2. 사용자의 지표 비율을 고려하여 스트레스를 풀고 에너지를 충전할 수 있는 맞춤형 여가/문화/힐링 활동 3가지를 추천해 주세요.
3. 각 활동마다 인터넷 검색에 적합한 구체적인 '검색 키워드(search_keyword)'를 1개씩 포함해 주세요.
4. 반드시 아래의 순수 JSON 포맷으로만 응답해야 하며, 마크다운 코드블록(```json 등) 없이 JSON 텍스트만 출력하세요.

[응답 JSON 규격]
{{
    "mbti": "{mbti}",
    "disclaimer": "MBTI는 본인의 성향을 탐색하기 위한 참고용 지표일 뿐, 개인의 무한한 잠재력과 성격을 단정 짓지 않습니다.",
    "character_title": "성향에 어울리는 짧은 닉네임 (예: 다정한 열정 기획자)",
    "summary": "사용자의 성향 특성에 대한 따뜻한 요약 설명 (2~3문장)",
    "activities": [
        {{
            "name": "활동 이름",
            "reason": "이 활동이 사용자의 성향과 어울리는 이유",
            "tip": "실천할 때 도움이 되는 소소한 팁",
            "search_keyword": "네이버나 구글에 검색하기 좋은 키워드 (예: 서울 독립서점 투어)"
        }},
        {{
            "name": "활동 이름 2",
            "reason": "추천 이유",
            "tip": "실천 팁",
            "search_keyword": "검색 키워드"
        }},
        {{
            "name": "활동 이름 3",
            "reason": "추천 이유",
            "tip": "실천 팁",
            "search_keyword": "검색 키워드"
        }}
    ]
}}
"""

        # Gemini 호출 및 예외 처리
        recommendations = None
        if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
            try:
                model = genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content(system_prompt)
                raw_text = response.text.strip()

                # 혹시 마크다운(```json)이 포함된 경우 정리
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:]
                elif raw_text.startswith("```"):
                    raw_text = raw_text[3:]
                if raw_text.endswith("```"):
                    raw_text = raw_text[:-3]

                recommendations = json.loads(raw_text.strip())
                logger.info(f"Gemini API 응답 성공 ({mbti})")
            except Exception as ai_err:
                logger.error(f"Gemini 호출 실패, 대체 데이터로 전환합니다: {str(ai_err)}")

        # API 키가 없거나 호출에 실패했을 때 사용하는 안전한 기본(Fallback) 데이터
        if not recommendations:
            recommendations = {
                "mbti": mbti,
                "disclaimer": "MBTI는 본인의 선호 경향성을 가볍게 참고하기 위한 가이드입니다.",
                "character_title": f"{mbti} 맞춤 탐험가",
                "summary": f"{mbti} 성향을 가진 분들은 자신만의 특별한 방식으로 에너지를 채우고 세상을 바라봅니다.",
                "activities": [
                    {
                        "name": "조용한 감성 카페에서 글쓰기 및 독서",
                        "reason": "복잡한 일상에서 벗어나 혼자만의 생각을 정리하며 내면의 에너지를 충전할 수 있습니다.",
                        "tip": "잔잔한 음악이 흐르는 편안한 좌석의 공간을 찾아보세요.",
                        "search_keyword": "조용한 북카페 추천"
                    },
                    {
                        "name": "자연 속 가벼운 산책과 풍경 사진 찍기",
                        "reason": "자연의 소리와 계절의 변화를 느끼며 기분 전환을 할 수 있습니다.",
                        "tip": "스마트폰 알림을 잠시 끄고 시각과 청각에 집중해 보세요.",
                        "search_keyword": "도심 힐링 산책로"
                    },
                    {
                        "name": "원데이 클래스로 새로운 취미 체험하기",
                        "reason": "부담 없이 새로운 감각을 일깨우고 창의적인 성취감을 맛볼 수 있습니다.",
                        "tip": "도예, 베이킹, 향수 만들기 등 손으로 만드는 활동을 추천합니다.",
                        "search_keyword": "주말 원데이 클래스"
                    }
                ]
            }

        # 첫 번째 활동의 검색 키워드로 Serper 실시간 검색 보강
        first_activity = recommendations.get("activities", [{}])[0]
        search_kw = first_activity.get("search_keyword", f"{mbti} 추천 활동")
        search_results = search_serper(search_kw)

        # 최종 응답 조합
        return jsonify({
            "success": True,
            "data": recommendations,
            "related_search": {
                "keyword": search_kw,
                "results": search_results
            }
        })

    except Exception as e:
        logger.error(f"/recommend 처리 중 예기치 않은 서버 오류: {str(e)}")
        return jsonify({"success": False, "error": "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}), 500


if __name__ == "__main__":
    # 개발 서버 실행 (디버그 모드 On, 포트 5000)
    logger.info("MBTI Recommender 웹 서버를 시작합니다. (http://127.0.0.1:5000)")
    app.run(host="127.0.0.1", port=5000, debug=True)

// 1. 15개의 일상 MBTI 질문 데이터
// (E/I 4문항, S/N 4문항, T/F 4문항, J/P 3문항)
const questions = [
    // --- E vs I (에너지 방향) ---
    {
        category: "에너지 충전",
        question: "일주일간의 고된 일과가 끝난 금요일 저녁, 나의 이상적인 시간은?",
        choiceA: { text: "친구들과 시끌벅적하게 맛있는 음식을 먹으며 수다 떨기", type: "E" },
        choiceB: { text: "집에서 편한 옷을 입고 조용히 넷플릭스 보거나 푹 쉬기", type: "I" }
    },
    {
        category: "새로운 모임",
        question: "처음 보는 사람들이 많은 파티나 모임에 참석했을 때 나는?",
        choiceA: { text: "먼저 다가가서 인사하고 새로운 대화를 주도하는 편이다", type: "E" },
        choiceB: { text: "아는 사람 곁에 머물거나, 누가 말을 걸어줄 때까지 기다리는 편이다", type: "I" }
    },
    {
        category: "휴식 스타일",
        question: "오랜만에 찾아온 꿀 같은 주말, 더 에너지가 차오르는 활동은?",
        choiceA: { text: "밖으로 나가서 사람들도 구경하고 활동적으로 돌아다니기", type: "E" },
        choiceB: { text: "혼자 방에서 음악을 듣거나 취미 생활에 온전히 몰입하기", type: "I" }
    },
    {
        category: "생각 표현",
        question: "고민이나 새로운 아이디어가 떠올랐을 때 나는?",
        choiceA: { text: "일단 사람들에게 말로 털어놓으면서 생각을 정리한다", type: "E" },
        choiceB: { text: "혼자 조용히 머릿속이나 메모장에 충분히 정리한 뒤 말한다", type: "I" }
    },

    // --- S vs N (인식 방식) ---
    {
        category: "여행 계획",
        question: "여행을 떠날 때 내가 더 중요하게 생각하는 것은?",
        choiceA: { text: "실제 방문할 장소, 운영 시간, 이동 동선과 맛집 후기", type: "S" },
        choiceB: { text: "그 여행지에서 느낄 감성과 분위기, 뜻밖의 새로운 영감", type: "N" }
    },
    {
        category: "설명 방식",
        question: "어떤 사물이나 일을 다른 사람에게 설명할 때 나는?",
        choiceA: { text: "구체적인 사실과 숫자, 눈에 보이는 경험을 있는 그대로 설명한다", type: "S" },
        choiceB: { text: "비유나 은유, 전체적인 맥락과 의미를 중심으로 설명한다", type: "N" }
    },
    {
        category: "상상과 현실",
        question: "멍때릴 때 머릿속에 주로 스쳐 지나가는 생각은?",
        choiceA: { text: "오늘 해야 할 일, 저녁 메뉴 등 현실적이고 실질적인 생각", type: "S" },
        choiceB: { text: "'만약 우주선이 착륙한다면?' 같은 엉뚱하고 기발한 공상", type: "N" }
    },
    {
        category: "새로운 시도",
        question: "요리를 하거나 작업을 할 때 나의 스타일은?",
        choiceA: { text: "정해진 레시피와 검증된 매뉴얼을 꼼꼼하게 지키며 만든다", type: "S" },
        choiceB: { text: "레시피를 보더라도 내 영감과 감각대로 재료를 자유롭게 변형해 본다", type: "N" }
    },

    // --- T vs F (판단 방식) ---
    {
        category: "친구의 고민 상담",
        question: "친구가 '나 오늘 회사에서 실수해서 너무 속상해'라고 할 때 먼저 나오는 말은?",
        choiceA: { text: "'어떤 실수를 했는데? 어떻게 수습했어?' (해결책 파악)", type: "T" },
        choiceB: { text: "'아이고... 진짜 속상했겠다. 마음고생 많았네' (공감과 위로)", type: "F" }
    },
    {
        category: "결정의 순간",
        question: "중요한 결정을 내려야 할 때 내가 더 우선시하는 기준은?",
        choiceA: { text: "논리적인 타당성과 객관적인 득실(장단점 분석)", type: "T" },
        choiceB: { text: "나와 주변 사람들의 감정과 관계에 미치는 영향", type: "F" }
    },
    {
        category: "비판과 피드백",
        question: "내가 열심히 한 일에 대해 누군가 솔직한 피드백을 주었을 때?",
        choiceA: { text: "피드백의 논리가 맞다면 감정 상하지 않고 수용한다", type: "T" },
        choiceB: { text: "내용이 맞아도 말투나 서운함 때문에 마음이 먼저 아프다", type: "F" }
    },
    {
        category: "영화 감상",
        question: "감동적인 영화나 드라마를 볼 때 나의 반응은?",
        choiceA: { text: "스토리 개연성과 연출의 완성도를 분석하며 본다", type: "T" },
        choiceB: { text: "주인공의 감정에 푹 빠져 눈물을 글썽이며 몰입한다", type: "F" }
    },

    // --- J vs P (생활 양식) ---
    {
        category: "약속 잡기",
        question: "주말 약속을 잡을 때 나의 자연스러운 모습은?",
        choiceA: { text: "며칠 전부터 시간, 장소, 이동 수단을 미리 정해두어야 편하다", type: "J" },
        choiceB: { text: "'그날 당일 날씨 보고 기분 내키는 대로 만나자!'가 더 편하다", type: "P" }
    },
    {
        category: "마감과 계획",
        question: "과제나 업무 마감일이 다가올 때 나의 행동 패턴은?",
        choiceA: { text: "미리미리 단계별로 쪼개서 여유 있게 끝내놓는다", type: "J" },
        choiceB: { text: "마감 직전의 긴장감 속에서 초인적인 집중력을 발휘한다", type: "P" }
    },
    {
        category: "방 정리 스타일",
        question: "내 방 책상이나 스마트폰 바탕화면의 상태는?",
        choiceA: { text: "항상 제자리에 정돈되어 있고 폴더별로 깔끔히 분류되어 있다", type: "J" },
        choiceB: { text: "자유롭게 놓여 있지만, 내 눈에는 어디에 뭐가 있는지 다 안다", type: "P" }
    }
];

// 2. 상태 관리 변수
let currentQuestionIndex = 0;
const userAnswers = []; // 사용자가 선택한 지표 (['E', 'S', 'T', ...])

// DOM 요소 참조
const introSection = document.getElementById("intro-section");
const quizSection = document.getElementById("quiz-section");
const loadingSection = document.getElementById("loading-section");
const resultSection = document.getElementById("result-section");

const btnStart = document.getElementById("btn-start");
const btnOptionA = document.getElementById("btn-option-a");
const btnOptionB = document.getElementById("btn-option-b");
const btnRestart = document.getElementById("btn-restart");
const btnCopyResult = document.getElementById("btn-copy-result");

const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressBarFill = document.getElementById("progress-bar-fill");

const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const textOptionA = document.getElementById("text-option-a");
const textOptionB = document.getElementById("text-option-b");

// 3. 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", () => {
    btnStart.addEventListener("click", startQuiz);
    btnOptionA.addEventListener("click", () => handleAnswer("A"));
    btnOptionB.addEventListener("click", () => handleAnswer("B"));
    btnRestart.addEventListener("click", restartQuiz);
    btnCopyResult.addEventListener("click", copyResultText);
});

// 4. 퀴즈 시작 함수
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers.length = 0;
    introSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    loadingSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    renderQuestion();
}

// 5. 문항 렌더링 함수
function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const total = questions.length;
    const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

    // 상단 진행률 프로그레스 바 갱신
    progressText.textContent = `질문 ${currentQuestionIndex + 1} / ${total}`;
    progressPercent.textContent = `${progress}%`;
    progressBarFill.style.width = `${progress}%`;

    // 질문 및 선택지 텍스트 갱신
    questionCategory.textContent = q.category;
    questionText.textContent = q.question;
    textOptionA.textContent = q.choiceA.text;
    textOptionB.textContent = q.choiceB.text;
}

// 6. 선택지 클릭 처리 함수
function handleAnswer(choice) {
    const q = questions[currentQuestionIndex];
    const selectedType = (choice === "A") ? q.choiceA.type : q.choiceB.type;
    userAnswers.push(selectedType);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        // 모든 질문 완료 -> 점수 계산 및 AI 추천 요청
        finishQuiz();
    }
}

// 7. 최종 점수 계산 및 API 요청
async function finishQuiz() {
    quizSection.classList.add("hidden");
    loadingSection.classList.remove("hidden");

    // 지표별 카운트 계산
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers.forEach(type => {
        if (counts[type] !== undefined) counts[type]++;
    });

    // 백분율(%) 계산 (각 쌍의 총합 대비 비율)
    const totalEI = counts.E + counts.I;
    const totalSN = counts.S + counts.N;
    const totalTF = counts.T + counts.F;
    const totalJP = counts.J + counts.P;

    const scores = {
        E: Math.round((counts.E / totalEI) * 100),
        I: Math.round((counts.I / totalEI) * 100),
        S: Math.round((counts.S / totalSN) * 100),
        N: Math.round((counts.N / totalSN) * 100),
        T: Math.round((counts.T / totalTF) * 100),
        F: Math.round((counts.F / totalTF) * 100),
        J: Math.round((counts.J / totalJP) * 100),
        P: Math.round((counts.P / totalJP) * 100),
    };

    // 우세한 성향 조합으로 4자리 MBTI 결정
    const mbti = 
        (counts.E >= counts.I ? "E" : "I") +
        (counts.S >= counts.N ? "S" : "N") +
        (counts.T >= counts.F ? "T" : "F") +
        (counts.J >= counts.P ? "J" : "P");

    try {
        // 서버에 추천 요청 (POST /recommend)
        const response = await fetch("/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mbti, scores })
        });

        const result = await response.json();
        if (result.success && result.data) {
            renderResults(mbti, scores, result.data, result.related_search);
        } else {
            throw new Error(result.error || "추천 정보를 가져오지 못했습니다.");
        }
    } catch (err) {
        console.error("추천 요청 실패:", err);
        alert("일시적인 네트워크 지연이 발생하여 기본 추천 정보를 표시합니다.");
        renderFallbackResults(mbti, scores);
    } finally {
        loadingSection.classList.add("hidden");
        resultSection.classList.remove("hidden");
    }
}

// 8. 결과 화면 렌더링
function renderResults(mbti, scores, aiData, searchData) {
    document.getElementById("res-mbti").textContent = mbti;
    document.getElementById("res-disclaimer").textContent = aiData.disclaimer || "MBTI는 참고용 지표입니다";
    document.getElementById("res-character").textContent = aiData.character_title || `${mbti} 라이프스타일러`;
    document.getElementById("res-summary").textContent = aiData.summary || "";

    // 4대 지표 퍼센트 텍스트 및 프로그레스 바 적용
    document.getElementById("score-e").textContent = `${scores.E}%`;
    document.getElementById("score-i").textContent = `${scores.I}%`;
    document.getElementById("bar-ei").style.width = `${scores.E}%`;

    document.getElementById("score-s").textContent = `${scores.S}%`;
    document.getElementById("score-n").textContent = `${scores.N}%`;
    document.getElementById("bar-sn").style.width = `${scores.S}%`;

    document.getElementById("score-t").textContent = `${scores.T}%`;
    document.getElementById("score-f").textContent = `${scores.F}%`;
    document.getElementById("bar-tf").style.width = `${scores.T}%`;

    document.getElementById("score-j").textContent = `${scores.J}%`;
    document.getElementById("score-p").textContent = `${scores.P}%`;
    document.getElementById("bar-jp").style.width = `${scores.J}%`;

    // AI 추천 활동 카드 리스트 생성
    const activitiesList = document.getElementById("activities-list");
    activitiesList.innerHTML = "";

    if (aiData.activities && Array.isArray(aiData.activities)) {
        aiData.activities.forEach(act => {
            const card = document.createElement("div");
            card.className = "activity-card fade-in";
            card.innerHTML = `
                <div class="activity-name">🎯 ${act.name}</div>
                <div class="activity-reason">${act.reason}</div>
                <div class="activity-tip">💡 <strong>실천 팁:</strong> ${act.tip}</div>
            `;
            activitiesList.appendChild(card);
        });
    }

    // 구글 실시간 검색 보강 렌더링
    const searchSection = document.getElementById("search-section");
    const searchKeywordText = document.getElementById("search-keyword-text");
    const searchResultsList = document.getElementById("search-results-list");

    if (searchData && searchData.results && searchData.results.length > 0) {
        searchSection.classList.remove("hidden");
        searchKeywordText.textContent = searchData.keyword || "";
        searchResultsList.innerHTML = "";

        searchData.results.forEach(item => {
            const el = document.createElement("div");
            el.className = "search-item";
            el.innerHTML = `
                <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                <p class="search-snippet">${item.snippet}</p>
            `;
            searchResultsList.appendChild(el);
        });
    } else {
        searchSection.classList.add("hidden");
    }
}

// 9. 네트워크 실패 시 안전 대체 렌더링
function renderFallbackResults(mbti, scores) {
    const fallbackData = {
        disclaimer: "MBTI는 성향을 참고하기 위한 가벼운 지표입니다.",
        character_title: `${mbti} 맞춤 탐험가`,
        summary: `${mbti} 성향의 당신에게 편안함과 활력을 선물해 줄 추천 활동입니다.`,
        activities: [
            {
                name: "조용한 분위기의 북카페에서 여유 즐기기",
                reason: "바쁜 일상에서 벗어나 혼자만의 생각을 정리할 수 있습니다.",
                tip: "창가 좌석이나 편안한 소파가 있는 곳을 골라보세요."
            },
            {
                name: "도심 속 산책로에서 힐링 걷기",
                reason: "신선한 공기를 마시며 기분 전환을 할 수 있습니다.",
                tip: "좋아하는 플레이리스트를 들으며 걸어보세요."
            },
            {
                name: "손으로 만드는 원데이 클래스 체험",
                reason: "창의적인 몰입을 통해 새로운 성취감을 느낄 수 있습니다.",
                tip: "가죽공예나 도예 등 부담 없는 클래스를 추천합니다."
            }
        ]
    };
    renderResults(mbti, scores, fallbackData, null);
}

// 10. 결과 텍스트 복사 기능
function copyResultText() {
    const mbti = document.getElementById("res-mbti").textContent;
    const character = document.getElementById("res-character").textContent;
    const summary = document.getElementById("res-summary").textContent;

    const copyString = `[AI MBTI 성향 & 활동 큐레이션]\n유형: ${mbti} (${character})\n요약: ${summary}\n\n* 본 결과는 참고용 가이드입니다.`;

    navigator.clipboard.writeText(copyString).then(() => {
        alert("결과가 클립보드에 복사되었습니다! 원하는 곳에 붙여넣어 보세요.");
    }).catch(() => {
        alert("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
    });
}

// 11. 테스트 다시하기 함수
function restartQuiz() {
    resultSection.classList.add("hidden");
    introSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

// 16가지 MBTI 맞춤형 캐릭터 & 추천 취미 & 힐링 팁 데이터베이스
const mbtiCharacters = {
    INTJ: {
        avatar: "🦉",
        name: "전략가 올빼미",
        slogan: "깊은 숲속의 지혜로운 설계자",
        tags: ["#치밀한전략", "#지적호기심", "#독립적"],
        hobbies: ["♟️ 전략 보드게임/체스", "📚 심층 독서 & 지식 아카이빙", "💻 코딩 및 개인 프로젝트", "🎧 잔잔한 기악곡 감상"],
        lifestyleTips: [
            "하루 30분은 아무에게도 방해받지 않는 온전한 혼자만의 사색 시간 갖기",
            "복잡한 생각은 마인드맵이나 노트에 구조화하여 시각적으로 정리하기",
            "완벽한 결과만큼이나 그동안 열심히 달려온 나의 과정도 칭찬해주기"
        ]
    },
    INTP: {
        avatar: "🐱",
        name: "호기심 철학 고양이",
        slogan: "자유로운 사색과 탐구의 마법사",
        tags: ["#논리분석", "#독창적아이디어", "#자유영혼"],
        hobbies: ["🔬 방탈출/추리 퍼즐", "🔭 천체/과학 다큐 탐색", "🎸 악기/소프트웨어 독학", "🎮 전략 시뮬레이션 게임"],
        lifestyleTips: [
            "번뜩이는 아이디어가 스칠 때마다 즉시 메모장에 간단히 기록해두기",
            "머릿속이 복잡해질 땐 가벼운 도심 산책으로 뇌에 신선한 공기 불어넣기",
            "관심 있는 새로운 학문이나 지식을 부담 없이 호기심 가는 대로 탐구하기"
        ]
    },
    ENTJ: {
        avatar: "🦁",
        name: "당당한 비전 사자",
        slogan: "목표를 향해 거침없이 나아가는 리더",
        tags: ["#강력한추진력", "#전략적리더", "#결단력"],
        hobbies: ["🏃 크로스핏/마라톤", "📈 자기계발 & 재테크 스터디", "🏕️ 계획적인 백패킹/트레킹", "👔 네트워킹 모임"],
        lifestyleTips: [
            "주간 목표를 성취한 주말에는 나 자신만을 위한 확실한 보상 주기",
            "가끔은 빡빡한 일정표를 내려놓고 계획 없는 여유를 의도적으로 즐기기",
            "함께 땀 흘리며 운동하거나 성취감을 느낄 수 있는 활동으로 스트레스 풀기"
        ]
    },
    ENTP: {
        avatar: "🦊",
        name: "기발한 발명가 여우",
        slogan: "세상을 흔드는 반짝이는 아이디어뱅크",
        tags: ["#유쾌한도전", "#창의적스파크", "#변화추구"],
        hobbies: ["🎙️ 팟캐스트/토론 클럽", "🎮 독창적인 인디게임", "✈️ 즉흥 여행 & 새로운 동네 탐험", "🍳 이색 퓨전 요리"],
        lifestyleTips: [
            "호기심이 생기는 새로운 분야의 원데이 클래스 가볍게 체험해보기",
            "다양한 사람들과 자유롭게 의견을 주고받으며 지적 자극 나누기",
            "수많은 아이디어 중 가장 설레는 한 가지를 골라 끝까지 완성해보기"
        ]
    },
    INFJ: {
        avatar: "🦌",
        name: "신비로운 숲 사슴",
        slogan: "내면의 평화와 통찰을 그리는 조언자",
        tags: ["#깊은통찰", "#따뜻한이상", "#진정성"],
        hobbies: ["✍️ 감정 일기 & 에세이 집필", "🧘 명상과 아로마 요가", "🏛️ 고즈넉한 미술관 투어", "🍵 다도 & 잎차 즐기기"],
        lifestyleTips: [
            "타인의 감정과 나의 감정 사이에 건강한 심리적 경계선 세우기",
            "복잡한 세상의 소음을 끄고 좋아하는 음악과 함께 차 한 잔 마시기",
            "내면의 깊은 생각과 소망을 글이나 그림으로 솔직하게 표현해보기"
        ]
    },
    INFP: {
        avatar: "🐰",
        name: "꿈꾸는 감성 토끼",
        slogan: "동화 같은 상상과 온기를 품은 몽상가",
        tags: ["#감성에너지", "#낭만주의", "#따스한위로"],
        hobbies: ["🎨 수채화/아이패드 드로잉", "📖 감성 시집 & 독립서점 탐방", "🪴 반려식물 돌보기", "📷 아날로그 필름 사진"],
        lifestyleTips: [
            "나만의 아늑한 취향 플레이리스트를 만들고 멍때리며 힐링하기",
            "마음이 지칠 때는 나만의 따스한 비밀 아지트(카페, 공원) 찾아가기",
            "자신을 타인과 비교하지 말고 나만의 고유한 빛깔을 사랑해주기"
        ]
    },
    ENFJ: {
        avatar: "🐬",
        name: "빛나는 멘토 돌고래",
        slogan: "모두의 마음을 잇는 따뜻한 소통가",
        tags: ["#선한영향력", "#공감과격려", "#화합의빛"],
        hobbies: ["🤝 봉사활동 및 소모임 기획", "🎭 연극/뮤지컬 관람", "🍰 소중한 사람들과 브런치", "📚 심리학/인문학 독서"],
        lifestyleTips: [
            "주변 사람들을 챙기느라 지친 나 자신을 위한 '온전한 셀프 케어' 갖기",
            "고마운 지인들에게 따뜻한 응원의 손편지나 메시지 보내기",
            "모든 사람을 만족시키려 애쓰지 말고 나의 한계도 인정하기"
        ]
    },
    ENFP: {
        avatar: "🐶",
        name: "활기찬 비타민 강아지",
        slogan: "세상을 밝히는 열정적인 행복 전도사",
        tags: ["#무한긍정", "#넘치는열정", "#친화력만렙"],
        hobbies: ["📸 감성 출사 & 브이로그", "🎪 페스티벌 & 플리마켓 투어", "🧵 터프팅/가죽 DIY 공예", "💃 신나는 댄스/피트니스"],
        lifestyleTips: [
            "분위기 좋은 신상 카페나 새로운 핫플레이스 찾아 기분 전환하기",
            "계절이 바뀔 때마다 방 안의 작은 소품이나 조명으로 인테리어 바꿔보기",
            "에너지가 통하는 밝은 친구들과 웃음 가득한 이야기 나누기"
        ]
    },
    ISTJ: {
        avatar: "🐢",
        name: "신뢰의 수호 거북이",
        slogan: "약속과 원칙을 단단히 지키는 기둥",
        tags: ["#묵묵한성실", "#믿음직한책임", "#정확함"],
        hobbies: ["🧩 정교한 나노블록/프라모델", "🚶 정비된 숲길 둘레길 걷기", "📑 가계부 & 플래너 정리", "📚 역사/다큐멘터리 정주행"],
        lifestyleTips: [
            "하루 일과를 마친 뒤 책상과 주변 환경을 깔끔하게 정돈하기",
            "체크리스트를 하나씩 완료하며 일상의 단단한 성취감 맛보기",
            "가끔은 예상치 못한 변수가 생기더라도 여유 있게 심호흡하기"
        ]
    },
    ISFJ: {
        avatar: "🦔",
        name: "다정한 수호 고슴도치",
        slogan: "소중한 사람들을 조용히 품어주는 온기",
        tags: ["#섬세한배려", "#따뜻한헌신", "#마음지킴이"],
        hobbies: ["🧶 뜨개질 & 프랑스 자수", "🍪 홈베이킹 쿠키 굽기", "📸 추억 앨범 & 포토북 제작", "🪴 허브 가드닝"],
        lifestyleTips: [
            "다른 사람의 부탁을 가끔은 부담 없이 부드럽게 거절하는 연습하기",
            "나만을 위한 편안한 홈스파, 족욕이나 반신욕으로 피로 풀기",
            "익숙하고 아늑한 방 안에서 좋아하는 영화나 드라마 정주행하기"
        ]
    },
    ESTJ: {
        avatar: "🦅",
        name: "유능한 지휘관 매",
        slogan: "빈틈없이 일상을 가꾸는 최고의 총괄자",
        tags: ["#완벽한체계", "#현실적해결", "#정확한실행"],
        hobbies: ["⛳ 골프/테니스/배드민턴", "📋 생산성 앱 & 루틴 관리", "🗺️ 유명 랜드마크 역사 투어", "🧗 등산 및 정상 완등"],
        lifestyleTips: [
            "정해진 시간에 땀 흘리는 규칙적인 운동 습관 지키기",
            "해결해야 할 문제를 리스트로 작성해 우선순위대로 해결하기",
            "나와 스타일이 다른 사람들의 개성과 의견도 열린 마음으로 품기"
        ]
    },
    ESFJ: {
        avatar: "🐿️",
        name: "정 많은 행복 다람쥐",
        slogan: "주변 사람들을 살뜰히 챙기는 친선대사",
        tags: ["#다정한친화력", "#분위기메이커", "#따스한마음"],
        hobbies: ["💐 원데이 플라워 클래스", "☕ 디저트 카페 투어 & 품평", "🎤 보컬/합창 모임", "🎁 선물 포장 & 파티 플래닝"],
        lifestyleTips: [
            "소중한 사람들에게 정성 가득한 안부 연락 건네기",
            "타인의 평가나 시선보다 '내 마음이 진정 편안한가'를 먼저 살피기",
            "맛있는 음식을 함께 나누어 먹으며 즐거운 시간 보내기"
        ]
    },
    ISTP: {
        avatar: "🐆",
        name: "고요한 장인 흑표범",
        slogan: "위기 속에서 침착하게 빛나는 만능 재주꾼",
        tags: ["#문제해결사", "#침착한관찰", "#실용적손재주"],
        hobbies: ["🛠️ 목공/DIY 가구 제작", "🏍️ 심야 드라이브/라이딩", "🧗 실내 클라이밍/볼더링", "🎣 조용한 낚시"],
        lifestyleTips: [
            "복잡한 사람 관계에서 벗어나 혼자 바람 쐬는 자유 시간 갖기",
            "손으로 무언가를 직접 만들고 고치는 몰입의 기쁨 느끼기",
            "불필요한 잔걱정은 털어버리고 현재 눈앞의 순간에 집중하기"
        ]
    },
    ISFP: {
        avatar: "🐨",
        name: "평화로운 예술가 코알라",
        slogan: "오감을 음미하며 삶을 예술로 빚는 자유인",
        tags: ["#여유로운감성", "#순수한자연", "#온화한매력"],
        hobbies: ["🎧 LP/어쿠스틱 음악 감상", "⛺ 숲속 글램핑 & 불멍", "🐱 반려동물과 느긋한 시간", "🎨 힐링 컬러링북"],
        lifestyleTips: [
            "날씨 좋은 날 공원 벤치나 잔디밭에 누워 평화롭게 멍때리기",
            "좋아하는 향초나 인센스를 켜두고 오감을 편안하게 이완하기",
            "계획에 얽매이지 않고 오늘 내 발길 닿는 대로 하루 보내보기"
        ]
    },
    ESTP: {
        avatar: "🐯",
        name: "에너자이저 모험 호랑이",
        slogan: "짜릿한 도전을 즐기는 타고난 개척자",
        tags: ["#짜릿한행동력", "#순발력최강", "#현실감각"],
        hobbies: ["🏄 서핑/웨이크보드", "🏎️ 카트 레이싱/익스트림 스포츠", "🍔 맛집 핫플레이스 도장깨기", "🛹 스케이트보드/자전거"],
        lifestyleTips: [
            "심장을 뛰게 만드는 활동적인 야외 레저로 스트레스 날리기",
            "즉흥적인 계획으로 친구들과 번개 모임 즐기기",
            "중요한 결정을 내릴 땐 행동하기 전 3초만 호흡 가다듬기"
        ]
    },
    ESFP: {
        avatar: "🦩",
        name: "축제의 주인공 홍학",
        slogan: "매 순간을 반짝이는 무대로 만드는 연예인",
        tags: ["#인간비타민", "#즉흥의즐거움", "#매력만점"],
        hobbies: ["🛍️ 트렌디 패션 쇼핑", "🎡 테마파크 & 놀이공원", "🎤 코인노래방 & K-POP 댄스", "📸 인생네컷 & 스튜디오 촬영"],
        lifestyleTips: [
            "신나는 음악을 크게 틀고 좋아하는 옷을 입으며 자신감 채우기",
            "주변 사람들에게 밝은 미소와 에너지를 전파하기",
            "오늘 하루 나에게 일어난 재미있고 행복한 일 세 가지 떠올리기"
        ]
    }
};

// 8. 결과 화면 렌더링
function renderResults(mbti, scores, aiData, searchData) {
    document.getElementById("res-mbti").textContent = mbti;
    const resDiscEl = document.getElementById("res-disclaimer");
    if (resDiscEl) resDiscEl.textContent = aiData.disclaimer || "MBTI는 참고용 지표입니다";

    // MBTI 맞춤형 캐릭터 데이터 바인딩
    const char = mbtiCharacters[mbti] || {
        avatar: "🌿",
        name: `${mbti} 라이프스타일러`,
        slogan: "자신만의 멋진 방식으로 일상을 가꾸는 탐험가",
        tags: ["#나다운선택", "#성향맞춤", "#라이프스타일"]
    };

    document.getElementById("res-summary").textContent = aiData.summary || "";
    const resCharEl = document.getElementById("res-character");
    if (resCharEl) resCharEl.textContent = char.name;

    document.getElementById("char-avatar").textContent = char.avatar;
    document.getElementById("char-name").textContent = char.name;
    document.getElementById("char-slogan").textContent = `"${char.slogan}"`;

    const charTagsContainer = document.getElementById("char-tags");
    charTagsContainer.innerHTML = "";
    char.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "char-tag";
        span.textContent = tag;
        charTagsContainer.appendChild(span);
    });

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

    // 4대 지표 상세 요약표(Table) 데이터 채우기
    document.getElementById("tbl-score-e").textContent = `${scores.E}%`;
    document.getElementById("tbl-score-i").textContent = `${scores.I}%`;
    document.getElementById("tbl-dominant-ei").textContent = scores.E >= scores.I ? `외향형 (E, ${scores.E}%)` : `내향형 (I, ${scores.I}%)`;

    document.getElementById("tbl-score-s").textContent = `${scores.S}%`;
    document.getElementById("tbl-score-n").textContent = `${scores.N}%`;
    document.getElementById("tbl-dominant-sn").textContent = scores.S >= scores.N ? `감각형 (S, ${scores.S}%)` : `직관형 (N, ${scores.N}%)`;

    document.getElementById("tbl-score-t").textContent = `${scores.T}%`;
    document.getElementById("tbl-score-f").textContent = `${scores.F}%`;
    document.getElementById("tbl-dominant-tf").textContent = scores.T >= scores.F ? `사고형 (T, ${scores.T}%)` : `감정형 (F, ${scores.F}%)`;

    document.getElementById("tbl-score-j").textContent = `${scores.J}%`;
    document.getElementById("tbl-score-p").textContent = `${scores.P}%`;
    document.getElementById("tbl-dominant-jp").textContent = scores.J >= scores.P ? `판단형 (J, ${scores.J}%)` : `인식형 (P, ${scores.P}%)`;

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

    // 성향 맞춤 추천 취미 칩 렌더링
    const hobbiesList = document.getElementById("hobbies-list");
    if (hobbiesList) {
        hobbiesList.innerHTML = "";
        const hobbies = char.hobbies || ["독서", "산책", "음악 감상"];
        hobbies.forEach(h => {
            const chip = document.createElement("div");
            chip.className = "hobby-chip fade-in";
            chip.textContent = h;
            hobbiesList.appendChild(chip);
        });
    }

    // 에너지 충전을 위해 하면 좋은 것 (라이프스타일 팁) 렌더링
    const lifestyleList = document.getElementById("lifestyle-list");
    if (lifestyleList) {
        lifestyleList.innerHTML = "";
        const tips = char.lifestyleTips || ["충분한 휴식 취하기", "가벼운 산책하기", "나를 위한 시간 갖기"];
        tips.forEach(t => {
            const li = document.createElement("li");
            li.className = "lifestyle-item fade-in";
            li.innerHTML = `<span class="lifestyle-icon">🍀</span><span class="lifestyle-text">${t}</span>`;
            lifestyleList.appendChild(li);
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
    const charAvatar = document.getElementById("char-avatar").textContent;
    const charName = document.getElementById("char-name").textContent;
    const charSlogan = document.getElementById("char-slogan").textContent;
    const summary = document.getElementById("res-summary").textContent;
    const scoreE = document.getElementById("tbl-score-e").textContent;
    const scoreI = document.getElementById("tbl-score-i").textContent;
    const scoreS = document.getElementById("tbl-score-s").textContent;
    const scoreN = document.getElementById("tbl-score-n").textContent;
    const scoreT = document.getElementById("tbl-score-t").textContent;
    const scoreF = document.getElementById("tbl-score-f").textContent;
    const scoreJ = document.getElementById("tbl-score-j").textContent;
    const scoreP = document.getElementById("tbl-score-p").textContent;

    const copyString = `[🌿 Mind & Act - AI MBTI 성향 & 활동 큐레이션]
유형: ${mbti} ${charAvatar} ${charName}
한줄평: ${charSlogan}
요약: ${summary}

📊 세부 지표 비율:
- 에너지 방향: 외향(E) ${scoreE} vs 내향(I) ${scoreI}
- 인식 방식: 감각(S) ${scoreS} vs 직관(N) ${scoreN}
- 판단 방식: 사고(T) ${scoreT} vs 감정(F) ${scoreF}
- 생활 양식: 판단(J) ${scoreJ} vs 인식(P) ${scoreP}

🎨 추천 취미:
${(mbtiCharacters[mbti]?.hobbies || []).join(', ')}

🍀 에너지 충전 힐링 팁:
${(mbtiCharacters[mbti]?.lifestyleTips || []).map((tip, idx) => `${idx + 1}. ${tip}`).join('\n')}

* 본 결과는 개인의 선호 경향성을 참고하기 위한 힐링 가이드입니다.`;

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

// 問題描画
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-block';

        let html = `<h2 class="level-2">${section.title}</h2>`;

        if (section.imageUrl) {
            html += `<img src="./figure_table/${section.imageUrl}" class="quiz-image">`
        }

        section.questions.forEach((q, qIdx) => {
            let qImgHtml = q.imageUrl ? `<img src="./figure_table/${q.imageUrl}" class="quiz-image">` : "";
            if (q.title) {
                html += `<h2 class="q-title level-3">${q.title}</h2>`
            }
            let parts = q.sampleAnswer.split('\n');
            let questionHtml = "";
            for(let i = 0; i < parts.length; i++) {
                questionHtml += parts[i];
                if(i < parts.length - 1) {
                    questionHtml += "<br>　";
                }
            }
            html += `
                <div class="q-item">
                    <p class="q-text level-4">${qIdx + 1}. ${q.text}</p>
                    ${qImgHtml}
                    <textarea id="user-input-${sIdx}-${qIdx}" class="level-4" placeholder="ここに解答を入力"></textarea>
                    <button class="btn-ans level-4" onclick="toggleAnswer(${sIdx}, ${qIdx})">解答例を表示 / 非表示</button>
                    <div id="answer-${sIdx}-${qIdx}" class="sample-answer-area">
                        <p class="ans-label level-4">【解答例】</p>
                        <p class="sample-answer level-4">　${questionHtml}</p>
                    </div>
                </div>`;
        });

        sectionDiv.innerHTML = html;
        container.appendChild(sectionDiv);
    });
}


// 解答の表示・非表示を切り替える
function toggleAnswer(sIdx, qIdx) {
    const ansDiv = document.getElementById(`answer-${sIdx}-${qIdx}`);
    if (ansDiv.style.display === "block") {
        ansDiv.style.display = "none";
    } else {
        ansDiv.style.display = "block";
    }
}


renderQuiz();
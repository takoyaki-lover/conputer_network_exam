// 問題描画
function renderQuiz() {
    const container = document.getElementById('quiz-container');

    quizData.forEach((section, sIdx) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-block';

        let html = `<h2 class="level-2">${section.title}</h2>`;

        if (section.imageUrl) {
            html += `<img src="./figure_table/${section.imageUrl}" class="quiz-image" alt="${section.imageUrl}">`;
        }

        section.questions.forEach((q, qIdx) => {
            let qImgHtml = "";
            if (q.imageUrl) {
                qImgHtml = `<img src="./figure_table/${q.imageUrl}" class="quiz-image" alt="${q.imageUrl}">`;
            }

            if (q.title) {
                html += `<h2 class="q-title level-3">${q.title}</h2>`;
            }

            let parts = q.sampleAnswer.split('\n');
            let questionHtml = "";
            for(let i = 0; i < parts.length; i++) {
                questionHtml += parts[i];
                if(i < parts.length - 1) {
                    questionHtml += "<br>　";
                }
            }

            let aImgHtml = "";
            if (q.ansImg) {
                aImgHtml = `<img src="./figure_table/${q.ansImg}" class="quiz-image" alt="${q.ansImg}">`;
            }

            html += `
                <div class="q-item">
                    <p class="q-text level-4">${qIdx + 1}. ${q.text}</p>
                    ${qImgHtml}
                    <textarea id="user-input-${sIdx}-${qIdx}" class="level-4" placeholder="ここに解答を入力"></textarea>
                    <button class="btn-ans level-4" onclick="toggleAnswer(${sIdx}, ${qIdx})">解答例を表示 / 非表示</button>
                    <div id="answer-${sIdx}-${qIdx}" class="sample-answer-area">
                        <p class="ans-label level-4">【解答例】</p>
                        ${aImgHtml}
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


// ================================
// 画像クリックで拡大表示（上半分）
// ================================

// 画面上半分のモーダル（半透明）
const modal = document.createElement("div");
modal.id = "image-modal";
modal.title = "クリックして閉じる"
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "50%";
modal.style.background = "rgba(0,0,0,0.5)";
modal.style.display = "none";
modal.style.zIndex = "9999";
modal.style.cursor = "pointer";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
document.body.appendChild(modal);

// 画像本体
const modalImg = document.createElement("img");
modalImg.style.maxWidth = "100%"
modalImg.style.height = "100%"
modalImg.style.objectFit = "contain";
modalImg.style.pointerEvents = "none";
modal.appendChild(modalImg);

// クリックで閉じる
modal.addEventListener("click", () => {
	modal.style.display = "none";
});

// サムネイルクリックで表示
function enableImageZoom() {
	document.querySelectorAll("img").forEach(img => {
        img.title = "クリックして拡大表示する";
		img.style.cursor = "pointer";
		img.addEventListener("click", (event) => {
			modalImg.src = img.src;
			modal.style.display = "flex"; // 表示ON
			event.stopPropagation();
		});
	});
}


renderQuiz();
enableImageZoom();

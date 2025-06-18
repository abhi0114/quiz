const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markdown Language",
      "HyperText Markup Language",
      "Hyperloop Machine Language",
      "None of the above"
    ],
    correct: "HyperText Markup Language"
  },
  {
    question: "CSS is used for?",
    options: ["Data processing", "Styling", "Database", "None"],
    correct: "Styling"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Display Object Management",
      "Digital Ordinance Model",
      "Desktop Oriented Mode"
    ],
    correct: "Document Object Model"
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const currentQ = quizData[current];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  currentQ.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="option" value="${option}"> ${option}</label>`;
    optionsEl.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const answer = selected.value;
  if (answer === quizData[current].correct) {
    score++;
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${quizData[current].correct}`;
    feedbackEl.style.color = "red";
  }

  current++;
  nextBtn.disabled = true;

  setTimeout(() => {
    if (current < quizData.length) {
      loadQuestion();
      nextBtn.disabled = false;
    } else {
      showResult();
    }
  }, 1000);
});

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}

loadQuestion();

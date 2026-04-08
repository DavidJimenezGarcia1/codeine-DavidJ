const questions = [
  {
    question: "What is codeine?",
    answers: ["A pain and cough medicine", "A vitamin", "An energy drink", "A sleeping pill"],
    correct: 0
  },
  {
    question: "What type of drug is codeine?",
    answers: ["An opioid", "A vitamin", "A steroid", "A candy"],
    correct: 0
  },
  {
    question: "What is 'lean' or 'purple drank'?",
    answers: ["Codeine syrup mixed with soda and candy", "A type of juice", "A soda brand", "An energy drink"],
    correct: 0
  },
  {
    question: "What is a side effect of codeine?",
    answers: ["Drowsiness and nausea", "Increased energy", "Better hearing", "Stronger bones"],
    correct: 0
  },
  {
    question: "Can codeine be addictive?",
    answers: ["Yes, it can be addictive", "No, it's safe", "Only for adults", "Never"],
    correct: 0
  },
  {
    question: "What happens if you take too much codeine?",
    answers: ["Your breathing can slow down dangerously", "You get stronger", "You feel happier", "Nothing bad"],
    correct: 0
  },
  {
    question: "How should you use codeine?",
    answers: ["Only as a doctor prescribes it", "As much as you want", "Share it with friends", "Only on weekends"],
    correct: 0
  },
  {
    question: "Where do some teens get codeine without a prescription?",
    answers: ["From friends or family medicine cabinets", "At school", "In stores", "From gyms"],
    correct: 0
  },
  {
    question: "What does it mean when your body builds tolerance to codeine?",
    answers: ["You need more of the drug to feel the same effect", "You never need it again", "It gets safer to use", "You become immune"],
    correct: 0
  },
  {
    question: "What should you do if someone overdoses on codeine?",
    answers: ["Call emergency services (911) right away", "Wait and see what happens", "Give them more codeine", "Let them sleep it off"],
    correct: 0
  }
];

const quizContainer = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");
const resultDisplay = document.getElementById("resultDisplay");
const studentName = document.getElementById("studentName");
const resultMessage = document.getElementById("resultMessage");

function renderQuiz() {
  quizContainer.innerHTML = questions
    .map((q, i) => `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Question ${i + 1}</h5>
          <p class="card-text">${q.question}</p>
          <div class="list-group">
            ${q.answers
              .map(
                (a, index) => `
              <label class="list-group-item d-flex align-items-center">
                <input class="form-check-input me-2" type="radio" name="q${i}" value="${index}">
                <span>${a}</span>
              </label>`
              )
              .join("")}
          </div>
        </div>
      </div>`
    )
    .join("");
}

function submitQuiz() {
  let score = 0;
  const unanswered = [];

  questions.forEach((q, i) => {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (!answer) {
      unanswered.push(i + 1);
      return;
    }
    if (parseInt(answer.value, 10) === q.correct) {
      score++;
    }
  });

  if (unanswered.length) {
    feedbackElement.innerHTML = `<div class="alert alert-warning">Please answer all questions before submitting. Missing: ${unanswered.join(", ")}</div>`;
    return;
  }

  const percentage = Math.round((score / questions.length) * 100);
  
  // Hide quiz and button
  quizContainer.style.display = "none";
  document.querySelector(".btn-lg").style.display = "none";
  feedbackElement.innerHTML = "";
  
  // Show centered result
  resultDisplay.style.display = "block";
  studentName.innerText = "Student";
  resultElement.innerText = `${score}/${questions.length}`;
  
  let message = "Great work!";
  if (percentage < 60) {
    message = "Good effort! Review the information to learn more.";
  } else if (percentage < 80) {
    message = "Good effort! Keep learning.";
  }
  
  resultMessage.innerText = message;
  resultDisplay.scrollIntoView({ behavior: "smooth", block: "center" });
}

renderQuiz();

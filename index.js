class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  // Methode qui va nous permettre de savoir si l'utilisateur à bien repondu
  isCorrect(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

// La classe Quiz prendra en compte toutes les questions du tableau
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0; // Pour connaitre la position de la question
  }
  // Methode qui va nous retourner la question sur laquelle on se trouve
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  // Methode pour le choix de l'utilisateur
  guess(answer) {
    if (this.getCurrentQuestion().isCorrect(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  // Methode pour savoir si cest finis(et bien on sait que c'est lorsque currentQuestionIndex est egal la longueur du tableau)
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  reset() {
    const parent = document.querySelector("body");
    parent.innerHTML = `
      <div class="container">
        <div id="quiz">
          <h1><span>Q</span>uiz <i class="far fa-question-circle"></i></h1>

          <h2 id="question"></h2>

          <h3 id="score"></h3>

          <h3 id="reprendre"></h3>

          <div class="choices">
            <button id="guess0" class="btn">
              <p id="choice0"></p>
            </button>

            <button id="guess1" class="btn">
              <p id="choice1"></p>
            </button>

            <button id="guess2" class="btn">
              <p id="choice2"></p>
            </button>

            <button id="guess3" class="btn">
              <p id="choice3"></p>
            </button>
          </div>

          <p id="progress"></p>

        </div>
      </div>
    `
    this.score = 0;
    this.currentQuestionIndex = 0;

  }
}

// On cree un objet qui va gerer l'affichage du Quiz
const display = {
  // function qui prend en paramettre l'id et le text de la question
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
    this.elementShown("score", `Vous avez : ${quiz.score} / ${quiz.questions.length} Points`);

  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    // Fonction pour gerer le choix de l'utilisateur
    guessHandler = (id, guess) => {
      // on ajoute un evenement qui sera adosser par tout nos quatre bouton
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp(); // On testera la reponse
      };
    };
    // Affichage choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },

  progress: function () {
    this.elementShown(
      "progress",
      `question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length} `
    );
  },

  endQuiz: function () {
    let endQuizHtml = `
      <h1>Quiz terminé</h1>
      <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length} </h3>
      <button id="again">Recommencer</button>
    `;
    this.elementShown("quiz", endQuizHtml);
    let againBtn = document.getElementById("again");
    againBtn.addEventListener("click", () => {
      quiz.reset();
      quizApp();
    })
  },
};

// On cree la logique du Quiz

const quizApp = () => {
  // Si le quiz est terminer tu fais ça
  if (quiz.hasEnded()) {
    // Ecran de fin
    display.endQuiz();
    // Sinon tu fais ça
  } else {
    // Afficher les questions les choix et la proression
    display.question();
    display.choices();
    display.progress();
  }
};

// Et enfin on cree le Quiz
let quiz = new Quiz(questions);
quizApp();

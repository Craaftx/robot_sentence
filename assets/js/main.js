import quoteDataBegin from "./data/quote_begin.js";
import quoteDataBody from "./data/quote_body.js";
import quoteDataEnd from "./data/quote_end.js";

const $quoteList = document.querySelector("#frontend-display");
const $numberList = document.querySelector("#number-list");
const $themeList = document.querySelector("#theme-list");
const $generateAction = document.querySelector("#generate-action");
const $robot = document.querySelector("#robot");
const $robotQuote = document.querySelector("#robot__quote");

const robotFeelings = ["none", "happy", "talking"];
const themeData = ["western", "azeroth"];

let quoteNumber = 0;
let quoteTheme = -1;
let quoteResult = [];
let quoteBlacklist = [];

function setRobotFeeling(value) {
  $robot.setAttribute("class", "robot " + robotFeelings[value]);
}

function setRobotSentence(sentence) {
  $robotQuote.innerText = "";
  $robotQuote.innerText = sentence;
}

function setNumber(value) {
  quoteNumber = value;
  resetActionList($numberList, value);
}

function setTheme(value) {
  quoteTheme = value - 1;
  resetActionList($themeList, value);
}

function addToBlacklist(value) {
  quoteBlacklist.push(value);
}

function getRandomPart(quoteItems) {
  return quoteItems[Math.floor(Math.random() * quoteItems.length)].value;
}

function checkInBlacklist(value) {
  return quoteBlacklist.includes(value);
}

/**
 * Remove .active class from older action and add .active to the new action selected.
 */
function resetActionList(htmlSelector, value) {
  let actionList = htmlSelector.getElementsByClassName(
    "controler__content__actions__list__button"
  );
  for (let i = 0; i < actionList.length; i++) {
    actionList[i].classList.remove("active");
  }
  actionList[value - 1].classList.add("active");
}

/**
 * Display the quotes generated in HTML and delete older ones.
 */
function displayQuote() {
  let quoteList = $quoteList;
  while (quoteList.hasChildNodes()) {
    quoteList.removeChild(quoteList.lastChild);
  }
  for (let i = 0; i < quoteResult.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.addEventListener("click", function() {
      addToBlacklist(this.innerText);
      this.style.display = "none";
    });
    let newContent = document.createTextNode(quoteResult[i]);
    newDiv.appendChild(newContent);
    quoteList.appendChild(newDiv);
  }
}

/**
 * Generate a number of citations according to the user's choices.
 */
function generateQuote() {
  if (quoteNumber == 0 || quoteTheme == -1) {
    setRobotSentence("Tu dois séléctionner des options pour continuer");
  } else {
    setRobotFeeling(1);
    setRobotSentence("Génération des phrases..");
    quoteResult = [];
    for (let i = 0; i < quoteNumber; i++) {
      do {
        let themeString = themeData[quoteTheme];
        quoteResult[i] = getRandomPart(quoteDataBegin[themeString].items) + " ";
        quoteResult[i] += getRandomPart(quoteDataBody[themeString].items) + " ";
        quoteResult[i] += getRandomPart(quoteDataEnd[themeString].items);
      } while (checkInBlacklist(quoteResult[i]));
    }
    setTimeout(function() {
      setRobotFeeling(0);
      setRobotSentence(
        "Terminé ! Montre moi les phrases fausses en cliquant dessus"
      );
      displayQuote();
    }, 1500);
  }
}

/**
 * ---- Event Listeners ----
 */
let $numbers = $numberList.getElementsByTagName("button");
for (var i = 0; i < $numbers.length; i++) {
  $numbers[i].addEventListener("click", function() {
    setNumber(this.value);
  });
}

let $themes = $themeList.getElementsByTagName("button");
for (var i = 0; i < $themes.length; i++) {
  $themes[i].addEventListener("click", function() {
    setTheme(this.value);
  });
}

$generateAction.addEventListener("click", function() {
  generateQuote();
});

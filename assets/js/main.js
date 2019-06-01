// Global vars
let quoteNumber = 0;
let quoteTheme = -1;
let quoteResult = [];

// Data for quote generation
let themeData = ['western', 'azeroth'];
let quoteData = Object.create(null);
quoteData.begin = null;
quoteData.body = null;
quoteData.end = null;
let quotePath = Object.create(null);
quotePath.begin = 'quote_begin.json';
quotePath.body = 'quote_body.json';
quotePath.end = 'quote_end.json';
let quoteBlacklist = [];

// Front End "Hooks"
let frontEnd_Display = document.getElementById("frontend-result");
let robot_Talk = document.getElementById("robot__quote");
let robot = document.getElementById("robot");

// Setup robot_Feeling
let robot_Feelings = ["none", "happy", "talking"];

function setRobotFeeling(value) {
    robot.setAttribute('class', 'robot ' + robot_Feelings[value]);
}

function setRobotSentence(sentence) {
  robot_Talk.innerText = "";
  robot_Talk.innerText = sentence;
}

// Setter for Global Vars
function setNumber(value) {
    quoteNumber = value;
    resetActionList("action-list-number", value);
}

function setTheme(value) {
    quoteTheme = value - 1;
    resetActionList("action-list-theme", value);
}

function addToBlacklist(value) {
  quoteBlacklist.push(value);
}

function checkBlacklist(value) {
  quoteBlacklist.includes(value);
}

// Control button activation when setter are used
function resetActionList(htmlSelector, value) {
    var actionList = document.getElementById(htmlSelector).getElementsByClassName('action-button');
    for (var i = 0; i < actionList.length; i++) {
        actionList[i].classList.remove("active");
    }
    actionList[value - 1].classList.add("active");
}

// Synchronous call on JSON local file
function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/assets/js/data/' + url, false);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function initData() {
  loadJSON(quotePath.begin, function(response) {
    quoteData.begin = JSON.parse(response);
  });
  loadJSON(quotePath.body, function(response) {
    quoteData.body = JSON.parse(response);
  });
  loadJSON(quotePath.end, function(response) {
    quoteData.end = JSON.parse(response);
  });
}

initData();
setRobotSentence("Salut ! Utilise les commandes à ta droite pour que je puisse t'aider..")

function getRandomPart(quoteItems) {
    return quoteItems[Math.floor(Math.random() * quoteItems.length)].value;
}

function displayQuote() {
    console.log(quoteResult);
}

function displayQuote_FrontEnd(theme) {
  var node = frontEnd_Display;  
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
  for (var i = 0; i < quoteResult.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.addEventListener('click', function(){
      addToBlacklist(this.innerText);
      this.style.display = "none";
    });
    var newContent = document.createTextNode(quoteResult[i]);
    newDiv.appendChild(newContent);
    frontEnd_Display.appendChild(newDiv);
  }
}

function generateQuote() {
  if(quoteNumber == 0 || quoteTheme == -1) {
    setRobotSentence("Tu dois séléctionner des options pour continuer");
  } else {
    var actualTheme = quoteTheme;
    var actualNumber = quoteNumber;
    setRobotFeeling(1);
    setRobotSentence("Génération des phrases..");
    quoteResult = [];
    for (var i = 0; i < actualNumber; i++) {
      do {
        themeString = themeData[actualTheme];
        quoteResult[i] = getRandomPart(eval(`quoteData.begin.${themeString}.items`)) + ' ';
        quoteResult[i] += getRandomPart(eval(`quoteData.body.${themeString}.items`)) + ' ';
        quoteResult[i] += getRandomPart(eval(`quoteData.end.${themeString}.items`));
      } while (checkBlacklist(quoteResult[i]));
    }
    setTimeout(function(){ 
      setRobotFeeling(0);
      setRobotSentence("Terminé ! Apprends moi les mauvaises phrases en cliquant dessus !");
      displayQuote_FrontEnd(actualTheme);
    }, 2000);
  }
}
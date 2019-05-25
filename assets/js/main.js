// Global vars
let quoteNumber = 0;
let quoteTheme = "none";
let quoteResult = [];

// Data for quote generation
let themeData = ['Western', 'Jeux'];
let quoteData = Object.create(null);
let quotePath = Object.create(null);
quotePath.begin = 'quote_begin.json';
quotePath.body = 'quote_body.json';
quotePath.end = 'quote_end.json';

// Front End "Hooks"
let frontEnd_Display = document.getElementById("frontend-result");
let robot_Talk = document.getElementById("robot__quote");
let robot = document.getElementById("robot");

// Setup robot_Feeling
let robot_Feelings = ["", "happy", "talking"];
function setFeeling(value) {  
  robot.setAttribute('class', 'robot ' + robot_Feelings[value]);
}

// Setter for Global Vars
function setNumber(value) {
    quoteNumber = value;
    resetActionList("action-list-number", value);
}

function setTheme(value) {
    quoteTheme = themeData[value];
    resetActionList("action-list-theme", value);
}

// Control button activation when setter are used
function resetActionList(htmlSelector, value) {
    var actionList = document.getElementById(htmlSelector).getElementsByClassName('action-button');
    for(var i= 0; i < actionList.length; i++)
    {
        actionList[i].classList.remove("active");
    }
    actionList[value - 1].classList.add("active");
}

// Get JSON
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

// Get Begin of Quote
getJSON('../assets/js/data/' + quotePath.begin,
function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    quoteData.begin = data;
  }
});

// Get Body of Quote
getJSON('../assets/js/data/' + quotePath.body,
function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    quoteData.body = data;
  }
});

// Get End of Quote
getJSON('../assets/js/data/' + quotePath.end,
function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    quoteData.end = data;
  }
});

robot_Talk.innerText = "Salut ! Utilise les commandes à ta droite pour que je puisse t'aider..";
setFeeling(0);
/* 
function generateQuote() {
  //quoteNumber
  //quoteTheme
  for (var i = 0; i < 9; i++) {
    str = str + i;
  } 
}

function displayQuote() {

}
*/
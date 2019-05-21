let sentenceNumber = 0;
let sentenceTheme = "none";

let themeData = ['Western', 'Jeux'];
let sentenceData = Object.create(null);
sentenceData.begin = 'sentences_begin.json';
sentenceData.body = 'sentences_body.json';
sentenceData.end = 'sentences_end.json';

let frontEnd_Display = document.getElementById("frontend-result");

function setNumber(value) {
    sentenceNumber = value;
    resetActionList("action-list-number", value);
}

function setTheme(value) {
    sentenceTheme = themeData[value];
    resetActionList("action-list-theme", value);
}

function resetActionList(htmlSelector, value) {
    var actionList = document.getElementById(htmlSelector).getElementsByClassName('action-button');
    for(var i= 0; i < actionList.length; i++)
    {
        actionList[i].classList.remove("active");
    }
    actionList[value - 1].classList.add("active");
}

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

getJSON('../assets/js/data/' + sentenceData.begin,
function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err + " - " + './data/'+sentenceData.begin);
  } else {
    console.log(data.western.items[0].value);
  }
});
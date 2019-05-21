let sentenceNumber = 0;
let sentenceTheme = "none";

let themeData = ['Western', 'Jeux'];
let sentenceData = Object.create(null);
sentenceData.begin = 'sentenceBegin.json';
sentenceData.body = 'sentenceBody.json';
sentenceData.end = 'sentenceEnd.json';

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
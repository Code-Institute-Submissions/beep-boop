//SESSION STORAGE BUTTONS
const withAudio = $("#audio-btn");
const onMute = $("#mute-btn");
const easy = $("#easy");
const normal = $("#normal");
const hard = $("#hard");

//GAME BUTTONS
const startBtn = $("#start");
const redBtn = $("#red");
const greenBtn = $("#green");
const orangeBtn = $("#orange");
const blueBtn = $("#blue");

//GAME VARIABLES
let compOrder = [];
let userOrder = [];
let userTurn = false;
let compCount = 0;
let level = 1;
let difficulty = sessionStorage.difficulty;
let intervalID;

//SET SESSION STORAGE 
withAudio.click(function(){
    sessionStorage.setItem("audio", "true");
    });
  
onMute.click(function(){
    sessionStorage.setItem("audio", "false");
    });

easy.click(function(){
    sessionStorage.setItem("difficulty", "easy");
    });

normal.click(function(){
    sessionStorage.setItem("difficulty", "normal");
    });
    
hard.click(function(){
    sessionStorage.setItem("difficulty", "hard");
    });
    


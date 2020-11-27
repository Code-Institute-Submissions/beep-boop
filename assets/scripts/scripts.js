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

//AUDIO FILES
const redAudio = new Audio("assets/audio/note-1.mp3");
const greenAudio = new Audio("assets/audio/note-2.mp3");
const orangeAudio = new Audio("assets/audio/note-3.mp3");
const blueAudio = new Audio("assets/audio/note-4.mp3");

//GAME VARIABLES
let compOrder = [];
let userOrder = [];
let userTurn = false;
let compCount = 0;
let level = 1;
let difficulty = sessionStorage.difficulty;
let audio;
let speed;
let winLimit;
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
    
hard.click(function(){;
    sessionStorage.setItem("difficulty", "hard");
    });
    
//GAME FUNCTIONS
//Start of new game
function play(){
    debugger;
    compOrder = [];
    userOrder = [];
    userTurn = false;
    compCount = 0;
    level = 1;

    if (difficulty === "easy"){
        speed = 800;
        winLimit = 15;
    } else if (difficulty === "normal"){
        speed = 600;
        winLimit = 20;
    } else if (difficulty === "hard"){
        speed = 400;
        winLimit = 25;
    } else {
        speed = 600;
        winLimit = 20;
    }

    //Get random array to decide computer order
    for (let i = 0; i < winLimit; i++){
        compOrder.push(Math.floor(Math.random()* 4 + 1));
    };

    intervalID = setInterval(compPlay, speed);
};

//Computers turn
function compPlay(){
    userTurn = false;
    userOrder = [];

    if(compCount === level){
        compCount = 0;
        clearInterval(intervalID);
        userTurn = true;
    };

    if(!userTurn){
        if(compOrder[compCount] === 1){
            avOutputs(redBtn, "btn-red", redAudio);
        };
        if(compOrder[compCount] === 2){
            avOutputs(greenBtn, "btn-red", greenAudio);
        };
        if(compOrder[compCount] === 3){
            avOutputs(orangeBtn, "btn-red", orangeAudio);
        };
        if(compOrder[compCount] === 4){
            avOutputs(blueBtn, "btn-red", blueAudio);
        };
        compCount++;
    };
};

function avOutputs(btnVar, btnColorString , audioSample){
    btnVar.removeClass(btnColorString).addClass(btnColorString + "-active");
    setTimeout(function(){
        btnVar.removeClass(btnColorString + "-active").addClass(btnColorString);
    }, 200);

    if(sessionStorage.audio === "true"){
        audioSample.play();
    };

};
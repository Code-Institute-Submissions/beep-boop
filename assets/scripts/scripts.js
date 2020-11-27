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
let levelDisplay = $("#level");

//USER CLICK HANDLERS
//Set session storage 
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

//Game button handlers
startBtn.click(startGame);
redBtn.click(red);
greenBtn.click(green);
orangeBtn.click(orange);
blueBtn.click(blue);

    
//GAME FUNCTIONS
//Start of new game
function startGame(){
    levelDisplay.text("LEVEL : 1");
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
        speed = 500;
        winLimit = 25;
    } else {
        speed = 600;
        winLimit = 20;
    };

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
            avOutputs(greenBtn, "btn-green", greenAudio);
        };
        if(compOrder[compCount] === 3){
            avOutputs(orangeBtn, "btn-orange", orangeAudio);
        };
        if(compOrder[compCount] === 4){
            avOutputs(blueBtn, "btn-blue", blueAudio);
        };
        compCount++;
    };
};

//Trigger appropriate CSS classes and audio files
function avOutputs(btnVar, btnColorString , audioSample){
    btnVar.removeClass(btnColorString).addClass(btnColorString + "-active");
    setTimeout(function(){
        btnVar.removeClass(btnColorString + "-active").addClass(btnColorString);
    }, 200);

    if(sessionStorage.audio === "true"){
        audioSample.play();
    };

};

//Trigger AV and push number to userOrder array
function red(){
    if(userTurn === true){
    userOrder.push(1);
    avOutputs(redBtn, "btn-red", redAudio);
    checkOrder();
    };
};

function green(){
    if(userTurn === true){
    userOrder.push(2);
    avOutputs(greenBtn, "btn-green", greenAudio);
    checkOrder();
    };
};

function orange(){
    if(userTurn === true){
    userOrder.push(3);
    avOutputs(orangeBtn, "btn-orange", orangeAudio);
    checkOrder();
    };
};

function blue(){
    if(userTurn === true){
    userOrder.push(4);
    avOutputs(blueBtn, "btn-blue", blueAudio);
    checkOrder();
    };
};

function checkOrder(){
    if(userOrder.length === level){
        userTurn = false;

        if(userOrder[level - 1] === compOrder[level - 1] && level < winLimit){
            userTurn = false;
            level++;
            levelDisplay.text(`LEVEL : ${level}`)
            intervalID = setInterval(compPlay, speed);
        }else if(userOrder[level - 1] === compOrder[level - 1] && level === winLimit){
            winner();
        }else{
            loser();
        };

        };
    };

let winner = () => {
    console.log("WIN")
}

let loser = () => {
    console.log("LOSE")
}


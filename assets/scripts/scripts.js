/* SESSION STORAGE BUTTONS */
const withAudio = $("#audio-btn");
const onMute = $("#mute-btn");
const easy = $("#easy");
const normal = $("#normal");
const hard = $("#hard");

/* GAME BUTTONS */
const startBtn = $("#start");
const redBtn = $("#red");
const greenBtn = $("#green");
const orangeBtn = $("#orange");
const blueBtn = $("#blue");

/* AUDIO FILES */
const redAudio = new Audio("assets/audio/note-1.mp3");
const greenAudio = new Audio("assets/audio/note-2.mp3");
const orangeAudio = new Audio("assets/audio/note-3.mp3");
const blueAudio = new Audio("assets/audio/note-4.mp3");
const gameWinJingle = new Audio("assets/audio/success.mp3");
const gameFailJingle = new Audio("assets/audio/fail.mp3");

/* GAME VARIABLES */
let compOrder = [];
let userOrder = [];
let userTurn = false;
let compCount = 0;
let userCount = 0;
let level = 1;
let difficulty = sessionStorage.difficulty;
let speed;
let winLimit;
let intervalID;
let levelDisplay = $("#level");
let startGameSafe = true;
let blockButtons = false;

/* USER CLICK HANDLERS
Set session storage */ 
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

/* Game button click handlers */
startBtn.click(checkFirstGame);
redBtn.click(red);
greenBtn.click(green);
orangeBtn.click(orange);
blueBtn.click(blue);
   
/* GAME FUNCTIONS
Start of new game */
/* If the winGame or loseGame function is running, wait until it has finished before starting new game */
function checkFirstGame(){
    if (startGameSafe === true){
        startGame();
    } else {
        levelDisplay.text("Please Wait");
    }
}
function startGame(){
    levelDisplay.text("LEVEL : 1");
    startGameSafe = false;
    compOrder = [];
    userOrder = [];
    blockButtons = true;
    userTurn = false;
    compCount = 0;
    userCount = 0;
    level = 1;
    switch (difficulty){ 
        case "easy":
            speed = 800;
            winLimit = 15;
            break;
        case "hard":
            speed = 500;
            winLimit = 2;
            break;
        case "normal":
        default:
            speed = 600;
            winLimit = 20;
    }
    /* Get random array of numbers between 1 - 4 to decide computer order. The length of the array is set by the winLimit 
    variable assigned in the switch statement above. */
    for (let i = 0; i < winLimit; i++){
        compOrder.push(Math.floor(Math.random()* 4 + 1));
    }
    /* Starts the game by repeatedly calling CompPlay() with interval assigned to speed variable in switch statement above. */
    intervalID = setInterval(compPlay, speed);
}

/* COMPUTER TURN */
function compPlay(){
    /* Prevent user clicking game buttons */
    userTurn = false;
    /* If the game has flashed and beeped the same number of times as the current level, reset the compCount variable, stop
    the setInterval method and set userTurn to true to allow the user the click on the game buttons. */ 
    if(compCount === level){
        compCount = 0;
        levelDisplay.text(`LEVEL : ${level}`);
        clearInterval(intervalID);
        userTurn = true;
        startGameSafe = true;
    }
    /* Check the compOrder array at the index of the compCount value and 
    call the associated avOutputs function. */
    if(!userTurn){
        if(compOrder[compCount] === 1){
            avOutputs(redBtn, "btn-red", redAudio);
        }
        if(compOrder[compCount] === 2){
            avOutputs(greenBtn, "btn-green", greenAudio);
        }
        if(compOrder[compCount] === 3){
            avOutputs(orangeBtn, "btn-orange", orangeAudio);
        }
        if(compOrder[compCount] === 4){
            avOutputs(blueBtn, "btn-blue", blueAudio);
        }
        /* Increase compCount variable by one in order to iterate through the compOrder array */
        compCount++;
    }
}

/* Trigger appropriate CSS classes and audio files */
function avOutputs(btnVar, btnColorString , audioSample){
    btnVar.removeClass(btnColorString).addClass(btnColorString + "-active");
    setTimeout(function(){
        btnVar.removeClass(btnColorString + "-active").addClass(btnColorString);
    }, 200);
    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        audioSample.play();
    }

}

/* Trigger AV and push number to userOrder array. These functions are triggered by a user click. */
function red(){
    if(userTurn === true){
    userOrder.push(1);
    avOutputs(redBtn, "btn-red", redAudio);
    userCount++;
    checkOrder();
    } else if (!userTurn && blockButtons){
        levelDisplay.text("Please Wait");
    }
}

function green(){
    if(userTurn === true){
    userOrder.push(2);
    avOutputs(greenBtn, "btn-green", greenAudio);
    userCount++;
    checkOrder();
    } else if (!userTurn && blockButtons){
        levelDisplay.text("Please Wait");
    }
}

function orange(){
    if(userTurn === true){
    userOrder.push(3);
    avOutputs(orangeBtn, "btn-orange", orangeAudio);
    userCount++;
    checkOrder();
    } else if (!userTurn && blockButtons){
        levelDisplay.text("Please Wait");
    }
}

function blue(){
    if(userTurn === true){
    userOrder.push(4);
    avOutputs(blueBtn, "btn-blue", blueAudio);
    userCount++;
    checkOrder();
    } else if (!userTurn && blockButtons){
        levelDisplay.text("Please Wait");
    }
}

/* Check the user input with the compOrder array to determine whether the game is lost, won or not yet finished */
function checkOrder(){
    /* If the last value that was pushed to the userOrder array is not equal to the compOrder array at the same 
    index, the user has lost and the game is over */
    if(userOrder[userCount - 1] !== compOrder[userCount - 1]){
        loseGame();
        return;
    }
    /* If the length of the userOrder array is the same value as level, it is no longer the users turn */
    if(userOrder.length === level){
        userTurn = false;
        /* If the current level is the same as the winLimit variable, the user has won. Else the level increases
        by 1 and the game continues */
        if(level === winLimit){
            winGame();
        } else {
            level++;
            userOrder = [];
            userCount = 0;
            startGameSafe = false;
            levelDisplay.text(`LEVEL : ${level}`);
            setTimeout(function(){
                intervalID = setInterval(compPlay, speed);
            }, 1000);
        }
    }
}

let winGame = () => {
    /* If true, this add a delay to a new game being started to allow time for the animation to run */
    startGameSafe = false;
    blockButtons = false;
    /* Wait 0.2 seconds before calling flashLights() to allow avOutputs() to finish */
    setTimeout(flashLights, 200);
    /* Then call flashLights every 1.6 seconds which is how long flashLights() takes to complete a
    round of animation */
    let clearFlash = setInterval(flashLights, 1600);
    userTurn = false;
    levelDisplay.text("You win!");
    /* Wait 3.1 seconds, just under 3 rounds of flashLights() before clearing interval and setting
    level display to 'Press Start'. Set startGameDelay to false to allow a new game to be started */
    setTimeout(function(){
        clearInterval(clearFlash);
        levelDisplay.text("Press start");
        startGameSafe = true;
        winModal();
    }, 3100);
    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        setTimeout(function(){
            gameWinJingle.play();
        }, 500);
    }
};
/* This functions in the same way as winGame() */
let loseGame = () => {
    startGameSafe = false;
    blockButtons = false;
    setTimeout(flashLights, 200);
    let clearFlash = setInterval(flashLights, 1600);
    userTurn = false;
    levelDisplay.text("Game over!");
    setTimeout(function(){
        clearInterval(clearFlash);
        levelDisplay.text("Press start");
        startGameSafe = true;
        loseModal();
    }, 3100);
    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        setTimeout(function(){
            gameFailJingle.play();
        }, 500);
    }
};

/* Remove normal CSS class on game buttons, and add 'lit up' CSS class. Wait .8 seconds before
reverting back to normal CSS */
function flashLights(){
    redBtn.removeClass("btn-red").addClass("btn-red" + "-active");
    setTimeout(function(){
    redBtn.removeClass("btn-red" + "-active").addClass("btn-red");
    }, 800);
    greenBtn.removeClass("btn-green").addClass("btn-green" + "-active");
    setTimeout(function(){
    greenBtn.removeClass("btn-green" + "-active").addClass("btn-green");
    }, 800);
    orangeBtn.removeClass("btn-orange").addClass("btn-orange" + "-active");
    setTimeout(function(){
    orangeBtn.removeClass("btn-orange" + "-active").addClass("btn-orange");
    }, 800);
    blueBtn.removeClass("btn-blue").addClass("btn-blue" + "-active");
    setTimeout(function(){
    blueBtn.removeClass("btn-blue" + "-active").addClass("btn-blue");
    }, 800);
}

function loseModal(){
    $("#lose-modal").modal();
    $("#lose-modal-level").text(`level ${level}`);
    if (difficulty === "normal" || difficulty === "hard") {
        $("#lose-summary").html(`<p>Would you like to <a href="difficulty.html" class="header">lower&nbspthe&nbspdifficulty?</a></p>
                                 <p>Otherwise, hit close and try again!</p>`);
    } else {
        $("#lose-summary").html(`<p>Want another attempt to beat BEEP - BOOP?</p>
                                <p>Hit close and try again!</p>`);
    }
}

function winModal(){
    $("#win-modal").modal();
    if (difficulty === "easy" || difficulty ==="normal"){
        $("#win-summary").html(`<p>Would you like to <a href="difficulty.html" class="header">raise the difficulty?</a></p>
                                <p>Otherwise, hit close and play again!</p>`);
    } else {
        $("#win-summary").html(`<p>INCREDIBLE!</p> 
                                <p>And on the hardest difficulty!</p>
                                <p>You are a BEEP - BOOP champion!</p>
                                <p>Hit close and play again!</p>`);
    }
}
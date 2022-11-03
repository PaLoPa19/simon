let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let currentIndex = 0;
let score = 0;
let highscore = 0;
let started = false;

$(document).keypress(function() {
    if (!started){
        $("#highscore").css("visibility", "visible");
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    score = level - 1;
    checkAnswer(currentIndex);
    
});

// --- FUNKTIONEN --- 

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let i = 0;
    myLoop(i);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    let buttonSound = new Audio("./sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(checkIndex) {
    if (gamePattern[checkIndex] == userClickedPattern[checkIndex]) {
        console.log("succes");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1500);
            currentIndex = -1;
        } 
        currentIndex++;
    } else {
        console.log("wrong");
        let wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over! Press a key to restart");
        if (score > highscore) {
            highscore = score;
        }
        $("#highscore").text("Highscore: " + highscore);          
        startOver();
    }
}

function myLoop(counter) {           
    setTimeout(function() { 
        let counterNew = counter;  
        $("#" + gamePattern[counterNew]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[counterNew]);  
        counterNew++;                    
        if (counterNew < gamePattern.length) {          
            myLoop(counterNew);             
        }                       
    }, 500)
} 

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}


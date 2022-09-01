let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
  // function to create the sequence

function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)    
    playSound(randomChosenColour)  
}


// funtion to know the pattern of the user clicking
$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
    
})



function playSound(name){
    new Audio("sounds/" + name + ".mp3").play()
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

// coding actual game 
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        new Audio("sounds/wrong.mp3").play()
        $("body").addClass("game-over")
        $("h3").html("The last correct sequence was "+  gamePattern.join("-"))
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 500)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}

function startOver(){
level = 0
gamePattern = []
started = false
}



var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickedPattern = [];
var started = false;
var level = 0; //initiate level to 0;

$("level-title").text("Press A key to Start");
$(document).keypress(function(){
  $("level-title").text("Level 0");
})

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});//press key to start;


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
  level ++;
  $("#level-title").text("Level "+ level);
  var random = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[random];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },600);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}

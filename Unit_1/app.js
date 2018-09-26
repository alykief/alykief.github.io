//Beginning of code
$(() => {
  //Beginning of code

userSeq = [];
compSeq = [];

const levels = 20;

var id, color, level = 0;

//Start button listener - generate comp sequence, listen for user sequence and level up
$(document).ready(function(){
  $('.level').text('0');
  $('.start').on('click', ()=>{
    level = 0;
    level++;
    compSeq = [];
    userSeq =  [];
  compSequence();
  })

  $('.button').on('click', ()=>{
    id = $(this).attr('id');
    pad = $(this).attr('class').split(' ')[1];
  userSequence();
  })
});

//Listen for userSequence
function userSequence(){
  userSeq.push(id);
  console.log(id + " " + color);
  if(!checkUserSeq()){
    error = true;
    displayError();
    userSeq = [];
    computerSequence();
    //Check sequence
  } else if (userSeq.length === compSeq.length && userSeq.length < level){
    level++;
    userSeq = [];
    error = false;
    console.log('Start game')
    computerSequence();
  }
}

//Check win state
if (userSeq.length === level){
  displayWinner();
}

//Comp generated sequence
function computerSequence(){
  console.log(level);
  $('.level').text('level');
  if(!error){
    randomNum();
  }
  if (error){
    randomNum();
  }
  var i = 0;
  var myInt = setInt(function(){
    id = compSeq[i];
    color = $('#' + id).attr('class');
    color = color.split(' ')[1];
    console.log(id + ' ' + color);
    i++;
    if (i == compSeq.length){
      clearInt(myInt);
    }
  }, 1000);
}

//Generate random number
function randomNum(){
  var random = Math.floor(Math.random() * 4);
  compSeq.push(random);
}

//Class for flash
function addClass(id, color){
  $('#' + id).addClass(color + '-active');
  setTimeout(function(){
    $('#' + id).removeClass(color + '-active');
  }, 500);
}

//User vs. computerSequence for win state
function checkUserSeq(){
  for (var i = 0; i < userSeq.length; i++){
    if (userSeq[i] != compSeq[i]){
      return false;
    }
  }
  return true;
}

//Error
function displayError() {
  console.log('Error!');
  var counter = 0;
  var myError = setInt(function(){
    $('.level').text('Err');
    counter++;
    if (counter == 3){
      $('.level').text(level);
      clearInt(myError);
        userSeq = [];
        counter = 0;
    }
  }, 500);
}

//Win state display
function displayWin(){
  var count = 0;
  var winInt = setInt(function(){
    count++;
    $('.level').text('Win');
    if (count == 5){
      clearInt(winInt);
      $('.level').text('00');
        count = 0;
    }
  }, 500);
}

//End of code
});
//End of code

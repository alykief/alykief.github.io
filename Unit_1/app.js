//Beginning of code
$(() => {
  //Beginning of code

  userSeq = [];
  compSeq = [];

  const levels = 20;

  var id, color, level = 0;

  //Start button listener - generate comp sequence, listen for user sequence and level up
  $(document).ready(function() {
    //Display 00 on level to start
    $('.level').text('00');
    //Initiate click
    $('.start').on('click', () => {
      //Level up
      level = 0;
      level++;
      compSeq = [];
      userSeq = [];
      //Initiate computer pattern (as function below)
      compSequence();
    })

    //Color pad click
    $('.button').on('click', () => {
      id = $(event.currentTarget).attr('id');
      //Initiate flash
      color = $(event.currentTarget).attr('class').split(" ")[1];
      addClass(id, color);
      //Initiate user click listener
      userSequence();
    })
  });

  //Listen for userSequence
  function userSequence() {
    $(event.target).on('click', () => {
      id = $(event.currentTarget).attr('id');
      //Initiate flash
      color = $(event.currentTarget).attr('class').split(" ")[1];
      addClass(id, color);
    })
    userSeq.push(id);
    console.log(id + " " + color);
    console.log(userSeq);
    console.log(compSeq);
    console.log(level);
    console.log(userSeq.length === compSeq.length && userSeq.length < level);
    //If statement to compare inputs
    if (userSeq.length === compSeq.length) {
      level++;
      userSeq = [];
      error = false;
      console.log('Keep playing')
      //Initiate computer pattern
      compSequence();
    } else if (checkUserSeq()) {
      error = true;
      displayError();
      userSeq = [];
      //Initiate computer pattern
      compSequence();
  }

  //Check if win
  if (userSeq.length === level) {
    displayWin();
  }
}

  // Error message
  function displayError() {
    //console.log error message
    console.log('Error!');
    var counter = 0;
    var error = setInterval(function() {
      //Display on screen
      $('.level').text('Err');
      counter++;
      if (counter == 3) {
        $('.level').text(level);
        clearInterval(error);
        userSeq = [];
        counter = 0;
      }
    }, 500);
  }

  //Comp generated sequence
  function compSequence() {
    console.log(level);
    //Display level
    $('.level').text(level);
    //Initate random number generator for pattern
    randomNum();

    for (let i = 0; i < compSeq.length; i++) {
      id = compSeq[i];
      color = $('#' + id).attr('class').split(" ")[1];
      console.log(id + ' ' + color);
      i++;
      setTimeout (()=>{
        addClass(id, color)}, 1000);
    }
};

//Generate random number
function randomNum() {
  //Get random number for pattern
  for (let i = 0; i < level; i++){
    var random = Math.floor(Math.random() * 4);
    //Push to compSeq array
    compSeq.push(random);
  }
}

//Class for flash
function addClass(id, color) {
  //Change class to -active for color change
  $('#' + id).addClass(color + '-active');
  setTimeout(function() {
    //Change back timed for flash appearance
    $('#' + id).removeClass(color + '-active');
  }, 500);
}

//User vs. computerSequence for win state
function checkUserSeq() {
  //Compare pattern pushed into arrays
  for (var i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== compSeq[i]) {
      //If not equivalent, return false
      return false;
      console.log('Loss');
    } else if (userSeq[i] === compSeq[i]) {
      return true;
      console.log('Win');
    }
  }
}

//Win state display
function displayWin() {
  var count = 0;
  var winInt = setInterval(function() {
    count++;
    //Display win on screen
    $('.level').text('Win');
    if (count == 5) {
      clearInterval(winInt);
      //To restart game and clear out progress
      $('.level').text('00');
      count = 0;
    }
  }, 500);
}

//End of code
});
//End of code

//Beginning of code
$(() => {
  //Beginning of code

  userSeq = [];
  compSeq = [];

  const levels = 10;

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

    if (userSeq.length === compSeq.length){
      checkUserSeq();
      if (checkUserSeq()===false){
        level++;
        alert('Keep playing');
        compSequence();
      } else if (checkUserSeq()===true){
        alert('Try again');
        compSequence();
      }
    }

  //Win state
  if (userSeq.length === levels) {
    // displayWin();
    alert('You are a winner!');
    $('.level').text('Win');
  }
}

  // Error - lost round state 
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
        addClass(id, color)}, 1200);
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
  setTimeout(()=>{
    //Change back timed for flash appearance
    $('#' + id).removeClass(color + '-active');
  }, 1200);
}

//User vs. computerSequence for win state
function checkUserSeq() {
  //Compare pattern pushed into arrays
  for (var i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== compSeq[i]) {
      //If not equivalent, return false
      return false;
      console.log('Loss');
      displayError();
    } else if (userSeq[i] === compSeq[i]) {
      return true;
      console.log('Win');
    }
  }
}

//End of code
});
//End of code

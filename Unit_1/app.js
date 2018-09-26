//Beginning of code
$(()=>{
//Beginning of code

var game = {
  level: 1,
  score: 0,
  active: false,
  handler: false,
  shape: '.color',
  genSeq: [],
  userSeq: [],
}

function flash(element, times, speed, .color){
  var this = that;
  if (times > 0){
    element.stop().animate(opacity: '1'), {
      duration: 50,
      complete: function(){
        element.stop().animate({opacity: '0.6'}, 200);
      }
    }
  }
  if (times > 0){
    setTimeout(function() {
      that.flash(element, times, speed, .color);
    }, speed);
    times -= 1;
  }
},

function genPattern(flash) {
  for (i = 0; i < flash; i++){
    this.genPattern.push(Math.floor(Math.random() * 4) +1);
  }
},

//End of code
});
//End of code

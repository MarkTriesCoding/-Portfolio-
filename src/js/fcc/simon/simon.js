
/////
//
/////
import '../../../scss/fcc/simon.scss';


/////
// VARIABLES
/////
const RED = "red";
const YELLOW = "yellow";
const BLUE = "blue";
const GREEN = "green";
const count = 0;
const allColors = [YELLOW, RED, BLUE, GREEN];



//////
// SIMON GAME OBJECT
/////
var simon = {
  started: false,
  sounds: {
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //yellow
    red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //blue
    green: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  }, //green
  myColors: [],
  colorPush: function(color) {
    simon.myColors.push(color);
    console.log("myColors: " + simon.myColors);
  },
  colorSequence: [],
  nextColor: function() {
    let colorNum = Math.floor(Math.random() * 4);
    simon.colorSequence.push(allColors[colorNum]);
    console.log("compColors: " + simon.colorSequence);
    document.getElementById("counter").innerHTML = simon.colorSequence.length;

    let i = 0;
    var myInt = setInterval(function() {
      let id = simon.colorSequence[i];
      console.log(id);
      simon.lightUp(id);
      //color and sound function with setTimeout
      i++;
      if (i == simon.colorSequence.length) {
        i = 0;
        clearInterval(myInt);
      }
    }, 800);

    //add set interval with addcolorflashandsound function. have if statement after where if the
  },
  reset: function() {
    simon.started = false;
    simon.colorSequence = [];
    simon.myColors = [];
    simon.stepCount = 0;
    if ($("div#play").hasClass("playActive")) {
      $("div#play").toggleClass("playActive");
    }
    if ($("div.strict").hasClass("strictActive")) {
      $("div.strict").toggleClass("strictActive");
      $("div.strict div").text("Off");
    }
    document.getElementById("counter").innerHTML = 0;
  },

  //function that runs through colors one by one
  runColors: function() {
    console.log("runcolors: " + simon.colorSequence);

    var myInt = setInterval(function() {
      for (var i = 0; i < simon.colorSequence.length; i++) {
        simon.lightUp(simon.colorSequence[i]);
      }
      if (i == simon.colorSequence.length) {
        clearInterval(myInt);
      }
    }, 500);
  },
  stepCount: 0,
  //send color function is listening
  sendColor: function(color) {
    //base case of function start
    if (!simon.colorSequence.length) {
      simon.nextColor();
      simon.counter();
    } else {
      //all other cases
      // check if user choice same as stepCount color in colorSequence
      if (color == simon.colorSequence[simon.stepCount]) {
        // when stepcount has reached max and all colors have checked out, sequence works and restart from zero. Keep sequence and add color.
        if (simon.stepCount === simon.colorSequence.length - 1) {
          console.log("Sequence works!");
          //always start from zero when reset
          if (simon.colorSequence.length == 20) {
            alert("YOU WIN!");
            simon.reset();
          }
          simon.myColors = [];
          simon.stepCount = 0;
          // if end of sequence met, add color to colorSequence
          simon.nextColor();
        } else {
          //hasn't ended, increment step Count
          //increment stepCount
          simon.stepCount++;
        }
        //go to next step
      } else {
        //if strict ON
        if ($("div.strict").hasClass("strictActive")) {
          document.getElementById("play").classList.toggle("playActive");

          simon.reset();
          alert("Game Over");
        } else {
          alert("Try Again");
          setTimeout(function() {
            let i = 0;
            var myInt = setInterval(function() {
              let id = simon.colorSequence[i];
              console.log(id);
              simon.lightUp(id);
              //color and sound function with setTimeout
              i++;
              if (i == simon.colorSequence.length) {
                i = 0;
                clearInterval(myInt);
              }
            }, 800);
          }, 1000);
        }
        //losing condition
      }
    }
  },
  lightUp: function(col) {
    //for each color (in color sequence), lights up and waits 500ms
    var elem = document.getElementById(col);
    console.log(elem);
    simon.playSound(col);
    elem.classList.toggle("active");
    setTimeout(function() {
      elem.classList.toggle("active");
    }, 500);
  },
  playSound: function(color) {
    var sound = new Audio(simon.sounds[color]);
    sound.play();
  }
};



/////
// JQUERY
/////
$("#yellow").on( async function() {
  if(simon.started){
    await simon.playSound(YELLOW);
    simon.sendColor(YELLOW);
  }
});
$("#red").on( async function() {
  if(simon.started){
    await simon.playSound(RED);
    simon.sendColor(RED);
  }
});
$("#green").on( async function() {
  if(simon.started){
    await simon.playSound(GREEN);
    simon.sendColor(GREEN);
  }
});

$("#blue").on( async function() {
  if(simon.started){
    await simon.playSound(BLUE);
    simon.sendColor(BLUE);
  }
});
$("#restart").click(function() {
  simon.reset();
});
$("#play").click(function() {
  if(!simon.started){
    simon.started = true;
  $("div#play").toggleClass("playActive");
  simon.sendColor();
;
}

});

$("div.strict").click(function() {
  if ($("div.strict div").text() == "Off") {
    $("div.strict div").text("On");
    $("div.strict").toggleClass("strictActive");
  } else {
    $("div.strict div").text("Off");
    $("div.strict").toggleClass("strictActive");
  }
});

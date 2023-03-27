//varibles
import kaboom from "kaboom"

var clue1 = false;
var clue2 = false;
var clue3 = false;
var clue4 = false;
var clue5 = false;
var clue6 = false;
var clue7 = false;
var clue8 = false;
var clue9 = false;
var clue10 = false;
var clue11 = false;
var clue12 = false;
var clue13 = false;
var clue14 = false;
var clue15 = false;
var clue16 = false;
var clue17 = false;
var clue18 = false;
var clue19 = false;
var clue20 = false;
var clue21 = false;
var clue22 = false;
var clue23 = false;
var clue24 = false;
var clue25 = false;
var suspect1 = false;
var suspect2 = false;
var suspect3 = false;
var suspect4 = false;
var suspect5 = false;
// initialize context
kaboom();

// load assets
loadSprite("bean", "sprites/bean.png")


//sounds/music loading


//actual game
scene ('Title Screen', () => {
  
  add([
    rect(width(), height()),
    color(0, 0, 0),
  ]);
  add([
    text('Squidlock Crabs: Title is yet to be determind'),
    pos(width() / 2, height() * (1 / 4)),
    scale(3 / 5),
    origin("center"),
  ]);
  add([
    text('Press "Enter" to start'),
    pos(width() / 2, height() * (2 / 4)),
    scale(1 / 2),
    origin("center"),
  ]);
  keyPress('enter', () => {
    findGuilty();
    go('Start');
  });
  scene('Start', () => {
    
  });
});

go('Title Screen');

// functions

function findGuilty(){
  //which suspect is guilty
  var guiltyID = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  if (guiltyID == 1){
    //character 1 is guilty
    suspect1 = true;
  }else if (guiltyID == 2){
    suspect2 = true;
  }else if (guiltyID == 3){
    suspect3 = true;
  }else{
    suspect4 = true;
  }
  //clue id lookup
  for (var i = 0; i <= 5; i++){
    var clueID = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    if (clueID == 1 && clue1 != true){
      //clue clue 1
       clue1 = true;
    }else if (clueID == 2 && clue2 != true){
      
       clue2 = true;
    }else if (clueID == 3 && clue3 != true){

       clue3 = true;
    }else if (clueID == 4 && clue4 != true){

       clue4 = true;
    }else if (clueID == 5 && clue5 != true){

       clue5 = true;
    }else if (clueID == 6 && clue6 != true){

       clue6 = true;
    }else if (clueID == 7 && clue7 != true){

       clue7 = true;
    }else if (clueID == 8 && clue8 != true){

       clue8 = true;
    }else if (clueID == 9 && clue9 != true){

       clue9 = true;
    }else if (clueID == 10 && clue10 != true){

       clue10 = true;
    }else if (clueID == 11 && clue11 != true){

       clue11 = true;
    }else if (clueID == 12 && clue12 != true){

       clue12 = true;
    }else if (clueID == 13 && clue13 != true){

       clue13 = true;
    }else if (clueID == 14 && clue14 != true){

       clue14 = true;
    }else if (clueID == 15 && clue15 != true){

       clue15 = true;
    }else if (clueID == 16 && clue16 != true){

       clue16 = true;
    }else if (clueID == 17 && clue17 != true){

       clue17 = true;
    }else if (clueID == 18 && clue18 != true){

       clue18 = true;
    }else if (clueID == 19 && clue19 != true){

       clue19 = true;
    }else if (clueID == 20 && clue20 != true){

       clue20 = true;
    }else if (clueID == 21 && clue21 != true){

       clue21 = true;
    }else if (clueID == 22 && clue22 != true){

       clue22 = true;
    }else if (clueID == 23 && clue23 != true){

       clue23 = true;
    }else if (clueID == 24 && clue24 != true){

       clue24 = true;
    }else if (clueID == 25 && clue25 != true){
      
       clue25 = true;
    }else{
      i--;
      console.log("duplicate item found, finding another...");
    }
  }
}


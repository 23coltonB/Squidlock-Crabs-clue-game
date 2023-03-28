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
// bounderies

// initialize context
kaboom({
  background: [36, 36, 36],
});

// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("door", "sprites/door.png");
loadSprite("butterfly", "sprites/butterfly.png");

//sounds/music loading


//actual game
scene('Title Screen', () => {

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
});

scene('Start', () => {
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);

  //sprites
  const door1 = add([
    sprite('door'),
    pos(width() * 3 / 4, height() - 50),
    area(),
    origin("center"),
    "door",
  ]);

  const player = add([
    sprite("bean"),
    pos(10, height() - 40),
    area(),
    origin('topleft'),
    body(),
  ]);
  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos(15, height() - 200),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });

  //controls
  keyDown("left", () => {
    player.move(-(200), 0);
  });

  keyDown("right", () => {
    player.move((200), 0);
  });
  player.collides('door', () => {
    keyPress('e', () => {
      destroy(player);
      go('building1');
    });
  });

  //
});

scene('building1', () => {
  add([
    rect(600, height()),
    outline(4),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  add([
    rect(20, height()),
    pos((width() / 4), 0),
    origin("center"),
    area(),
    body(),
    color(50.2, 50.2, 50.2),
  ]);

  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);
  // add the walls
  add([
    rect(width(), 20),
    pos(0, height() - 20),
    outline(4),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);
  add([
    rect(20, height()),
    pos(0, 0),
    outline(4),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);
  add([
    rect(20, height()),
    pos(width() - 20, 0),
    outline(4),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);

  const door1 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 2 / 4) + 100, height() - 50),
    area(),
    origin('topleft'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos(15, height() - 200),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });

  //controls
  keyDown("left", () => {
    player.move(-(200), 0);
  });

  keyDown("right", () => {
    player.move((200), 0);
  });
  player.collides('door', () => {
    keyPress('e', () => {
      destroy(player);
      go('Start');
    });
  });
});

go('Title Screen');

// functions

function findGuilty() {
  //which suspect is guilty
  var guiltyID = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  if (guiltyID == 1) {
    //character 1 is guilty
    console.log("sus 1 picked");
    suspect1 = true;
  } else if (guiltyID == 2) {
    suspect2 = true;
    console.log("sus 2 picked");
  } else if (guiltyID == 3) {
    suspect3 = true;
    console.log("sus 3 picked");
  } else {
    suspect4 = true;
    console.log("sus 4 picked");
  }
  //clue id lookup
  for (var i = 1; i <= 5; i++) {
    var clueID = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    if (clueID == 1 && clue1 != true) {
      //clue clue 1
      clue1 = true;
      console.log('clue 1 picked');
    } else if (clueID == 2 && clue2 != true) {
      console.log('clue 2 picked');
      clue2 = true;
    } else if (clueID == 3 && clue3 != true) {
      console.log('clue 3 picked');
      clue3 = true;
    } else if (clueID == 4 && clue4 != true) {
      console.log('clue 4 picked');
      clue4 = true;
    } else if (clueID == 5 && clue5 != true) {
      console.log('clue 5 picked');
      clue5 = true;
    } else if (clueID == 6 && clue6 != true) {
      console.log('clue 6 picked');
      clue6 = true;
    } else if (clueID == 7 && clue7 != true) {
      console.log('clue 7 picked');
      clue7 = true;
    } else if (clueID == 8 && clue8 != true) {
      console.log('clue 8 picked');
      clue8 = true;
    } else if (clueID == 9 && clue9 != true) {
      console.log('clue 9 picked');
      clue9 = true;
    } else if (clueID == 10 && clue10 != true) {
      console.log('clue 10 picked');
      clue10 = true;
    } else if (clueID == 11 && clue11 != true) {
      console.log('clue 11 picked');
      clue11 = true;
    } else if (clueID == 12 && clue12 != true) {
      console.log('clue 12 picked');
      clue12 = true;
    } else if (clueID == 13 && clue13 != true) {
      console.log('clue 13 picked');
      clue13 = true;
    } else if (clueID == 14 && clue14 != true) {
      console.log('clue 14 picked');
      clue14 = true;
    } else if (clueID == 15 && clue15 != true) {
      console.log('clue 15 picked');
      clue15 = true;
    } else if (clueID == 16 && clue16 != true) {
      console.log('clue 16 picked');
      clue16 = true;
    } else if (clueID == 17 && clue17 != true) {
      console.log('clue 17 picked');
      clue17 = true;
    } else if (clueID == 18 && clue18 != true) {
      console.log('clue 18 picked');
      clue18 = true;
    } else if (clueID == 19 && clue19 != true) {
      console.log('clue 19 picked');
      clue19 = true;
    } else if (clueID == 20 && clue20 != true) {
      console.log('clue 20 picked');
      clue20 = true;
    } else if (clueID == 21 && clue21 != true) {
      console.log('clue 21 picked');
      clue21 = true;
    } else if (clueID == 22 && clue22 != true) {
      console.log('clue 22 picked');
      clue22 = true;
    } else if (clueID == 23 && clue23 != true) {
      console.log('clue 23 picked');
      clue23 = true;
    } else if (clueID == 24 && clue24 != true) {
      console.log('clue 24 picked');
      clue24 = true;
    } else if (clueID == 25 && clue25 != true) {
      console.log('clue 25 picked');
      clue25 = true;
    } else {
      i--;
      console.log("duplicate item found, finding another...");
    }
  }
}


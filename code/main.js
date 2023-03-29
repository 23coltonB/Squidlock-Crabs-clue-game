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
var doorOpen1 = false;
var doorOpen2 = false;
var doorOpen3 = false;
var doorOpen4 = false;
var start2Street = false;
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

  //boarders

  // add the walls
  //left
  add([
    rect(20, height()),
    pos(0, 0 - 22),
    area(),
    solid(),
    color(36, 36, 36),
  ]);
  //right


  //sprites
  const door1 = add([
    sprite('door'),
    pos(width() * 3 / 4, height() - 50),
    area(),
    origin("center"),
    "door1",
  ]);

  const door2 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door2",
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

  // move player and Clambert if door is open
  player.action(() => {
    if (doorOpen1 == true) {
      player.pos = vec2(width() * 3 / 4, height() - 50);
      clambert.pos = vec2(width() * 3 / 4, height() - 50);
      doorOpen1 = false;
    } else if (doorOpen2 == true) {
      player.pos = vec2(width() * 2 / 4, height() - 50);
      clambert.pos = vec2(width() * 2 / 4, height() - 50);
      doorOpen2 = false;
    }else if (start2Street == true) {
  player.pos = vec2(width() - 80, height() - 75);
  clambert.pos = vec2(width() - 80, height() - 75);
  start2Street = true;
}

    if (player.pos.x >= width()) {
      go('Start2');
      start2Street = true;
    }
  });

  //controls
  keyDown("left", () => {
    player.move(-(200), 0);
  });

  keyDown("right", () => {
    player.move((200), 0);
  });
  player.collides("door1", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen1 = true; // set doorOpen1 to true
      go('building1');
    });
  });

  player.collides("door2", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen2 = true; // set doorOpen2 to true
      go('building2');
    });
  });

  //
});

scene('Start2', () => {
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);

  //boarders

  // add the walls
  //right
  add([
    rect(20, height()),
    origin('botright'),
    pos(width(), height() - 20),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //sprites
  const door3 = add([
    sprite('door'),
    pos(width() * 1 / 4, height() - 50),
    area(),
    origin("center"),
    "door3",
  ]);

  const door4 = add([
    sprite('door'),
    pos(width() * 7 / 8, height() - 50),
    area(),
    origin("center"),
    "door4",
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

  // move player and Clambert if door is open
  player.action(() => {
    if (doorOpen3 == true) {
      player.pos = vec2(width() * 1 / 4, height() - 50);
      clambert.pos = vec2(width() * 1 / 4, height() - 50);
      doorOpen3 = false;
    } else if (doorOpen4 == true) {
      player.pos = vec2(width() * 7 / 8, height() - 50);
      clambert.pos = vec2(width() * 7 / 8, height() - 50);
      doorOpen4 = false;
    }

    if (player.pos.x <= 0) {
      go('Start');
      player.pos = vec2(width(), height() - 50);
      clambert.pos = vec2(width(), height() - 50);
    }
  });

  //controls
  keyDown("left", () => {
    player.move(-(200), 0);
  });

  keyDown("right", () => {
    player.move((200), 0);
  });
  player.collides("door3", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen3 = true; // set doorOpen1 to true
      go('building3');
    });
  });

  player.collides("door4", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen4 = true; // set doorOpen2 to true
      go('building4');
    });
  });

});

scene('building1', () => {
  add([
    rect(600, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) + 60, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4) - 90, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //floor
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);


  const door1 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door1",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 2 / 4), height() - 50),
    area(),
    origin('topleft'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos((width() * 2 / 4), height() - 50),
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
  player.collides("door1", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen1 = true; // set doorOpen1 to true
      go('Start');
    });
  });

});

scene('building2', () => {
  add([
    rect(600, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(100, 100, 50),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) + 60, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4) - 90, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //floor
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);

  const door2 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door2",
  ]);

  const player = add([
    sprite("bean"),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin('topleft'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos(width() * 2 / 4, height() - 50),
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
  player.collides('door2', () => {
    keyPress('e', () => {
      doorOpen2 = true;
      destroy(player);
      go('Start');
    });
  });
  //
});

scene('building3', () => {
  add([
    rect(600, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(255, 0, 0),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) + 60, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4) - 90, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //floor
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);


  const door3 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door3",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 2 / 4), height() - 50),
    area(),
    origin('topleft'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos((width() * 2 / 4), height() - 50),
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
  player.collides("door3", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen3 = true; // set doorOpen3 to true
      go('Start2');
    });
  });


});

scene('building4', () => {
  add([
    rect(600, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(0, 0, 255),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) + 60, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4) - 90, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //floor
  add([
    rect(width(), 20),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(50.2, 50.2, 50.2),
  ]);


  const door4 = add([
    sprite('door'),
    pos(width() * 2 / 4, height() - 50),
    area(),
    origin("center"),
    "door4",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 2 / 4), height() - 50),
    area(),
    origin('topleft'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos((width() * 2 / 4), height() - 50),
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
  player.collides("door4", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen4 = true; // set doorOpen1 to true
      go('Start2');
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


import kaboom from "kaboom"

//global varibles
var clues = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var suspect = [false, false, false, false];
var doorOpen1 = false;
var doorOpen2 = false;
var doorOpen3 = false;
var doorOpen4 = false;
var flowerShopOpen = false;
var abandondDoor = false;
var insideAlley = false;
var start2Street = false;
var start3Street = false;
var policeStationOpen = false;
var talk = 0;
var isInDialoge = false;
let npcInBuilding = ['', '', '', ''];
//furniture things
var furniture1 = [false, false, false, false, false, false, false, false, false, false];
var furniture2 = [false, false, false, false, false, false, false, false, false, false];
var furniture3 = [false, false, false, false, false, false, false, false, false, false];
var furniture4 = [false, false, false, false, false, false, false, false, false, false];
var spawned = [false, false, false, false, false, false, false, false, false, false];
var spawnedLocation = [0, 0, 0];
var spawnedLocation1 = [0, 0, 0];
var spawnedLocation2 = [0, 0, 0];
var spawnedLocation3 = [0, 0, 0];
// inventory
var inventory = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'];


// initialize context
kaboom({
  background: [36, 36, 36],
});

// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("door", "sprites/door.png");
loadSprite("butterfly", "sprites/butterfly.png");
loadSprite("cut", "sprites/cut.png");

//suspect
loadSprite("bag", "sprites/bag.png");
loadSprite("ghosty", "sprites/ghosty.png");
loadSprite("brock", "sprites/brock.png");
loadSprite("bobo", "sprites/bobo.png");

//other NPC
loadSprite("onion", "sprites/onion.png");
loadSprite("gigagantrum", "sprites/gigagantrum.png");

//furniture sprites
loadSprite("apple", "sprites/apple.png");
loadSprite("meat", "sprites/meat.png");
loadSprite("lemon", "sprites/lemon.png");
loadSprite("boom", "sprites/boom.png");
loadSprite("heart", "sprites/heart.png");
loadSprite("egg_crack", "sprites/egg_crack.png");
loadSprite("egg", "sprites/egg.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("circle", "sprites/circle.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("moon", "sprites/moon.png");
loadSprite("mushroom", "sprites/mushroom.png");
loadSprite("lemon", "sprites/lemon.png");
//sounds/music loading


//actual game
scene('Title Screen', () => {

  add([
    rect(width(), height()),
    color(0, 0, 0),
  ]);

  add([
    text('Tentacles and Treachery: A Whodunit Under the Sea'),
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

  //sprites
  //npc initialization
  for (var i = 0; i <= 3; i++) {
    addRandomNPCToScene(-1000, -1000, i);
  }
  //furniture initialization
  if (furniture1[0] == false && furniture1[1] == false && furniture1[2] == false && furniture1[3] == false && furniture1[4] == false && furniture1[5] == false && furniture1[6] == false && furniture1[7] == false && furniture1[8] == false && furniture1[9] == false) {
    randomEnviornment(furniture1, spawnedLocation);
    randomEnviornment(furniture2, spawnedLocation1);
    randomEnviornment(furniture3, spawnedLocation2);
    randomEnviornment(furniture4, spawnedLocation3);
  }
  //everything else
  const policeDoor = add([
    sprite('door'),
    pos(50, height() - 50),
    area(),
    origin("center"),
    "pDoor",
  ]);

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
    } else if (start2Street == true) {
      player.pos = vec2(width() - 50, height() - 50);
      clambert.pos = vec2(width() - 50, height() - 50);
      start2Street = false; // add this line to set start2Street to false
    }

    if (player.pos.x >= width()) {
      start2Street = true;
      go('Start2');
    }
  });

  //controls
  keyDown("left", () => {
    player.move(-(300), 0);
  });

  keyDown("right", () => {
    player.move((300), 0);
  });
  player.collides("door1", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen1 = true; // set doorOpen1 to true
      doorOpen2 = false;
      go('building1');
    });
  });

  player.collides("door2", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen2 = true; // set doorOpen2 to true
      doorOpen1 = false;
      go('building2');
    });
  });

  player.collides("pDoor", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen2 = false; // set doorOpen2 to true
      doorOpen1 = false;
      policeStationOpen = true;
      go('policeStation');
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

  //sprites
  const door3 = add([
    sprite('door'),
    pos(width() * 1 / 8, height() - 50),
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

  const flowerShopDoor = add([
    sprite('door'),
    pos(width() * 5 / 8, height() - 50),
    area(),
    origin("center"),
    "flowerShop",
  ]);

  const alleyWay = add([
    sprite('door'),
    pos((width() * 3 / 8) + 100, height() - 50),
    area(),
    origin('center'),
    'alley',
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
      player.pos = vec2(width() * 1 / 8, height() - 50);
      clambert.pos = vec2(width() * 1 / 8, height() - 50);
      doorOpen3 = false;
    } else if (doorOpen4 == true) {
      player.pos = vec2(width() * 7 / 8, height() - 50);
      clambert.pos = vec2(width() * 7 / 8, height() - 50);
      doorOpen4 = false;
    } else if (flowerShopOpen == true) {
      player.pos = vec2(width() * 5 / 8, height() - 50);
      clambert.pos = vec2(width() * 5 / 8, height() - 50);
      flowerShopOpen = false;
    } else if (insideAlley == true) {
      player.pos = vec2((width() * 3 / 8) + 100, height() - 50);
      clambert.pos = vec2((width() * 3 / 8) + 100, height() - 50);
      insideAlley = false;
    } else if (start3Street == true) {
      player.pos = vec2(width() - 50, height() - 50);
      clambert.pos = vec2(width() - 50, height() - 50);
      start3Street = false; // add this line to set start2Street to false
    }

    if (player.pos.x <= 0) {
      go('Start');
    }
    if (player.pos.x >= width()) {
      start3Street = true;
      go('Start3');
    }
  });

  //controls
  keyDown("left", () => {
    player.move(-(300), 0);
  });

  keyDown("right", () => {
    player.move((300), 0);
  });
  player.collides("door3", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen3 = true; // set doorOpen3 to true
      doorOpen4 = false;
      flowerShopOpen = false;
      insideAlley = false;
      go('building3');
    });
  });

  player.collides("door4", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen4 = true; // set doorOpen2 to true
      doorOpen3 = false;
      flowerShopOpen = false;
      insideAlley = false;
      go('building4');
    });
  });

  player.collides("flowerShop", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen4 = false; // set doorOpen2 to true
      doorOpen3 = false;
      flowerShopOpen = true;
      insideAlley = false;
      go('flowerShopBuilding');
    });
  });
  player.collides("alley", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen3 = true; // set doorOpen3 to true
      doorOpen4 = false;
      flowerShopOpen = false;
      insideAlley = false;
      go('alleyway');
    });
  });
  //
});

scene('Start3', () => {
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

  // sprite
  const abandondD = add([
    sprite('door'),
    pos((width() * 1 / 2) - 50, height() - 50),
    area(),
    origin('center'),
    'edgeDoor',
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
    player.move(-(300), 0);
  });

  keyDown("right", () => {
    player.move((300), 0);
  });
  // player movement
  player.action(() => {
    if (abandondDoor == true) {
      player.pos = vec2((width() * 1 / 2) - 50, height() - 50);
      clambert.pos = vec2((width() * 1 / 2) - 50, height() - 50);
      abandondDoor = false;
    }
    if (player.pos.x <= 0) {
      go('Start2');
    }
  });
  //
  player.collides("edgeDoor", () => {
    keyPress('e', () => {
      destroy(player);
      abandondDoor = true;
      go('abandond_Building');
    });
  });

});

scene('abandond_Building', () => {
  add([
    rect(width() - 500, height() * 3 / 4 + (height() / 2)),
    pos((width() / 2), (height() - 50)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 8), 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos(width() * (7 / 8) - 20, 0),
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
  //sprite

  //furniture
  for (var i = 1; i < 8; i++){
    if ((i % 2) == 0){
      if (i != 2 && i != 4){
        for (var x = 0; x < 3; x++){
          const crate = add([
            sprite('moon'),
            pos((width() * (i/9)) + (x * 50) + 100, height() - 50),
            area(),
            origin('center'),
            "interactable",
          ]);
        }
      }
    }
    if (i == 2){
      const brokenDoor = add([
        sprite('mushroom'),
        origin('center'),
        pos((width() * (i/9)), height() - 50),
        area(),
      ]);
    }

    if (i == 5){
      const mirror = add([
        sprite('meat'),
        origin('center'),
        pos((width() * (i/9)), height() - 50),
        area(),
      ]);
    }
  }

  const abandondD = add([
    sprite('door'),
    pos((width() * 1 / 2) - 50, height() - 50),
    area(),
    origin('center'),
    'edgeDoor',
  ]);

  const hobo = add([
    sprite('gigagantrum'),
    pos(width() / 3, height() - 50),
    area(),
    origin('center'),
    body(),
    "npc",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 1 / 2) - 50, height() - 50),
    area(),
    origin('center'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos((width() * 1 / 2) - 50, height() - 50),
    origin('center'),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });
  //controls
  keyDown("left", () => {
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });
  player.collides("edgeDoor", () => {
    keyPress('e', () => {
      if (isInDialoge == false) {
        destroy(player);
        abandondDoor = true; // set to true, set anything else to false except the street values
        go('Start3');
      }
    });
  });
  //dialoge
  player.collides("npc", () => {
    const hoboText = ["Hello! I am Gigagantrum, the local neighborhood hobo, living in this abandond building."];
    isInDialoge = true;
    showNextDialog(hoboText);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });
  //
});

scene('alleyway', () => {
  add([
    rect(width() - 1 / 9, height() - 1 / 9),
    pos((width() / 2), (height() - 50)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  //left
  add([
    rect(20, height()),
    pos(0, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos(width(), 0),
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
  //sprites
  
  //furniture
    for (var i = 0; i < 8; i++){
        if ((i % 2) == 0){
          if (width() * i / 8 != width() * 1 / 9 - 100){
            const trashCan = add([
              sprite('lemon'),
              pos((width() * i / 9) + 300, height() - 50),
              area(),
              origin('center'),
              'interactable',
              'furniture',
            ]);
          }
        }
    }
  //else
  const alleyWay = add([
    sprite('door'),
    pos(width() * 1 / 9 - 100, height() - 50),
    area(),
    origin('center'),
    'alley',
  ]);
  const player = add([
    sprite("bean"),
    pos(width() * 1 / 9 - 100, height() - 50),
    area(),
    origin('center'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos(width() * 1 / 9 - 100, height() - 50),
    origin('center'),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });
  //control
  //controls
  keyDown("left", () => {
    player.move(-(300), 0);
  });

  keyDown("right", () => {
    player.move((300), 0);
  });
  player.collides("alley", () => {
    keyPress('e', () => {
      if (isInDialoge == false) {
        destroy(player);
        insideAlley = true; // set to true, set anything else to false except the street values
        go('Start2');
      }
    });
  });
  //
});

scene('policeStation', () => {
  add([
    rect(width() - 500, height() * 3 / 4 + (height() / 2)),
    pos((width() / 2), (height() - 50)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 8), 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos(width() * (7 / 8) - 20, 0),
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

  //sprites

    //furniture
  for (var i = 1; i <= 3; i++){
    const chair = add([
      sprite('apple'),
      origin('center'),
      pos(width() * (i/5), height()-50),
      area(),
      'furniture',
    ]);

    const sideTable = add([
        sprite('circle'),
        origin('center'),
        pos((width() * (i/5)) + 50, height()-50),
        area(),
        'furniture',
        'interactable',
      ]);
    if (i == 1 || i == 3){
      const flowers = add([
        sprite('grass'),
        origin('center'),
        pos((width() * (i/5)) + 50, height() - 100),
        area(),
        'furniture',
        'interactable',
      ]);
    }

  }

  //character

  const policeOfficer = add([
    sprite('cut'),
    pos(width() * 1 / 4, height() - 50),
    area(),
    origin('center'),
    body(),
    'officer',
  ]);

  const policeDoor = add([
    sprite('door'),
    pos((width() * 3 / 4) + 60, height() - 50),
    area(),
    origin("center"),
    "pDoor",
  ]);

  const player = add([
    sprite("bean"),
    pos((width() * 3 / 4) + 60, height() - 50),
    area(),
    origin('center'),
    body(),
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos((width() * 3 / 4) + 60, height() - 50),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });

  //controls
  keyDown("left", () => {
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });
  player.collides("pDoor", () => {
    keyPress('e', () => {
      if (isInDialoge == false) {
        destroy(player);
        policeStationOpen = true; // set to true
        go('Start');
      }
    });
  });
  //dialoge
  player.collides("officer", () => {
    const officerText = ["Hello World! This is a test message brought to you by yours truly! Have a wonderful day!"];
    isInDialoge = true;
    showNextDialog(officerText);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });
  //
});

scene('building1', () => {
  add([
    rect(width() / 2, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) - 20, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4), 0),
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

  //NPC 
  addRandomNPCToScene(width() * 3 / 4 - 50, height() - 50, 0);
  //furniture
  spawnEnviornment(furniture1, spawnedLocation);

  //other sprites

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
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });

  player.collides("door1", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen1 = true; // set doorOpen1 to true
      go('Start');
    });
  });
  // dialoge
  player.collides("npc", () => {
    isInDialoge = true;
    dialogeCheck(0);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });
  //
});

scene('building2', () => {
  add([
    rect(width() / 2, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(100, 100, 50),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) - 20, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4), 0),
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

  //NPC 
  //npc spawn

  addRandomNPCToScene(width() * 3 / 4 - 50, height() - 50, 1);

  //furniture
  spawnEnviornment(furniture2, spawnedLocation1);


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
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });

  player.collides('door2', () => {
    keyPress('e', () => {
      doorOpen2 = true;
      destroy(player);
      go('Start');
    });
  });
  // dialoge
  player.collides("npc", () => {
    isInDialoge = true;
    dialogeCheck(1);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });

});

scene('building3', () => {
  add([
    rect(width() / 2, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(255, 0, 0),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) - 20, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4), 0),
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

  //NPC 
  addRandomNPCToScene(width() * 3 / 4 - 50, height() - 50, 2);
  //furniture
  spawnEnviornment(furniture3, spawnedLocation2);

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
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });

  player.collides("door3", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen3 = true; // set doorOpen3 to true
      go('Start2');
    });
  });
  // dialoge
  player.collides("npc", () => {
    isInDialoge = true;
    dialogeCheck(2);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });

});

scene('building4', () => {
  add([
    rect(width() / 2, height()),
    pos((width() / 2), (height() / 2)),
    origin("center"),
    area(),
    color(0, 0, 255),
  ]);

  // add the walls
  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 4) - 20, 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos((width() * 3 / 4), 0),
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

  //NPC 
  addRandomNPCToScene(width() * 3 / 4 - 50, height() - 50, 3);
  //furniture
  spawnEnviornment(furniture4, spawnedLocation3);

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
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });

  player.collides("door4", () => {
    keyPress('e', () => {
      destroy(player);
      doorOpen4 = true; // set doorOpen1 to true
      go('Start2');
    });
  });
  // dialoge
  player.collides("npc", () => {
    isInDialoge = true;
    dialogeCheck(3);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });

});

scene('flowerShopBuilding', () => {
  add([
    rect(width() - 500, height() * 3 / 4 + (height() / 2)),
    pos((width() / 2), (height() - 50)),
    origin("center"),
    area(),
    color(5, 5, 5),
  ]);

  //left
  add([
    rect(20, height()),
    pos((width() * 1 / 8), 0),
    area(),
    solid(),
    color(36, 36, 36),
  ]);

  //right
  add([
    rect(20, height()),
    pos(width() * (7 / 8) - 20, 0),
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

  //sprites

  //furniture
  for (var i = 1; i <= 7; i++){
    const flowers = add([
        sprite('grass'),
        origin('center'),
        pos((width() * (i/9) + 100), height() - 50),
        area(),
        'furniture',
        'interactable',
      ]);
  }

  const flowerShopDoor = add([
    sprite('door'),
    pos(width() * 5 / 8, height() - 50),
    area(),
    origin("center"),
    "flowerShop",
  ]);

  const player = add([
    sprite("bean"),
    pos(width() * 5 / 8, height() - 50),
    area(),
    origin('center'),
    body(),
  ]);

  const shopKeeper = add([
    sprite('onion'),
    origin('center'),
    pos(width() * (1 / 4), height() - 50),
    area(),
    body(),
    "shop keeper",
  ]);

  //clambert ai
  const clambert = add([
    sprite("butterfly"),
    pos(width() * 5 / 8, height() - 50),
    area(),
    scale(3 / 8),
  ]);

  clambert.action(() => {
    const vectorToPlayer = vec2(player.pos).sub(clambert.pos);
    clambert.move(vectorToPlayer);
  });

  //controls
  keyDown("left", () => {
    if (isInDialoge == false) {
      player.move(-(300), 0);
    }
  });

  keyDown("right", () => {
    if (isInDialoge == false) {
      player.move((300), 0);
    }
  });
  player.collides("flowerShop", () => {
    keyPress('e', () => {
      destroy(player);
      flowerDoor = true; // set flowerDoor to true
      go('Start2');
    });
  });
  //dialoge
  player.collides("shop keeper", () => {
    const shopKeeperSpeech = ["I am Onion! The keeper of this flower shop!"];
    isInDialoge = true;
    showNextDialog(shopKeeperSpeech);
    player.pos = vec2(player.pos.x + 20, height() - 50);
  });
  //
});

go('Title Screen');

// functions

function findGuilty() {
  //which suspect is guilty
  var guiltyID = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  if (guiltyID == 1) {
    console.log("Ducky the duck is the murderer");
    suspect[0] = true;
  } else if (guiltyID == 2) {
    suspect[1] = true;
    console.log("Goober the blobfish is the murderer");
  } else if (guiltyID == 3) {
    suspect[2] = true;
    console.log("Andy the seal is the murderer");
  } else {
    suspect[3] = true;
    console.log("Bubbles the goldfish is the murderer");
  }
  //clue id lookup
  for (var i = 1; i <= 5; i++) {
    var clueID = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    if ((clueID == 1 && clues[0] != true) && suspect[2] == true) {
      clues[0] = true;
      console.log('Squirt “gun” picked');
    } else if ((clueID == 2 && clues[1] != true) && suspect[3] == true) {
      console.log('Bag of “goldfish snacks picked');
      clues[1] = true;
    } else if ((clueID == 3 && clues[2] != true) && suspect[1] == true) {
      console.log('bloody kelp picked');
      clues[2] = true;
    } else if ((clueID == 4 && clues[3] != true) && suspect[0] == true) {
      console.log('Metal pipe picked');
      clues[3] = true;
    } else if ((clueID == 5 && clues[4] != true) && suspect[0] == true) {
      console.log('Rusty knife picked');
      clues[4] = true;
    } else if ((clueID == 6 && clues[5] != true) && suspect[1] == true) {
      // fill free to change this
      console.log('Flame mignon picked');
      clues[5] = true;
    } else if ((clueID == 7 && clues[6] != true) && suspect[2] == true) {
      console.log('Broken glass picked');
      clues[6] = true;
    } else if ((clueID == 8 && clues[7] != true) && suspect[3] == true) {
      console.log('Poorly made pottery picked');
      clues[7] = true;
    } else if ((clueID == 9 && clues[8] != true) && suspect[2] == true) {
      console.log('Six pack of fish flavored water picked');
      clues[8] = true;
    } else if ((clueID == 10 && clues[9] != true) && suspect[3] == true) {
      console.log('Lily pad hat picked');
      clues[9] = true;
    } else if ((clueID == 11 && clues[10] != true) && suspect[3] == true) {
      console.log('Kelp scarf picked');
      clues[10] = true;
    } else if ((clueID == 12 && clues[11] != true) && suspect[3] == true) {
      console.log('Kelp dress picked');
      clues[11] = true;
    } else if ((clueID == 13 && clues[12] != true) && suspect[0] == true) {
      console.log('Bones of a game designer picked');
      clues[12] = true;
    } else if ((clueID == 14 && clues[13] != true) && suspect[0] == true) {
      console.log('Plastic bag picked');
      clues[13] = true;
    } else if ((clueID == 15 && clues[14] != true) && suspect[0] == true) {
      console.log('Duck feathers picked');
      clues[14] = true;
    } else if ((clueID == 16 && clues[15] != true) && suspect[2] == true) {
      console.log('Broken crate picked');
      clues[15] = true;
    } else if ((clueID == 17 && clues[16] != true) && suspect[1] == true) {
      console.log('English breakfast picked');
      clues[16] = true;
    } else if ((clueID == 18 && clues[17] != true) && suspect[1] == true) {
      console.log('A jar full of slime picked');
      clues[17] = true;
    } else if ((clueID == 19 && clues[18] != true) && suspect[1] == true) {
      console.log('Goldfish food picked');
      clues[18] = true;
    } else if ((clueID == 20 && clues[19] != true) && suspect[2] == true) {
      console.log('Seal ball picked');
      clues[19] = true;
    } else {
      i--;
      console.log("duplicate item or character ID not found, refreshing...");
    }
  }
}

function addRandomNPCToScene(x, y, buildingNumber) {
  for (i = 0; i <= 3; i++) {
    if (npcInBuilding[0] == '' || npcInBuilding[1] == '' || npcInBuilding[2] == '' || npcInBuilding[3] == '') {
      var addRandom = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      if (addRandom == 1) {
        npcInBuilding[buildingNumber] = 'bag';
      } else if (addRandom == 2) {
        npcInBuilding[buildingNumber] = 'bobo';
      } else if (addRandom == 3) {
        npcInBuilding[buildingNumber] = 'brock';
      } else if (addRandom == 4) {
        npcInBuilding[buildingNumber] = 'ghostly'
      }
      check(buildingNumber);
    } else {
      i = 3;
      spawnNPC(x, y, buildingNumber);
    }
  }
}

function check(buildingNumbers) {
  console.log(npcInBuilding);
  if (buildingNumbers == 0) {
    if ((npcInBuilding[1] == npcInBuilding[0] || npcInBuilding[0] == npcInBuilding[2] || npcInBuilding[0] == npcInBuilding[3]) && npcInBuilding[0] != '') {
      console.log('there is a match');
      npcInBuilding[0] = '';
      addRandomNPCToScene(-50000, -50000, 0);
    }
  } else if (buildingNumbers == 1) {
    if ((npcInBuilding[1] == npcInBuilding[0] || npcInBuilding[1] == npcInBuilding[2] || npcInBuilding[1] == npcInBuilding[3]) && npcInBuilding[1] != '') {
      console.log('there is a match');
      npcInBuilding[1] = '';
      addRandomNPCToScene(-50000, -50000, 1);
    }
  } else if (buildingNumbers == 2) {
    if (npcInBuilding[2] == npcInBuilding[1] || npcInBuilding[2] == npcInBuilding[0] || npcInBuilding[2] == npcInBuilding[3] && npcInBuilding[2] != '') {
      console.log('there is a match');
      npcInBuilding[2] = '';
      addRandomNPCToScene(-50000, -50000, 2);
    }
  } else if (buildingNumbers == 3) {
    if (npcInBuilding[0] == npcInBuilding[3] || npcInBuilding[2] == npcInBuilding[3] || npcInBuilding[1] == npcInBuilding[3] && npcInBuilding[3] != '') {
      console.log('there is a match');
      npcInBuilding[3] = '';
      addRandomNPCToScene(-50000, -50000, 3);
    }
  }
}

function spawnNPC(x, y, number) {
  if (npcInBuilding[number] == 'bag') {
    console.log('bag was selected ' + number);
    const npc1 = add([
      sprite('bag'),
      pos(x, y),
      origin('center'),
      area(),
      solid(),
      "npc",
    ]);
  } else if (npcInBuilding[number] == 'bobo') {
    console.log('bobo was selected ' + number);
    const npc2 = add([
      sprite('bobo'),
      pos(x, y),
      area(),
      origin("center"),
      solid(),
      "npc",
    ]);
  } else if (npcInBuilding[number] == 'brock') {
    console.log('brock was selected ' + number);
    const npc3 = add([
      sprite('brock'),
      pos(x, y),
      origin("center"),
      area(),
      solid(),
      "npc",
    ]);
  } else if (npcInBuilding[number] == 'ghostly') {
    console.log('ghostly was selected ' + number);
    const npc4 = add([
      sprite('ghosty'),
      pos(x, y),
      area(),
      solid(),
      origin('center'),
      "npc",
    ]);
  }
}

// dialoge
function showNextDialog(dialogeText) {
  const dialogeBox = add([
    rect(700, 200),
    origin("center"),
    pos(width() / 2, height() * (1 / 8)),
    color(255, 255, 255),
    outline(4),
    "dialoge",
  ]);

  const dialoge = add([
    text(dialogeText[talk], {
      size: 20,
      width: 700,
      lineSpacing: 10,
      font: "apl386",
    }),
    origin("center"),
    pos(width() / 2, height() * (1 / 8)),
    color(0, 0, 0),
    "dialoge",
  ]);

  keyDown("space", () => {
    destroyAll("dialoge");
    talk++;
    if (talk != dialogeText.length) {
      setTimeout(() => {
        showNextDialog();
      }, 250);
    } else {
      isInDialoge = false;
      talk = 0;
    }
  });
}

function dialogeCheck(buildingNumber) {
  if (npcInBuilding[buildingNumber] == 'bag') {
    const npcText1 = ["Hello! I am Bag!"];
    showNextDialog(npcText1);
  } else if (npcInBuilding[buildingNumber] == 'bobo') {
    const npcText2 = ["Hello! I am Bobo!"];
    showNextDialog(npcText2);
  } else if (npcInBuilding[buildingNumber] == 'brock') {
    const npcText3 = ["Hello! I am Brock!"];
    showNextDialog(npcText3);
  } else if (npcInBuilding[buildingNumber] == 'ghostly') {
    const npcText4 = ["Hello! I am ghostly!"];
    showNextDialog(npcText4);
  }
}

//furniture functions
function randomEnviornment(furniture) {
  for (var i = 0; i < 3; i++) {
    var randInt = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (randInt == 1 && furniture[0] == false) {
      console.log('chair selected');
      furniture[0] = true;
    } else if (randInt == 2 && furniture[1] == false) {
      console.log('Mirror selected');
      furniture[1] = true;
    } else if (randInt == 3 && furniture[2] == false) {
      console.log('large dresser selected');
      furniture[2] = true;
    } else if (randInt == 4 && furniture[3] == false) {
      console.log('short dresser selected');
      furniture[3] = true;
    } else if (randInt == 5 && furniture[4] == false) {
      console.log('desk selected');
      furniture[4] = true;
    } else if (randInt == 6 && furniture[5] == false) {
      console.log('love seat selected');
      furniture[5] = true;
    } else if (randInt == 7 && furniture[6] == false) {
      console.log('cabinet selected');
      furniture[6] = true;
    } else if (randInt == 8 && furniture[7] == false) {
      console.log('coffee table selected');
      furniture[7] = true;
    } else if (randInt == 9 && furniture[8] == false) {
      console.log('side table selected');
      furniture[8] = true;
    } else if (randInt == 10 && furniture[9] == false) {
      console.log('"flowers" selected');
      furniture[9] = true;
    } else {
      i--;
      console.log('Error: enviornment item already selected, selecting another one');
    }
  }
}

function spawnEnviornment(furniture, location) {
  var max = (width() * (5 / 8));
  var min = ((width() / 4) + 25);
  for (var i = 0; i < 3; i++) {
    var randomPosW = Math.floor(Math.random() * (max - min + 1)) + min;
    var randomPosH = height() - 50;
    if (location[i] == 0) {
      location[i] = randomPosW;
    }
    for (var x = 0; x < 4; x++) {
      randomCheck(i, location)
    }
    if (furniture[0] == true && spawned[0] == false) {
      console.log('chair spawned');
      const chair = add([
        sprite('apple'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
      ]);
      spawned[0] = true;
    } else if (furniture[1] == true && spawned[1] == false) {
      console.log('Mirror spawned');
      const mirror = add([
        sprite('meat'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
      ]);
      spawned[1] = true;
    } else if (furniture[2] == true && spawned[2] == false) {
      console.log('large dresser spawned');
      const largeDresser = add([
        sprite('boom'),
        origin('center'),
        scale(1 / 2),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[2] = true;
    } else if (furniture[3] == true && spawned[3] == false) {
      console.log('short dresser spawned');
      const smallDresser = add([
        sprite('lemon'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[3] = true;
    } else if (furniture[4] == true && spawned[4] == false) {
      console.log('desk spawned');
      const desk = add([
        sprite('heart'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[4] = true;
    } else if (furniture[5] == true && spawned[5] == false) {
      console.log('love seat spawned');
      const loveSeat = add([
        sprite('egg_crack'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
      ]);
      spawned[5] = true;
    } else if (furniture[6] == true && spawned[6] == false) {
      console.log('cabinet spawned');
      const cabinet = add([
        sprite('egg'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[6] = true;
    } else if (furniture[7] == true && spawned[7] == false) {
      console.log('coffee table spawned');
      const coffeeTable = add([
        sprite('coin'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
      ]);
      spawned[7] = true;
    } else if (furniture[8] == true && spawned[8] == false) {
      console.log('side table spawned');
      const sideTable = add([
        sprite('circle'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[8] = true;
    } else if (furniture[9] == true && spawned[9] == false) {
      console.log('"flowers" spawned');
      const flowers = add([
        sprite('grass'),
        origin('center'),
        pos(location[i], randomPosH),
        area(),
        'furniture',
        'interactable',
      ]);
      spawned[9] = true;
    }
  }
  spawned = [false, false, false, false, false, false, false, false, false, false];
}

function randomCheck(i, location) {
  //checking to see if any sprites are ontop of eachother, OR if they are behind the door
  var npcLocation = width() * 3 / 4;
  for (var X = 0; X < 3; X++) {
    var adjust = Math.floor(Math.random() * (100 - 50 + 1) + 50);
    var random = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    if (i == X) {
      X++;
      if ((Math.abs(location[i] - location[X]) <= 75)) {
        if (random <= 50) {
          location[i] += adjust;
        } else {
          location[i] -= adjust;
        }
        X--;
      }
    } else {
      if ((Math.abs(location[i] - location[X]) <= 75)) {
          X--;
        if (random >= 5) {
          location[i] += adjust;
        } else {
          location[i] -= adjust;
        }
      }
    }
  }
  for (X = 0; X < 3; X++) {
    if (X == i) {
      X++;
      if ((Math.abs(location[i] - (width() * .5)) <= 100)) {
        if (random <= 50) {
          location[i] += adjust;
        } else {
          if ((Math.abs(location[i] - ((width() * 1 / 4) - 20)) <= 20)) {
            location[i] += adjust;
          } else {
            location[i] -= adjust;
          }
          X--;
        }
      } else {
        if ((Math.abs(location[i] - (width() * .5)) <= 100)) {
          X--;
          if (random >= 5) {
            location[i] += adjust;
          } else {
            if ((Math.abs(location[i] - ((width() * 1 / 4) - 20)) <= 20)) {
              location[i] += adjust;
            } else {
              location[i] -= adjust;
            }
          }
        }
      }
    }
  }
}
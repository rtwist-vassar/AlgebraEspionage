function Game() {
  var tmap;
  var x, y;
  var player;
  var mapDimentions;
  var x_velocity;
  var y_velocity;
  var lastx;
  var lasty;
  var collidableIndexes;
  var size;
  var jumptimer;
  var jumping;
  var cameraVelocityx;
  var runningSound;
  var inventory;

  this.setup = function() {
    tmap = loadTiledMap("office", "data");
    initializeMap();
    background('#14191d');
    var playerImg = loadImage('player.png');
    var collideImg = loadImage('collisions.png');
    backToMenu = loadImage('assets/backToMenu.png');

    //creates a new patrolling enemy
    enemy = new Enemy(32, 32, 600, 240, 1, 550, 1000, true);

    //jump sound effect
    //jump = loadSound('jumping.wav');
    //landing = loadSound('landing.wav');
    //running = loadSound('footsteps.wav');
    //wind = loadSound(this.sceneManager.wind);

    wind.loop();
    wind.setVolume(0.15);

    runningSound = false;

    size = 32;

    //player = createSprite(150, 100, 32, 64);
    //player.addImage(playerImg);
    //player.setCollider('rectangle', 0, 2, 32, 50);
    runRight = loadAnimation("playerSprite/uncolored/runRight/player6.png", "playerSprite/uncolored/runRight/player9.png");
    runLeft = loadAnimation("playerSprite/uncolored/runLeft/player2.png", "playerSprite/uncolored/runLeft/player5.png");
    runRight.frameDelay = 10;
    runLeft.frameDelay = 10;
    player = createSprite(100, 200, 48, 48);
    player.addAnimation("runRight", runRight);
    player.addAnimation("runLeft", runLeft);
    player.addAnimation("waitLeft", "playerSprite/uncolored/player1.png", "playerSprite/uncolored/player1.png");
    player.addAnimation("waitRight", "playerSprite/uncolored/player5.png", "playerSprite/uncolored/player5.png");
    //player.animation.frameDelay = 3;

    //x and y velocity of the player
    x_velocity = 0;
    y_velocity = 0;

    //jumpTimer delays jumping slightly between jumps
    jumpTimer = 15;
    jumping = true;

    //velocity of the camera
    cameraVelocityx = 0;

    //array of all the level tiles
    var map = tmap.getData(0);

    //id number of collidable tiles in the map
    collidableIndexes = [21, 22, 23, 24, 25, 5, 10];

    //creating a group of all invisible collidable objects for the floor/walls 
    collidables = new Group();

    //represents a vector of the map's dimentions (x, y)
    mapDimentions = tmap.getMapSize();

    //size of the tilemap
    var p = tmap.getMapSize();

    for (var x=0; x<map.length; x++) {
      if (collidableIndexes.includes(map[x])) {
        var collidable = createSprite(((x % mapDimentions.x)*32)+16, ((floor(x / mapDimentions.x))*32)+16+((p.y / 2)*32), 32, 32);
        collidable.shapeColor = color(0, 0, 255, 0);// color of collisions
        collidable.setCollider('rectangle', 0, 16, 32, 16);
        collidables.add(collidable);
      }
    }

    //player inventory 
    inventory = {
    label:
    'INVENTORY', 
    textColor:
    '#000000', 
    background:
    '#00FF00', 
    keycard:
    '#FF00FF', 
    x:
    10, 
    y:
    275, 
    width:
    270, 
    height:
    125, 
    keycards:
    0, 
    maxCards:
    3
  };
}

this.draw = function() {
  background('#000a0d');
  if (wind.isPaused()) {
    wind.play();
  }
  player.collide(collidables);
  movement();
  tmap.draw(x, y);
  //rect(this.x, this.y, this.width, this.height);
  image(backToMenu, 600, 500);
  enemy.playerX = player.position.x;
  //console.log(enemy.followingPlayer);
  //console.log(enemy.playerX);
  //console.log(enemy.body.position.x);

  //wind.loop();

  //if (enemy.canSeePlayer() && !enemy.followingPlayer && enemy.turnPauseTimer == 0) {
  //  enemy.followingPlayer = true;
  //} else if (enemy.followingPlayer && enemy.turnPauseTimer == 0) {
  //  enemy.followPlayer();
  //} else {
  //  enemy.move();
  //}

  if (enemy.turnPauseTimer == 0 && enemy.canSeePlayer()) {
    if (!enemy.followingPlayer) {
      enemy.followingPlayer = true;
    } else if (enemy.followingPlayer) {
      enemy.followPlayer();
    }
  } else {
    enemy.alert.changeAnimation("idle");
    fastWhir.pause();
    enemy.move();
  }

  //enemy.drawE();

  //console.log(enemy.x);
  //console.log(collidables[0].position.x - 240);
  //console.log(x);
  //console.log(enemy.lowerBound);
  //console.log(player.position.x);
  drawSprites();
}

function initializeMap() {
  var p = tmap.getMapSize();
  y = -(p.y / 2)*32;
  x = 0;
  noSmooth();
}

this.mousePressed = function() {
  if (mouseX > 600 && mouseX < 800 && mouseY > 500 && mouseY < 560) {
    wind.pause();
    slowWhir.pause();
    fastWhir.pause();
    alertSound.pause();
    jump.pause();
    landing.pause();
    running.pause();
    this.sceneManager.showScene(Menu);
  }
}

function drawInventory() {
  fill(inventory.background);
  rect(inventory.x, inventory.y, inventory.width, inventory.height);
  fill(inventory.textColor);
  let labelSize = inventory.height/5;
  textSize(labelSize);
  let labelX = inventory.x + 10;
  let labelY = inventory.y + 10 + labelSize;
  text(inventory.label, labelX, labelY);
  fill(inventory.keycard);
  let cardSpace = 10;
  let cardWidth = (inventory.width - ((inventory.maxCards+1) * cardSpace)) / inventory.maxCards;
  let cardHeight = (inventory.height / 3);
  let cardY = labelY + ((((inventory.y + inventory.height) - labelY) - cardHeight) / 2);
  for (let i=0; i<inventory.keycards; i++) {
    let cardX = inventory.x + (cardSpace + (cardSpace * i)) + (i * cardWidth);
    rect(cardX, cardY, cardWidth, cardHeight);
  }
}

function movement() {

  //console.log(y_velocity);
  if (keyIsDown(UP_ARROW) && !jumping && y_velocity == 0 && jumpTimer < 0) {
    y_velocity -= 18;
    jumping = true;
    jump.play();
    jumpTimer = 20;
  }
  jumpTimer--;

  //console.log(player.position.x);
  if (keyIsDown(LEFT_ARROW) && player.position.x > 0) {
    player.position.x -= 2;
    enemy.lowerBound += 2;
    enemy.upperBound += 2;
    if (!runningSound) {
      running.loop();
      runningSound = true;
    }
  } else if (keyIsDown(RIGHT_ARROW) && player.position.x < 640) {
    player.position.x += 2;
    enemy.lowerBound -= 2;
    enemy.upperBound -= 2;
    if (!runningSound) {
      running.loop();
      runningSound = true;
    }
  } else {
    running.pause();
    runningSound = false;
  }

  if (jumping) {
    running.pause();
    runningSound = false;
  }

  label = player.getAnimationLabel();
  if (lastx > player.position.x && (label == "runRight" || label == "waitRight" || label == "waitLeft")) {
    player.changeAnimation("runLeft");
  } else if (lastx < player.position.x && (label == "runLeft" || label == "waitRight" || label == "waitLeft")) {
    player.changeAnimation("runRight");
  } else if (lastx == player.position.x && label == "runLeft") {
    player.changeAnimation("waitLeft");
  } else if (lastx == player.position.x && label == "runRight") {
    player.changeAnimation("waitRight");
  }

  //console.log(x + "     " + (collidables[0].position.x-240));

  cameraVelocityx = ((player.position.x-x)/10);
  //var 
  //console.log(cameraVelocityx);
  x += cameraVelocityx;

  //make up for drift of camera
  enemy.body.position.x -= cameraVelocityx;

  for (var y=0; y<collidables.length; y++) {
    var col = collidables[y];
    //r.position.x -= 2;
    col.position.x += (-1 * (cameraVelocityx));
  }

  //gravity
  y_velocity += 1.3;

  lastx = player.position.x;
  lasty = player.position.y;

  //collisions();
  //console.log(x_velocity);

  //player.position.x += x_velocity;
  player.position.y += y_velocity;

  //friction on player
  x_velocity *= 0.8;
  y_velocity *= 0.9;

  //console.log(x_velocity);
  collisions();
}


function collisions() {
  let left_x = floor((player.position.x-16) / size);

  let top_y = floor((player.position.y-32) / size);

  let right_x = left_x + 1;


  let bottom_y = top_y + 1;

  for (var i=0; i<collidables.length; i++) {
    var l = collidables[i];
    //console.log(player.position.x);

    //right collision                                                                                           //changed this 48 to 40
    //if (player.position.x < l.position.x && player.position.x > l.position.x-size && player.position.y < l.position.y + 40 && player.position.y > l.position.y - 48) {
    //  player.position.x = (l.position.x) - size;
    //  x_velocity = 0;
    //  //console.log("right collision");
    //}

    //top collision
    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y < l.position.y && player.position.y > l.position.y - 40) {
      player.position.y = (l.position.y - 40);
      y_velocity = 0;
      if (jumping) {
        landing.play();
      }
      jumping = false;
      //console.log("top collision");
    }
    //left collision                                                                                            //changed this 48 to 40
    //if (player.position.x > l.position.x && player.position.x < l.position.x+size && player.position.y < l.position.y + 40 && player.position.y > l.position.y - 48) {
    //  player.position.x = (l.position.x) + size;
    //  x_velocity = 0;
    //  //console.log("left collision");
    //}
    //bottom collision
    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y > l.position.y && player.position.y < l.position.y + 36) {
      player.position.y = (l.position.y) + 36;
      y_velocity = 0;
      //console.log("bottom collision");
    }
  }
}
}//end of game scene

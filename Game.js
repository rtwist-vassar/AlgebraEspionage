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

  this.setup = function() {
    tmap = loadTiledMap("office", "data");
    initializeMap();
    background('#14191d');
    var playerImg = loadImage('player.png');
    var collideImg = loadImage('collisions.png');
    backToMenu = loadImage('assets/backToMenu.png');

    enemy = new Enemy(32, 32, 700, 224, 0, 500, 900);

    //jump sound effect
    jump = loadSound('jumping.wav');
    landing = loadSound('landing.wav');
    running = loadSound('footsteps.wav');

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

    //collidable tiles
    collidableIndexes = [21, 22, 23, 24, 25, 5, 10];

    //creating a group of all invisible collidable objects for the floor/walls 
    collidables = new Group();

    //represents a vector of the map's dimentions (x, y)
    mapDimentions = tmap.getMapSize();

    //size of the tilemap
    var p = tmap.getMapSize();

    for (var x=0; x<map.length; x++)
    {
      if (collidableIndexes.includes(map[x])) {
        var collidable = createSprite(((x % mapDimentions.x)*32)+16, ((floor(x / mapDimentions.x))*32)+16+((p.y / 2)*32), 32, 32);
        collidable.shapeColor = color(0, 0, 255, 0);
        collidable.setCollider('rectangle', 0, 16, 32, 16);
        collidables.add(collidable);
      }
    }
  }

  this.draw = function() {
    background('#14191d');
    player.collide(collidables);
    movement();
    tmap.draw(x, y);
    rect(this.x, this.y, this.width, this.height);
    image(backToMenu, 600, 500);
    enemy.playerX = player.position.x;
    enemy.cameraVelocityx = cameraVelocityx;
    enemy.drawE();
    enemy.move();
    //console.log(enemy.x);
    //console.log(collidables[0].position.x - 240);
    console.log(enemy.x);
    //console.log(player.position.x);
    drawSprites();
  }

  function initializeMap() {
    //tmap.setDrawMode(CENTER);
    var p = tmap.getMapSize();
    y = -(p.y / 2)*32;
    x = 0;
    noSmooth();
  }

  this.mousePressed = function() {
    if (mouseX > 600 && mouseX < 800 && mouseY > 500 && mouseY < 560) {
      this.sceneManager.showScene(Menu);
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


    if (keyIsDown(LEFT_ARROW)) {
      //player.changeAnimation("runLeft");
      player.position.x -= 2;
      enemy.x += 2;
      if (!runningSound) {
        running.loop();
        runningSound = true;
      }
    } else if (keyIsDown(RIGHT_ARROW)) {
      //player.changeAnimation("runRight");
      player.position.x += 2;
      enemy.x -= 2;
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

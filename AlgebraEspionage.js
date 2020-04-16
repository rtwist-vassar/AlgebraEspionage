var mgr;

function setup() {
  createCanvas(800, 600);
  background('#14191d');
  mgr = new SceneManager();

  //add scenes
  mgr.addScene ( Menu );
  mgr.addScene ( Game );

  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

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

  this.setup = function() {
    tmap = loadTiledMap("office", "data");
    initializeMap();
    background('#14191d');
    var playerImg = loadImage('player.png');
    var collideImg = loadImage('collisions.png');

    size = 32;

    player = createSprite(150, 100, 32, 64);
    player.addImage(playerImg);

    //x and y velocity of the player
    x_velocity = 0;
    y_velocity = 0;

    jumpTimer = 7;
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
        collidable.shapeColor = color(0, 0, 255);
        collidables.add(collidable);
      }
    }
  }

  this.draw = function() {
    background('#14191d');
    movement();
    tmap.draw(x, y);
    drawSprites();
  }

  function initializeMap() {
    //tmap.setDrawMode(CENTER);
    var p = tmap.getMapSize();
    y = -(p.y / 2)*32;
    x = 0;
    noSmooth();
  }

  function movement() {


    if (keyIsDown(LEFT_ARROW)) {
      x -= 2;
      for (var i=0; i<collidables.length; i++) {
        var l = collidables[i];
        l.position.x += 2;
      }
    }
    
    //console.log(y_velocity);
    if (keyIsDown(UP_ARROW) && !jumping && y_velocity == 0) {
      y_velocity -= 20;
      jumping = true;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      x += 2;
      for (var y=0; y<collidables.length; y++) {
        var r = collidables[y];
        r.position.x -= 2;
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
    }
    
    //console.log(x + "     " + collidables[0].position.x);
    
    cameraVelocityx = ((player.position.x-x)/10);
    console.log(cameraVelocityx);
    //x += cameraVelocityx;
    
    //for (var y=0; y<collidables.length; y++) {
    //    var col = collidables[y];
    //    //r.position.x -= 2;
    //    col.position.x -= cameraVelocityx;
    //}

    //gravity
    y_velocity += 1.5;

    lastx = player.position.x;
    lasty = player.position.y;

    player.position.x += x_velocity;
    player.position.y += y_velocity;

    //friction on player
    x_velocity *= 0.8;
    y_velocity *= 0.9;

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
      
      //right collision
      if (player.position.x < l.position.x && player.position.x > l.position.x-size && player.position.y < l.position.y + 48 && player.position.y > l.position.y - 48) {
        player.position.x = (l.position.x) - size;
        x_velocity = 0;
      }
      //top collision
      if (player.position.x > l.position.x-size && player.position.x < l.position.x+size && player.position.y < l.position.y && player.position.y > l.position.y - 48) {
        player.position.y = (l.position.y) - 48;
        y_velocity = 0;
        jumping = false;
      }
      //left collision
      //if (player.position.x > l.position.x && player.position.x < l.position.x+size && player.position.y < l.position.y + 48 && player.position.y > l.position.y - 48) {
      //  player.position.x = (l.position.x) + size;
      //  x_velocity = 0;
      //}
      //bottom collision
      if (player.position.x > l.position.x-size && player.position.x < l.position.x+size && player.position.y > l.position.y && player.position.y < l.position.y + 48) {
        player.position.y = (l.position.y) + 48;
        y_velocity = 0;
      }
    }
  }
}//end of game scene

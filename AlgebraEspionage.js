var mgr;

function setup() {
  createCanvas(800, 600);
  background('#14191d');
  mgr = new SceneManager();

  //add scenes
  mgr.addScene ( Menu );
  mgr.addScene ( Help );
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

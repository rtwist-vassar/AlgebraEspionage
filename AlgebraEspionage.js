var mgr;
var wind;
var slowWhir;
var fastWhir;
var alertSound;
var jump, landing, running;

function preload() {
  wind = loadSound('windAmbience.wav');
  slowWhir = loadSound('assets/slowWhir.mp3');
  fastWhir = loadSound('assets/fastWhir.mp3');
  alertSound = loadSound('assets/alert.wav');
  jump = loadSound('jumping.wav');
  landing = loadSound('landing.wav');
  running = loadSound('footsteps.wav');
}
function setup() {
  createCanvas(800, 600);
  background('#14191d');
  mgr = new SceneManager();

  slowWhir.setVolume(0.1);
  fastWhir.setVolume(0.1);
  alertSound.setVolume(0.1);

  //add scenes
  mgr.addScene ( Menu );
  mgr.addScene ( Help );
  mgr.addScene ( Game );

  mgr.showNextScene();
}

function draw() {
  //wind.loop();
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

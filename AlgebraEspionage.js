var mgr;
var wind;
var slowWhir;
var fastWhir;
var alertSound;
var jump, landing, running;
var answeredQuestion = false;
var currentScene;

function preload() {
  wind = loadSound('assets/windAmbience.wav');
  slowWhir = loadSound('assets/slowWhir.mp3');
  fastWhir = loadSound('assets/fastWhir.mp3');
  alertSound = loadSound('assets/alert.wav');
  jump = loadSound('assets/jumping.wav');
  landing = loadSound('assets/landing.wav');
  running = loadSound('assets/footsteps.wav');
}
function setup() {
  createCanvas(800, 600);
  background('#14191d');
  mgr = new SceneManager();
  currentScene = Game;

  slowWhir.setVolume(0.1);
  fastWhir.setVolume(0.1);
  alertSound.setVolume(0.1);

  //add scenes
  mgr.addScene ( Menu );
  mgr.addScene ( Help );
  mgr.addScene ( Game );
  mgr.addScene ( MathS );

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

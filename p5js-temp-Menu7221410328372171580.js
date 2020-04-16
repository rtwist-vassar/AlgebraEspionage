function Menu() {

  this.enter = function() {
    fill(255, 255, 255);
    textSize(32);
    text("Click here to continue", 240, 200);
  }
  this.mousePressed = function()
  {
    this.sceneManager.showNextScene();
  }
}

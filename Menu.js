function Menu() {
  let menuImg;
  this.setup = function(){
    menuImg = loadImage('assets/menu.jpg');

  }
  this.draw = function(){
    image(menuImg,0,0);
  }
  this.mousePressed = function(){
    if(mouseX > 182 && mouseX < 602 && mouseY > 258 && mouseY < 338){
      this.sceneManager.showScene(Game);
    }
    else if(mouseX >182 && mouseX < 602 && mouseY > 385 && mouseY < 466){
      console.log("gotohelp");
      this.sceneManager.showScene(Help);
    }
  }
/*  this.keyPressed = function() {
    if (key == 'SPACE') {
      console.log("got here keypressed");
      // switch the scene
      mgr.showNextScene();
    }
  }*/
}






//function Menu() {

//  this.enter = function() {
//    fill(255, 255, 255);
//    textSize(32);
//    text("Click here to continue", 240, 200);
//  }
//  this.mousePressed = function()
//  {
//    this.sceneManager.showNextScene();
//  }
//}

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
      //console.log("gotohelp");
      this.sceneManager.showScene(Help);
    }
  }
}

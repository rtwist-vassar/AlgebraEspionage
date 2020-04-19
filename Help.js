function Help(){
  let helpImg;
  
  this.setup = function(){
    helpImg = loadImage('assets/help.jpg');
  }
  this.draw = function(){
    image(helpImg,0,0);
    text("Use the arrow keys to move(WSAD not implemented yet)", 230, 390);
  }
  this.mousePressed = function(){
    if(mouseX > 8 && mouseX < 254 && mouseY > 17 && mouseY < 70){
      this.sceneManager.showScene(Menu);
    }
  }
}

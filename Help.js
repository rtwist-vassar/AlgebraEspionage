function Help(){
  let helpImg;
  
  this.setup = function(){
    helpImg = loadImage('assets/help.jpg');
  }
  this.draw = function(){
    image(helpImg,0,0);
  }
  this.mousePressed = function(){
    if(mouseX > 8 && mouseX < 254 && mouseY > 17 && mouseY < 70){
      this.sceneManager.showScene(Menu);
    }
  }
}

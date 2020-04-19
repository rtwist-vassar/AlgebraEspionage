class Enemy{
  constructor(width,height,x,y,x_velocity,lowerBound,upperBound){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.x_velocity = x_velocity;
    this.lastx_velocity = x_velocity;
    this.regx_velocity = x_velocity;
    this.lastx = x;
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.stopTimer = 0;
    this.turnPauseTimer = 0;
    this.playerX = 0;
    this.cameraVelocityx = 0;
  }
 
  drawE(){
    fill('#FFFFFF');
    //this.x -= this.cameraVelocityx;
    rect(this.x,this.y,this.width,this.height);
  }
 
  move(){
    if(this.stopTimer == 0 && this.turnPauseTimer == 0){
      this.seeRect();
      this.lastx = this.x;
      this.x += this.x_velocity;
      this.keepInPlace();
    }
    else if(this.stopTimer != 0){
      this.stopTimer--;
      if(this.stopTimer == 0){
        this.x_velocity = this.lastx_velocity;
      }
    }
    else if(this.turnPauseTimer != 0){
      //print(this.turnPauseTimer);
      this.turnPauseTimer--;
    }
  }
 
  keepInPlace(){
    if(this.x < this.lowerBound){
      this.turnPauseTimer = 60;
      this.x = this.lowerBound;
      this.x_velocity *= -1;
      //this.lastx_velocity = this.regx_velocity * (this.x_velocity / abs(this.x_velocity));
    }
    else if(this.x > this.upperBound){
      this.turnPauseTimer = 60;
      this.x = this.upperBound;
      this.x_velocity *= -1;
      //this.lastx_velocity = this.regx_velocity * (this.x_velocity / abs(this.x_velocity));
    }
  }
 
  seeRect(){
    //let view = 100 * (this.x_velocity / abs(this.x_velocity));
    let view = 100;
    if(this.inView(view)){
      this.x_velocity = this.lastx_velocity * 2;
    }
    else{
      this.x_velocity = this.lastx_velocity;
    }
  }
 
  inView(view){
    if(view < 0){
      if(this.playerX > this.x + view - 32 && this.playerX < this.x){
        return true;
      }
    }
    else if(view > 0){
      if(this.playerX < this.x + view + 32 && this.playerX > this.x){
        return true;
      }
    }
    else{
      return false;
    }
  }
}

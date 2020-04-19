class Enemy {
  constructor(width, height, x, y, x_velocity, lowerBound, upperBound) {
    //this.width = width;
    //this.height = height;
    //this.x = x;
    //this.y = y;
    this.x_velocity = x_velocity;
    //this.lastx_velocity = x_velocity;
    //this.regx_velocity = x_velocity;
    //this.lastx = x;
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    //this.stopTimer = 0;
    this.turnPauseTimer = 0;
    this.playerX = 0;
    this.body = createSprite(x, y, width, height);
    this.facingLeft = true;
    this.followingPlayer = false;
    this.alert = createSprite(x, y-32, 15, 30);
    this.alert.addAnimation("idle", "assets/exclamation/exclamation16.png", "assets/exclamation/exclamation16.png");
    this.alert.addAnimation("alerted", "assets/exclamation/exclamation1.png", "assets/exclamation/exclamation15.png");
    //this.slowWhir = loadSound('assets/slowWhir.mp3');
    //this.fastWhir = loadSound('assets/fastWhir.mp3');
    this.playingSlowWhir = false;
    this.playingFastWhir = false;
    this.playingAlert = false;
  }

  drawE() {
    //fill('#FFFFFF');
  }

  move() {
    this.followingPlayer = false;
    if (this.turnPauseTimer != 0) {
      this.turnPauseTimer -= 1;
    } else if (this.body.position.x > this.lowerBound && this.facingLeft) {
      this.body.position.x -= this.x_velocity;
      if(!this.playingSlowWhir){
        this.playingSlowWhir = true;
        slowWhir.loop();
      }
    } else if (this.body.position.x < this.lowerBound && this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = false;
      this.alert.changeAnimation("idle");
      if(this.playingSlowWhir){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
    } else if (this.body.position.x < this.upperBound && !this.facingLeft) {
      this.body.position.x += this.x_velocity;
      if(!this.playingSlowWhir){
        this.playingSlowWhir = true;
        slowWhir.loop();
      }
    } else if (this.body.position.x > this.upperBound && !this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = true;
      this.alert.changeAnimation("idle");
      if(this.playingSlowWhir){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
    } 
    this.alert.position.x = this.body.position.x;
  }

  canSeePlayer() {
    if (this.facingLeft && this.playerX > this.body.position.x - 200 && this.playerX < this.body.position.x) {
      this.alert.changeAnimation("alerted");
      if(!this.playingAlert){
          alertSound.play(0);
          this.playingAlert = true;
      }
      if(this.playingSlowWhir){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
      this.alert.position.x = this.body.position.x;
      return true;
    } else if (!this.facingLeft && this.playerX < this.body.position.x + 200 && this.playerX > this.body.position.x) {
      this.alert.changeAnimation("alerted");
      if(this.playingSlowWhir){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
      if(!this.playingAlert){
          alertSound.play(0);
          this.playingAlert = true;
      }
      this.alert.position.x = this.body.position.x;
      return true;
    } else {
      if(this.playingAlert){
          alertSound.pause();
          this.playingAlert = false;
      }
      return false;
    }
  }

  followPlayer() {
    if (this.body.position.x > this.lowerBound && this.facingLeft) {
      this.body.position.x -= this.x_velocity * 3;
      this.alert.position.x = this.body.position.x;
      if(!this.playingFastWhir){
          fastWhir.play();
          this.playingFastWhir = true;
      }
    } else if (this.body.position.x < this.lowerBound && this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = false;
      this.followingPlayer = false;
      this.alert.changeAnimation("idle");
      if(this.playingFastWhir){
          fastWhir.pause();
          this.playingFastWhir = false;
      }
      if(this.playingAlert){
          alertSound.pause();
          this.playingAlert = false;
      }
    } else if (this.body.position.x < this.upperBound && !this.facingLeft) {
      this.body.position.x += this.x_velocity * 3;
      this.alert.position.x = this.body.position.x;
      if(!this.playingFastWhir){
          fastWhir.play();
          this.playingFastWhir = true;
      }
    } else if (this.body.position.x > this.upperBound && !this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = true;
      this.followingPlayer = false;
      this.alert.changeAnimation("idle");
      if(this.playingFastWhir){
          fastWhir.pause();
          this.playingFastWhir = false;
      }
      if(this.playingAlert){
          alertSound.pause();
          this.playingAlert = false;
      }
    } 
  }

  //move(){
  //  if(this.stopTimer == 0 && this.turnPauseTimer == 0){
  //    this.seeRect();
  //    this.lastx = this.x;
  //    //this.x += this.x_velocity;
  //    this.keepInPlace();
  //  }
  //  else if(this.stopTimer != 0){
  //    this.stopTimer--;
  //    if(this.stopTimer == 0){
  //      this.x_velocity = this.lastx_velocity;
  //    }
  //  }
  //  else if(this.turnPauseTimer != 0){
  //    //print(this.turnPauseTimer);
  //    this.turnPauseTimer--;
  //  }
  //}

  //keepInPlace(){
  //  if(this.x < this.lowerBound){
  //    this.turnPauseTimer = 60;
  //    this.x = this.lowerBound;
  //    this.x_velocity *= -1;
  //    //this.lastx_velocity = this.regx_velocity * (this.x_velocity / abs(this.x_velocity));
  //  }
  //  else if(this.x > this.upperBound){
  //    this.turnPauseTimer = 60;
  //    this.x = this.upperBound;
  //    this.x_velocity *= -1;
  //    //this.lastx_velocity = this.regx_velocity * (this.x_velocity / abs(this.x_velocity));
  //  }
  //}

  //seeRect(){
  //  //let view = 100 * (this.x_velocity / abs(this.x_velocity));
  //  let view = 100;
  //  if(this.inView(view)){
  //    this.x_velocity = this.lastx_velocity * 2;
  //  }
  //  else{
  //    this.x_velocity = this.lastx_velocity;
  //  }
  //}

  //inView(view){
  //  if(view < 0){
  //    if(this.playerX > this.x + view - 32 && this.playerX < this.x){
  //      return true;
  //    }
  //  }
  //  else if(view > 0){
  //    if(this.playerX < this.x + view + 32 && this.playerX > this.x){
  //      return true;
  //    }
  //  }
  //  else{
  //    return false;
  //  }
  //}
}//end Enemy class

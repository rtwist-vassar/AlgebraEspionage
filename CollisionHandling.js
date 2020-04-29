//function collisions() {
//  let left_x = floor((player.position.x-16) / size);

//  let top_y = floor((player.position.y-32) / size);

//  let right_x = left_x + 1;


//  let bottom_y = top_y + 1;

//  for (var i=0; i<collidables.length; i++) {
//    var l = collidables[i];
//    //console.log(player.position.x);

//    //right collision                                                                                           //changed this 48 to 40
//    //if (player.position.x < l.position.x && player.position.x > l.position.x-size && player.position.y < l.position.y + 40 && player.position.y > l.position.y - 48) {
//    //  player.position.x = (l.position.x) - size;
//    //  x_velocity = 0;
//    //  //console.log("right collision");
//    //}

//    //top collision
//    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y < l.position.y && player.position.y > l.position.y - 40) {
//      player.position.y = (l.position.y - 40);
//      y_velocity = 0;
//      if (jumping) {
//        landing.play();
//      }
//      jumping = false;
//      //console.log("top collision");
//    }
//    //left collision                                                                                            //changed this 48 to 40
//    //if (player.position.x > l.position.x && player.position.x < l.position.x+size && player.position.y < l.position.y + 40 && player.position.y > l.position.y - 48) {
//    //  player.position.x = (l.position.x) + size;
//    //  x_velocity = 0;
//    //  //console.log("left collision");
//    //}
//    //bottom collision
//    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y > l.position.y && player.position.y < l.position.y + 36) {
//      player.position.y = (l.position.y) + 36;
//      y_velocity = 0;
//      //console.log("bottom collision");
//    }
//  }
//}

class CollisionHandling {

  collisions() {

    for (var i=0; i<collidables.length; i++) {
      var l = collidables[i];
      if (player.position.x > l.position.x-size && player.position.x < l.position.x+size && player.position.y < l.position.y && player.position.y > l.position.y - 48) {
        player.position.y = (l.position.y) - 48;
        y_velocity = 0;
        jumping = false;
      }
    }
  }
}

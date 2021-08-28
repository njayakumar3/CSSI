class SuperMonkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.cost = 1000;
    this.range = 500;
    this.attackSpeed = .15;
    this.longRange = false;
    this.fastAttackSpeed = false;
    this.piercingDarts = false;
    this.darts = [];
    this.targetBalloon=0;
  }

  fasterAttackSpeed() {
    if(!this.fastAttackSpeed){
      this.attackSpeed *= .5;
      this.fastAttackSpeed = true;
      track.money -= 100;
    }
  }

  longerRange() {
    if(!this.longRange){
      this.range += 100;
      this.longRange = true;
      track.money -= 100;
    }
  }

  piercingDarts() {}
  createDart(balloon) {
    let laserDart = new LaserDart(this.x, this.y, this.piercingDarts, balloon);
    this.targetBalloon=balloon;
    this.darts.push(laserDart);
  }

  shootDarts() {
    for (let laserDart of this.darts) {
      laserDart.shootDart();
    }
    //console.log(this.darts);
  }

  inRange(balloon) {
    if (
      collideCircleCircle(
        this.x,
        this.y,
        this.range,
        balloon.x,
        balloon.y,
        balloon.size
      )
    ) {
      return true;
    }
    return false;
  }

  hit() {
    for (let laserDart of this.darts) {
      for (let balloon of track.balloons) {
        if (
          collideLineCircle(
            laserDart.x,
            laserDart.y,
            laserDart.endx,
            laserDart.endy,
            balloon.x,
            balloon.y,
            balloon.size
          ) &&
          laserDart.piercing == false
        ) {
          balloon.type--;
          balloon.speed=sqrt(balloon.type*2);

          pop.play();
          track.money += 1;
          console.log("dart destroyed");
          this.darts.splice(this.darts.indexOf(laserDart), 1);
        } else if (
          collideLineCircle(
            laserDart.x,
            laserDart.y,
            laserDart.endx,
            laserDart.endy,
            balloon.x,
            balloon.y,
            balloon.size
          ) &&
          laserDart.piercing == true
        )
          balloon.type--;
      }
    }
  }

  checkDart() {
    for (let laserDart of this.darts) {
      if (
        Math.sqrt((this.x - laserDart.x) ** 2 + (this.y - laserDart.y) ** 2) >=
        this.range
      ) {
        // console.log("Distance: " + Math.sqrt((this.x - dart.x) ** 2 + (this.y - dart.y) ** 2) + " range: " + this.range);
        this.darts.splice(this.darts.indexOf(laserDart), 1);
      }
    }
  }

  display() {
    stroke('blue');
    fill("blue");
    ellipse(this.x, this.y, this.size);
    fill('red');
    //left eye
    if(this.targetBalloon!=0){
      let normalizedToTargetx=(this.x-this.targetBalloon.x)*(-9)/sqrt((this.x - this.targetBalloon.x) ** 2 + (this.y - this.targetBalloon.y) ** 2)
      let normalizedToTargety=(this.y-this.targetBalloon.y)*(-9)/sqrt((this.x - this.targetBalloon.x) ** 2 + (this.y - this.targetBalloon.y) ** 2)
      console.log('eyes')
      console.log(normalizedToTargetx)
    ellipse(this.x+normalizedToTargetx-normalizedToTargety,this.y+normalizedToTargety+normalizedToTargetx,10);
    //right eye
    ellipse(this.x+normalizedToTargetx+normalizedToTargety,this.y+normalizedToTargety-normalizedToTargetx,10);
    }
    

  }
}

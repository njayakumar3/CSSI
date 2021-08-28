class SniperMonkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.cost = 250;
    this.range = 2 * max(width, height);
    this.attackSpeed = 2.5;
    this.fastAttackSpeed = false;
    this.darts = [];
    this.power = 2;
    this.targetBalloon = 0;
  }

  fasterAttackSpeed() {
    if (!this.fastAttackSpeed) {
      this.attackSpeed *= 0.5;
      this.fastAttackSpeed = true;
      track.money -= 100;
    }
  }

  piercingDarts() {}
  createDart(balloon) {
    let sniperDart = new SniperDart(this.x, this.y, balloon);
    this.targetBalloon = balloon;
    this.darts.push(sniperDart);
  }

  shootDarts() {
    for (let sniperDart of this.darts) {
      sniperDart.shootDart();
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
    for (let sniperDart of this.darts) {
      for (let balloon of track.balloons) {
        if (sniperDart.piercing == false) {

          let temp = balloon.type;
          balloon.type -= this.power;
          balloon.speed=sqrt(balloon.type*2);

          pop.play();
          if (balloon.type >= 0) {
            track.money += temp - balloon.type;
          } else {
            track.money += temp;
          }
          this.darts.splice(this.darts.indexOf(sniperDart), 1);
          break;
        }
      }
    }
  }

  checkDart() {
    for (let sniperDart of this.darts) {
      if (
        Math.sqrt(
          (this.x - sniperDart.x) ** 2 + (this.y - sniperDart.y) ** 2
        ) >= this.range
      ) {
        // console.log("Distance: " + Math.sqrt((this.x - dart.x) ** 2 + (this.y - dart.y) ** 2) + " range: " + this.range);
        this.darts.splice(this.darts.indexOf(sniperDart), 1);
      }
    }
  }

  display() {
    stroke("green");
    fill("green");

    ellipse(this.x, this.y, this.size);
    fill("lime");
    noStroke();
    if (this.targetBalloon != 0) {
      let normalizedToTargetx =
        ((this.x - this.targetBalloon.x) * -7) /
        sqrt(
          (this.x - this.targetBalloon.x) ** 2 +
            (this.y - this.targetBalloon.y) ** 2
        );
      let normalizedToTargety =
        ((this.y - this.targetBalloon.y) * -7) /
        sqrt(
          (this.x - this.targetBalloon.x) ** 2 +
            (this.y - this.targetBalloon.y) ** 2
        );

      ellipse(
        this.x + normalizedToTargetx - normalizedToTargety,
        this.y + normalizedToTargety + normalizedToTargetx,
        7
      );
      //right eye
      ellipse(
        this.x + normalizedToTargetx + normalizedToTargety,
        this.y + normalizedToTargety - normalizedToTargetx,
        7
      );

      //gun
      // console.log(normalizedToTargetx);
      // console.log(normalizedToTargety);
      stroke(10);
      
      fill('black')
      quad(this.x - normalizedToTargety *3,
        this.y + normalizedToTargetx * 3,
        this.x-normalizedToTargety*2,
        this.y+normalizedToTargetx*2,
            this.x + normalizedToTargetx *4- 2*normalizedToTargety,
        this.y + normalizedToTargety *4+ 2*normalizedToTargetx,
          this.x + normalizedToTargetx*4 - 3 * normalizedToTargety,
        this.y + normalizedToTargety*4 + 3 * normalizedToTargetx
         )
      
      
      // beginShape();
      // vertex(
      //   (this.x - normalizedToTargety) * 1.1,
      //   (this.y + normalizedToTargetx) * 1.1
      // );
      // vertex(this.x - normalizedToTargety, this.y + normalizedToTargetx);
      // vertex(
      //   this.x + normalizedToTargetx + 1.1 * normalizedToTargety,
      //   this.y + normalizedToTargety - 1.1 * normalizedToTargetx
      // );
      // vertex(
      //   this.x + normalizedToTargetx + normalizedToTargety,
      //   this.y + normalizedToTargety - normalizedToTargetx
      // );
      // endShape(CLOSE);

      //     fill('red');
      //     ellipse()
      //     let dx = this.target.x - this.x;
      //     let dy = this.target.y - this.y;
      //     let xNorm=(dx)*30 / Math.sqrt(dx ** 2 + dy ** 2);
      //     let yNorm=(dy)*30 / Math.sqrt(dx ** 2 + dy ** 2);

      //     beginShape();
      //     vertex(30, 20);
      //     vertex(85, 20);
      //     vertex(85, 75);
      //     vertex(30, 75);
      //     endShape(CLOSE);
    }
  }
}

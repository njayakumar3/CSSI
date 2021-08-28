/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class DartMonkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.cost = 150;
    this.targetBalloon=0;
    this.range = 300;
    this.attackSpeed = 1;
    this.longRange = false;
    this.fastAttackSpeed = false;
    this.pierce = false;
    this.darts = [];
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

  piercingDarts() {
    if (!this.pierce) {
      this.pierce = true;
      track.money -= 100;
    }
    
  }
  createDart(balloon) {
    let dart = new Dart(this.x, this.y, this.pierce, balloon);
    this.targetBalloon=balloon;
    this.darts.push(dart);
  }
  
  shootDarts() {
    for (let dart of this.darts){
      
      dart.shootDart();
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
    for (let dart of this.darts) {
      for (let balloon of track.balloons) {
        if (
          collideCircleCircle(
            dart.x,
            dart.y,
            dart.size,
            balloon.x,
            balloon.y,
            balloon.size
          ) &&
          !dart.piercing && !dart.piercedBalloons.includes(balloon)         ) {
          
          balloon.type--;
          balloon.speed=sqrt(balloon.type*2);
          dart.piercedBalloons.push(balloon);
          pop.play();
          track.money += 1;
                  console.log("dart destroyed")

          this.darts.splice(this.darts.indexOf(dart),1);
        } else if (
          collideCircleCircle(
            dart.x,
            dart.y,
            dart.size,
            balloon.x,
            balloon.y,
            balloon.size
          ) &&
          dart.piercing 
          && !dart.piercedBalloons.includes(balloon) 
        ){
          balloon.type--;
          balloon.speed--;

          dart.piercedBalloons.push(balloon);
          pop.play();
          track.money += 1;
        }
          
      }
    }
  }
  
  checkDart() {
    for (let dart of this.darts) {
      if (
        Math.sqrt((this.x - dart.x) ** 2 + (this.y - dart.y) ** 2) >= this.range*.8
      ) {
        
        // console.log("Distance: " + Math.sqrt((this.x - dart.x) ** 2 + (this.y - dart.y) ** 2) + " range: " + this.range);
        this.darts.splice(this.darts.indexOf(dart), 1);
      }
    }
  }

  display() {
    stroke("brown");
      fill("brown");
      ellipse(this.x, this.y, this.size);
    fill("black")
    if(this.targetBalloon!=0){
      let normalizedToTargetx=(this.x-this.targetBalloon.x)*(-7)/sqrt((this.x - this.targetBalloon.x) ** 2 + (this.y - this.targetBalloon.y) ** 2)
      let normalizedToTargety=(this.y-this.targetBalloon.y)*(-7)/sqrt((this.x - this.targetBalloon.x) ** 2 + (this.y - this.targetBalloon.y) ** 2)
    ellipse(this.x+normalizedToTargetx-normalizedToTargety,this.y+normalizedToTargety+normalizedToTargetx,7);
    //right eye
    ellipse(this.x+normalizedToTargetx+normalizedToTargety,this.y+normalizedToTargety-normalizedToTargetx,7);
  }
  }
  
  
}
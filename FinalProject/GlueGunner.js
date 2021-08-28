/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class GlueGunner {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.cost = 75;
    this.range = 300;
    this.attackSpeed = 1;
    this.longRange = false;
    this.fastAttackSpeed = false;
    this.stickierGlue = false;
    this.darts = [];
    this.targetBalloon = 0;
  }

  fasterAttackSpeed() {
    if (!this.fastAttackSpeed) {
      this.attackSpeed *= 0.5;
      this.fastAttackSpeed = true;
      track.money -= 100;
    }
  }

  longerRange() {
    if (!this.longRange) {
      this.range += 100;
      this.longRange = true;
      track.money -= 100;
    }
  }

  strongerGlue() {
    if (!this.stickierGlue) {
      this.stickierGlue = true;
      track.money -= 100;
    }
  }

  createDart(balloon) {
    let glueDart = new GlueDart(this.x, this.y, balloon);
    this.targetBalloon = balloon;
    this.darts.push(glueDart);
  }

  shootDarts() {
    for (let glueDart of this.darts) {
      glueDart.shootDart();
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
      ) &&
      !balloon.glued
    ) {
      return true;
    }
    return false;
  }

  hit() {
    for (let glueDart of this.darts) {
      for (let balloon of track.balloons) {
        if (
          collideCircleCircle(
            glueDart.x,
            glueDart.y,
            glueDart.size,
            balloon.x,
            balloon.y,
            balloon.size
          ) &&
          !balloon.glued
        ) {
          balloon.glued = true;
          if (this.stickierGlue) {
            balloon.speed *= 0.5;
          } else {
            balloon.speed *= 0.7;
          }
          this.darts.splice(this.darts.indexOf(glueDart), 1);
        }
      }
    }
  }

  checkDart() {
    for (let glueDart of this.darts) {
      if (
        Math.sqrt((this.x - glueDart.x) ** 2 + (this.y - glueDart.y) ** 2) >=
        this.range
      ) {
        // console.log("Distance: " + Math.sqrt((this.x - dart.x) ** 2 + (this.y - dart.y) ** 2) + " range: " + this.range);
        this.darts.splice(this.darts.indexOf(glueDart), 1);
      }
    }
  }

  display() {
    stroke("yellow");
    fill("yellow");
    ellipse(this.x, this.y, this.size);
    noStroke();
    fill("black");
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
      stroke('black')
      fill("yellow");
      quad(
        this.x - normalizedToTargety * 3,
        this.y + normalizedToTargetx * 3,
        this.x - normalizedToTargety * 2,
        this.y + normalizedToTargetx * 2,
        this.x + normalizedToTargetx * 4 - 2 * normalizedToTargety,
        this.y + normalizedToTargety * 4 + 2 * normalizedToTargetx,
        this.x + normalizedToTargetx * 4 - 3 * normalizedToTargety,
        this.y + normalizedToTargety * 4 + 3 * normalizedToTargetx
      );
    }
  }
}

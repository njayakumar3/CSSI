/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class LaserDart {
  constructor(x, y, piercing, target) {
    this.x = x;
    this.y = y;
    this.initx=x;
    this.inity=y;
    this.speed = 25;
    this.existence;
    this.piercing = piercing;
    this.target=target;
    this.targetx=target.x;
    this.targety=target.y;
    this.endx = 0;
    this.endy = 0;
    laserShot.play();
  }

  shootDart() {
    
    let dx = this.targetx - this.initx;
    let dy = this.targety - this.inity;
    this.x += (dx * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
    this.y += (dy * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
  }

  display() {
    stroke('red');
    strokeWeight(10)
    let dx = this.targetx - this.initx;
    let dy = this.targety - this.inity;
    line(this.x, this.y, this.x - (dx)*30 / Math.sqrt(dx ** 2 + dy ** 2),    this.y - (dy)*30 / Math.sqrt(dx ** 2 + dy ** 2));
    this.endx=this.x - (dx)*30 / Math.sqrt(dx ** 2 + dy ** 2);
    this.endy=this.y - (dy)*30 / Math.sqrt(dx ** 2 + dy ** 2);
    // ellipse(this.x, this.y, this.size);
    strokeWeight(1)
    stroke('white')
  }
}
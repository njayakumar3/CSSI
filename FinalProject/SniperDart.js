/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class SniperDart {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.initx = x;
    this.inity = y;
    this.speed = 100;
    this.existence;
    this.size = 5;
    this.piercing = false;
    this.target = target;
    this.targetx = target.x;
    this.targety = target.y;
    sniperShot.play();
  }

  shootDart() {
    
    let dx = this.targetx - this.initx;
    let dy = this.targety - this.inity;
    this.x += (dx * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
    this.y += (dy * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
  }

  display() {
    fill('black');
    ellipse(this.x, this.y, this.size * 2);
  }
}
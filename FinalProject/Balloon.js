/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class Balloon {
  constructor(type, startX, startY) {
    this.segmentIndex = 0;
    this.type = type;
    this.x = startX;
    this.y = startY;
    this.size = 30;
    this.speed = sqrt(type*2) ;
    this.glued = false;
    this.pierced = false;
  }
  display() {
    if (this.type == 1) {
      stroke('red');
      fill("red");
    } else if (this.type == 2) {
      stroke("blue");
      fill("blue");
    } else if (this.type == 3) {
      stroke("lime");
      fill("lime");
    } else if (this.type == 4) {
      stroke("yellow");
      fill("yellow");
    }else if (this.type == 5) {
      stroke("pink");
      fill("pink");
    }else if (this.type == 6) {
      stroke("black");
      fill("black");
    }else if (this.type == 7) {
      stroke("white");
      fill("white");
    }

    ellipse(this.x, this.y, this.size);
  }
}

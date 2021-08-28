/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class TrackSegment {
  constructor(centerX, centerY, width, length) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.length = length;
  }

  display() {
    fill('#edd25a');
    stroke('#edd25a');
    rectMode(CENTER);
    rect(this.centerX, this.centerY, this.width, this.length, 10, 10, 10, 10);
  }
}
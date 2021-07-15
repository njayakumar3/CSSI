// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, width, height, colorMode, HSB, mouseX, mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs */

let brushHue, iter, xCoord, yCoord, width, length;

function setup() {
  // Canvas & color settings
  width = 400;
  length = 400;
  createCanvas(width, length);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
  background(95);
  iter = 1;
  
  xCoord = 0;
  yCoord = 0;
}

function draw() {
  
  chooseColors();
  
  if(mouseIsPressed){
    xCoord = random(width);
    yCoord = random(length);
    // strokeWeight(abs(pmouseX - mouseX) + abs(pmouseY - mouseY));
    // line(pmouseX, pmouseY, mouseX, mouseY);
    ellipse(xCoord, yCoord, 15, 15);
  }
}

function chooseColors() {
  if ((brushHue >= 360)||(brushHue < 0)) {
    iter *= -1;
  }
  brushHue += iter;
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}

function keyPressed() {
  background(95);
}
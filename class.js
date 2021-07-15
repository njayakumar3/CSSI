// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, width, height, colorMode, HSB, mouseX, mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs */

let brushHue, iter

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
  background(95);
  iter = 1;
}

function draw() {
  
  chooseColors();
  
  if(mouseIsPressed){
    strokeWeight(abs(pmouseX - mouseX) + abs(pmouseY - mouseY));
    line(pmouseX, pmouseY, mouseX, mouseY);
    // ellipse(mouseX, mouseY, abs(pmouseX - mouseX), abs(pmouseY - mouseY));
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
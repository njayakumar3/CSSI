// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global key, text , createSlider, createCanvas, width, height, colorMode, HSB, mouseX, mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs */



//INSTRUCTIONS
//The two sliders control the color and brush thickness respectively.
//Press the space key to clear your drawings.
//Press 'q' to toggle between paintbrush and quill.


let oscillate, oscillator, brushHue, iter, slider, val, width, height, separation, thickness, thicknessVal, quillToggle;

function setup() {
  // Canvas & color settings
  width = 400;
  height = 400;
  
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  
  
  strokeWeight(6);
  background(95);
  iter = 1;
  slider = createSlider(0, 360);
  slider.position(20, 30);
  
  thickness = createSlider(0, 25);
  thickness.position(width - 150, 30);
  
  separation = 50;
  quillToggle = 0;
  
  oscillate = 0;
  oscillator = 1;
}

function draw() {
  drawDivision();
  implementLabels();
  
  
  brushHue = slider.value();
  thicknessVal = thickness.value();
  chooseColors(brushHue);
  changeThickness(thicknessVal);
  
  if (quillToggle == 0) {
    normalDraw();
  }
  
  else if (quillToggle == 1) {
    quillDraw();
  }
  
}

function normalDraw(){
  if((mouseIsPressed) && (mouseY > separation)){
    line(pmouseX, pmouseY, mouseX, mouseY);
    // ellipse(mouseX, mouseY, abs(pmouseX - mouseX), abs(pmouseY - mouseY));
  }
}

function quillDraw(){
  if ((oscillate > 10) || (oscillate < -10)||((thicknessVal - oscillate) < 0)) {
    oscillator *= -1;
  }

  oscillate += oscillator;
  if((mouseIsPressed) && (mouseY > separation)){
    strokeWeight(oscillate + thicknessVal);
    line(pmouseX, pmouseY, mouseX, mouseY);
    // ellipse(mouseX, mouseY, abs(pmouseX - mouseX), abs(pmouseY - mouseY));
  }
}

function chooseColors(hue) {

  stroke(hue, 50, 80);
  fill(hue, 50, 80);
}

function keyTyped() {
  if (key == ' '){
    background(95);
  }
  else if (key == 'q') {
    quillToggle = 1 - quillToggle;
  }
}



function drawDivision(){
  strokeWeight(1);
  stroke(50);
  line(0, separation, width, separation);
}

function implementLabels() {
  fill(0);
  text("Color", 75, 20);
  text("Stroke Thickness", width - 135, 20);
}

function changeThickness(thicknessVal) {
  strokeWeight(thicknessVal);
}
/* globals createCanvas colorMode HSB noStroke color background mouseX mouseY width height fill ellipse text stroke line noStroke */

// We'll use variables for most of our colors in this code-along.
let backgroundColor, color1, color2, textColor, width, length, globalB, globalS;

function setup() {
  // Canvas & color settings
  width = 400;
  length = 400;
  createCanvas(width, length);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(0);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  globalS = 100;
  globalB = 50;
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
  
  
}

function draw() {
  background(backgroundColor);
  
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  drawCenterLine();
  if (mouseX < width/2) {
    dayMode();
  } 
  else {
    nightMode();
  }

  // The red and blue circles:
  fill(color1);
  ellipse(width * 0.25, length/2.0, 50);
  fill(color2);
  ellipse(width * 0.75, length/2.0, 50);

  // The grey circle and the text:
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  text("Flip the switch: (" + mouseX + ", " + mouseY + ")", 20, 20);
}

function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(width/2.0, 0, width/2.0, length);
  noStroke();
}

function nightMode() {
  backgroundColor = color(0);
  textColor = color(95);
  color1 = color(200, globalS, globalB);
  color2 = color(0, globalS, globalB);
}

function dayMode() {
  backgroundColor = color(95);
  textColor = color(0);
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
}

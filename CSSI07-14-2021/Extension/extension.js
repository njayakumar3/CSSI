/* globals noFill mouseIsPressed createCanvas rect colorMode HSB noStroke color background mouseX mouseY width height fill ellipse text stroke line noStroke */

// We'll use variables for most of our colors in this code-along.
let clickCoordinate, paintColor, palette, paint, quad1, quad2, quad3, quad4, backgroundColor, color1, color2, textColor, width, length, globalB, globalS;

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
  quad1 = color(0, globalS, globalB);
  quad2 = color(90, globalS, globalB);
  quad3 = color(180, globalS, globalB);
  quad4 = color(270, globalS, globalB);
  
  paint = [];
  //palette element: [color, leftBound]
  palette = [];
  paintColor = color(360);
  
  clickCoordinate = 0;
  
}

function draw() {
  background(backgroundColor);
  
  //color pallete
  stroke(0, 0, 0);
  noFill();
  rect(20, 0, width - 40, 20);
  noStroke();
  
  let choice = 0;
  for (let leftBound = 20; leftBound < 360; leftBound += 20) {
    fill(color(choice, globalS, globalB));
    rect(leftBound, 0, 20, 20);
    palette.push([choice, leftBound]);
    
    choice += 20;
  }
  
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  if ((mouseX < 19) && (mouseY < 19)) {
    topLeft();
  }
  else if ((mouseX > width - 19) && (mouseY < 19)) {
    topRight();
  }
  else if ((mouseX < 19) && (mouseY > length - 19)) {
    bottomLeft();
  }
  else if ((mouseX > width - 19) && (mouseY > length - 19)) {
    bottomRight();
  }

  // Corner rectangles
  fill(quad1);
  rect(0, 0, 19, 19);
  fill(quad2);
  rect(width - 19, 0, 19, 19);
  fill(quad3);
  rect(0, length - 19, 19, 19);
  fill(quad4);
  rect(width - 19, length - 19, 19, 19);
  
  if((mouseIsPressed) && (mouseY > 25)){
    painting(mouseX, mouseY);
  }
  
  if((mouseIsPressed) && (mouseY < 20)) {
    clickCoordinate = mouseX;
  }
  
  if((mouseIsPressed) && (mouseX > width/2 - 30) && (mouseX < width/2 + 30) && (mouseY > length - 30)){
    clearAll();
  }
  
  for (let i = 0; i < palette.length; i++) {
    if ((clickCoordinate > palette[i][1]) && (clickCoordinate < (palette[i][1] + 20))) {
      paintColor = palette[i][0];
    }
  }
  
  for (let i = 0; i < paint.length; i++) {
    fill(paintColor, globalS, globalB);
    ellipse(paint[i][0], paint[i][1], 10);
  }
  
  stroke(color(360));
  noFill();
  rect(width/2 - 30, length - 30, 60, 30);
  text("CLEAR", width/2 - 20, length - 10);
  
  
  
}


function topLeft(){
  backgroundColor = quad1;
}

function topRight(){
  backgroundColor = quad2;
  
}

function bottomLeft(){
  backgroundColor = quad3;
}

function bottomRight() {
  backgroundColor = quad4;
}

function painting(x, y) {
  paint.push([x, y]);
}

function clearAll(){
  for(let i = 0; i <= paint.length; i++) {
    paint.pop();
  }
}
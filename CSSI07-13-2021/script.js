// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize tint*/

// Var declarations
let tintIter, tintVal, dvdImage, x, xVelocity, imageWidth, canvasWidth, y, yVelocity, imageLength, canvasLength;



function setup(){
  canvasWidth = 600;
  canvasLength = 600;
  createCanvas(canvasWidth, canvasLength);
  // We only want to load the logo once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");
  //Var assignments
  x = 50;
  xVelocity = 2;
  imageWidth = 200
  y = 50;
  yVelocity = 2;
  imageLength = 150
  tintVal = 100;
  tintIter = 50;
}

function draw(){
  background(220);
  //Move image
  x += xVelocity;
  y += yVelocity;
  
  //Bounce off horizontally
  if ((x > canvasWidth - imageWidth) || (x < 0)){
    xVelocity *= (-1);
    if ((tintVal >= 255 - tintIter)||(tintVal <= tintIter)){
      tintIter *= -1;
    }
    tintVal += tintIter;
  }

  //Bounce off vertically
  if ((y > canvasLength - imageLength) || (y < 0)) {
    yVelocity *= -1;
    if((tintVal >= 255 - tintIter)||(tintVal <= tintIter)){
      tintIter *= -1;
    }
    tintVal += tintIter;
  }
  
  // Draw the logo at the new position.
  
  image(dvdImage, x, y, imageWidth, imageLength);
  tint(tintVal, tintVal, tintVal);
  
  
}
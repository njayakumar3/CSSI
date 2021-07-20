/* global createCanvas colorMode HSB random width height background fill rect ellipse keyCode UP_ARROW LEFT_ARROW RIGHT_ARROW DOWN_ARROW textSize text collideRectCircle */

let backgroundColor,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V,
  height,
  width,
  cars,
  img,
    powerUp,
    frogV;

function setup() {
  // Canvas & color settings
  height = 500;
  width = 500;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  
  backgroundColor = 95;
  frogX = width/2.0;
  frogY = height - 10;
  frogV = 10;
  score = 0;
  lives = 3;
  gameIsOver = false;
  
//   Each element of cars is [car x coord, car y coord, car velocity, width, length, [color]]
  cars = [
          [0, 100, 5, 40, 30, [0, 80, 80]],
          [0, 200, 8, 100, 20, [360, 10, 60]],
          [150, 200, 8, 100, 20, [360, 10, 60]],
          [300, 200, 8, 100, 20, [360, 10, 60]],
          [0, 300, 1, 50, 50, [100, 90, 20]],
          [0, 400, 3, 20, 20, [0, 100, 100]],
          [80, 400, 3, 20, 20, [0, 100, 100]],
          [160, 400, 3, 20, 20, [0, 100, 100]],
    [240, 400, 3, 20, 20, [0, 100, 100]],
    [320, 400, 3, 20, 20, [0, 100, 100]],
    [400, 400, 3, 20, 20, [0, 100, 100]]

         ];

  
  
}

function draw() {
  background(backgroundColor);
  
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  
  checkForPowerUps();
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (!(gameIsOver) && (keyCode === UP_ARROW)) {
    frogY -= frogV;
  }
  if (!(gameIsOver) && (keyCode === DOWN_ARROW)) {
    frogY += frogV;
  }
  if (!(gameIsOver) && (keyCode === RIGHT_ARROW)) {
    frogX += frogV;
  }
  if (!(gameIsOver) && (keyCode === LEFT_ARROW)) {
    frogX -= frogV;
  }
  
  if ((gameIsOver)&& (keyCode === 27)) {
    score = 0;
    lives = 3;
    frogX = width/2.0;
    frogY = height - 10;
    gameIsOver = false;
  }
}

function checkForPowerUps() {
  frogV = 10 * (int(score/3)) + 10;
}

function moveCars() {
  // Move the car
  // Reset if it moves off screen
  for (let i = 0; i < cars.length; i++) {
    if (cars[i][0] > width) {
      cars[i][0] = 0;
    }
    else {
      cars[i][0] += cars[i][2];
    }
  }

}

function drawCars() {
//   For each car in cars, draw
  for (let i = 0; i < cars.length; i++ ){
    fill(cars[i][5][0], cars[i][5][1], cars[i][5][2]);
    rect(cars[i][0], cars[i][1], cars[i][3], cars[i][4]);
  }
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  for (let i = 0; i < cars.length; i++) {
    if (collideRectCircle(cars[i][0], cars[i][1], cars[i][3], cars[i][4], frogX, frogY, 20)) {
    lives --;
    frogX = width/2.0;
    frogY = height - 10;
    
  }
  }
  
  if (lives <= 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 60) {
    score++;
    frogY = height - 10;
    frogX = width/2.0;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, width - 80, 20);
  
//   Display speed
  text(`Speed: ${frogV/10}`, width/2.0 - 50, 20);
  // Display game over message if the game is over
  if ((score%3 == 0) && score > 0){
    text('POWER UP!', width/2.0 + 50, 20);
  }
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height/2);
    textSize(30);
    text("Press ESC to restart", 70, height/2 + 40);
  }
}

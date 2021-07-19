// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global key, deltaTime, hit, int, collideCircleCircle, createCanvas, width, height, colorMode, HSB, mouseX, mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs text */

let width, height, coinX, coinY, score, time, gameIsOver, scores, size;

function setup() {
  // Canvas & color settings
  width = 400;
  height = 400;
  createCanvas(width, height);
  coinX = random(width);
  coinY = random(height);
  
  time = 10;
  score = 0;
  gameIsOver = false;
  scores = [];
  
  size = 0;
}

function draw() {
  background(200);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 2*size + 5);

  handleTime();

  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit) {
    handleCollision();
  }
//   Game stats
  text(`Your score is ${score}`, 20, 20);
  text(`Time remaining: ${int(time)}`, 20, 40);
  
}

function handleCollision() {
  if (!(gameIsOver)) {
    score += 1;
    size++;
    coinX = random(width);
    coinY = random(height);
  }
}

function handleTime() {
  if (time > 0) {
    time -= deltaTime/1000;
  } 
  else {
    gameIsOver = true;
    text(`Game over`, 160, 200);
    text(`Press x to restart`, 160, 160);
    scores.push(score);
    let highScore = 0;
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > highScore) {
        highScore = scores[i];
      }
    }
    text("High Score: " + highScore, 160, 240);
    
    if (highScore == score) {
      text("NEW HIGH SCORE!", 160, 280);
    }
  }
}

function keyTyped() {
  if (key === 'x') {
    gameIsOver = false;
    score = 0;
    time = 10;
  }
}
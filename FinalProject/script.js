/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle, DartMonkey, GlueGunner*/

let corners,
    startGame,
  backgroundColor,
  balloonColors,
  track,
  timer,
  balloonTypeIndex,
  img,
  map1,
  buttons,
  defensePreviews,
  currentlyPurchasing,
  defenseTimers,
  showRange, vol, svol, levelUp, pop, gunshot, laserShot, sniperShot, theme,
  dartMonkeyImage, glueGunnerImage, sniperMonkeyImage, superMonkeyImage, startNextRound, myFont,
  redBalloonImage, blueBalloonImage, greenBalloonImage, yellowBalloonImage, pinkBalloonImage, blackBalloonImage,
  whiteBalloonImage;
defensetypes = { 1: "dart", 2: "glue" };
let screen;
let volSlider;
let sfxSlider;
function preload(){
  soundFormats('mp3', 'wav');
  myFont = loadFont('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2FOETZTYP_.TTF?v=1628173653594');
  pop = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F352889e3-a80d-467c-8eac-40764baa49c7_pop-%5BAudioTrimmer.com%5D.mp3?v=1628002095857');
  laserShot = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Flaser.mp3?v=1628002298028');
  gunShot = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Fgunshot.mp3?v=1628002581217');
  sniperShot = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Fmlg-sound-effect-intervention-mw2-%5BAudioTrimmer.com%5D%20(1).mp3?v=1628005621772');
  levelUp = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2FlevelUp.wav?v=1628003284427');
  theme = loadSound('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Ftheme.mp3?v=1628003648981');
  img = loadImage("https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F3cbab317-d866-43d3-a1da-6653f006bd29.image.png?v=1628010763545");
  dartMonkeyImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Fc02535ec-d7b1-4057-ad1e-044375026a96.image.png?v=1628005327076');
  glueGunnerImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F1f59801d-31bc-4085-b6e1-4ef33501ef8b.image.png?v=1628005573241');
  sniperMonkeyImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F1402d728-b916-4feb-ab31-afe37999ab74.image.png?v=1628005540051');
  superMonkeyImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F2be6f6e4-d7c3-4fe0-8b04-001a31e78145.image.png?v=1628005554870');
  redBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2Ff173ebee-ba0d-4ac8-816c-0e1b483ad980.image.png?v=1628175083629');
  blueBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F25cd125f-76a6-4164-b312-3d7bd0ab09d0.image.png?v=1628178462069');
  greenBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F7616d423-abf2-40e7-af9a-0e1e5c010527.image.png?v=1628178476053');
  yellowBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F63cc23a9-1208-4c4e-a7dd-d3fef5d42199.image.png?v=1628178496310');
  pinkBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F78d5fb27-c463-4202-8234-a7cea4c86b60.image.png?v=1628178514972');
  blackBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F2c9d189f-d03c-4827-832d-83261a63d9d1.image.png?v=1628178529444');
  whiteBalloonImage = loadImage('https://cdn.glitch.com/352889e3-a80d-467c-8eac-40764baa49c7%2F3e4cee5a-2ea8-405b-992b-c37c398752d1.image.png?v=1628178542042');
  //theme.setVolume(0.2);
  sniperShot.setVolume(0.2);
  laserShot.setVolume(0.2);
  gunShot.setVolume(0.2);
  levelUp.setVolume(0.2);
  theme.setVolume(0.2);
  pop.setVolume(0.2);
}


function setup() {
  // Canvas & color settings
  defensePreviews = [];
  defenseTimers = [];
  width = 1000;
  height = 700;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  backgroundColor = 'green';
  balloonColors = ["red", "blue", "green", "yellow"];
  rectMode(CENTER);
  screen = 0;
  
  corners = [
    new TrackSegment(-30, 330, 60, 60),
    new TrackSegment(30, 330, 60, 60),
    new TrackSegment(150, 330, 60, 60),
    new TrackSegment(150, 150, 60, 60),
    new TrackSegment(330, 150, 60, 60),
    new TrackSegment(330, 510, 60, 60),
    new TrackSegment(80, 510, 60, 60),
    new TrackSegment(80, 620, 60, 60),
    new TrackSegment(650, 620, 60, 60),
    new TrackSegment(650, 450, 60, 60),
    new TrackSegment(470, 450, 60, 60),
    new TrackSegment(470, 270, 60, 60),
    new TrackSegment(650, 270, 60, 60),
    new TrackSegment(650, 90, 60, 60),
    new TrackSegment(410, 90, 60, 60),
    new TrackSegment(410, 30, 60, 60),
    new TrackSegment(410, -30, 60, 60)
  ];
  
  
  map1 = [];
  for (let i = 0; i < corners.length - 1; i++) {
    if (corners[i + 1].centerX - corners[i].centerX > 0) {
      for (let j = corners[i].centerX; j < corners[i + 1].centerX; j += 60) {
        map1.push(new TrackSegment(j, corners[i].centerY, 60, 60));
      }
    } else if (corners[i + 1].centerX - corners[i].centerX < 0) {
      for (let j = corners[i].centerX; j > corners[i + 1].centerX; j -= 60) {
        map1.push(new TrackSegment(j, corners[i].centerY, 60, 60));
      }
    } else if (corners[i + 1].centerY - corners[i].centerY > 0) {
      for (let j = corners[i].centerY; j < corners[i + 1].centerY; j += 60) {
        map1.push(new TrackSegment(corners[i].centerX, j, 60, 60));
      }
    } else if (corners[i + 1].centerY - corners[i].centerY < 0) {
      for (let j = corners[i].centerY; j > corners[i + 1].centerY; j -= 60) {
        map1.push(new TrackSegment(corners[i].centerX, j, 60, 60));
      }
    }
  }

  // console.log("MAP: " + map1);

  track = new Track(map1);
  // console.log(track.segments)

  timer = 0;
  balloonTypeIndex = 0;
  
  buttons = {
    "Purchase Dart Monkey": createButton("Buy - 100"),
    "Faster Shooting": createButton("Faster Shooting - 100"),
    "Longer Range": createButton("Longer Range - 100"),
    "Purchase Glue Gunner": createButton("Buy - 75"),
    "Stronger Glue": createButton("Stronger Glue - 100"),
    "Faster Shooting (Glue)": createButton("Faster Shooting - 100"),
    "Longer Range (Glue)": createButton("Longer Range - 100"),
    "Purchase Super Monkey": createButton("Buy - 1000"),
    "Longer Range (Super)": createButton("Longer Range - 100"),
    "Purchase Sniper Monkey": createButton("Buy - 250"),
    "Faster Shooting (Sniper)": createButton("Faster Shooting - 100"),
    "Purchase Piercing Darts": createButton("Piercing Darts - 100"),
    "Start Over": createButton("Start Over")
  };
  
  startGame = createButton("Start Game");
  startNextRound = createButton("Start Next Round");
  
  buttons["Start Over"].hide();

  currentlyPurchasing = false;

  showRange = [];
  
  
  volSlider = createSlider(0, 10, 2,1);
  volSlider.position(10, 10);
  volSlider.style('width', '80px');
  sfxSlider = createSlider(0, 10, 2,1);
  sfxSlider.position(100, 10);
  sfxSlider.style('width', '80px');

  
}

function draw() {
  background(img);
  stroke(95);
  if(screen === 0){
    mainMenu();
  }
  else if (screen === 1) {
    game();
  }
  else if (screen === 2) {
    gameOver();
  }
  else if (screen === 3){
    transitionScreen();
  }
}




function game() {
  line(width - 260, 0, width - 260, height);
  timer += deltaTime / 1000;

  let type = 1;
  buttons["Start Over"].hide();

  //randomly pick one of the indexes of maxBalloons
  //check if that index >0
  //if >0, then spawn the corresponding type of balloon
  //else, do nothing

  let possibles = [];

  for (let maxOfBalloons of track.maxBalloons) {
    if (maxOfBalloons > 0) {
      possibles.push(track.maxBalloons.indexOf(maxOfBalloons));
    }
  }
  if (timer >= track.balloonSpawnRate) {
    timer = 0;
    balloonTypeIndex = random(possibles);
    // balloonTypeIndex = 3;

    if (track.maxBalloons[balloonTypeIndex] > 0) {
      track.spawnBalloon(balloonTypeIndex + 1);
    }
  }
  //console.log(track.balloons)
  displayScore();
  track.balloonsInRangeDefense();

  track.displayTrack();
  track.displayBalloons();
  track.moveBalloons();

  // for(let balloon of track.balloons) {
  //   // console.log("BALLOON PROPERTIES: " + balloon.x + " "+ balloon.y);
  // }

  track.isGameOver();
  track.displayDefenses();
  track.displayDarts();
  // console.log("displayDarts() called");
  track.checkDarts();
  track.checkBalloons();
  track.updateRound();
  checkPreviews();
  checkMousePosition();
  //console.log(track.segments);
  // console.log(defensePreviews)
  checkMousePosition();
  hideShowButtons();
  if (showRange[0]) {
    fill(120, 100, 100, 50);
    ellipse(showRange[1].x, showRange[1].y, showRange[1].range);
  }
  if (!theme.isPlaying()) {
    theme.play();
  }
  
  vol=volSlider.value();
  svol=sfxSlider.value();
  theme.setVolume(vol/10);
  textSize(12)
  stroke("black")
  fill('black')
  strokeWeight(1)
  text("Music",10,30)
  text("SFX",100,30)
  
  
  pop.setVolume(svol/15)
  levelUp.setVolume(svol/15);
  sniperShot.setVolume(svol/15);
  laserShot.setVolume(svol/15);
  gunShot.setVolume(svol/15);
  image(dartMonkeyImage, width - 240, 130, 100, 100);
  image(glueGunnerImage, width - 120, 130, 100, 100);
  image(sniperMonkeyImage, width - 120, height/2 - 70, 100, 100);
  image(superMonkeyImage, width -240, height/2 - 70, 100, 100);
  
  //  buttons[.push(createButton("Purchase"));
  buttons["Purchase Dart Monkey"].position(width - 245, height / 2 - 100);
  buttons["Purchase Dart Monkey"].mousePressed(purchaseDartMonkey);
  //buttons.push(createButton("Faster shooting"));
  buttons["Faster Shooting"].position(width - 200, height / 2 + 160);
  buttons["Faster Shooting"].mousePressed(purchaseFasterShooting);
  //button = createButton("Longer range");
  buttons["Longer Range"].position(width - 200, height / 2 + 190);
  buttons["Longer Range"].mousePressed(purchaseLongerRange);
  
  buttons["Purchase Piercing Darts"].position(width - 200, height / 2 + 220);
  buttons["Purchase Piercing Darts"].mousePressed(purchasePiercingDarts);
  //button = createButton("Purchase");
  buttons["Purchase Glue Gunner"].position(width - 115, height / 2 - 100);
  buttons["Purchase Glue Gunner"].mousePressed(purchaseGlueGunner);
  buttons["Stronger Glue"].position(width - 200, height / 2 + 160);
  buttons["Stronger Glue"].mousePressed(purchaseStrongerGlue);
  buttons["Longer Range (Glue)"].position(width - 200, height / 2 + 190);
  buttons["Longer Range (Glue)"].mousePressed(purchaseLongerRange);
  buttons["Faster Shooting (Glue)"].position(width - 200, height / 2 + 220);
  buttons["Faster Shooting (Glue)"].mousePressed(purchaseFasterShooting);
  //button = createButton("Purchase");
  buttons["Purchase Super Monkey"].position(width - 240, height / 2 + 60);
  buttons["Purchase Super Monkey"].mousePressed(purchaseSuperMonkey);
  buttons["Longer Range (Super)"].position(width - 200, height / 2 + 160);
  buttons["Longer Range (Super)"].mousePressed(purchaseLongerRange);
  //button = createButton("Purchase");
  buttons["Purchase Sniper Monkey"].position(width - 100, height / 2 + 60);
  buttons["Purchase Sniper Monkey"].mousePressed(purchaseSniperMonkey);
  buttons["Faster Shooting (Sniper)"].position(width - 200, height / 2 + 160);
  buttons["Faster Shooting (Sniper)"].mousePressed(purchaseFasterShooting);
  
  buttons["Start Over"].hide();
}

function mainMenu() {
  if (!theme.isPlaying()) {
    theme.play();
  }
  
  buttons["Start Over"].hide();
  vol=volSlider.value();
  theme.setVolume(vol/10);
  textSize(12);
  stroke("black");
  fill('black');
  strokeWeight(1);
  text("Music",10,30);
  text("SFX",100,30);
  
  svol=sfxSlider.value();
  pop.setVolume(svol/15);
  levelUp.setVolume(svol/15);
  sniperShot.setVolume(svol/15);
  laserShot.setVolume(svol/15);
  gunShot.setVolume(svol/15);
  stroke(0);
  textSize(50);
  textFont(myFont);
  strokeWeight(5);
  line(width/2 - 130, height/2 - 275, width/2 + 100, height/2 - 275);
  strokeWeight(1);
  text("BLOONS", width/2-80, height/2-150, 100, 300);
  
  text("MONKAS TOWER DEFENSE", width/2 - 80, height/2 - 100, 100, 300);
  image(redBalloonImage, 40, height-70, 40, 50);
  image(blueBalloonImage, 230, 380, 40, 50);
  image(greenBalloonImage, 260, 100, 40, 50);
  image(yellowBalloonImage, width/2, 580, 40, 50);
  image(pinkBalloonImage, width/2 + 150, 260, 40, 50);
  image(blackBalloonImage, width/2 + 350, 260, 40, 50);
  image(whiteBalloonImage, width/2 + 250, height-70, 40, 50);
  image(dartMonkeyImage, 40, 40, 200, 200);
  image(glueGunnerImage, 740, 40, 200, 200);
  image(superMonkeyImage, 40, 380, 200, 200);
  image(sniperMonkeyImage, 740, 380, 200, 200);
  startGame.position(width/2 - 40, height/2);
  startGame.mousePressed(startTheGame);
  for (let key of Object.keys(buttons)) {
    buttons[key].hide();
  }
  startNextRound.hide();
  // volSlider.hide();
  // sfxSlider.hide();
}

function gameOver() {
  sfxSlider.hide();
  volSlider.hide();
  theme.stop();
  for (let key of Object.keys(buttons)) {
    buttons[key].hide();
  }
  buttons["Start Over"].show();
  buttons["Start Over"].position(width/2,height-200);
  buttons["Start Over"].mousePressed(startOver);
  
  textSize(50);
  textFont(myFont);
  
  stroke('red');
  text("GAME OVER", width/2 - 140, height/2 - 100);
  text(`Round: ${track.round}`,width/2 - 100, height/2 + 50);
  
}

function startOver() {
  track.round = 1;
  track.score = 500;
  track.lives = 30;
  buttons["Start Over"].hide();

  setup();
}

function startTheGame() {
  
  startGame.hide();
  screen = 1;
  for (let key of Object.keys(buttons)) {
    buttons[key].show();
  }
  volSlider.show();
  sfxSlider.show();
}

function endGame(){
  screen = 2;
}

function transitionScreen(){
  buttons["Start Over"].hide();
  if (!theme.isPlaying()) {
    theme.play();
  }
  
  vol=volSlider.value();
  theme.setVolume(vol/10);
  textSize(12)
  stroke("black")
  fill('black')
  strokeWeight(1)
  text("Music",10,30)
  text("SFX",100,30)
  
  svol=sfxSlider.value();
  pop.setVolume(svol/15)
  levelUp.setVolume(svol/15);
  sniperShot.setVolume(svol/15);
  laserShot.setVolume(svol/15);
  gunShot.setVolume(svol/15);
  stroke('white');
  line(width - 260, 0, width - 260, height);
  timer += deltaTime / 1000;

  startNextRound.position(width - 180, height/2 + 300);
  startNextRound.show();
  startNextRound.mousePressed(moveToNextRound);
  // let type = 1;

  //randomly pick one of the indexes of maxBalloons
  //check if that index >0
  //if >0, then spawn the corresponding type of balloon
  //else, do nothing

  // let possibles = [];

//   for (let maxOfBalloons of track.maxBalloons) {
//     if (maxOfBalloons > 0) {
//       possibles.push(track.maxBalloons.indexOf(maxOfBalloons));
//     }
//   }
//   if (timer >= track.balloonSpawnRate) {
//     timer = 0;
//     balloonTypeIndex = random(possibles);
//     // balloonTypeIndex = 3;

//     if (track.maxBalloons[balloonTypeIndex] > 0) {
//       track.spawnBalloon(balloonTypeIndex + 1);
//     }
  // }
  //console.log(track.balloons)
  displayScore();
  // track.balloonsInRangeDefense();

  track.displayTrack();
  // track.displayBalloons();
  // track.moveBalloons();

  // for(let balloon of track.balloons) {
  //   // console.log("BALLOON PROPERTIES: " + balloon.x + " "+ balloon.y);
  // }

  track.isGameOver();
  track.displayDefenses();
  track.displayDarts();
  // console.log("displayDarts() called");
  track.checkDarts();
  // track.checkBalloons();
  track.updateRound();
  checkPreviews();
  checkMousePosition();
  //console.log(track.segments);
  // console.log(defensePreviews)
  checkMousePosition();
  hideShowButtons();
  if (showRange[0]) {
    fill(120, 100, 100, 50);
    ellipse(showRange[1].x, showRange[1].y, showRange[1].range);
  }
  
  
  image(dartMonkeyImage, width - 240, 130, 100, 100);
  image(glueGunnerImage, width - 120, 130, 100, 100);
  image(sniperMonkeyImage, width - 120, height/2 - 70, 100, 100);
  image(superMonkeyImage, width -240, height/2 - 70, 100, 100);
  
  //  buttons[.push(createButton("Purchase"));
  buttons["Purchase Dart Monkey"].position(width - 245, height / 2 - 100);
  buttons["Purchase Dart Monkey"].mousePressed(purchaseDartMonkey);
  //buttons.push(createButton("Faster shooting"));
  buttons["Faster Shooting"].position(width - 200, height / 2 + 160);
  buttons["Faster Shooting"].mousePressed(purchaseFasterShooting);
  //button = createButton("Longer range");
  buttons["Longer Range"].position(width - 200, height / 2 + 190);
  buttons["Longer Range"].mousePressed(purchaseLongerRange);
  
  buttons["Purchase Piercing Darts"].position(width - 200, height / 2 + 220);
  buttons["Purchase Piercing Darts"].mousePressed(purchasePiercingDarts);
  //button = createButton("Purchase");
  buttons["Purchase Glue Gunner"].position(width - 115, height / 2 - 100);
  buttons["Purchase Glue Gunner"].mousePressed(purchaseGlueGunner);
  buttons["Stronger Glue"].position(width - 200, height / 2 + 160);
  buttons["Stronger Glue"].mousePressed(purchaseStrongerGlue);
  buttons["Longer Range (Glue)"].position(width - 200, height / 2 + 190);
  buttons["Longer Range (Glue)"].mousePressed(purchaseLongerRange);
  buttons["Faster Shooting (Glue)"].position(width - 200, height / 2 + 220);
  buttons["Faster Shooting (Glue)"].mousePressed(purchaseFasterShooting);
  //button = createButton("Purchase");
  buttons["Purchase Super Monkey"].position(width - 240, height / 2 + 60);
  buttons["Purchase Super Monkey"].mousePressed(purchaseSuperMonkey);
  buttons["Longer Range (Super)"].position(width - 200, height / 2 + 160);
  buttons["Longer Range (Super)"].mousePressed(purchaseLongerRange);
  //button = createButton("Purchase");
  buttons["Purchase Sniper Monkey"].position(width - 100, height / 2 + 60);
  buttons["Purchase Sniper Monkey"].mousePressed(purchaseSniperMonkey);
  buttons["Faster Shooting (Sniper)"].position(width - 200, height / 2 + 160);
  buttons["Faster Shooting (Sniper)"].mousePressed(purchaseFasterShooting);
  
}

function moveToNextRound(){
  startNextRound.hide();
  screen = 1;
}
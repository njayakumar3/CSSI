/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/

class Track {
  constructor(segments) {
    this.segments = segments;
    this.balloons = [];
    this.defenses = [];
    this.money = 500;
    this.lives = 100;
    this.round = 1;
    this.balloonSpawnRate = 1;
    // [red, blue, green, yellow]
    this.maxBalloons = [10, 0, 0, 0,0,0,0];
  }

  spawnBalloon(type) {
    //console.log("tracksegment1"+track.segments[0].centerX+" "+ track.segments[0].centerY)
    this.balloons.push(
      new Balloon(type, track.segments[0].centerX, track.segments[0].centerY)
    );
    this.maxBalloons[type - 1]--;
  }

  updateRound() {
    
    
    //check counter and length of balloons list
    // this.maxBalloons = this.round * 10;
    if(this.balloons.length <= 0 && max(this.maxBalloons)==0) {
      this.round++;
      this.money += 50;
      screen = 3;
      levelUp.play();
      this.balloonSpawnRate*=.9;
      this.maxBalloons[0] = this.round * 10;
      if (this.round > 1) {
        this.maxBalloons[1] = (this.round - 1) * 10;
      }
      if (this.round > 2) {
        this.maxBalloons[2] = (this.round - 2) * 10;
      }
      if (this.round > 3) {
        this.maxBalloons[3] = (this.round - 3) * 10;
      }
      if (this.round > 4) {
        this.maxBalloons[4] = (this.round - 4) * 10;
      }
      if (this.round > 5) {
        this.maxBalloons[5] = (this.round - 5) * 10;
      }
      if (this.round > 6) {
        this.maxBalloons[6] = (this.round - 6) * 10;
      }
    }
    
    
  }

  moveBalloons() {
    for (let balloon of this.balloons) {
      if (balloon.segmentIndex >= track.segments.length - 1) {
        track.lives -= balloon.type;
        this.balloons.splice(this.balloons.indexOf(balloon), 1);
        continue;
      }
    
      // console.log("got past if statement")
      let dx = balloon.x - track.segments[balloon.segmentIndex + 1].centerX;
      let dy = balloon.y - track.segments[balloon.segmentIndex + 1].centerY;
      // console.log(balloon.x)
      balloon.x -= (dx * balloon.speed) / Math.sqrt(dx ** 2 + dy ** 2);
      balloon.y -= (dy * balloon.speed) / Math.sqrt(dx ** 2 + dy ** 2);
      if (
        collidePointCircle(
          track.segments[balloon.segmentIndex + 1].centerX,
          track.segments[balloon.segmentIndex + 1].centerY,
          balloon.x,
          balloon.y,
          balloon.size
        )
      ) {
        balloon.segmentIndex++;
        // console.log("SEGMENT IND: " + balloon.segmentIndex);
      }
    }
  }

  displayBalloons() {
    for (let balloon of this.balloons) {
      balloon.display();
    }
  }

  isGameOver() {
    if (this.lives <= 0) {
      endGame();
    }
  }

  checkBalloons() {
    let lastSegment = track.segments[track.segments.length - 1];
    for (let balloon of this.balloons) {
      if (balloon.type < 1) {
        this.balloons.splice(this.balloons.indexOf(balloon), 1);
      } else if (
        collideRectCircle(
          lastSegment.centerX - lastSegment.width / 2,
          lastSegment.centerY - lastSegment.length / 2,
          lastSegment.width,
          lastSegment.length
        )
      ) {
      }
    }
  }
  displayDefenses() {
    for (let def of this.defenses) {
      def.display();
    }
  }
  displayDarts() {
    if (this.defenses.length > 0){
    for (let def of this.defenses) {
      def.shootDarts();
      if (def.darts.length > 0) {
      for (let dart of def.darts) {
        
        dart.display();
        
      }
      }
    }
    }
    // console.log("DISPLAYING");
  }
  displayTrack() {
    for (let trackSeg of this.segments) {
      trackSeg.display();
    }
  }

  balloonsInRangeDefense() {
    
    for (let defense of this.defenses) {
      defenseTimers.push(defense.attackSpeed);
      //console.log("DARTS: " + defense.darts);
    }

    for (let i = 0; i < this.defenses.length; i++) {
      if (defenseTimers[i] > 0) {
        defenseTimers[i]-=deltaTime/1000;
      } else {
        for (let j = 0; j < this.balloons.length; j++) {
          if (this.defenses[i].inRange(this.balloons[j])) {
            // console.log("Shooting at " + this.balloons[j]);
            this.defenses[i].createDart(this.balloons[j]);
            
            defenseTimers[i] = this.defenses[i].attackSpeed;
            break;
          }
        }
      }
    }
  }
  
  checkDarts(){
    for(let def of this.defenses){
      def.hit();
      def.checkDart();
    }
  }
}

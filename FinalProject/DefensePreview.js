/* global noFill, rectMode, CENTER, deltaTime, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round,
          collideCircleCircle*/


class DefensePreview {
  constructor(defense) {
    this.defense = defense;
    (this.x = mouseX), (this.y = mouseY);
  }

  display() {
    let hit = false;
    
    for (let seg of track.segments) {
      hit = collideRectCircle(
          seg.centerX - 30,
          seg.centerY - 30,
          60,
          60,
          mouseX,
          mouseY,
          defensePreviews[0].defense.size
        );
      if (hit) {
        break;
      }
    }
    
    let overlap = false;
    for (let def of track.defenses) {
      overlap = collideCircleCircle(def.x, def.y, def.size, mouseX,
          mouseY,
          defensePreviews[0].defense.size);
      if (overlap) {
        break;
      }
    }
    if(overlap || hit || mouseX >= width-260){
      
        fill(0,100,100,50)
    }else{fill(120, 100, 100, 50)
}  
      
    
    //noFill();
    stroke('white')
    ellipse(mouseX, mouseY, this.defense.range);
    //Ellipse of defense itself
    fill("black");
    ellipse(mouseX, mouseY, this.defense.size);
  }
}
/* globals createCanvas background noFill strokeWeight stroke ellipse rect fill star beginShape TWO_PI cos sin vertex endShape PI rotate*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function drawLogo() {
  // Code here runs continuously
  background(255);
  strokeWeight(4);
  stroke(130,138,143);
  rotate(PI/6.0);
  
  noFill();
  ellipse(300, 100, 140);
  fill(164,170,174);
  let x = 300
  let y = 100
  let radius1 = 5
  let radius2 = 70
  
  beginShape();
  let angle = TWO_PI / 3;
  let halfAngle = angle / 2.0;
  for (let a = 0; a < TWO_PI + angle; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape();
  rotate(-PI/6.0);
  
  
  



}

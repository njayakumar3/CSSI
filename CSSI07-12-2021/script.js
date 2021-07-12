/* globals createCanvas background noFill strokeWeight stroke ellipse rect fill*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function drawRings() {
  // Code here runs continuously
  noFill();
  background(255);
  strokeWeight(2);
  //Ring 1: Blue
  stroke(0, 133, 199);
  ellipse(100, 100, 50);

  //Ring 2: Yellow
  stroke(244, 195, 0);
  ellipse(130, 130, 50);

  //Ring 3: Black
  stroke(0, 0, 0);
  ellipse(160, 100, 50);

  //Ring 4: Green
  stroke(0, 159, 61);
  ellipse(190, 130, 50);

  //Ring 5: Red
  stroke(223, 0, 36);
  ellipse(220, 100, 50);

  
}

class GlueDart {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.initx=x;
    this.inity=y;
    this.speed = 15;
    this.existence;
    this.size = 15;
    this.target=target;
    this.targetx=target.x;
    this.targety=target.y;
  }

  shootDart() {
    
    let dx = this.targetx - this.initx;
    let dy = this.targety - this.inity;
    this.x += (dx * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
    this.y += (dy * this.speed) / Math.sqrt(dx ** 2 + dy ** 2);
  }

  display() {
    fill('yellow');
    stroke('yellow')
    ellipse(this.x, this.y, this.size);
  }
}
class Bubble {
  constructor(x, y, r = 50, speed = 0, dir = 1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.dir = dir;
  }
  move() {
    if (this.dir == 1) {
      this.speed += 0.5;
      this.y += this.speed;
    } else if (this.dir == -1) {
      this.speed -= 0.5;
      this.y -= this.speed;
    }

    if (this.y + this.r >= height || this.y - this.r <= 0) {
      this.dir = -this.dir;
    }
    if(this.y + this.r > height){
      this.y = height - this.r;
    }
  }
  show() {
    this.time += 1;
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}

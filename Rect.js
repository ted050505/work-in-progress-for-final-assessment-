class Rect {
  constructor(posX, posY, w) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.w = w;

    this.mass = random(0.8,1.5);
  }

  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }

  chkEdge() {
    if(this.pos.y >= height - this.w) {
      this.vel.y *= -1/2;
      // this.vel.set(0,0);
      this.pos.y = height - this.w;
    }

    if(this.pos.y <= 0) {
      this.vel.y *= -1/2;
      // this.vel.set(0,0);
      this.pos.y = 0;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
  }

  display() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }
}

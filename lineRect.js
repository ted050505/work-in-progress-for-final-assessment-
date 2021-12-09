class lineRect {
  constructor(posX, posY, w, ran) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.w = w;

    this.mass = random(0.8,1.5);

    var this_pos_y = this.pos.y + ran;
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

    if(this.pos.y <= height/2) {
      this.vel.y *= -1/2;
      this.pos.y = height/2;
    }
  }

  // set(ran) {
  //   var this_pos_y = (this.pos.y + ran);
  //   var this_pos_y_2 = this_pos_y;
  // }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
  }

  display() {
    line(this.pos.x + this.w/2, this_pos_y, this.pos.x + this.w/2, height);
    rect(this.pos.x, this_pos_y, this.w, this.w);
  }
}

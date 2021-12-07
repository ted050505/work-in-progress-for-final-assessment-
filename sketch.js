let myrect;
let slider;

function setup() {
  createCanvas(600, 600);
  myrect = new Rect(width/2, height/2, 70);
  slider = createSlider(0, 1, 0, 0);
  slider.position(10, 10);
}

function draw() {
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  
  background(220);
  
  let gravity = createVector(0, val);
  myrect.applyForce(gravity);
  
  myrect.chkEdge();
  myrect.update();
  myrect.display();
  
  print(myrect.vel.y);
}
let myrect = [];
let slider;

function setup() {
  createCanvas(600, 600);
  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height/2, 50);
  }
  slider = createSlider(0, 1, 0, 0);
  slider.position(10, 10);
}

function draw() {
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  
  background(220);
  
  let gravity = createVector(0, val);
  
  for(let i=0; i<10; i++) {
    myrect[i].applyForce(gravity);
  
    myrect[i].chkEdge();
    myrect[i].update();
    myrect[i].display();
  }
}
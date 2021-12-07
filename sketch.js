let world;

let myrect = [];
let slider;

let boundaries = [];
let boxes = [];

function setup() {
  createCanvas(600, 600);
  
  world = createWorld();
  
  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height/2, 50);
  }
  slider = createSlider(0, 1, 0, 0);
  slider.position(10, 10);
  
  boundaries.push(new Boundary(width, height, width*2, 0));
  for(let i=0;i<10;i++) {
   let b = new Box(random(width), 100);
   boxes.push(b);
  }
}

function draw() {
  let val = map(slider.value(), 0, 1, 0, 0.01);
  
  background(220);
  
  let timeStep = val;
  world.Step(timeStep, 30, 10);

  
//   let gravity = createVector(0, val);
  
//   for(let i=0; i<10; i++) {
//     myrect[i].applyForce(gravity);
//     myrect[i].chkEdge();
//     myrect[i].update();
//     myrect[i].display();
//   }
  

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
  }
}
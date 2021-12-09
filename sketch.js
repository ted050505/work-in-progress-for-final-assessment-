let myrect = [];
let linerect = [];
let slider;

let osc, playing, freq, amp;

function setup() {
  createCanvas(500, 700);

  osc = new p5.Oscillator('sine');

  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height/2, 50);
  }
  for(let i=0; i<3; i++) {
    linerect[i] = new lineRect(random(width), height/2, 50, random(5,10));
  }
  slider = createSlider(0, 1, 0, 0);
  slider.position(10, 10);
}

function draw() {
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  let freq = map(slider.value(), 0, 1, 100, 400);

  background(220);

  let gravity = createVector(0, val);

  for(let i=0; i<10; i++) {
    myrect[i].applyForce(gravity);

    myrect[i].chkEdge();
    myrect[i].update();
    myrect[i].display();
  }

  for(let i=0; i<3; i++) {
    linerect[i].applyForce(gravity);

    linerect[i].chkEdge();
    linerect[i].update();
    linerect[i].display();
  }

  if(freq < 201) {
    playOscillator();
    osc.amp(0.1, 0.1);
  }

  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }

  print(freq);
}



function playOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.5);
  playing = false;
}

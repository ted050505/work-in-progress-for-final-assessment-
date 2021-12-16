let myrect = [];
let linerect = [];
let slider;

let osc, playing, freq, amp;

function setup() {
  createCanvas(1280, 780);

  osc = new p5.Oscillator('sine');

  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height/2, 50);
  }
  for(let i=0; i<3; i++) {
    linerect[i] = new lineRect(random(width), height/2, 50);
  }
  slider = createSlider(0, 1, 0, 0);
  slider.position(10, 10);
  colorMode(HSB,50,50,20);
}

function draw() {
  // 슬라이더 값 받기.
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  let freq = map(slider.value(), 0, 1, 100, 400);

  background(100);

  let gravity = createVector(0, val);

  // 상자들 제어.
  for(let i=0; i<10; i++) {
    myrect[i].applyForce(gravity);

    myrect[i].chkEdge();
    myrect[i].update();
    myrect[i].display();
  }

  // 줄에 묶인 상자들 제어.
  for(let i=0; i<3; i++) {
    linerect[i].applyForce(gravity);

    linerect[i].chkEdge();
    linerect[i].update();
    linerect[i].display();
  }

  if(freq < 201) {
    playOscillator();
  }

  if(playing) {
    osc.freq(freq, 0.3);
    osc.amp(100, 0.1);
  }else if(playing == false){
    osc.amp(0, 0);
  }
}

function playOscillator() {
  osc.start();
  playing = true;
}
function mouseReleased() {
  osc.stop();
  playing = false;
}

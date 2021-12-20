let myrect = [];
let linerect = [];
let slider;

let osc, playing, freq, amp;
let spaceVal = 0;
let inputtoggle = false;

function setup() {
  createCanvas(1280, 780);

  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height, 50);
  }
  for(let i=0; i<7; i++) {
    linerect[i] = new lineRect(random(width), height, 50);
  }

  osc = new p5.Oscillator('sine');

  slider = createSlider(0, 1, 0, 0.1);
  slider.center();
  slider.position((width/2)-100, (height+30));
  slider.size(300);

  // colorMode(HSB,50,50,20);
}

function draw() {
  background(150);

  // 슬라이더 값 받기.
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  let freq = map(slider.value(), 0, 1, 200, 500);

  inputSpacebarChk();
  if(inputtoggle) {
    slider.value(spaceVal);
  }else if(!inputtoggle) {
    slider.value();
  }
  speedValUpdate();

  let gravity = createVector(0, val);

  // 상자들 제어.
  for(let i=0; i<10; i++) {
    myrect[i].applyForce(gravity);
    myrect[i].chkEdge();
    myrect[i].update();
    myrect[i].display();
  }

  // 줄에 묶인 상자들 제어.
  for(let i=0; i<7; i++) {
    linerect[i].applyForce(gravity);
    linerect[i].chkEdge();
    linerect[i].update();
    linerect[i].display();
  }
  chkSliderValue_OSC();
}

function playOscillator() {
  osc.start();
  playing = true;
}
function mouseReleased() {
  osc.stop();
  playing = false;
}

function chkSliderValue_OSC() {
  if(freq < 500) {
    playOscillator();
  }
  if(playing) {
    osc.freq(freq, 0.1);
    osc.amp(1, 0.1);
  }else if(playing == false){
    osc.amp(0, 0.1);
  }
}

function inputSpacebarChk() {
  if(keyIsPressed == true && keyCode == '32') {
      inputtoggle = true;
      spaceVal += 0.1;
  }else{
      inputtoggle = false;
      spaceVal -= 0.1;
      for(let i=spaceVal; i>0; i--) {
        slider.value(spaceVal);
        spaceVal -= 0.1;
      }
  }
}

function speedValUpdate() {
  if(spaceVal <= 0) {
    spaceVal = 0;
    spaceVal += 0.1;
  }
  if(spaceVal >= 1) {
    spaceVal = 1;
    spaceVal -= 0.1;
  }
}

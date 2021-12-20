let myrect = [];
let linerect = [];
let slider;

let osc, playing, freq, amp;
let spaceVal = 0;
let inputtoggle = false;
let soundFile;
let filter;

function preload() {
  soundFormats('mp3');
  soundFile = loadSound('sound/JJH_Drone.mp3')
}

function setup() {
  createCanvas(1860, 650);

  osc = new p5.Oscillator('sine');

  for(let i=0; i<10; i++) {
    myrect[i] = new Rect(random(width), height, 50);
  }
  for(let i=0; i<7; i++) {
    linerect[i] = new lineRect(random(width), height, 50);
  }

  slider = createSlider(0, 1, 0, 0.01);
  slider.center();
  slider.position((width/2)-100, (height+30));
  slider.size(300);

  soundFile.loop();

  filter = new p5.LowPass();

  soundFile.disconnect();
  soundFile.connect(filter);

  soundFile.setVolume(0.1);
}

function draw() {
  background(150);

  // 슬라이더 값 받기.
  let val = map(slider.value(), 0, 1, 0.1, -0.1);
  let freq = map(slider.value(), 0, 1, 200, 500);

  filter.freq(freq);
  filter.res(10);

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
  // chkSliderValue_OSC();
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
  if(freq < 300) {
    playOscillator();
    osc.amp(0.1, 0.1);
  }
  if(playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
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

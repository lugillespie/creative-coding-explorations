let mySound;
let amplitude;

function preload() {
  mySound = loadSound("applause.mp3");
  myImage = loadImage("assets/moss.jpg");
}

let mossList = [];
let x_coord = 100;
let fonts = [
  "Fungal-Grow0Thickness500",
  " Fungal-Grow100Thickness500",
  "Fungal-Grow200Thickness1000",
  "Fungal-Grow300Thickness1000",
  "Fungal-Grow400Thickness1000",
  "Fungal-Grow500Thickness1000",
  "Fungal-Grow600Thickness1000",
  "Fungal-Grow700Thickness1000",
  "Fungal-Grow800Thickness1000",
  "Fungal-Grow900Thickness1000",
];
let currentFontIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitude = new p5.Amplitude();
  amplitude.setInput(mySound);
  textFont(fonts[currentFontIndex]);
}

function draw() {
  background("#CAC8C4");
  if (mySound.isPlaying()) {
    if (frameCount % 15 === 0) {
      // value between 0.0 and 1.0
      let level = amplitude.getLevel();
      let rectSize = map(level, 0, 1, 25, 5000);

      mossList.push({
        x: x_coord,
        y: height / 2,
        w: 25,
        h: rectSize,
        occlusion_y: getRandomIntInclusive(
          height / 2 - rectSize / 2,
          height / 2 + rectSize / 2
        ),
        occlusion_w: getRandomIntInclusive(50, rectSize),
      });

      x_coord += 25;
    }

    noStroke();
    fill(0, 150, 255);
    mossList.forEach((moss) => {
      imageMode(CENTER);
      image(myImage, moss.x, moss.y, moss.w, moss.h);

      noStroke();
      fill("#CAC8C4");
      rectMode(CENTER);
      rect(moss.x, moss.occlusion_y, moss.w, moss.occlusion_w);
    });

    if (frameCount % 120 === 0) {
      currentFontIndex = (currentFontIndex + 1) % fonts.length;
    }

    textFont(fonts[currentFontIndex]);
  }

  textSize(28);
  fill("#DAFE09");
  text("Jade moss on the trunk intensifies like applause", 20, 45);
}

function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.pause();
  } else {
    mySound.play();
  }
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

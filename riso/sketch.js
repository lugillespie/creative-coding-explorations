let blue, orange, mediumblue, pink, green;

let img, realtreeimg;

function preload() {
    img = loadImage('assets/moss.jpg');
    realtreeimg = loadImage('assets/realtree.jpg');
}

async function setup(){
    createCanvas(windowWidth, windowHeight);
    blue = new Riso("CORNFLOWER");
    orange = new Riso("SUNFLOWER");
    mediumblue = new Riso("MEDIUMBLUE");
    pink = new Riso("FLUORESCENTPINK");
    green = new Riso("KELLYGREEN");

    for(let i = 0; i < 5; i ++) {
        img.resize(getRandomNumber(20, 300), 0); 
        realtreeimg.resize(getRandomNumber(20, 300), 0); 
        blue.fill(getRandomNumber(100, 255));
        blue.image(img, getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
        blue.fill(getRandomNumber(100, 255));
        blue.image(img,  getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
    }

    for(let i = 0; i < 3; i ++) {
        img.resize(getRandomNumber(20, 300), 0); 
        realtreeimg.resize(getRandomNumber(20, 300), 0); 
        orange.fill(getRandomNumber(100, 255));
        orange.image(img, getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
        orange.fill(getRandomNumber(100, 255));
        orange.image(img,  getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
    }

    for(let i = 0; i < 3; i ++) {
        img.resize(getRandomNumber(20, 300), 0); 
        realtreeimg.resize(getRandomNumber(20, 300), 0); 
        green.fill(getRandomNumber(100, 255));
        green.image(img, getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
        green.fill(getRandomNumber(100, 255));
        green.image(img,  getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
    }

    for(let i = 0; i < 7; i ++) {
        img.resize(getRandomNumber(20, 300), 0); 
        realtreeimg.resize(getRandomNumber(20, 300), 0); 
        pink.fill(getRandomNumber(100, 255));
        pink.image(img, getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
        pink.fill(getRandomNumber(100, 255));
        pink.image(img,  getRandomNumber(0, windowWidth/2), getRandomNumber(0, windowHeight/2));
    }

    // mediumblue.fill(128); //set opacity
    // mediumblue.rect(20, 20, 100, 100); //draw rect to blue layer

    // mediumblue.fill(255); // completely opaque
    // mediumblue.ellipse(0, 0, 100, 100); //draw ellipse on blue layer

    // mediumblue.fill(50); // fairly transparent
    // mediumblue.ellipse(50, 50, 100, 100);

    // mediumblue.fill(3); // almost invisible
    // mediumblue.ellipse(75, 75, 100, 100);

    drawRiso(); //draw to screen

  }

function draw() {
    // background(220);
}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min
}
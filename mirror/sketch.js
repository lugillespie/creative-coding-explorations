function setup() {
    createCanvas(800, 600);

    background(220);

    beginShape();
    
    vertex(width / 2, height);
    vertex(width / 2, 0);
    endShape()
}

let count = 0
let shape_count = 0

let divTextReflected = false

function draw() {
    count++;

    if(count == 64){
        count = 0
        shape_count++;
        let x1 = getRandomNumber(0, width / 2)
        let y1 = getRandomNumber(0, height)

        let degree1 = getRandomNumber(-90, 90)
        let radian1 = degree1 * (PI/180)

        let degree2 = getRandomNumber(-90, 90)
        let radian2 = degree2 * (PI/180)

        let randomColor = color(getRandomNumber(0, 255), getRandomNumber(0, 255), getRandomNumber(0, 255))
        fill(randomColor)

        beginShape();

        if (shape_count == 5) {
            circle(x1, y1, 50)

            divTextReflected = !divTextReflected
        } else {
            arc(x1, y1, 50, 50, radian1, radian2, PIE)
        }    

        let reflected_x1 = width - x1

        let reflected_degree1 = 180 - degree1
        let reflected_radian1 = reflected_degree1 * (PI/180)

        let reflected_degree2 = 180 - degree2
        let reflected_radian2 = reflected_degree2 * (PI/180)

        if (shape_count == 5) {
            circle(reflected_x1, y1, 50)
        } else {
            arc(reflected_x1, y1, 50, 50, reflected_radian2, reflected_radian1, PIE)
        }

        console.log(x1)
        console.log(reflected_x1)
        if (shape_count == 5) {
            shape_count = 0
        }
        endShape();

        if(divTextReflected){
            document.getElementById("text").innerText = "ɿoɿɿim"
        } else {
            document.getElementById("text").innerText = "mirror"
        }
        
    }

}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min
}

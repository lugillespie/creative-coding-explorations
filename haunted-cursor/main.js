const myDiv = document.getElementById('centerDiv');

const cursorImages = [];
const typesOfMouse = ["follow", "opX", "opy", "opXY"]

myDiv.addEventListener('mouseenter', () => {
    myDiv.style.opacity = '1';
    // myDiv.style.border = '2px dashed #000';

    const img = document.createElement('img');
    img.src = 'img/cursor.png';

    img.style.position = 'fixed';
    img.style.width = '20px';
    img.style.height = '20px';
    img.style.objectFit = 'contain';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '9999';

    document.body.appendChild(img);

    let selector = Math.floor(Math.random() * 4);

    cursorImages.push({
        element: img,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        delay: cursorImages.length * 0.08,
        type: typesOfMouse[selector]
    });
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursors() {

    cursorImages.forEach((cursor) => {
        switch (cursor.type) {
            case "follow":
                cursor.x += (mouseX - cursor.x) * (0.08 + cursor.delay);
                cursor.y += (mouseY - cursor.y) * (0.08 + cursor.delay);
                break;
            case "opX":
                cursor.x += ((window.innerWidth - mouseX) - cursor.x) * (0.08 + cursor.delay);
                cursor.y += (mouseY - cursor.y) * (0.08 + cursor.delay);
                break;
            case "opY":
                cursor.x += (mouseX - cursor.x) * (0.08 + cursor.delay);
                cursor.y += ((window.innerHeight - mouseY) - cursor.y) * (0.08 + cursor.delay);
                break;
            case "opXY":
                cursor.x += ((window.innerWidth - mouseX) - cursor.x) * (0.08 + cursor.delay);
                cursor.y += ((window.innerHeight - mouseY) - cursor.y) * (0.08 + cursor.delay);
                break;
            default:
                cursor.x += (mouseX - cursor.x) * (0.08 + cursor.delay);
                cursor.y += (mouseY - cursor.y) * (0.08 + cursor.delay);
        }

        cursor.element.style.left = `${cursor.x - 10}px`;
        cursor.element.style.top = `${cursor.y - 10}px`;
    });

    requestAnimationFrame(animateCursors);
}

animateCursors();
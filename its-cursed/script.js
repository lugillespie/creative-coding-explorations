let windowOne;

let counter = 0

function openPopup1() {
    const width = 400;
    const height = 300;

    const left = Math.floor(Math.random() * (screen.availWidth - width));
    const top = Math.floor(Math.random() * (screen.availHeight - height));

    windowOne = window.open(
        '/its-cursed/shriek/boo.html',
        'boo' + String(counter),
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    counter++;
}

var interval = window.setInterval(function () {
    if (windowOne && windowOne.closed) {
            openPopup1()
            // window.clearInterval(interval);
        }
}, 500);


document.getElementById("test").addEventListener("click", () =>{
    openPopup1()
})
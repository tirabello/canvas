const color = document.querySelector('input');
let screen = document.querySelector('canvas');

let defaultColor = 'black';
let canDraw = false;
let ctx = screen.getContext('2d'); // ctx = context

color.oninput = () => {
    defaultColor = color.value;
};

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

function mouseDownEvent(e) {
    canDraw = true;
    updateMousePosition(e);
}

function mouseMoveEvent(e) {
    if (!canDraw) return;
    draw(e.pageX, e.pageY);
    updateMousePosition(e);
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = defaultColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function updateMousePosition(e) {
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function clearBoard() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


let panel;
let pos;
let lastd;
let original=null, zoomed=null;
let socket;
let bot_cells = [];

function setup() {
    // socket = io.connect('http://localhost:3333');
    socket = io.connect();
    socket.on('updated_state', updateState);
    
    createCanvas(windowWidth, windowHeight - 60);

    pos = createVector(0, 0);
    lastd = createVector(0, 0);

    panel = new ControlPanel();
}

function updateState(newState) {
    bot_cells = newState.bot_cells;
}

function draw() {
    const usedCanv = this;
    // const usedCanv = original;

    usedCanv.background(220);

    cross(usedCanv);
    // smallVect();
    usedCanv.translate(pos.x, pos.y);
    
    // usedCanv.translate(width/2, height/2);
    panel.zoom.update(usedCanv);


    drawCells(usedCanv);

}

function drawCells(canv) {
    repeat(bot_cells.length, (i) => {
        let cell = bot_cells[i];
        canv.fill(cell.color.r, cell.color.g, cell.color.b, 200);
        canv.circle(cell.x, cell.y, cell.diameter);
    });
    
}


function mousePressed() {
    lastd.x = mouseX;
    lastd.y = mouseY;
}


function mouseDragged() {
    let x = mouseX;
    let y = mouseY;
    let sc = keyIsDown(32) ? 1 : panel.zoom.ivalue();
    pos.x += (x - lastd.x) * sc;
    pos.y += (y - lastd.y) * sc;
    lastd.x = x;
    lastd.y = y;
}


function repeat(times, func) {
    for (let i = 0; i < times; i++) {
        func(i);
    }
}



let panel;
let pos;
let lastd;
let original=null, zoomed=null;
let socket;
let bot_cells = [];
let boxes = [];
let camp = null, walls=[];

function setup() {
    // socket = io.connect('http://localhost:3333');
    socket = io.connect();
    socket.on('updated_state', updateState);
    
    createCanvas(windowWidth, windowHeight - 60);

    pos = createVector(0, 0);
    lastd = createVector(0, 0);

    panel = new ControlPanel();
}
let mostrou = false;
function updateState(newState) {
    bot_cells = newState.bot_cells;
    boxes = newState.boxes;
    camp = newState.camp_specs;
    walls = newState.walls;    
}

function draw() {
    const usedCanv = this;
    // const usedCanv = original;

    usedCanv.background(0);
    
    cross(usedCanv);
    // smallVect();
    usedCanv.translate(pos.x, pos.y);
    
    // usedCanv.translate(width/2, height/2);
    panel.zoom.update(usedCanv);
    
    // console.log(`${mouseX} ${mouseY}`)
    
    fill(255);
    if(camp) {
        usedCanv.rectMode(CENTER);
        usedCanv.rect(camp.pos.x, camp.pos.y, camp.size.x, camp.size.y);
        if(!mostrou) {
            console.log(`camp`);
            console.log(camp);
            console.log(`walls`);
            console.log(walls);
            //
            mostrou = true;
        }
    }
        // usedCanv.rect(0,0, width, height);
    drawCells(usedCanv);
    drawBoxes(usedCanv);
    // fill('blue'); circle(0, 0, 30);
    // usedCanv.rect(0, 600, 600, 60);
    // let p = pred();
    // fill('red');
    // usedCanv.circle(p.x, p.y, 30);
    
    
}

function drawCells(canv) {
    repeat(bot_cells.length, (i) => {
        let cell = bot_cells[i];
        canv.fill(cell.color.r, cell.color.g, cell.color.b, 200);
        canv.circle(cell.x, cell.y, cell.diameter);
    });
}

function drawBoxes(canv) {
    repeat(boxes.length, (i) => {
        let box = boxes[i];
        canv.push();
        canv.fill(box.color.r, box.color.g, box.color.b, 200);
        // if(i == 0) {
        //     console.log(`box.angle ${box.angle}`);
        // }
        canv.translate(box.x, box.y);
        canv.rotate(box.angle);
        canv.rectMode(CENTER);
        canv.rect(0, 0, box.w, box.h);
        canv.pop();
    });
}

function mousePressed() {
    lastd.x = mouseX;
    lastd.y = mouseY;
}

function pred() {
    let sc = keyIsDown(32) ? 1 : panel.zoom.ivalue();
    let px = -pos.x + (mouseX-width/2) * sc + width/2;
    let py = -pos.y + (mouseY-height/2) * sc + height/2;

    return {x:px, y:py};
}

function mouseClicked() {
    
    // let px = -pos.x / sc + mouseX / sc;
    // let py = -pos.y / sc + mouseY / sc;
    socket.emit('new_cell', pred());
}

function keyPressed() {
    if(key === 'c') {
        
    }
    // if(key === 'n') {
    //     socket.emit('next_update', {});
    // }
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


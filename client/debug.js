
function cross(canv) {
    canv.push();
    canv.strokeWeight(4);
    canv.stroke('red');
    let ch = width/2;
    let cv = height/2;
    let s = 20;
    canv.line(ch, cv-s, ch, cv+s);
    canv.line(ch-s, cv, ch+s, cv);
    canv.pop();
}

function smallVect() {
    let hw = width/2;
    let hh = height/2;
    let v0 = createVector(hw, hh);
    let v1 = createVector(mouseX, mouseY);
    v1.sub(v0);
    drawArrow(v0, v1, 'red');
}

function makerect() {
    let rx = width;
    let ry = height;
    let z = panel.zoom.value();

    rx = floor(rx / (z));
    ry = floor(ry / (z));
    
    push();    
    strokeWeight(4);
    if(keyIsDown(32))
        stroke('red');
    else
        stroke(255, 0, 0, 40);
    noFill();
    rect(-pos.x, -pos.y, rx, ry);
    
    pop();
}

// function mouseReleased() {
//     // console.log(`new pos (${pos.x} ${pos.y})`);
// }

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function mouseChangedPos() {
    return mx != mouseX || my != mouseY;
}

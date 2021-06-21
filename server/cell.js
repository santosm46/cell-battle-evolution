


function randColor() {
    let r = Math.floor(255 * Math.random());
    let g = Math.floor(255 * Math.random());
    let b = Math.floor(255 * Math.random());
    return {r, g, b};
}

class Cell {
    constructor(campsize, px=null, py=null, pdiam=null, pcolor=null) {
        this.x = px || Math.floor(campsize.x * Math.random());
        this.y = py || Math.floor(campsize.y * Math.random());
        this.diameter = pdiam || Math.floor(10 + 30 * Math.random());
        this.mass = Math.floor(20 + 10 * Math.random());
        this.color = pcolor || randColor();
    }

    getCellObject() {
        return {
            x: this.getX(),
            y: this.getY(),
            diameter: this.getDiameter(),
            color: this.getColor(),
        };
        
    }
    
    getX() { return this.x; }
    getY() { return this.y; }
    getMass() { return this.mass; }
    getColor() { return this.color; }

    getRadius() { 
        return this.diameter / 2;
    }
    getDiameter() { 
        return this.diameter;
    }

    print(canv) {
        canv.fill(this.color.r, this.color.g, this.color.b, 200);
        canv.circle(this.getX(), this.getY(), this.getDiameter());
    }

}

class CellBot extends Cell {



    static createCellBots(campsize, amount) {
        const cells = [];
        for(let i=0; i<amount; i++) {
            cells.push(new CellBot(campsize));
        }
        return cells;
    }
}


module.exports = CellBot;




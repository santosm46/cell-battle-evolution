
function rand_range(min, max) {
    let ran = Math.random();
    let diff = max-min;
    let res = min + Math.floor(diff * ran);
    return res;
}

function rand_int(max) {
    return Math.floor(max * Math.random());
}

function gen_pos(campsize, info) {
    let x = info.x === null ? rand_int(campsize.x) : info.x;
    let y = info.y === null ? rand_int(campsize.y) : info.y;
    return {x, y};
}

function rand_color() {
    let r = rand_int(255);
    let g = rand_int(255);
    let b = rand_int(255);
    return {r, g, b};
}

class GameObject {
    constructor(info={}) {
        this.mass = rand_range(10, 30);
        this.color = info.color || rand_color();
    }

    toObject() {
        return {
            x: this.getX(),
            y: this.getY(),
            color: this.getColor(),
            angle: this.getAngle()
        };
    }

    getX() { return this.body.x(); }
    getY() { return this.body.y(); }
    // getMass() { return this.mass; }
    getColor() { return this.color; }
    getAngle() {return this.body.angle(); }

    static createInstances(ClassType, campsize, amount, physics) {
        const inst = [];
        for(let i=0; i<amount; i++) {
            // let novo = ClassType.createInstance(ClassType, campsize, physics);
            // let novo = new ClassType(campsize, physics);
            inst.push(new ClassType(campsize, physics));
        }
        return inst;
    }
    
    // static createInstance(ClassType, campsize, physics, info={}) {
    //     let novo = new ClassType(campsize, physics, info);
    //     // console.log(novo);
    //     return novo;
    // }
}


class Cell extends GameObject {
    constructor(campsize, physics, info={}) {
        super(info);
        
        let radius = info.radius || rand_range(20, 50);
        let pos = gen_pos(campsize, info);
        this.body = physics.createCircle(pos.x, pos.y, radius);

    }

    toObject() {
        const obj = super.toObject();
        obj.diameter = this.getDiameter();
        return obj;
    }
    
    getRadius() { 
        return this.body.radius();
    }

    getDiameter() {
        return this.getRadius() * 2;
    }

}

class CellBot extends Cell {
    constructor(campsize, physics, info={}) {
        super(campsize, physics, info);
        this.type = CellBot;
    }
    
}

class Box extends GameObject {
    constructor(campsize, physics, info={}) {
        super(info);
        //
        let pos = gen_pos(campsize, info);
        let v1 = rand_range(20, 100), v2=rand_range(20, 100);
        this.w = info.w || v1;
        this.h = info.h || v2;
        
        this.body = physics.createRectangle(pos.x, pos.y, this.w, this.h, info.options);
    }

    getW() { return this.w; }
    getH() { return this.h; }

    toObject() {
        const obj = super.toObject();
        obj.w = this.getW();
        obj.h = this.getH();
        return obj;
    }
}


module.exports = {CellBot, Box};





const Matter = require('matter-js');
const {Box} = require('.\\cell.js');

class Physics {

}

// module aliases
const
    Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World = Matter.World,
    Constraint = Matter.Constraint;
    // this.Render = Matter.Render;

class MatterBody {
    constructor() {
        //
    }
    x() { return this.body.position.x; }
    y() { return this.body.position.y; }
    angle() { return this.body.angle; }
}

class MatterCircle extends MatterBody {
    constructor(world, x, y, radius) {
        super();
        this.body = Bodies.circle(x, y, radius);
        Composite.add(world, this.body);
    }
    radius() { 
        return this.body.circleRadius; 
    }
    
}

class MatterRectangle extends MatterBody {
    constructor(world, x, y, w, h, options=null) {
        super();
        if(options) {
            // console.log(options);
            this.body = Bodies.rectangle(x, y, w, h, options);
        }
        else {
            this.body = Bodies.rectangle(x, y, w, h);
        }
        Composite.add(world, this.body);
    }
}

class MatterJS extends Physics {
    
    constructor(boundary) {
        super();
        this.frames_per_second = 30;
        this.engine = Engine.create();
        this.runner = Runner.create();
        this.world = this.engine.world;
        
        // this.ground = Bodies.rectangle(300, 600, 900, 60, { isStatic: true });
        // Composite.add(this.world, this.ground);

        // Runner.run(this.runner, this.engine);
        this.whenFinishUpdate = () => {
            console.log(`this.whenFinishUpdate is empty`);
        };

        // this.whenFinishUpdate();
        
    }

    update() {
        Engine.update(this.engine, 1000 / this.frames_per_second);
        // this.whenFinishUpdate();
        this.whenFinishUpdate();
        // console.log(`engine updated`);
    }

    connect(objA, objB, length, stiffness) {
        if(objA==null || objB==null) {
            console.error(`objA or objB is null`);
            return;
        }
        let options = {
            bodyA:objA.body, 
            // pointA: { x: 150, y: 100 },
            bodyB:objB.body,
            // pointB: { x: 0, y: 0 }
            length, stiffness
        };
        // console.log(options);
        let spring = Constraint.create(options);
        Composite.add(this.world, [objB.body, spring]);
    }

    fixToBG(obj) {
        let pos = obj.body.position;
        let options = {
            pointA: { x: pos.x, y: pos.y + 10},
            bodyB:obj.body,
            length: 10,
            stiffness: 0.1
        };
        // console.log(options);
        let spring = Constraint.create(options);
        Composite.add(this.world, [obj.body, spring]);
    }

    whenUpdated(func) {
        this.whenFinishUpdate = func;
    }

    run() {
        // const timeFrame = 
        setInterval(function(physics) {
            // physics.update(EngineClass, engine, callBackFunc);
            physics.update();
        }, 1000 / this.frames_per_second, this);
    }

    createCircle(x, y, radius) {
        return new MatterCircle(this.world, x, y, radius);
    }

    createRectangle(x, y, w, h, options=null) {
        // console.log(options);
        return new MatterRectangle(this.world, x, y, w, h, options);
    }

    
}

module.exports = MatterJS;


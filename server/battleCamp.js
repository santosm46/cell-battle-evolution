
const {CellBot, Box} = require('.\\cell.js');
const MatterJS = require('.\\physics.js');


class BattleCamp {

    constructor(posx, posy, sizex, sizey) {
        this.size = {x: sizex, y:sizey};
        this.pos = {x: posx, y:posy};
        this.physics = new MatterJS(this.size);
        this.wall_boxes = this.createWalls(this.size, this.pos, this.physics);
        // this.physics.run();
        this.cell_bots = [];
        this.boxes = [];
    }

    specs() {
        return {pos: this.pos, size: this.size};
    }

    createWalls(size, pos, physics) {
        const thick = 500;
        function create_info(x, y, vertical=false) {
            let w, h;
            if(vertical) {
                w = thick; h = size.y;
            }
            else {
                w = size.x + 2*thick; h = thick;
            }
            return {
                x, y, w, h,
                color: {r: 250, g:10, b:50},
                options: { isStatic: true }
            };
        }
        //----
        let up_info = create_info(pos.x, pos.y-(size.y+thick)/2);
        let down_info = create_info(pos.x, pos.y+(size.y+thick)/2);
        let left_info = create_info(pos.x-(size.x+thick)/2, pos.y, true);
        let right_info = create_info(pos.x+(size.x+thick)/2, pos.y, true);

        return [
            new Box(size, physics, up_info),
            new Box(size, physics, down_info),
            new Box(size, physics, right_info),
            new Box(size, physics, left_info)
        ];
    }

    createCellBots(amount) {
        this.cell_bots = CellBot.createInstances(CellBot, this.size, amount, this.physics);
    }

    createCellBot(info={}) {
        this.cell_bots.push(new CellBot(this.size, this.physics, info));
    }

    createBoxes(amount) {
        this.boxes = Box.createInstances(Box, this.size, amount, this.physics);
    }

    createBox(info={}) {
        this.boxes.push(new Box(this.size, this.physics, info));
    }

    getObjectsOf(things) {
        const objects = [];
        for(let bot of things) {
            objects.push(bot.toObject());
        }
        return objects;
    }

}

module.exports = BattleCamp;



const CellBot = require('.\\cell.js');


class BattleCamp {

    constructor(sizex, sizey) {
        this.size = {x: sizex, y:sizey};
    }


    createCellBots(amount) {
        this.cell_bots = CellBot.createCellBots(this.size, amount);
    }

    getCellBotsObj() {
        const cell_bots_s = [];
        for(let bot of this.cell_bots) {
            cell_bots_s.push(bot.getCellObject());
        }
        return cell_bots_s;
    }

}

module.exports = BattleCamp;


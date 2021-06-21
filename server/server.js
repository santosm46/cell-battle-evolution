const express = require('express');
const app = express();
// const server = app.listen(process.env.PORT || 3333);
const server = app.listen(3333);
const socket = require('socket.io');

const BattleCamp = require('.\\battleCamp.js');

var io = socket(server);

app.use(express.static('..\\client'));

const camp = new BattleCamp(1000, 1000);

camp.createCellBots(50);


let bot_cells = camp.getCellBotsObj();
// console.log(cells);

// const state = {
//     history: [],
//     clients: {},
//     mouseRings: {}
// };




io.sockets.on('connection', (socket) => {
    console.log(`client ${socket.id} connected to the server`);
    socket.emit('updated_state', {bot_cells});

    socket.on('disconnect', () => {
        // disconnectClient({ id: socket.id });
        console.log(`client ${socket.id} disconnect`);
    });

    // envia para todos
    // io.sockets.emit('msg', data);
});


// function connectClient(client) {
//     const newClient = {};
//     newClient.id = client.id;
//     newClient.buffer = [];
//     state.mouseRings[client.id] = { id: client.id, mouseX: 0, mouseY: 0, lineSize: 20 };
//     state.clients[client.id] = newClient;
// }

// function disconnectClient(client) {
//     cleanClientBuffer(client.id);
//     delete state.clients[client.id];
//     delete state.mouseRings[client.id];
//     io.sockets.emit('updated state', {clients: state.clients, mouseRings: state.mouseRings});
// }



// socket.on('mouse draw', (data) => {
//     socket.broadcast.emit('mouse draw', data); // outros clients
//     // console.log('veja o data.id: ', data.id);
//     const client = state.clients[data.id];
//     if(client) {
//         client.buffer.push(removeIDfromData(data));
//     }
//     else {
//         console.error(`client is null`);
//     }
// });

// socket.on('mouse released', (data) => {
//     cleanClientBuffer(socket.id);
// });

// socket.on('undo', (data) => {
//     console.log('refazendo');
//     let partToRemove = 0;
//     if (state.history.length == 0) return;

//     for (let i = state.history.length - 1; i >= 0; i--) {
//         if (state.history[i].checkpoint) {
//             partToRemove = i;
//             break;
//         }
//     }
//     // console.log(`deleting history[${partToRemove}:${history.length}]`);
//     // console.log(' ****************  before   ****************');
//     // console.log(state.history);
//     state.history = state.history.slice(0, partToRemove);
//     // console.log(' ****************  after   ****************');
//     // console.log(state.history);
//     io.sockets.emit('updated state', {history: state.history}); // todos os clients
// });

// socket.on('mouse move', (data) => {
//     // mouses[socket.id] = data;
//     socket.broadcast.emit('mouse move', data);
// });


// function cleanClientBuffer(clientId) {
//     const client = state.clients[clientId];
//     state.history = state.history.concat(client.buffer);
//     client.buffer = [];
//     limitHistory();
// }

// function limitHistory() {
//     const percent = 0.2; // percent of history to remove
//     const length = state.history.length;
//     console.log('tamnanho history: ' + length);
//     if (length >= MAX_HIST_SIZE) {
//         state.history = state.history.slice(parseInt(length * percent), length);
//     }
// }

// function removeIDfromData(data) {
//     // to savo to history to save memory
//     // data.id = null;
//     return data;
// }



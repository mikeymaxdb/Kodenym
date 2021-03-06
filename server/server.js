const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Game = require('./Game')

const app = express();
const server = http.Server(app);
const io = socketio(server, { cookie: false });

const gameDB = {};

const newGameAction = () => ({
    type: 'GAME_NEW',
})

const updateAction = (gameData) => ({
    type: 'GAME_UPDATE',
    gameData,
})

const syncClients = (gameId) => {
    const gameData = gameDB[gameId].toData()
    io.to(gameId).emit('message', updateAction(gameData))
}

const logTime = (label, gameId) => {
    console.log(`[${label}] [${gameId}] ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`)
}


app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('message', (action) => {
        const gameId = Object.values(socket.rooms).filter((room) => room !== socket.id)[0] || null
        // console.log(action)

        switch (action.type) {
            case 'JOIN_GAME': {
                // Sanitize game name
                let newGameId = action.gameId.replace(/\W/g, '');
                newGameId = newGameId.trim();
                newGameId = newGameId.substring(0, 20);
                newGameId = newGameId.toUpperCase();

                if (!newGameId) {
                    return;
                }

                logTime('Join Game', newGameId)

                // Create a new game if it doesn't exist
                if (!gameDB[newGameId]) {
                    gameDB[newGameId] = new Game(newGameId, null);
                }

                // Leave any other games the socket is in
                if (socket.rooms && socket.rooms.length) {
                    Object.values(socket.rooms).forEach((room) => {
                        if (room !== socket.id) {
                            socket.leave(room);
                        }
                    })
                }

                // Setup socket and start their game
                socket.join(newGameId);
                socket.emit('message', newGameAction());

                // Update socket with game
                syncClients(newGameId);

                break;
            }
            case 'NEW_GAME':
                if (!gameId || !gameDB[gameId]) {
                    break;
                }

                logTime('New Game ', gameId)

                gameDB[gameId].generateTiles()

                io.to(gameId).emit('message', newGameAction());
                break;
            case 'TILE_CLICK':
                if (!gameId) {
                    break;
                }

                gameDB[gameId].onTileClick(action.tileIndex);
                break;
            case 'UPDATE_SETTINGS':
                if (!gameId) {
                    break;
                }
                if (action.settings) {
                    const { settings } = action
                    if (settings) {
                        const newSettings = {}
                        if ('customDictionary' in settings) {
                            const { customDictionary } = settings
                            if (!Array.isArray(customDictionary)) {
                                newSettings.customDictionary = null
                            } else {
                                let cleanDictionary = customDictionary.map((dw) => {
                                    let word = dw.trim();
                                    word = word.substring(0, 20);
                                    word = word.trim();
                                    return word
                                }).filter((w) => !!w);
                                cleanDictionary = cleanDictionary.slice(0, 700);
                                newSettings.customDictionary = cleanDictionary
                            }
                        }
                        gameDB[gameId].settings = newSettings
                    }
                }
                break;
            default:
                break;
        }

        if (gameId) {
            syncClients(gameId);
        }
    });
});

server.listen(8081, () => {
    const { port } = server.address();
    console.log(`[i] Kodenym running on ${port}`);
});

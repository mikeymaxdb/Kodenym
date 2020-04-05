const dictionaries = require('./dictionaries');

class Game {
    constructor(gameId, settings) {
        this.gameId = gameId
        this._settings = {}
        this.tiles = []
        this.firstTurn = null
        this.numTiles = 25

        this.settings = settings
        this.generateTiles();
    }

    set settings(settings = {}) {
        this._settings = {
            ...settings,
        }
    }

    get settings() {
        return this._settings
    }

    generateTiles() {
        const tiles = [];
        let randInt;
        // TODO refactor colors
        const tileColors = [
            'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
            'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
            'tan', 'tan', 'tan', 'tan', 'tan', 'tan', 'tan',
            'black',
        ];
        const indexes = [];
        let firstTurnColor;

        if (Math.round(Math.random()) === 1) {
            firstTurnColor = 'red';
        } else {
            firstTurnColor = 'blue';
        }
        tileColors.push(firstTurnColor);

        while (indexes.length !== this.numTiles) {
            randInt = Math.floor(Math.random() * dictionaries.default.length);
            if (indexes.indexOf(randInt) === -1) {
                indexes.push(randInt);
            }
        }
        for (let i = 0; i < this.numTiles; i += 1) {
            const randColorIndex = Math.floor(Math.random() * tileColors.length);
            tiles.push({
                word: dictionaries.default[indexes[i]],
                status: 'hidden',
                color: tileColors[randColorIndex],
            });
            tileColors.splice(randColorIndex, 1);
        }
        this.tiles = tiles;
        this.firstTurn = firstTurnColor;
    }

    onTileClick(tileIndex) {
        if (
            tileIndex >= 0
            && tileIndex < this.tiles.length
        ) {
            this.tiles[tileIndex].status = 'turned';
        }
    }

    toData() {
        return {
            gameId: this.gameId,
            tiles: [ ...this.tiles],
            settings: { ...this.settings },
        }
    }
}

module.exports = Game;

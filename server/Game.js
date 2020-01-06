const nouns = require('./dicts/standard.dict');

class Game {
    constructor(gameId, settings) {
        this.gameId = gameId
        this._settings = {}
        this.tiles = []
        this.firstTurn = null
        this.numTiles = 0

        this.settings = settings;
        this.generateTiles();
    }

    set settings(settings = {}) {
        this.numTiles = settings.columns * settings.rows;

        // TODO refactor
        let customDict = [];
        if (settings.customDict) {
            customDict = settings.customDict;

            if (customDict.length < 100 || customDict.length > 1000) {
                customDict = [];
            }

            for (let i = 0, max = customDict.length; i < max; i += 1) {
                let word = customDict[i] || '';
                word = word.trim();
                word = word.substring(0, 50);
                word = word.toLowerCase();

                if (!word) {
                    customDict.splice(i, 1);
                }
            }

            if (customDict.length < 100 || customDict.length > 1000) {
                customDict = [];
            }
        }

        this._settings = {
            ...settings,
            customDict,
        }
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
            randInt = Math.floor(Math.random() * nouns.length);
            if (indexes.indexOf(randInt) === -1) {
                indexes.push(randInt);
            }
        }
        for (let i = 0; i < this.numTiles; i += 1) {
            const randColorIndex = Math.floor(Math.random() * tileColors.length);
            tiles.push({
                word: nouns[indexes[i]],
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
            settings: { ...this._settings },
        }
    }
}

module.exports = Game;

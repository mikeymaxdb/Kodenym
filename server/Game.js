const dictionaries = require('./dictionaries');

class Game {
    constructor(gameId, settings) {
        this.gameId = gameId
        this._settings = {}
        this.tiles = []
        this.usedWords = []
        this.numTiles = 25
        this.dictionary = dictionaries.default

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

    generateNextWord() {
        const len = this.dictionary.length
        while(true) {
            const candidate = dictionaries.default[Math.floor(Math.random() * len)]
            if (!this.usedWords.includes(candidate)) {
                this.usedWords.push(candidate)
                return candidate
            }
        }
    }

    generateTiles() {
        // Reset used words if there aren't enough
        if ((this.dictionary.length - this.usedWords.length) < this.numTiles) {
            this.usedWords = []
        }

        const tileColors = [
            'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
            'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
            'tan', 'tan', 'tan', 'tan', 'tan', 'tan', 'tan',
            'black', (Math.round(Math.random()) === 1 ? 'red' : 'blue'),
        ];

        // Generate tiles
        const tiles = [];
        tileColors.forEach((color) => {
            tiles.push({
                word: this.generateNextWord(),
                status: 'hidden',
                color,
            })
        })

        // Shuffle tiles
        for (let i = (tiles.length - 1); i > 0; i -= 1) {
            const j = Math.floor(Math.random() * i)
            const temp = tiles[i]
            tiles[i] = tiles[j]
            tiles[j] = temp
        }
        this.tiles = tiles;
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

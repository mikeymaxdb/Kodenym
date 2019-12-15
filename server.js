// TODO Improve tile color assignment (needed for dynamic game size)
// TODO Add sanitization to more user inputs!!
// TODO Improve state managment

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = {};
var gameDB = {};
var socketDB = {};

var nouns = require('./dicts/standard.dict');

game.generateTiles = function(numTiles, words){
    var tiles = [],
    randInt;
    var tileColors = ["red","red","red","red","red","red","red","red","blue","blue","blue","blue","blue","blue","blue","blue","tan","tan","tan","tan","tan","tan","tan","black"];
    var indexes = [];
    var firstTurnColor;
    
    if(Math.round(Math.random())==1){
        firstTurnColor = "red";
    } else {
        firstTurnColor = "blue";
    }
    tileColors.push(firstTurnColor);
    while(indexes.length != numTiles){
        randInt = Math.floor(Math.random()*words.length);
        if(indexes.indexOf(randInt) == -1){
            indexes.push(randInt);
        }
    }
    for(var i=0;i<numTiles;i++){
        
        randColorIndex = Math.floor(Math.random()*tileColors.length);
        tiles.push({
            word: words[indexes[i]],
            status: "hidden",
            color: tileColors[randColorIndex]
        });
        tileColors.splice(randColorIndex,1);
    }
    return {tiles:tiles,firstTurn:firstTurnColor};
}
game.newGame = function(gameId,settings){
    var ng = {};
    var dictionary = (settings.customDict && settings.customDict.length)?setting.customDict:nouns;
    var newTiles = game.generateTiles(settings.columns*settings.rows, dictionary);
    
    ng.id = gameId;
    ng.tiles = newTiles.tiles;
    ng.firstTurn = newTiles.firstTurn;
    ng.settings = settings;

    return ng;
}
game.onTileClick = function(gameId,tileIndex){
    if(tileIndex >= gameDB[gameId].tiles.length){
        return;
    }
    gameDB[gameId].tiles[tileIndex].status = "turned";
}

game.syncClients = function(gameId){
    io.to(gameId).emit("gameUpdate",gameDB[gameId]);
}

app.use(express.static('public'));

io.on('connection', function(socket){
    
    socket.on('disconnect', function(){
        
    });

    socket.on("joinGame",function(gameId, settings){
        // Sanitize game name
        gameId = gameId.replace(/\W/g, '');
        gameId = gameId.trim();
        gameId = gameId.substring(0,20);
        gameId = gameId.toLowerCase();

        if(!gameId){
            return;
        }

        // Create a new game if it doesn't exist
        if(!gameDB[gameId]){
            var ng = game.newGame(gameId, settings);
            gameDB[gameId] = ng;
        }

        // Leave any other games the socket is in
        if(socket.rooms){
            for(var room in socket.rooms){
                socket.leave(room);
            }
        }
        
        // Setup socket and start their game
        socket.gameId = gameId;
        socket.join(gameId);
        socket.emit("newGame", gameDB[gameId]);
        console.log("[+] A user joined '"+gameId+"'");

        // Update socket with game
        game.syncClients(socket.gameId);
    });
    socket.on("newGame",function(settings){
        if(!socket.gameId){
            return;
        }

        if(settings){
            if(settings.customDict){
                if(settings.customDict.length < 100 || settings.customDict.length > 1000){
                    settings.customDict = [];
                }

                for(var i=0,max=settings.customDict.length;i<max;i++){
                    var word = settings.customDict[i] || "";
                    word = word.trim();
                    word = word.substring(0,50);
                    word = word.toLowerCase();

                    if(!word){
                        settings.customDict.splice(i, 1);
                    }
                }

                if(settings.customDict.length < 100 || settings.customDict.length > 1000){
                    settings.customDict = [];
                }
            }

            gameDB[socket.gameId].settings = settings;
        }

        var id = socket.gameId;
        var settings = gameDB[socket.gameId].settings;

        console.log("[+] New tiles for '%s'",socket.gameId);
        gameDB[socket.gameId] = game.newGame(id, settings);
        io.to(socket.gameId).emit("newGame",gameDB[socket.gameId]);
    });
    socket.on("tileClick", function(tileIndex){
        if(!socket.gameId){
            return;
        }
        game.onTileClick(socket.gameId, tileIndex);
        game.syncClients(socket.gameId);
    });
});

server.listen(8081, function () {
   var port = server.address().port;

   console.log("[i] Kodenym running on %s", port);

})

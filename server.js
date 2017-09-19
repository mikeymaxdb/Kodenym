var nouns = ["AFRICA","AGENT","AIR","ALIEN","ALPS","AMAZON","AMBULANCE","AMERICA","ANGEL","ANTARCTICA","APPLE","ARM","ATLANTIS","AUSTRALIA","AZTEC","BACK","BALL","BAND","BANK","BAR","BARK","BAT","BATTERY","BEACH","BEAR","BEAT","BED","BEIJING","BELL","BELT","BERLIN","BERMUDA","BERRY","BILL","BLOCK","BOARD","BOLT","BOMB","BOND","BOOM","BOOT","BOTTLE","BOW","BOX","BRIDGE","BRUSH","BUCK","BUFFALO","BUG","BUGLE","BUTTON","CALF","CANADA","CAP","CAPITAL","CAR","CARD","CARROT","CASINO","CAST","CAT","CELL","CENTAUR","CENTER","CHAIR","CHANGE","CHARGE","CHECK","CHEST","CHICK","CHINA","CHOCOLATE","CHURCH","CIRCLE","CLIFF","CLOAK","CLUB","CODE","COLD","COMIC","COMPOUND","CONCERT","CONDUCTOR","CONTRACT","COOK","COPPER","COTTON","COURT","COVER","CRANE","CRASH","CRICKET","CROSS","CROWN","CYCLE","CZECH","DANCE","DATE","DAY","DEATH","DECK","DEGREE","DIAMOND","DICE","DINOSAUR","DISEASE","DOCTOR","DOG","DRAFT","DRAGON","DRESS","DRILL","DROP","DUCK","DWARF","EAGLE","EGYPT","EMBASSY","ENGINE","ENGLAND","EUROPE","EYE","FACE","FAIR","FALL","FAN","FENCE","FIELD","FIGHTER","FIGURE","FILE","FILM","FIRE","FISH","FLUTE","FLY","FOOT","FORCE","FOREST","FORK","FRANCE","GAME","GAS","GENIUS","GERMANY","GHOST","GIANT","GLASS","GLOVE","GOLD","GRACE","GRASS","GREECE","GREEN","GROUND","HAM","HAND","HAWK","HEAD","HEART","HELICOPTER","HIMALAYAS","HOLE","HOLLYWOOD","HONEY","HOOD","HOOK","HORN","HORSE","HORSESHOE","HOSPITAL","HOTEL","ICE","ICE CREAM","INDIA","IRON","IVORY","JACK","JAM","JET","JUPITER","KANGAROO","KETCHUP","KEY","KID","KING","KIWI","KNIFE","KNIGHT","LAB","LAP","LASER","LAWYER","LEAD","LEMON","LEPRECHAUN","LIFE","LIGHT","LIMOUSINE","LINE","LINK","LION","LITTER","LOCH NESS","LOCK","LOG","LONDON","LUCK","MAIL","MAMMOTH","MAPLE","MARBLE","MARCH","MASS","MATCH","MERCURY","MEXICO","MICROSCOPE","MILLIONAIRE","MINE","MINT","MISSILE","MODEL","MOLE","MOON","MOSCOW","MOUNT","MOUSE","MOUTH","MUG","NAIL","NEEDLE","NET","NEW YORK","NIGHT","NINJA","NOTE","NOVEL","NURSE","NUT","OCTOPUS","OIL","OLIVE","OLYMPUS","OPERA","ORANGE","ORGAN","PALM","PAN","PANTS","PAPER","PARACHUTE","PARK","PART","PASS","PASTE","PENGUIN","PHOENIX","PIANO","PIE","PILOT","PIN","PIPE","PIRATE","PISTOL","PIT","PITCH","PLANE","PLASTIC","PLATE","PLATYPUS","PLAY","PLOT","POINT","POISON","POLE","POLICE","POOL","PORT","POST","POUND","PRESS","PRINCESS","PUMPKIN","PUPIL","PYRAMID","QUEEN","RABBIT","RACKET","RAY","REVOLUTION","RING","ROBIN","ROBOT","ROCK","ROME","ROOT","ROSE","ROULETTE","ROUND","ROW","RULER","SATELLITE","SATURN","SCALE","SCHOOL","SCIENTIST","SCORPION","SCREEN","SCUBA DIVER","SEAL","SERVER","SHADOW","SHAKESPEARE","SHARK","SHIP","SHOE","SHOP","SHOT","SINK","SKYSCRAPER","SLIP","SLUG","SMUGGLER","SNOW","SNOWMAN","SOCK","SOLDIER","SOUL","SOUND","SPACE","SPELL","SPIDER","SPIKE","SPINE","SPOT","SPRING","SPY","SQUARE","STADIUM","STAFF","STAR","STATE","STICK","STOCK","STRAW","STREAM","STRIKE","STRING","SUB","SUIT","SUPERHERO","SWING","SWITCH","TABLE","TABLET","TAG","TAIL","TAP","TEACHER","TELESCOPE","TEMPLE","THEATER","THIEF","THUMB","TICK","TIE","TIME","TOKYO","TOOTH","TORCH","TOWER","TRACK","TRAIN","TRIANGLE","TRIP","TRUNK","TUBE","TURKEY","UNDERTAKER","UNICORN","VACUUM","VAN","VET","WAKE","WALL","WAR","WASHER","WASHINGTON","WATCH","WATER","WAVE","WEB","WELL","WHALE","WHIP","WIND","WITCH","WORM","YARD"];

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = {};
var gameDB = {};
var socketDB = {};

game.generateTiles = function(numTiles){
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
		randInt = Math.floor(Math.random()*nouns.length);
		if(indexes.indexOf(randInt) == -1){
			indexes.push(randInt);
		}
	}
	for(var i=0;i<numTiles;i++){
		
		randColorIndex = Math.floor(Math.random()*tileColors.length);
		tiles.push({
			word: nouns[indexes[i]],
			status: "hidden",
			color: tileColors[randColorIndex]
		});
		tileColors.splice(randColorIndex,1);
	}
	return {tiles:tiles,firstTurn:firstTurnColor};
}
game.newGame = function(settings){
	var ng = {};
	ng.id = settings.id;
	ng.columns = settings.columns;
	ng.rows = settings.rows;
	var newTiles = game.generateTiles(25);
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

app.use(express.static('public'));

io.on('connection', function(socket){
	//console.log('a user connected');
	socket.on('disconnect', function(){
		//console.log('[-] A user disconnected');
	});
	socket.on("joinGame",function(settings){
		settings.id = settings.id.replace(/\W/g, '');
		settings.id = settings.id.trim();
		settings.id = settings.id.substring(0,20);
		settings.id = settings.id.toLowerCase();
		if(!gameDB[settings.id]){
			var ng = game.newGame(settings);
			gameDB[settings.id] = ng;
		}
		if(socket.rooms){
			for(var room in socket.rooms){
				socket.leave(room);
			}
		}
		
		console.log("[+] A user joined '"+settings.id+"'");
		socket.gameId = settings.id;
		socket.join(settings.id);
		socket.emit("newGame", gameDB[settings.id]);
		io.to(settings.id).emit("gameUpdate",gameDB[settings.id]);
	});
	socket.on("newGame",function(){
		if(!socket.gameId){
			return;
		}
		console.log("[+] New tiles for '%s'",socket.gameId);
		gameDB[socket.gameId] = game.newGame(gameDB[socket.gameId].settings);
		io.to(socket.gameId).emit("newGame",gameDB[socket.gameId]);
	});
	socket.on("tileClick", function(tileIndex){
		if(!socket.gameId){
			return;
		}
		game.onTileClick(socket.gameId, tileIndex);
		io.to(socket.gameId).emit("gameUpdate",gameDB[socket.gameId]);
	});
});

server.listen(8081, function () {
   var port = server.address().port;

   console.log("[i] Kodenym running on %s", port);

})
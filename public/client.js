var App = {};

App.track = function(action){
	console.log("Tracking ",action, !!ga);
	if(ga){
		ga('send', {
			hitType: 'event',
			eventCategory: 'UserEvent',
			eventAction: action
		});
	}
}

App.addTiles = function(){
	$("#Body").empty();
	$("#GameIdTitle").html(App.game.id);
	$("#Header").css("display","flex");
	var row,tile;
	for(var i=0,max=App.game.tiles.length;i<max;i++){
		if(i%App.game.columns == 0){
			row = $("<div class='row'></div>");
		}
		tile = $("<div class='tile'>"+App.game.tiles[i].word+"</div>");
		tile.attr("data-index",i);
		tile.click(App.onTileClick);
		tile.addClass(App.game.tiles[i].color);
		row.append(tile);
		if(i%App.game.columns == 0){
			$("#Body").append(row);
		}
	}

	$("#MainContainer").removeClass().addClass(App.game.firstTurn);
	App.updateTiles();
}

App.onTileClick = function(){
	App.socket.emit("tileClick",$(this).attr("data-index"));
}

App.updateTiles = function(){
	var tiles = $(".tile");
	for(var i=0,max=App.game.tiles.length;i<max;i++){
		$(tiles[i]).attr("data-status",App.game.tiles[i].status);
	}

	$("#RedLeft").html($(".tile.red[data-status='hidden']").length);
	$("#BlueLeft").html($(".tile.blue[data-status='hidden']").length);
}

App.joinGame = function(id){
	App.socket.emit("joinGame",{
		id: id,
		rows: 5,
		columns: 5
	});
}

App.filterGameId = function(){
	var input, output;
	input = $("#GameId").val();

	output = input.replace(/\W/g, '');
	output = output.trim();
	output = output.substring(0,20);

	if(output != input){
		$(".entryFormContainer .isFiltered").css("visibility","visible");
	}

	$("#GameId").val(output);
}

App.start = function(){
	App.socket = io();
	
	App.socket.on("newGame",function(game){
		App.game = game;
		App.addTiles();
	});
	App.socket.on("gameUpdate",function(game){
		console.log("Game",game);
		App.game = game;
		App.updateTiles();
	});

	$("#GameId").val("DEFAULT");

	$("#NewGame").click(function(){
		App.socket.emit("newGame");
		App.track("New Game");
	});

	$("#GameId").change(App.filterGameId).keyup(App.filterGameId);

	$("#JoinGame").click(function(){
		App.filterGameId();
		App.joinGame($("#GameId").val());
		App.track("Joined Game");
	});

	$("#ToggleColors").click(function(){
		$("#Body").toggleClass("colorsVisible");
	});
}

App.start();
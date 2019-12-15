// TODO improve state management

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
    // Remove existing tiles
    $(".tileRowsContainer").empty();

    // Update game name
    $("#GameIdTitle").html(App.game.id);
    window.location.hash = App.game.id;

    // Show header
    $("#Header").css("display","flex");

    // Add tiles to rows and rows to the page
    var row,tile;
    for(var i=0,max=App.game.tiles.length;i<max;i++){
        if(i%App.game.settings.columns == 0){
            row = $("<div class='row'></div>");
        }
        tile = $("<div class='tile'>"+App.game.tiles[i].word+"</div>");
        tile.attr("data-index",i);
        tile.click(App.onTileClick);
        tile.addClass(App.game.tiles[i].color);
        row.append(tile);
        if(i%App.game.settings.columns == 0){
            $(".tileRowsContainer").append(row);
        }
    }

    // Hide join game popup
    $(".entryFormContainer").css({display: "none"});

    // Add class for first turn bg color to the page
    $("#MainContainer").removeClass().addClass(App.game.firstTurn);

    // Update tile statuses and score in the header
    App.updateTiles();
}

App.onTileClick = function(){
    App.socket.emit("tileClick",$(this).attr("data-index"));
}

App.updateTiles = function(){
    // Update tile statuses
    var tiles = $(".tile"); // TODO use a foreach
    for(var i=0,max=App.game.tiles.length;i<max;i++){
        $(tiles[i]).attr("data-status",App.game.tiles[i].status);
    }

    // Update score in the header
    $("#RedLeft").html($(".tile.red[data-status='hidden']").length);
    $("#BlueLeft").html($(".tile.blue[data-status='hidden']").length);
}

App.updateSettings = function(){
    // Update local settings from the settings popup
    App.settings.customDict = $("#customDict").val().split(",");
    App.settings.rows = $("#customRows").val();
    App.settings.columns = $("#customCols").val();
}

App.joinGame = function(id){
    App.socket.emit("joinGame", id, App.settings);
}

App.settings = {
    rows: 5,
    columns: 5
}

App.start = function(){
    App.socket = io();
    
    App.socket.on("connect", function(){
        // Join a game if it's in the url
        // Else, show the game name form
        if(!App.game && window.location.hash && window.location.hash != "#"){
            App.joinGame(window.location.hash);
        } else{
            $("#GameId").val("DEFAULT");
            $(".entryFormContainer").css({display: "flex"});
        }
    });

    App.socket.on("newGame",function(game){
        // Update the game state
        // and populate tiles
        console.log("New Game",game);
        App.game = game;
        App.addTiles();
    });
    App.socket.on("gameUpdate",function(game){
        // Update the game state
        // Update the tiles
        // Update the settings popup
        console.log("Update Game",game);
        App.game = game;
        App.updateTiles();

        if(game.settings.customDict){
            $("#customDict").val(game.settings.customDict.join(","));
        }
        $("#customRows").val(game.settings.rows);
        $("#customCols").val(game.settings.columns);
    });

    // Update settings popup with defaults
    $("#customRows").val(App.settings.rows);
    $("#customCols").val(App.settings.columns);

    

    $("#NewGame").click(function(){
        // Get new tiles for the game
        App.socket.emit("newGame");
        App.track("New Game");
    });

    $(".settings input, .settings textarea").on("change", function(){
        // Auto-update settings
        // Update the local settings then start
        // a new game with them
        console.debug("Updating settings");
        App.updateSettings()
        App.socket.emit("newGame", App.settings); // TODO Move to function
    });

    $("#GameIdForm").submit(function(e){
        // Join/start a game
        e.preventDefault();
        App.joinGame($("#GameId").val());
        App.track("Joined Game");
    });


    // Button event handlers
    $("#ToggleColors").click(function(){
        $("#Body").toggleClass("colorsVisible");
    });

    $("#Settings").click(function(){
        $("#SettingsContainer").css({display: "flex"});
    });

    $("#SettingsContainer").click(function(){
        $("#SettingsContainer").css({display: "none"});
    });
    $("#SettingsContainer .settings").click(function(e){
        e.stopPropagation();
    });
}

App.start();

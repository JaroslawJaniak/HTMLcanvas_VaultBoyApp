var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 264; var dx = 8; var vx = 0;
var y = 204; var dy =8; var vy = 0;

var move_parametr = 1;

var startOn = false;


var bg1 = new BackgroundObject(
    "img/scrolling_background_sky2.png",
    0,0, vx, vy, 120,
    canvas.width, canvas.height);

var bg2 = new BackgroundObject(
        "img/scrolling_background_middle2.png",
        0,0, vx, vy, 60,
        canvas.width, canvas.height);   

var bg3 = new BackgroundObject(
        "img/scrolling_background_foreground2.png",
        0,0, vx, vy, 20,
        canvas.width*2, canvas.height);

var vaultBoy = new SpriteObject(
        "img/pipboy.png",
        x,y,0,0, canvas.width, canvas.height,6,false,1,1,0,50,100,84,84, false);
		
var bgRandom = new SpriteObject(
        "img/brotherhood2.png",
        canvas.width-100,y-58,0,0,canvas.width,canvas.height,6,true,1,1,0,50,60,84,84, false);

var game_objects = [ bg1, bg2, bg3, bgRandom, vaultBoy];

rButton = document.getElementById("rightButton");
rButton.addEventListener('mousedown', moveR);
//rButton.addEventListener('mouseup',  stopMove);

lButton = document.getElementById("leftButton");
lButton.addEventListener('mousedown',  moveL);
//lButton.addEventListener('mouseup',  stopMove);

uButton = document.getElementById("upButton");
uButton.addEventListener('mousedown', moveUp);
uButton.addEventListener('mouseup',  stopMove_UpDown);

dButton = document.getElementById("downButton");
dButton.addEventListener('mousedown', moveDown);
dButton.addEventListener('mouseup',  stopMove_UpDown);

jumpButton = document.getElementById("jumpButton");
jumpButton.addEventListener('click', jump);


startButton = document.getElementById("startButton");
startButton.addEventListener('click',  startMove);

stopButton = document.getElementById("stopButton");
stopButton.addEventListener('click',  stopMove);

function startMove(){
	
	for (i=0; i< game_objects.length-1; i++){
        game_objects[i].vx = move_parametr*2;
    }
	game_objects[4].is_background_move_parametr = true;
	startOn = true;
}

function stopMove_UpDown(){
	
	if(startOn != true){
	game_objects[4].is_background_move_parametr = false;
	}
}

function stopMove(){
	for (i=0; i< game_objects.length-1; i++){
        game_objects[i].vx = 0;
    }
	game_objects[4].is_background_move_parametr = false;
	startOn = false;
}

function moveR(){
    console.log("moveRight");
	if(game_objects[4].scale_parametr1 == -1){
		game_objects[4].x = -game_objects[4].x-84;
		game_objects[4].scale_parametr1 = -1*game_objects[4].scale_parametr1;
		move_parametr = 1;
		
		for (i=0; i< game_objects.length-1; i++){
			game_objects[i].vx = 0;
		}
		game_objects[4].is_background_move_parametr = false;
		startOn = false;
	}
	else{
		for (i=0; i< game_objects.length-1; i++){
        game_objects[i].vx = move_parametr*2;
    }
	game_objects[4].is_background_move_parametr = true;
	startOn = true;
	}
    //game_objects[4].x = game_objects[4].x + dx; // przesówanie strzałakami w osi x
}

function moveL(){
    console.log("moveLeft");
	if(game_objects[4].scale_parametr1 == 1){
		game_objects[4].x = -game_objects[4].x-84;
		game_objects[4].scale_parametr1 = -1*game_objects[4].scale_parametr1;
		move_parametr = -1;
		
		for (i=0; i< game_objects.length-1; i++){
			game_objects[i].vx = 0;
		}
		game_objects[4].is_background_move_parametr = false;
		startOn = false;
	}
	else{
		for (i=0; i< game_objects.length-1; i++){
        game_objects[i].vx = move_parametr*2;
    }
	game_objects[4].is_background_move_parametr = true;
	startOn = true;
	}
    //game_objects[4].x = game_objects[4].x + dx; // przesówanie strzałakami w osi x
}


function moveUp(){
    console.log("moveUp -> y = " +  game_objects[4].y);
	
	if(game_objects[4].y > 164){
	game_objects[4].is_background_move_parametr = true;
    game_objects[4].y = game_objects[4].y - dx; // przesówanie strzałakami w osi y
	}
}

function moveDown(){
    console.log("moveDown -> y = " +  game_objects[4].y);
	
	if(game_objects[4].y < 228){
	game_objects[4].is_background_move_parametr = true;
    game_objects[4].y = game_objects[4].y + dx; // przesówanie strzałakami w osi y
	}
}

function rev(){
    console.log("reverse");
	
	if(game_objects[4].scale_parametr1 == -1){
		game_objects[4].x = -game_objects[4].x-84;
		move_parametr = 1;
	}
	else{
		game_objects[4].x = -game_objects[4].x-84;
		move_parametr = -1;
	}
	game_objects[4].scale_parametr1 = -1*game_objects[4].scale_parametr1;
	console.log(game_objects[4].x);
}

function jump(){
	console.log("jump");
	//game_objects[4].jumpHeight = game_objects[4].y - game_objects[4].h/2;
	//game_objects[4].jumpSartY = game_objects[4].y;
	game_objects[4].is_jump = true;
	game_objects[4].isUp = true;
	
}



function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    for (i=0; i< game_objects.length; i++){
        game_objects[i].draw(offctx);
    }
	
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(offscreen,0,0,canvas.width,canvas.height);
	
    requestAnimationFrame(animation);
}

window.onload = function(){
		animation();
	
	for (i=0; i< game_objects.length; i++){
        game_objects[i].update();
    }
}
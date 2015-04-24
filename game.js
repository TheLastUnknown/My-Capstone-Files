//Game constant

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 500;
var FPS = 60;
var GAME_STATE = 'start';
var time=0;
var score = 0;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A=65, KEY_W=87, KEY_D=68, KEY_S=83, KEY_SPACE=32, KEY_ENT=13, KEY_END=80;

document.onkeydown = keyDownTest;
document.onkeyup = keyUpTest;


var canvas, stage, queue;

var mouseX, mouseY, timer, scoreCount;


var title, instructionScreen, gameOver;
var playButton, tutorialButton, menuButton; //Menu Buttons

var player;
var playerVelX, playerVelY;
var friction = .8;
var gravity = .2;
var inAir = Boolean(false);

//opens a canvas and tells CreateJS to use it as a Stage. Remember, CreateJS does everything on it's stage similar to the way ActionScript works.
function openCanvas() {
    
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
	var div = document.getElementById("gameTest");
    div.appendChild(canvas);
    
}


function setupStage()
{
	stage = new createjs.Stage(canvas);
	stage.enableDOMEvents(true);
	stage.enableMouseOver();
    
	stage.on("stagemousemove",function(evt) {
				
				museX = Math.floor(evt.stageX);
				museY = Math.floor(evt.stageY);
			});
			
	stage.update();
}


//This displays the sprites on the screen. Notice that I am putting clones of the blocks into an array. This is a really efficient way to duplicate sprite content and the preferred method.
function displaySprites() {
	
	//This draws the objects the first time. It isn't really needed because we have a loop that redraws every frame.
	stage.update();
}


//This is the loop that updates the stage every frame. Remember, any changes you make to the stage don't show up until update is called.
function loop() {
    switchGameState();
	movePlayer();
    checkAnimation();
	stage.update();
    //console.log(GAME_STATE);
}

function checkFPS()
{
	var frames = createjs.Ticker.getMeasuredFPS();
	
	if(frames < 50)
	{
		console.log(50);
	}
	else if(frames < 40)
	{
		console.log(40);
	}
	else if(frames < 30)
	{
		console.log(40);
	}
	else if(frames < 20)
	{
		console.log(20);
	}

}



function switchGameState()
{
    switch(GAME_STATE)
    {
        case 'start':
            startScreen();
            break;
        case 'startGame':
            init();
            break;
        case 'inGame':
            break;
        case 'Pause':
            console.log("pause");
            instructScreen();
            break;
        case 'gameOver':
            console.log("gameOver");
            gameOverScreen();
            break;
    };
}

//This creates the loop that workes like setInterval
function startLoop() {
	createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
}




function main() {
    switchGameState();
}

//Checks to make sure the DOM is loaded and ready and then runs main()
if( !!(window.addEventListener)) {
    window.addEventListener ("DOMContentLoaded", main);
}else{ //MSIE
    window.attachEvent("onload", main);
}

var moveLeft = false;
var moveRight = false;
var moveUp = false;

//Keyboard Events
function keyDownTest(e)
{
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: console.log("A down"); moveLeft = true; moveRight = false; break;
            case KEY_W: console.log("W down"); moveUp = true; break;
            case KEY_S: console.log("S down"); break;
            case KEY_D: console.log("D down"); moveLeft = false; moveRight = true; break;
            case KEY_SPACE: console.log("Space down"); break;
            case KEY_ENT: console.log("Enter down"); break;
			case KEY_END: console.log("End Game"); GAME_STATE = "gameOver"; break;
    }
}

function keyUpTest(e)
{
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: console.log("A up"); moveLeft = false; moveRight = false; break;
            case KEY_W: console.log("W up"); moveUp = false; break;
            case KEY_S: console.log("S up"); break;
            case KEY_D: console.log("D up"); moveLeft = false; moveRight = false;break;
            case KEY_SPACE: console.log("Space up"); break;
            case KEY_ENT: console.log("Enter up"); break;
    }
}


//Loading
function loadComplete(evt) 
{
    startScreenLoad();
    
    instructionScreen = new     createjs.Bitmap(queue.getResult("instructScreen"));
    gameOver = new createjs.Bitmap(queue.getResult("gameOverScreen"));
    
    var playerSprites = new createjs.SpriteSheet({
        images: [queue.getResult("PlayerSprites")],
        frames: [[40,317,40,45,0,20.3,22.65],[80,317,40,45,0,20.3,22.65],[120,317,40,45,0,20.3,22.65],[160,317,40,45,0,20.3,22.65],[200,317,38,45,0,18.3,22.65],[238,317,38,45,0,18.3,22.65],[276,317,38,45,0,18.3,22.65],[314,317,38,45,0,18.3,22.65],[352,317,38,45,0,18.3,22.65],[390,317,38,45,0,18.3,22.65],[428,317,38,45,0,18.3,22.65],[466,317,38,45,0,18.3,22.65],[0,362,38,45,0,18.3,22.65],[38,362,38,45,0,18.3,22.65],[76,362,39,45,0,19.3,22.65],[115,362,39,45,0,19.3,22.65],[154,362,38,45,0,18.3,22.65],[192,362,38,45,0,18.3,22.65],[230,362,38,45,0,17.3,22.65],[268,362,38,45,0,17.3,22.65],[306,362,37,45,0,17.3,22.65],[0,0,32,45,0,19.1,20.5],[32,0,32,45,0,20.1,20.5],[64,0,38,45,0,23.1,20.5],[102,0,42,45,0,21.1,20.5],[144,0,35,45,0,20.1,20.5],[179,0,25,45,0,13.100000000000001,20.5],[204,0,33,45,0,17.1,20.5],[237,0,39,45,0,21.1,20.5],[276,0,39,45,0,21.1,20.5],[315,0,38,45,0,20.1,20.5],[353,0,37,45,0,21.1,20.5],[343,362,40,45,0,20.15,21.4],[383,362,38,51,0,19.15,26.4],[421,362,34,51,0,19.15,26.4],[455,362,31,51,0,16.15,28.4],[0,413,31,51,0,16,23.55],[31,413,34,51,0,19,23.55],[65,413,30,51,0,16,23.55],[95,413,31,51,0,16,23.55],[126,413,31,51,0,16.6,23.2],[157,413,34,51,0,17.6,23.2],[191,413,41,51,0,22.6,24.2],[232,413,37,51,0,18.15,25.65],[269,413,36,48,0,17.15,25.65],[305,413,32,47,0,13.149999999999999,25.65],[337,413,32,51,0,13.149999999999999,25.65],[369,413,35,51,0,15.75,27.75],[404,413,74,50,0,16.75,27.75]],
        animations: {
            stand: [0, 20, "stand", .3],
            run: [21, 31, "run", .3],
            jump1: [32,35, "jump1", .3],
            jump2: [36, 39, "jump2", .3],
            jump3: [40,42, "jump3", .3],
            jump4: [43,46, "jump4", .3],
            jump5: [47, 48, "jump5", .3],
            "offGround": [32, 39, "jump2",.3],
            "startFalling": [40,46, "jump4", .3]
            }     
        });
    
    player = new createjs.Sprite(playerSprites);
    
    //setPlayer();
    
//	displaySprites();
//	startLoop();
}

//This is the preload manifest used by preloadJS. I am currently only loading one image. I can use a commas and add more files if needed. I commented out an example of what that would look like
fileManifest = [
				{src:"GameOver.jpg", id:"gameOverScreen"},
                {src:"InstructScreen.jpg", id:"instructScreen"},
                {src:"StartScreen.jpg", id:"startScreen"},
                {src:"play.png", id:"playButton"},
                {src:"menu.png", id:"menuButton"},
                {src:"tutorial.png", id:"tutorialButton"},
                {src:"NewSprites.png", id:"PlayerSprites"}
            ];
			
//This function loadeds all the files in fileManifest and will rught loadComplete when it is finished. You can also get progress information. There are examples how to do this in preloadJS.
function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
    
}

function setPlayer()
{
	player.x = CANVAS_WIDTH/2;
	player.y = CANVAS_HEIGHT-20;
	player.speed = 3;
	player.velX = 0;
	player.velY = 0;
	player.jumping = false;
    
    player.gotoAndPlay("stand");
	
	stage.addChild(player);
	stage.update();
}

function startScreenLoad()
{
    title = new createjs.Bitmap(queue.getResult("startScreen"));
    stage.addChild(title);
    
    var tutBut =  new createjs.Bitmap(queue.getResult("tutorialButton"));
    tutorialButton = new createjs.Container();
    tutorialButton.name = "tutorialButton";
    tutorialButton.x = 100;
    tutorialButton.y = 200;
    tutorialButton.addChild(tutBut);
    
    tutorialButton.addEventListener("click", instructScreen);
    
    var play =  new createjs.Bitmap(queue.getResult("playButton"));
    playButton = new createjs.Container();
    playButton.name = "playButton";
    playButton.x = 350;
    playButton.y = 200;
    playButton.addChild(play);
    
    playButton.addEventListener("click", init);
    
    stage.addChild(tutorialButton);
    stage.addChild(playButton);
	
    stage.update();
}


//Unloading
function unloadStartButtons()
{
    stage.removeChild(title);
    stage.removeChild(tutorialButton);
    stage.removeChild(playButton);
	
}



//Screens
function startScreen()
{
    openCanvas();
    setupStage();
    loadFiles();
}

function instructScreen()
{
    unloadStartButtons();
    if(!createjs.Ticker.getPaused())
    {
        GAME_STATE = "Pause";
        createjs.Ticker.setPaused(true);
        stage.addChild(instructionScreen);
        
        var menu =  new createjs.Bitmap(queue.getResult("menuButton"));
    menuButton = new createjs.Container();
    menuButton.name = "menuButton";
    menuButton.x = 350;
    menuButton.y = 200;
    menuButton.addChild(menu);
        
        menuButton.addEventListener("click", instructScreen);
        
        stage.addChild(menuButton);
        
        
        stage.update();
    }
    else
    {
        createjs.Ticker.setPaused(false);
        startScreenLoad();
        stage.removeChild(instructionScreen);
        stage.removeChild(menuButton);
        stage.update();
    }
}

function gameOverScreen()
{
    if(time >= 10 || GAME_STATE=="gameOver")
    {
        createjs.Ticker.removeAllEventListeners();
        stage.addChild(gameOver);
        stage.addChild(scoreCount);
        stage.update();
    }
}


function init() {
    GAME_STATE = "inGame";
    stage.removeChild(title);
    unloadStartButtons();
	setPlayer();
    startLoop();
	
}

//gameplay
function movePlayer()
{
	moving();
	player.x += player.velX;
	player.y += player.velY;
		
	player.velX *= friction;
	player.velY += gravity;
		
	checkPlayer();
}



function moving()
{
	
	if(player.velX > -player.speed && moveLeft)
	{
		player.velX--;
	}
	else if(player.velX < player.speed&& moveRight)
	{
		player.velX++;
	}
	if(!player.jumping && moveUp)
	{
		player.jumping=true;
        inAir = true;
		player.velY = -player.speed*2;
	}
    else if(inAir && !moveUp)
    {
        
        player.velY += 0.4;
    }
}

function checkPlayer()
{
	if(player.x >= CANVAS_WIDTH-10)
	{
		player.x = CANVAS_WIDTH-10;
	}
	else if(player.x <= 0)
	{
		player.x = 0;
	}
	
	if(player.y >= CANVAS_HEIGHT-10)
	{
		player.y = CANVAS_HEIGHT - 10;
		player.jumping = false;
        inAir = false;
	}
	else if(player.y <= 0)
	{
		player.y = 0;
	}
}

var playing = Boolean(false);
var anim = "";

function checkAnimation()
{
    if(inAir)
    {
        if(player.velY < 0)
        {
            if(!playing)
            {
                anim = "jumping";
                player.gotoAndPlay("offGround");
                playing = true;     
            }
            else
            {
                if(anim == "jumping")
                {

                }
                else
                {
                    anim = "jumping";
                player.gotoAndPlay("offGround");
                    playing = true;
                }
            }
        }
        else
        {
            if(!playing)
            {
                anim = "falling";
                player.gotoAndPlay("startFalling");
                playing = true;     
            }
            else
            {
                if(anim == "falling")
                {

                }
                else
                {
                    anim = "falling";
                    player.gotoAndPlay("startFalling");
                    playing = true;
                }
            } 
        }
    }
    else if(moveLeft)
    {
        if(!playing)
        {
            anim = "right";
            player.gotoAndPlay("run");
            playing = true;     
        }
        else
        {
            if(anim == "right")
            {
                
            }
            else
            {
                anim = "right";
                player.gotoAndPlay("run");
                playing = true;
            }
        }
    }
    else if(moveRight)
    {
        if(!playing)
        {
            anim = "left";
            player.gotoAndPlay("run");
            playing = true;  
        }
        else
        {
            if(anim == "left")
            {
                
            }
            else
            {
                anim = "left";
                player.gotoAndPlay("run");
                playing = true;
            }
        }
    }
    else if(!moveLeft && !moveRight)
    {
        if(!playing)
        {
            anim = "stand";
            player.gotoAndPlay("stand");
            playing = true;
        }
        else
        {
            if(anim == "stand")
            {
                
            }
            else
            {
                anim = "stand";
                player.gotoAndPlay("stand");
                playing = true;
            }
        }
    }
}

function collision()
{
    
}
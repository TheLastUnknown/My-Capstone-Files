//Game constant

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 900;
var FPS = 15;
var GAME_STATE = 'start';
var time=0;
var score = 0;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A=65, KEY_W=87, KEY_D=68, KEY_S=83, KEY_SPACE=32, KEY_ENT=13, KEY_END=80;

document.onkeydown = keyDownTest;
document.onkeyup = keyUpTest;

var squares = [];

var corridorHoriz = Boolean(false);
var corridorVert = Boolean(false);
var cornerRight = Boolean(false);
var cornerLeft = Boolean(false);
var cornerDownL = Boolean(false);
var cornerDownR = Boolean(false);

var mouseColor = 1;
var mouseCode = 1;

var canvas, stage, queue;

var mouseX, mouseY, timer, scoreCount;
var museX, museY;
var drawCursor, drawCursor2, drawCursor3, drawCursor4, drawCursor5, drawCursor6, drawCursor7, drawCursor8;
var gridWidth = 0, gridHeight = 0;

var mapBlocks;

var mouseEvt = Boolean(false);

var title, instructionScreen, gameOver;
var playButton, tutorialButton, menuButton, medium, large; //Menu Buttons

var corrHoriz, corrVert, cornerL, cornerR, cornerDR, cornerDL;

var drawSizeDown, drawSizeUp, loadButton, saveButton, clearButton;

//opens a canvas and tells CreateJS to use it as a Stage. Remember, CreateJS does everything on it's stage similar to the way ActionScript works.
function openCanvas() {
    
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
	var div = document.getElementById("levelCreator");
    div.appendChild(canvas);
    
}


function setupStage()
{
	stage = new createjs.Stage(canvas);
	stage.enableDOMEvents(true);
	stage.enableMouseOver();
    
	stage.on("stagemousemove",function(evt) {
				//console.log(evt.stageX + ", " + evt.stageY);
                //mouseX.text = "mouseX: " +  evt.stageX;
                //mouseY.text = "mouseY: " +  evt.stageY;
				
				
				
				museX = Math.floor(evt.stageX);
				museY = Math.floor(evt.stageY);
				mouseOverStuff();
			});
			
	stage.on("stagemousedown", stageMouseControls);
	stage.on("stagemouseup", stageMouseControls);
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
	stage.update();
	mouseChecking();
    //console.log(GAME_STATE);
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

var drawSize = 3;


//Mouse Controls
function mouseChecking()
{
	changeX = Math.floor(museX / 10);
	changeY = Math.floor(museY / 10);

	checkMouseColor();
	
    try
    {
	if(!mouseEvt)
	{
		if(corridorHoriz)
		{
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			squares[changeX][changeY-drawSize].gotoAndStop(mouseColor);
			squares[changeX][changeY-drawSize].code = mouseCode;
		}
		else if(corridorVert)
		{
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			squares[changeX-drawSize][changeY].gotoAndStop(mouseColor);
			squares[changeX-drawSize][changeY].code = mouseCode;
		}
		else if(cornerLeft)
		{
            
            //Squares to paint is 2*drawSize + 2
            //How the fuck do you loop that
            
            
            squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
            
            squares[changeX-drawSize][changeY-drawSize].gotoAndStop(mouseColor);
			squares[changeX-drawSize][changeY-drawSize].code = mouseCode;
            
            for(var i = 0; i <= drawSize; i++)
            {
                squares[changeX-drawSize][changeY-(drawSize-i)].gotoAndStop(mouseColor);
                squares[changeX-drawSize][changeY-(drawSize-i)].code = mouseCode;
                
                squares[changeX-(drawSize-i)][changeY-drawSize].gotoAndStop(mouseColor);
                squares[changeX-(drawSize-i)][changeY-drawSize].code = mouseCode;
            }
            
            
            /*
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			
			squares[changeX-3][changeY].gotoAndStop(mouseColor);
			squares[changeX-3][changeY].code = mouseCode;
			
			squares[changeX-3][changeY-1].gotoAndStop(mouseColor);
			squares[changeX-3][changeY-1].code = mouseCode;
			
			squares[changeX-3][changeY-2].gotoAndStop(mouseColor);
			squares[changeX-3][changeY-2].code = mouseCode;
			
			squares[changeX-3][changeY-3].gotoAndStop(mouseColor);
			squares[changeX-3][changeY-3].code = mouseCode;
			
			squares[changeX-2][changeY-3].gotoAndStop(mouseColor);
			squares[changeX-2][changeY-3].code = mouseCode;
			
			squares[changeX-1][changeY-3].gotoAndStop(mouseColor);
			squares[changeX-1][changeY-3].code = mouseCode;
			
			squares[changeX][changeY-3].gotoAndStop(mouseColor);
			squares[changeX][changeY-3].code = mouseCode;
            */
		}
		else if(cornerRight)
		{
            
            squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
            
            squares[changeX+drawSize][changeY-drawSize].gotoAndStop(mouseColor);
			squares[changeX+drawSize][changeY-drawSize].code = mouseCode;
            
            for(var i = 0; i <= drawSize; i++)
            {
                squares[changeX+drawSize][changeY-(drawSize-i)].gotoAndStop(mouseColor);
                squares[changeX+drawSize][changeY-(drawSize-i)].code = mouseCode;
                
                squares[changeX+(drawSize-i)][changeY-drawSize].gotoAndStop(mouseColor);
                squares[changeX+(drawSize-i)][changeY-drawSize].code = mouseCode;
            }
            
            /*
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			
			squares[changeX+3][changeY].gotoAndStop(mouseColor);
			squares[changeX+3][changeY].code = mouseCode;
			
			squares[changeX+3][changeY-1].gotoAndStop(mouseColor);
			squares[changeX+3][changeY-1].code = mouseCode;
			
			squares[changeX+3][changeY-2].gotoAndStop(mouseColor);
			squares[changeX+3][changeY-2].code = mouseCode;
			
			squares[changeX+3][changeY-3].gotoAndStop(mouseColor);
			squares[changeX+3][changeY-3].code = mouseCode;
			
			squares[changeX+2][changeY-3].gotoAndStop(mouseColor);
			squares[changeX+2][changeY-3].code = mouseCode;
			
			squares[changeX+1][changeY-3].gotoAndStop(mouseColor);
			squares[changeX+1][changeY-3].code = mouseCode;
			
			squares[changeX][changeY-3].gotoAndStop(mouseColor);
			squares[changeX][changeY-3].code = mouseCode;
            */
		}
		else if(cornerDownR)
		{
            
            squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
            
            squares[changeX-drawSize][changeY+drawSize].gotoAndStop(mouseColor);
			squares[changeX-drawSize][changeY+drawSize].code = mouseCode;
            
            for(var i = 0; i <= drawSize; i++)
            {
                squares[changeX-drawSize][changeY+(drawSize-i)].gotoAndStop(mouseColor);
                squares[changeX-drawSize][changeY+(drawSize-i)].code = mouseCode;
                
                squares[changeX-(drawSize-i)][changeY+drawSize].gotoAndStop(mouseColor);
                squares[changeX-(drawSize-i)][changeY+drawSize].code = mouseCode;
            }
            
            /*
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			
			squares[changeX-3][changeY].gotoAndStop(mouseColor);
			squares[changeX-3][changeY].code = mouseCode;
			
			squares[changeX-3][changeY+1].gotoAndStop(mouseColor);
			squares[changeX-3][changeY+1].code = mouseCode;
			
			squares[changeX-3][changeY+2].gotoAndStop(mouseColor);
			squares[changeX-3][changeY+2].code = mouseCode;
			
			squares[changeX-3][changeY+3].gotoAndStop(mouseColor);
			squares[changeX-3][changeY+3].code = mouseCode;
			
			squares[changeX-2][changeY+3].gotoAndStop(mouseColor);
			squares[changeX-2][changeY+3].code = mouseCode;
			
			squares[changeX-1][changeY+3].gotoAndStop(mouseColor);
			squares[changeX-1][changeY+3].code = mouseCode;
			
			squares[changeX][changeY+3].gotoAndStop(mouseColor);
			squares[changeX][changeY+3].code = mouseCode;
            */
		}
		else if(cornerDownL)
		{
            
            squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
            
            squares[changeX+drawSize][changeY+drawSize].gotoAndStop(mouseColor);
			squares[changeX+drawSize][changeY+drawSize].code = mouseCode;
            
            for(var i = 0; i <= drawSize; i++)
            {
                squares[changeX+drawSize][changeY+(drawSize-i)].gotoAndStop(mouseColor);
                squares[changeX+drawSize][changeY+(drawSize-i)].code = mouseCode;
                
                squares[changeX+(drawSize-i)][changeY+drawSize].gotoAndStop(mouseColor);
                squares[changeX+(drawSize-i)][changeY+drawSize].code = mouseCode;
            }
            /*
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			
			squares[changeX+3][changeY].gotoAndStop(mouseColor);
			squares[changeX+3][changeY].code = mouseCode;
			
			squares[changeX+3][changeY+1].gotoAndStop(mouseColor);
			squares[changeX+3][changeY+1].code = mouseCode;
			
			squares[changeX+3][changeY+2].gotoAndStop(mouseColor);
			squares[changeX+3][changeY+2].code = mouseCode;
			
			squares[changeX+3][changeY+3].gotoAndStop(mouseColor);
			squares[changeX+3][changeY+3].code = mouseCode;
			
			squares[changeX+2][changeY+3].gotoAndStop(mouseColor);
			squares[changeX+2][changeY+3].code = mouseCode;
			
			squares[changeX+1][changeY+3].gotoAndStop(mouseColor);
			squares[changeX+1][changeY+3].code = mouseCode;
			
			squares[changeX][changeY+3].gotoAndStop(mouseColor);
			squares[changeX][changeY+3].code = mouseCode;
            */
		}
		else
		{
			//console.log(squares[changeX][changeY]);
			squares[changeX][changeY].gotoAndStop(mouseColor);
			squares[changeX][changeY].code = mouseCode;
			//squares[changeX][changeY].graphics.beginFill(mouseColor);
			//squares[changeX][changeY].graphics.drawRect(0, 0, 10, 10);
		}
		//stage.updateCache();
	}
	else if(mouseEvt)
	{	
		
	}
    }
    catch(err)
    {
        //console.log("didnt click grid");
    }
}



var spriteCursor;

function mouseOverStuff()
{
	var trackX = Math.floor(museX/10);
	var trackY = Math.floor(museY/10);
	
	if(museX < gridWidth && museY < gridHeight)
	{
        spriteCursor.alpha = 1;
        
        spriteCursor.x = Math.floor(trackX*10)+10;
		spriteCursor.y = Math.floor(trackY*10)+10;
        
        spriteCursor.gotoAndStop("singleCursor");
        
        
		if(corridorHoriz)
		{
            spriteCursor.gotoAndStop("horizontal"+drawSize);
		}
		else if(corridorVert)
		{
            spriteCursor.gotoAndStop("vertical"+drawSize);
		}
		else if(cornerLeft)
		{
            spriteCursor.gotoAndStop("downLeft"+drawSize);
		}
		else if(cornerRight)
		{
            spriteCursor.gotoAndStop("downRight"+drawSize);
		}
		else if(cornerDownR)
		{
            spriteCursor.gotoAndStop("upRight"+drawSize);
		
		}
		else if(cornerDownL)
		{
            spriteCursor.gotoAndStop("upLeft"+drawSize);
            
		}
		else
		{
			
		}
	}
	else
	{
        spriteCursor.alpha = 0;
	}
	
}

function stageMouseControls(evt)
{
	//console.log(evt.type);
	if(evt.type == "stagemousedown")
	{
		mouseEvt = Boolean(false);
		//console.log("go");
	}
	else if(evt.type == "stagemouseup")
	{
		mouseEvt = Boolean(true);
		//console.log("stop");
	}
}

function checkMouseColor()
{
	if(mouseColor == "floor")
	{
		mouseCode = 1;
	}
}



function drawingSizes(num)
{
    if(drawSize > 1 && drawSize < 7)
    {
        drawSize += num;
    }
    else if(drawSize >= 7)
    {
        drawSize = 6;
    }
    else if(drawSize <= 1)
    {
        drawSize = 2;
    }
}

//Keyboard Events
function keyDownTest(e)
{
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: console.log("A down"); break;
            case KEY_W: console.log("W down"); break;
            case KEY_S: console.log("S down"); break;
            case KEY_D: console.log("D down"); break;
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
            case KEY_A: console.log("A up"); break;
            case KEY_W: console.log("W up"); break;
            case KEY_S: console.log("S up"); break;
            case KEY_D: console.log("D up"); break;
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
    
	var blocks = new createjs.SpriteSheet(
		{
		images: [queue.getResult("mapSprites")], 
		frames: [[0,0,10,10,0,0,0],[10,0,10,10,0,0,0],[20,0,10,10,0,0,0],[30,0,10,10,0,0,0],[40,0,10,10,0,0,0],[50,0,10,10,0,0,0],[60,0,10,10,0,0,0],[70,0,10,10,0,0,0],[80,0,10,10,0,0,0],[90,0,10,10,0,0,0],[100,0,10,10,0,0,0]],
		animations:{
			0: [0, 0, "0", 1],
            1: [1, 1, "1", 1],
            2: [2, 2, "2", 1],
			3: [3, 3, "3", 1],
			4: [4, 4, "4", 1],
            5: [5, 5, "5", 1],
            6: [6, 6, "6", 1],
            7: [7, 7, "7", 1],
            8: [8, 8, "8", 1],
            9: [9, 9, "9", 1],
            10: [10, 10, "10", 1]
		}
		
		});
	
	mapBlocks = new createjs.Sprite(blocks);
    
    var cursorSprites = new createjs.SpriteSheet({
       images: [queue.getResult("cursorFrames")],
        frames: [[169,144,32,32,0,31.25,31.099999999999994],[474,43,42,42,0,41.25,41.099999999999994],[249,135,52,52,0,51.25,51.099999999999994],[63,82,62,62,0,61.25,61.099999999999994],[329,72,72,72,0,71.25,71.1],[83,0,82,82,0,81.25,81.1],[201,144,32,32,0,11.3,31.099999999999994],[473,85,42,42,0,11.3,41.099999999999994],[0,144,52,52,0,11.3,51.099999999999994],[125,82,62,62,0,10.3,61.099999999999994],[329,0,73,72,0,11.3,71.1],[0,0,83,82,0,11.3,81.1],[104,144,33,32,0,11.4,11.35],[473,127,42,42,0,11.4,11.35],[52,144,52,52,0,11.4,11.35],[187,82,62,62,0,11.4,11.35],[401,73,72,72,0,11.4,11.35],[165,0,82,82,0,11.4,11.35],[137,144,32,33,0,31.150000000000006,11],[474,0,42,43,0,41.150000000000006,11],[249,82,52,53,0,51.150000000000006,11],[0,82,63,62,0,61.150000000000006,11],[402,0,72,73,0,71.15,11],[247,0,82,82,0,81.15,11],[343,168,32,12,0,31.049999999999997,11.1],[301,168,42,12,0,41.05,11.1],[387,157,52,12,0,51.05,11.1],[313,156,62,12,0,61.05,11.1],[395,145,72,12,0,71.05,11.1],[313,144,82,12,0,81.05,11.1],[451,157,12,32,0,11.1,31.049999999999997],[439,157,12,42,0,11.1,41.05],[375,156,12,52,0,11.1,51.05],[313,82,12,62,0,11.1,61.05],[233,144,12,72,0,11.1,71.05],[301,82,12,82,0,11.1,81.05],[387,169,12,12,0,11.1,11.1]],
        animations: {
            downLeft2:[0,0],
            downLeft3:[1,1],
            downLeft4:[2,2],
            downLeft5:[3,3],
            downLeft6:[4,4],
            downLeft7:[5,5],
            downRight2:[6,6],
            downRight3:[7,7],
            downRight4:[8,8],
            downRight5:[9,9],
            downRight6:[10,10],
            downRight7:[11,11],
            upLeft2:[12,12],
            upLeft3:[13,13],
            upLeft4:[14,14],
            upLeft5:[15,15],
            upLeft6:[16,16],
            upLeft7:[17,17],
            upRight2:[18,18],
            upRight3:[19,19],
            upRight4:[20,20],
            upRight5:[21,21],
            upRight6:[22,22],
            upRight7:[23,23],
            vertical2:[24,24],
            vertical3:[25,25],
            vertical4:[26,26],
            vertical5:[27,27],
            vertical6:[28,28],
            vertical7:[29,29],
            horizontal2:[30,30],
            horizontal3:[31,31],
            horizontal4:[32,32],
            horizontal5:[33,33],
            horizontal6:[34,34],
            horizontal7:[35,35],
            singleCursor:[36,36]
        }
    });
    
    corrHoriz = new createjs.Bitmap(queue.getResult("horizIcon"));
    corrVert = new createjs.Bitmap(queue.getResult("vertIcon"));
    cornerL = new createjs.Bitmap(queue.getResult("cornerDRIcon"));
    cornerDL = new createjs.Bitmap(queue.getResult("cornerLUIcon"));
    cornerR = new createjs.Bitmap(queue.getResult("cornerDLIcon"));
    cornerDR = new createjs.Bitmap(queue.getResult("cornerRUIcon"));
    
    drawSizeUp = new createjs.Bitmap(queue.getResult("plus"));
    drawSizeDown = new createjs.Bitmap(queue.getResult("minus"));
    
    saveButton = new createjs.Bitmap(queue.getResult("saveButton"));
    loadButton = new createjs.Bitmap(queue.getResult("loadButton"));
    clearButton = new createjs.Bitmap(queue.getResult("clearButton"));
    
    spriteCursor = new createjs.Sprite(cursorSprites);
    
    console.log(loggedUser);
    
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
				{src:"MapSprites.png", id:"mapSprites"},
                {src:"HorizCorridor.png", id:"horizIcon"},
                {src:"VertCorridor.png", id:"vertIcon"},
                {src:"CornerDownRight.png", id:"cornerDRIcon"},
                {src:"CornerLeftDown.png", id:"cornerDLIcon"},
                {src:"CornerLeftUp.png", id:"cornerLUIcon"},
                {src:"CornerRightUp.png", id:"cornerRUIcon"},
                {src:"plus.png", id:"plus"},
                {src:"minus.png", id:"minus"},
                {src:"Save.png", id:"saveButton"},
                {src:"Load.png", id:"loadButton"},
                {src:"Clear.png", id:"clearButton"},
                {src:"CursorSizes.png", id:"cursorFrames"}
            ];
			
//This function loadeds all the files in fileManifest and will rught loadComplete when it is finished. You can also get progress information. There are examples how to do this in preloadJS.
function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
    
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
	
	medium = new createjs.Shape();
	medium.graphics.beginFill("#FF0000").beginStroke("#000000");
    medium.graphics.drawRect(0, 0, 100, 50);
	medium.x = 375;
	medium.y = 150;
	medium.on("click", initMedium);
	
	large = new createjs.Shape();
    large.graphics.beginFill("#FF00FF").beginStroke("#000000");
    large.graphics.drawRect(0, 0, 100, 50);
	large.x = 375;
	large.y = 275;
	large.on("click",initLarge);
	
	stage.addChild(medium);
    stage.addChild(large);
	
    stage.update();
}

function startMouseCursor()
{
    
    spriteCursor.x = spriteCursor.x-50;
    spriteCursor.y = spriteCursor.y-50;
    
    stage.addChild(spriteCursor);
}

function clearGrid()
{
    for(var i = 0; i < squares.length; i++)
    {
        for(var j = 0; j < squares.length; j++)
        {
            squares[i][j].code = 0;
            squares[i][j].gotoAndStop(0);
        }
    }
}

//Unloading
function unloadStartButtons()
{
    stage.removeChild(title);
    stage.removeChild(tutorialButton);
    stage.removeChild(playButton);
	stage.removeChild(medium);
	stage.removeChild(large);
	
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


//Small Grid
function createGridSmall()
{
	mapBlocks.x = 0;
	mapBlocks.y = 0;
	
	for( var x = 0; x < 35; x++)
	{
		squares[x] = []
		for(var y = 0; y < 35; y++)
		{
			mapBlocks.x = x*10;
			mapBlocks.y = y*10;
			mapBlocks.gotoAndStop(0);
			mapBlocks.code = 0;
			squares[x][y] = mapBlocks.clone();
			squares[x][y].code = 0;
		}	
	}
	
	for(var i = 0; i < 35; i++)
	{
		for(var j = 0; j < 35; j++)
		{
			stage.addChild(squares[i][j]);
			//console.log(j);
		}
	}
	
	gridHeight = 350;
	gridWidth = 350;
	
	//console.log(squares.length);
	
	stage.update();
	
}

function changeStageDraw()
{
	
	corrHoriz.x = 350;
	corrHoriz.y = 0;
	corrHoriz.on("click", function(evt){
		corridorHoriz = Boolean(!corridorHoriz);
		corridorVert = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	
	corrVert.x = 350;
	corrVert.y = 60;
	corrVert.on("click", function(evt){
		corridorVert = Boolean(!corridorVert);
		corridorHoriz = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	cornerL.x = 410;
	cornerL.y = 0;
	cornerL.on("click", function(evt){
		cornerLeft = Boolean(!cornerLeft);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerR.x = 410;
	cornerR.y = 60;
	cornerR.on("click", function(evt){
		cornerRight = Boolean(!cornerRight);
		cornerLeft = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDR.x = 470;
	cornerDR.y = 0;
	cornerDR.on("click", function(evt){
		cornerDownR = Boolean(!cornerDownR);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDL.x = 470;
	cornerDL.y = 60;
	cornerDL.on("click", function(evt){
		cornerDownL = Boolean(!cornerDownL);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	
	
	var green = new createjs.Shape();
	green.x = 350;
	green.y = 150;
	green.graphics.beginFill("#00FF00").beginStroke("#000000");
    green.graphics.drawRect(0, 0, 30, 30);
	green.on("click", function(evt){
		mouseColor = 2;
		mouseCode = 2;
	});
	
	var red = new createjs.Shape();
	red.x = 385;
	red.y = 150;
	red.graphics.beginFill("#FF0000").beginStroke("#000000");
    red.graphics.drawRect(0, 0, 30, 30);
	red.on("click", function(evt){
		mouseColor = 3;
		mouseCode = 3;
	});
	
	var purple = new createjs.Shape();
	purple.x = 420;
	purple.y = 150;
	purple.graphics.beginFill("#6600FF").beginStroke("#000000");
    purple.graphics.drawRect(0, 0, 30, 30);
	purple.on("click", function(evt){
		mouseColor = 4;
		mouseCode = 4;
	});
	
	var white = new createjs.Shape();
	white.x = 455;
	white.y = 150;
	white.graphics.beginFill("#FFFFFF").beginStroke("#000000");
    white.graphics.drawRect(0, 0, 30, 30);
	white.on("click", function(evt){
		mouseColor = 1;
		mouseCode = 1;
	});
	
	var eraser = new createjs.Shape();
	eraser.x = 350;
	eraser.y = 185;
	eraser.graphics.beginFill("#0000FF").beginStroke("#000000");
    eraser.graphics.drawRect(0, 0, 30, 30);
	eraser.on("click", function(evt){
		mouseColor = 0;
		mouseCode = 0;
	});
	
    var orange = new createjs.Shape();
	orange.x = 385;
	orange.y = 185;
	orange.graphics.beginFill("#FF9933").beginStroke("#000000");
    orange.graphics.drawRect(0, 0, 30, 30);
	orange.on("click", function(evt){
		mouseColor = 5;
		mouseCode = 5;
	});
    
    var grey = new createjs.Shape();
	grey.x = 420;
	grey.y = 185;
	grey.graphics.beginFill("#999999").beginStroke("#000000");
    grey.graphics.drawRect(0, 0, 30, 30);
	grey.on("click", function(evt){
		mouseColor = 6;
		mouseCode = 6;
	});
    
    var yellow = new createjs.Shape();
	yellow.x = 455;
	yellow.y = 185;
	yellow.graphics.beginFill("#FFFF00").beginStroke("#000000");
    yellow.graphics.drawRect(0, 0, 30, 30);
	yellow.on("click", function(evt){
		mouseColor = 7;
		mouseCode = 7;
	});
    
    var pink = new createjs.Shape();
	pink.x = 350;
	pink.y = 220;
	pink.graphics.beginFill("#FF33CC").beginStroke("#000000");
    pink.graphics.drawRect(0, 0, 30, 30);
	pink.on("click", function(evt){
		mouseColor = 8;
		mouseCode = 8;
	});
    
    var black = new createjs.Shape();
	black.x = 385;
	black.y = 220;
	black.graphics.beginFill("#393939").beginStroke("#000000");
    black.graphics.drawRect(0, 0, 30, 30);
	black.on("click", function(evt){
		mouseColor = 9;
		mouseCode = 9;
	});
    
	
	saveButton.x = 350;
	saveButton.y = 260;
	saveButton.on("click", function(evt){
		console.log("save");
		saveLevel();
	});
	
    
	loadButton.x = 350;
	loadButton.y = 290;
	loadButton.on("click", function(evt){
		loadLevel();
	});
	
    
	clearButton.x = 350;
	clearButton.y = 320;
	clearButton.on("click", function(evt){
		clearGrid();
	});
	
	
	drawSizeUp.x = 490;
	drawSizeUp.y = 150;
	drawSizeUp.on("click", function(evt){
		drawingSizes(+1);
	});
    
    
	drawSizeDown.x = 490;
	drawSizeDown.y = 190;
	drawSizeDown.on("click", function(evt){
		drawingSizes(-1);
	});
    
	
	stage.addChild(corrHoriz);
	stage.addChild(corrVert);
	
	stage.addChild(cornerL);
	stage.addChild(cornerR);
	stage.addChild(cornerDR);
	stage.addChild(cornerDL);
	
	stage.addChild(green);
	stage.addChild(red);
	stage.addChild(purple);
	stage.addChild(white);
	stage.addChild(eraser);
    stage.addChild(orange);
	stage.addChild(grey);
	stage.addChild(yellow);
	stage.addChild(pink);
	stage.addChild(black);
    
    stage.addChild(drawSizeUp);
    stage.addChild(drawSizeDown);
	
	stage.addChild(saveButton);
	stage.addChild(loadButton);
	stage.addChild(clearButton);
}

function init() {
    GAME_STATE = "inGame";
    stage.removeChild(title);
    unloadStartButtons();
	createGridSmall();
	changeStageDraw();
	startMouseCursor();
    startLoop();
	
}



//Medium Grid
function createGridMedium()
{
	mapBlocks.x = 0;
	mapBlocks.y = 0;
	
	for( var x = 0; x < 50; x++)
	{
		squares[x] = []
		for(var y = 0; y < 50; y++)
		{
			mapBlocks.x = x*10;
			mapBlocks.y = y*10;
			mapBlocks.gotoAndStop(0);
			mapBlocks.code = 0;
			squares[x][y] = mapBlocks.clone();
			squares[x][y].code = 0;
		}	
	}
	
	for(var i = 0; i < 50; i++)
	{
		for(var j = 0; j < 50; j++)
		{
			stage.addChild(squares[i][j]);
			//console.log(j);
		}
	}
	gridHeight = 500;
	gridWidth = 500;
	
	//stage.addChild(squares);
	stage.update();
}

function changeStageDrawMedium()
{
	corrHoriz.x = 500;
	corrHoriz.y = 0;
	corrHoriz.on("click", function(evt){
		corridorHoriz = Boolean(!corridorHoriz);
		corridorVert = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	
	corrVert.x = 500;
	corrVert.y = 60;
	corrVert.on("click", function(evt){
		corridorVert = Boolean(!corridorVert);
		corridorHoriz = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	cornerL.x = 560;
	cornerL.y = 0;
	cornerL.on("click", function(evt){
		cornerLeft = Boolean(!cornerLeft);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerR.x = 560;
	cornerR.y = 60;
	cornerR.on("click", function(evt){
		cornerRight = Boolean(!cornerRight);
		cornerLeft = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDR.x = 620;
	cornerDR.y = 0;
	cornerDR.on("click", function(evt){
		cornerDownR = Boolean(!cornerDownR);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDL.x = 620;
	cornerDL.y = 60;
	cornerDL.on("click", function(evt){
		cornerDownL = Boolean(!cornerDownL);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	//Color Changes
	var green = new createjs.Shape();
	green.x = 500;
	green.y = 210;
	green.graphics.beginFill("#00FF00").beginStroke("#000000");
    green.graphics.drawRect(0, 0, 30, 30);
	green.on("click", function(evt){
		mouseColor = 2;
		mouseCode = 2;
	});
	
	var red = new createjs.Shape();
	red.x = 535;
	red.y = 210;
	red.graphics.beginFill("#FF0000").beginStroke("#000000");
    red.graphics.drawRect(0, 0, 30, 30);
	red.on("click", function(evt){
		mouseColor = 3;
		mouseCode = 3;
	});
	
	var purple = new createjs.Shape();
	purple.x = 570;
	purple.y = 210;
	purple.graphics.beginFill("#3333FF").beginStroke("#000000");
    purple.graphics.drawRect(0, 0, 30, 30);
	purple.on("click", function(evt){
		mouseColor = 4;
		mouseCode = 4;
	});
	
	var white = new createjs.Shape();
	white.x = 605;
	white.y = 210;
	white.graphics.beginFill("#FFFFFF").beginStroke("#000000");
    white.graphics.drawRect(0, 0, 30, 30);
	white.on("click", function(evt){
		mouseColor = 1;
		mouseCode = 1;
	});
	
	var eraser = new createjs.Shape();
	eraser.x = 500;
	eraser.y = 245;
	eraser.graphics.beginFill("#0000FF").beginStroke("#000000");
    eraser.graphics.drawRect(0, 0, 30, 30);
	eraser.on("click", function(evt){
		mouseColor = 0;
		mouseCode = 0;
	});
    
    var orange = new createjs.Shape();
	orange.x = 535;
	orange.y = 245;
	orange.graphics.beginFill("#FF9933").beginStroke("#000000");
    orange.graphics.drawRect(0, 0, 30, 30);
	orange.on("click", function(evt){
		mouseColor = 5;
		mouseCode = 5;
	});
    
    var grey = new createjs.Shape();
	grey.x = 570;
	grey.y = 245;
	grey.graphics.beginFill("#999999").beginStroke("#000000");
    grey.graphics.drawRect(0, 0, 30, 30);
	grey.on("click", function(evt){
		mouseColor = 6;
		mouseCode = 6;
	});
    
    var yellow = new createjs.Shape();
	yellow.x = 605;
	yellow.y = 245;
	yellow.graphics.beginFill("#FFFF00").beginStroke("#000000");
    yellow.graphics.drawRect(0, 0, 30, 30);
	yellow.on("click", function(evt){
		mouseColor = 7;
		mouseCode = 7;
	});
    
    var pink = new createjs.Shape();
	pink.x = 500;
	pink.y = 280;
	pink.graphics.beginFill("#FF33CC").beginStroke("#000000");
    pink.graphics.drawRect(0, 0, 30, 30);
	pink.on("click", function(evt){
		mouseColor = 8;
		mouseCode = 8;
	});
    
    var black = new createjs.Shape();
	black.x = 535;
	black.y = 280;
	black.graphics.beginFill("#393939").beginStroke("#000000");
    black.graphics.drawRect(0, 0, 30, 30);
	black.on("click", function(evt){
		mouseColor = 9;
		mouseCode = 9;
	});
	
	//Function Buttons
	saveButton.x = 500;
	saveButton.y = 410;
	saveButton.on("click", function(evt){
		console.log("save");
		saveLevel();
	});
	
    
	loadButton.x = 500;
	loadButton.y = 440;
	loadButton.on("click", function(evt){
		loadLevel();
	});
	
    
	clearButton.x = 500;
	clearButton.y = 470;
	clearButton.on("click", function(evt){
		clearGrid();
	});
	
	
	drawSizeUp.x = 650;
	drawSizeUp.y = 210;
	drawSizeUp.on("click", function(evt){
		drawingSizes(+1);
	});
    
    
	drawSizeDown.x = 650;
	drawSizeDown.y = 250;
	drawSizeDown.on("click", function(evt){
		drawingSizes(-1);
	});
	
	
	
	stage.addChild(corrHoriz);
	stage.addChild(corrVert);
	
	stage.addChild(cornerL);
	stage.addChild(cornerR);
	stage.addChild(cornerDR);
	stage.addChild(cornerDL);
	
	stage.addChild(green);
	stage.addChild(red);
	stage.addChild(purple);
	stage.addChild(white);
	stage.addChild(eraser);
    stage.addChild(orange);
	stage.addChild(grey);
	stage.addChild(yellow);
	stage.addChild(pink);
	stage.addChild(black);
    
    stage.addChild(drawSizeUp);
    stage.addChild(drawSizeDown);
	
	stage.addChild(saveButton);
	stage.addChild(loadButton);
	stage.addChild(clearButton);
}

function initMedium() {
    GAME_STATE = "inGame";
    stage.removeChild(title);
    unloadStartButtons();
	createGridMedium();
	changeStageDrawMedium();
	startMouseCursor();
    startLoop();
	
}



//Large Grid
function createGridLarge()
{
	mapBlocks.x = 0;
	mapBlocks.y = 0;
	
	for( var x = 0; x < 65; x++)
	{
		squares[x] = []
		for(var y = 0; y < 65; y++)
		{
			mapBlocks.x = x*10;
			mapBlocks.y = y*10;
			mapBlocks.gotoAndStop(0);
			mapBlocks.code = 0;
			squares[x][y] = mapBlocks.clone();
			squares[x][y].code = 0;
		}	
	}
	
	for(var i = 0; i < 65; i++)
	{
		for(var j = 0; j < 65; j++)
		{
			stage.addChild(squares[i][j]);
			//console.log(j);
		}
	}
	
	gridHeight = 650;
	gridWidth = 650;
	
	//stage.addChild(squares);
	stage.update();
}

function changeStageDrawLarge()
{
	corrHoriz.x = 650;
	corrHoriz.y = 0;
	corrHoriz.on("click", function(evt){
		corridorHoriz = Boolean(!corridorHoriz);
		corridorVert = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	
	corrVert.x = 650;
	corrVert.y = 60;
	corrVert.on("click", function(evt){
		corridorVert = Boolean(!corridorVert);
		corridorHoriz = Boolean(false);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
	});
	
	
	cornerL.x = 710;
	cornerL.y = 0;
	cornerL.on("click", function(evt){
		cornerLeft = Boolean(!cornerLeft);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerR.x = 710;
	cornerR.y = 60;
	cornerR.on("click", function(evt){
		cornerRight = Boolean(!cornerRight);
		cornerLeft = Boolean(false);
		cornerDownL	= Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDR.x = 770;
	cornerDR.y = 0;
	cornerDR.on("click", function(evt){
		cornerDownR = Boolean(!cornerDownR);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownL	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	cornerDL.x = 770;
	cornerDL.y = 60;
	cornerDL.on("click", function(evt){
		cornerDownL = Boolean(!cornerDownL);
		cornerLeft = Boolean(false);
		cornerRight = Boolean(false);
		cornerDownR	= Boolean(false);
		corridorHoriz = Boolean(false);
		corridorVert = Boolean(false);
	});
	
	
	var green = new createjs.Shape();
	green.x = 650;
	green.y = 300;
	green.graphics.beginFill("#00FF00").beginStroke("#000000");
    green.graphics.drawRect(0, 0, 30, 30);
	green.on("click", function(evt){
		mouseColor = 2;
		mouseCode = 2;
	});
	
	var red = new createjs.Shape();
	red.x = 685;
	red.y = 300;
	red.graphics.beginFill("#FF0000").beginStroke("#000000");
    red.graphics.drawRect(0, 0, 30, 30);
	red.on("click", function(evt){
		mouseColor = 3;
		mouseCode = 3;
	});
	
	var purple = new createjs.Shape();
	purple.x = 720;
	purple.y = 300;
	purple.graphics.beginFill("#3333FF").beginStroke("#000000");
    purple.graphics.drawRect(0, 0, 30, 30);
	purple.on("click", function(evt){
		mouseColor = 4;
		mouseCode = 4;
	});
	
	var white = new createjs.Shape();
	white.x = 755;
	white.y = 300;
	white.graphics.beginFill("#FFFFFF").beginStroke("#000000");
    white.graphics.drawRect(0, 0, 30, 30);
	white.on("click", function(evt){
		mouseColor = 1;
		mouseCode = 1;
	});
	
	var eraser = new createjs.Shape();
	eraser.x = 650;
	eraser.y = 335;
	eraser.graphics.beginFill("#0000FF").beginStroke("#000000");
    eraser.graphics.drawRect(0, 0, 30, 30);
	eraser.on("click", function(evt){
		mouseColor = 0;
		mouseCode = 0;
	});
    
    var orange = new createjs.Shape();
	orange.x = 685;
	orange.y = 335;
	orange.graphics.beginFill("#FF9933").beginStroke("#000000");
    orange.graphics.drawRect(0, 0, 30, 30);
	orange.on("click", function(evt){
		mouseColor = 5;
		mouseCode = 5;
	});
    
    var grey = new createjs.Shape();
	grey.x = 720;
	grey.y = 335;
	grey.graphics.beginFill("#999999").beginStroke("#000000");
    grey.graphics.drawRect(0, 0, 30, 30);
	grey.on("click", function(evt){
		mouseColor = 6;
		mouseCode = 6;
	});
    
    var yellow = new createjs.Shape();
	yellow.x = 755;
	yellow.y = 335;
	yellow.graphics.beginFill("#FFFF00").beginStroke("#000000");
    yellow.graphics.drawRect(0, 0, 30, 30);
	yellow.on("click", function(evt){
		mouseColor = 7;
		mouseCode = 7;
	});
    
    var pink = new createjs.Shape();
	pink.x = 650;
	pink.y = 370;
	pink.graphics.beginFill("#FF33CC").beginStroke("#000000");
    pink.graphics.drawRect(0, 0, 30, 30);
	pink.on("click", function(evt){
		mouseColor = 8;
		mouseCode = 8;
	});
    
    var black = new createjs.Shape();
	black.x = 685;
	black.y = 370;
	black.graphics.beginFill("#393939").beginStroke("#000000");
    black.graphics.drawRect(0, 0, 30, 30);
	black.on("click", function(evt){
		mouseColor = 9;
		mouseCode = 9;
	});
	
	
	saveButton.x = 650;
	saveButton.y = 550;
	saveButton.on("click", function(evt){
		console.log("save");
		saveLevel();
	});
	
    
	loadButton.x = 650;
	loadButton.y = 585;
	loadButton.on("click", function(evt){
		loadLevel();
	});
	
    
	clearButton.x = 650;
	clearButton.y = 620;
	clearButton.on("click", function(evt){
		clearGrid();
	});
	
	
	drawSizeUp.x = 810;
	drawSizeUp.y = 200;
	drawSizeUp.on("click", function(evt){
		drawingSizes(+1);
	});
    
    
	drawSizeDown.x = 810;
	drawSizeDown.y = 240;
	drawSizeDown.on("click", function(evt){
		drawingSizes(-1);
	});
	
	
	
	stage.addChild(corrHoriz);
	stage.addChild(corrVert);
	
	stage.addChild(cornerL);
	stage.addChild(cornerR);
	stage.addChild(cornerDR);
	stage.addChild(cornerDL);
	
	stage.addChild(green);
	stage.addChild(red);
	stage.addChild(purple);
	stage.addChild(white);
	stage.addChild(eraser);
    stage.addChild(orange);
	stage.addChild(grey);
	stage.addChild(yellow);
	stage.addChild(pink);
	stage.addChild(black);
    
    stage.addChild(drawSizeUp);
    stage.addChild(drawSizeDown);
	
	stage.addChild(saveButton);
	stage.addChild(loadButton);
	stage.addChild(clearButton);
}

function initLarge() {
    GAME_STATE = "inGame";
    stage.removeChild(title);
    unloadStartButtons();
	createGridLarge();
	changeStageDrawLarge();
	startMouseCursor();
    startLoop();
	
}


//Saving the map
function saveLevel()
{
	var gird = [];
	gird.push(gridHeight/10);
	gird.push(gridWidth/10);
	for(var i = 0; i < gridHeight/10; i++)
	{
		for(var j = 0; j < gridWidth/10; j++)
		{
			gird.push(squares[i][j].code);
		}
	}
    
    if(loggedUser)
    {
        var form = document.createElement('form');
        form.setAttribute("action", '/levelCreator');
        form.setAttribute("method", "POST");
        
        var hiddenFieldOne = document.createElement('input');
        hiddenFieldOne.setAttribute('type', 'text');
        hiddenFieldOne.setAttribute('name', 'levelPattern');
        hiddenFieldOne.setAttribute('value', gird.toString());
        
        var hiddenFieldTwo = document.createElement('input');
        hiddenFieldTwo.setAttribute('type', 'text');
        hiddenFieldTwo.setAttribute('name', 'username');
        hiddenFieldTwo.setAttribute('value', loggedUser);
        
        form.appendChild(hiddenFieldOne);
        form.appendChild(hiddenFieldTwo);
        
        document.body.appendChild(form);
        form.submit();
        
        document.body.removeChild(form);
    }
	
	var link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gird));
	link.setAttribute('download', 'map.txt');
	
	link.style.display = 'none';
	
	link.click();
	
	document.body.removeChild(link);
	
}

//Loading the map
function loadLevel()
{
	var opener = document.createElement('input');
	opener.setAttribute("type", "file");
	
	opener.style.display = 'none';
	
	opener.addEventListener('change',loadFile,false);
	
	opener.click();
	
	
	document.body.removeChild(opener);
}

function loadFile(e)
{
	var file = e.target.files[0];
	if(!file)
	{
		return;
	}
	var reader = new FileReader();
	var contents = [];
	reader.onload = function(e)
	{
		contents = e.target.result.split(",");
		console.log(contents.length);
		loadMap(contents);
	}
	reader.readAsText(file);
}

function displayFile(content)
{
	//console.log(content.toString());
}

function loadMap(contents)
{
	var nm = 2;
	console.log(contents);
	
	if(contents[0] != gridHeight/10)
	{
		var size = "";
		if(contents[0] > gridHeight/10)
		{
			size = "bigger";
		}
		else
		{
			size = "smaller";
		}
		alert("this map cannont be loaded on this map. This file is for a " + size + " level size");
	}
	else
	{
		for(var i = 0; i < ((contents.length-2)/contents[0]); i++)
		{
			for(var j = 0; j < ((contents.length-2)/contents[1]); j++)
			{
				
				squares[i][j].gotoAndStop(contents[nm]);
				squares[i][j].code = contents[nm];
				nm+=1;
			}
		}
	}
	//console.log(nm);
	stage.update();
}



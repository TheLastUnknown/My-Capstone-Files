//Game constant

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 500;
var FPS = 60;
var GAME_STATE = 'start';
var time = 0;
var score = 0;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_SPACE = 32, KEY_ENT = 13, KEY_END = 80;

document.onkeydown = keyDownTest;
document.onkeyup = keyUpTest;


var canvas, stage, queue;

var mouseX, mouseY, timer, scoreCount;


var title, instructionScreen, gameOver;
var playButton, tutorialButton, menuButton; //Menu Buttons

var player, spot;
var playerVelX, playerVelY;
var friction = .8;
var gravity = .2;
var inAir = Boolean(false);

var testPlatform;

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
            case KEY_A: moveLeft = true; moveRight = false; break;
            case KEY_W: moveUp = true; break;
            case KEY_S: break;
            case KEY_D: moveLeft = false; moveRight = true; break;
            case KEY_SPACE: break;
            case KEY_ENT: break;
			case KEY_END: console.log("End Game"); GAME_STATE = "gameOver"; break;
    }
}

function keyUpTest(e)
{
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: moveLeft = false; moveRight = false; break;
            case KEY_W: moveUp = false; break;
            case KEY_S: break;
            case KEY_D: moveLeft = false; moveRight = false;break;
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
    
    testPlatform = new createjs.Bitmap(queue.getResult("platTest"));
    
    
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
                {src:"NewSprites.png", id:"PlayerSprites"},
                {src:"platformTest.png", id:"platTest"}
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
	player.y = CANVAS_HEIGHT;
    player.height = player.getBounds().height;
    player.width = player.getBounds().width;
	player.speed = 3;
	player.velX = 0;
	player.velY = 0;
	player.jumping = false;
    player.grounded = true;
    
    player.snapToPixel = true;
    
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
    loadLevel();
	setPlayer();
    
    startLoop();
	
}

//world
function loadLevel()
{
    testPlatform.x = CANVAS_WIDTH/3;
    testPlatform.y = CANVAS_HEIGHT - 25;
    var bounds = testPlatform.getBounds();
    
    testPlatform.width = testPlatform.getBounds().width;
    testPlatform.height = testPlatform.getBounds().height;
    testPlatform.regX = testPlatform.width/2;
    testPlatform.regY = testPlatform.height/2;
    
    stage.addChild(testPlatform);
}

//gameplay
function movePlayer()
{
    checkPlayer();
    playerCollision();
	moving();
    
    
	player.x += player.velX;
	player.y += player.velY;

    player.velX *= friction;
	player.velY += gravity;
		
    if(player.grounded)
    {
        player.velY = 0;
    }
	
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
        player.grounded = false;
        inAir = true;
		player.velY = -player.speed*2;
	}
    else if(!player.grounded && !moveUp)
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
	
	if(player.y >= CANVAS_HEIGHT-20)
	{
		player.y = CANVAS_HEIGHT-20;
		player.jumping = false;
        player.grounded = true;
        inAir = false;
	}
	else if(player.y <= 0)
	{
		player.y = 0;
	}
    
    
    
}

function playerCollision()
{
    
    var col = collisionIntersect(player, testPlatform, player.velX, player.velY);
    
    var blankx = player.x;
    var blanky = player.y;
    
    if(!col)
    {
        if(player.grounded && player.y < CANVAS_HEIGHT-20)
        {
            player.grounded = false;
        }
    }
    else
    {
        //console.log(player.x + col.width + "," + (testPlatform.x + (testPlatform.width)));
        
        if(Math.floor(player.x+player.width)-5 > testPlatform.x && Math.floor(player.x)+5 < (testPlatform.x + testPlatform.width))
        {
            //console.log("inbetween");
            if(Math.floor(player.y + col.height) >= (testPlatform.y + testPlatform.height))
            {
                console.log("bottom");
            }
            else if(Math.floor((player.y+player.height) - col.height) <= (testPlatform.y))
            {
                console.log("top");
                player.y = testPlatform.y - player.height+5;
                player.grounded = true;
                player.jumping = false;
            }
            else
            {
                player.grounded = false;
            }
        }
        else if(Math.floor(player.x + col.width) >= (testPlatform.x + (testPlatform.width)))
        {
            console.log("stop");
            player.x = testPlatform.x + (testPlatform.width);
        }
        else if(Math.floor((player.x+player.width) - col.width) <= (testPlatform.x))
        {
            console.log("stop2");
            player.x = testPlatform.x - player.width -col.width;
        }
    }
    
    /*var playerLeft = Math.floor(player.x);
    var playerBottom = Math.floor(player.y);
    var playerRight = Math.floor(player.x + player.width);
    var playerTop = Math.floor(player.y+player.height);
    
    var platLeft = Math.floor(testPlatform.x);
    var platTop = Math.floor(testPlatform.y);
    var platRight = Math.floor(testPlatform.x + testPlatform.width); 
    var platBottom = Math.floor(testPlatform.y+testPlatform.height);
    
    
    if(!((playerBottom < platTop)|| (playerTop > platBottom)||(playerLeft > platRight)||(playerRight < platLeft)))
    {
        var checking = "";
        if(!(playerBottom < platTop))
        {
            checking += "player on top";
        }
        if(!(playerTop > platBottom))
        {
            checking += "player on bottom";
        }
        if(!(playerLeft > platRight))
        {
            checking += "player to right";
        }
        if((playerRight < platLeft))
        {
            checking += "player to left";
        }
        console.log("collision " + checking);
    }*/
    
} 

function playersCollision()
{
    
    var dir = colliding(player,testPlatform);
    
    //console.log(dir);
    
    if(dir === "l" || dir === "r")
    {
        player.velX = 0;
        player.jumping = false;
        
    }
    else if(dir === "b")
    {
        //inAir = false;
        
        player.grounded = true;
        player.jumping = false;
    }
    else if(dir === "t")
    {
        player.velY *= -1;
    }
    
}

var playing = Boolean(false);
var anim = "";

function checkAnimation()
{
    //player.regX = player.getBounds().width/2;
    //player.regY = player.getBounds().height/2;
    flipSprite();
    
    if(!player.grounded)
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

var flipped = Boolean(false);
function flipSprite()
{
    if(moveLeft && !flipped)
    {
        player.scaleX *= -1;
        flipped = true;
        stage.update();
    }
    else if(moveRight && flipped)
    {
        player.scaleX *= -1;
        flipped = false;
        stage.update();
    }
}

function collisionIntersect(rect1, rect2, x,y)
{
    x = x || 0;
    y = y || 0;
    
    var dx, dy, r1={},r2={};
    r1.cx = rect1.x+x+(r1.hw = (rect1.width/2));
    r1.cy = rect1.y+y+(r1.hh = (rect1.height/2));
    r2.cx = rect2.x+x+(r2.hw = (rect2.width/2));
    r2.cy = rect2.y+y+(r2.hh = (rect2.height/2));
    
    dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh);
    
    //console.log(r2.hw + "," + r2.hh);
    
    if(dx < 0 && dy < 0)
    {
        return {width:-dx,height:-dy};
    }
    else
    {
        return null;
    }
}

function fullCollisionCheck()
{
    
    var move = {x:0,y:player.velY};
    
    var collision = reinterprate(player,testPlatform,'y',move);
    
    player.y += move.y;
    
    if(!collision)
    {
       if(inAir)
       {
         player.jumping = true;  
       }
    }
    else
    {
        //console.log(collision.height + "," + collision.width);
        //console.log("top");
        if(move.y > 0)
        {
            player.jumping = false;
            inAir = false;
        }
        player.velY = 0;
    }
    
    move = {x:player.velX, y:0};
    collision = reinterprate(player,testPlatform,'x',move);
    player.x += move.x;
    
    
}

function collisionDirection(player, direction, platform, move)
{
    
    
    move = move || {addX:0,addY:0};
    
    var measure = direction == 'x' ? 'width' : 'height',
        oppositeDirection = direction == 'x' ? 'y' : 'x',
        oppositeMeasure = direction == 'x' ? 'height' : 'width';
    
    collision = collisionIntersect(player, testPlatform, move.addX, move.addY);
    
    
    if(collision)
    {
        var sign = Math.abs(move[direction]) / move[direction];
    }
}

//I need to write this out in real words to understand it
function reinterprate(player, platform, direction, move)
{
    move = move || {x:0,y:0};
    
    if(direction != 'x' && direction != 'y')
    {
        direction = 'x';
        
    }
    
    var measureDir = direction == 'x' ? 'width' : 'height';
    var opposideDir = direction == 'x' ? 'y' : 'x';
    var opposideMeasure = direction == 'x' ? 'height' : 'width';
    
    var collision = collisionIntersect(player,platform,move.x,move.y);
    
    if(!collision && platform.isVisible)
    {
        var checkForward = (player[direction] < platform[direction] && player[direction] + move[direction] > platform[direction]);
        var checkBackward = (player[direction] > platform[direction] && player[direction] + move[direction] < platform[direction]);
        var checkOppositeMove = !(player[opposideDir] < platform[opposideMeasure] && player[opposideDir] + move[opposideDir] > platform[opposideMeasure]);

        if((checkForward || checkBackward) && checkOppositeMove)
        {
            move[direction] = platform[direction] - player[direction];
        }
        
        if(checkForward)
        {
            console.log(direction + " forward");
        }
        
        if(checkBackward)
        {
            console.log(direction + " backward");
        }
        
        if(!checkOppositeMove)
        {
            console.log(direction + " opposite");
        }
    }
    
    if(collision)
    {
        var sign = Math.abs(move[direction]) / move[direction];
        move[direction] -= collision[measureDir] * sign;
    }
    
    //console.log(direction + "," + move.x + "," + move.y);
    return collision;
    
}

function collideX(player, platform, velX)
{
    
}

function collideY(player, platform, velY)
{
    
}

function collisionTest()
{
    var intersection = ndgmr.checkPixelCollision(player,testPlatform,1,true);
    if(intersection)
    {
        
        console.log(intersection);
        
        
    }
}

function colliding(part1, part2)
{
    var vX = (part1.x + (part1.width / 2)) - (part2.x + (part2.width / 2));
    var vY = (part1.y + (part1.height / 2)) - (part2.y + (part2.height / 2));
    
    var hWidths = (part1.width / 2) + (part2.width / 2);
    var hHeights = (part1.height / 2) + (part2.height / 2);
    var colDir = null;
    
    if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights)
    {
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        
        if(oX >= oY)
        {
            if(vY > 0)
            {
                colDir = 't';
                //part1.y += oY;
                return colDir;
            }
            else
            {
                colDir = 'b';
                //part1.y -= oY;
                return colDir;
            }
        }
        else
        {
            if(vX > 0)
            {
                colDir = 'l';
                //part1.y += oX;
                return colDir;
            }
            else
            {
                colDir = 'r';
                //part1.y -= oX;
                return colDir;
            }
        }
        
    }
}
    

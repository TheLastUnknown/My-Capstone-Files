//Game constant

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 500;
var FPS = 60;
var GAME_STATE = 'start';
var time = 0;
var score = 0;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_SPACE = 32, KEY_ENT = 13, KEY_END = 80, KEY_J = 74;

var DOWN = "D", RIGHT = "R", LEFT="L", UP="U", REDOWN="~D", RERIGHT="~R", RELEFT="~L", REUP="~U";

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
    keyQueue();
    multiKeys();
    checkFPS();
	stage.update();
    //console.log(GAME_STATE);
}

function checkFPS()
{
	var frames = createjs.Ticker.getMeasuredFPS();
	
	if(frames <= 50 && frames > 40)
	{
		console.log(50);
	}
	else if(frames <= 40 && frames > 30)
	{
		console.log(40);
	}
	else if(frames <= 30 && frames > 20)
	{
		console.log(40);
	}
	else if(frames <= 20 && frames > 10)
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
var attacking = false;

var pressedKeys = [];
var moreKeys = [];
//Keyboard Events

function multiKeys(e)
{
    if(!e)
    {
        e = window.event;    
    }
    
    onkeydown = onkeyup = function(e){
        
        moreKeys[e.keyCode] = e.type == "keydown";
        //console.log(moreKeys);
         
    }
    
    if(moreKeys[KEY_A])
    {
        moveLeft = true; moveRight = false; pressedKeys.push(KEY_A);
    }
    
    if(moreKeys[KEY_S])
    {
        pressedKeys.push(KEY_S);
    }
    
    if(moreKeys[KEY_D])
    {
        moveLeft = false; moveRight = true; pressedKeys.push(KEY_D);
    }
    
    if(moreKeys[KEY_W])
    {
        moveUp = true; pressedKeys.push(KEY_W);
    }
    
    if(moreKeys[KEY_J])
    {
        attacking = true; pressedKeys.push(KEY_J);
    }
    
    if(!moreKeys[KEY_A])
    {
        moveLeft = false; 
    }
    
    if(!moreKeys[KEY_S])
    {
        
    }
    
    if(!moreKeys[KEY_D])
    {
        moveRight = false; 
    }
    
    if(!moreKeys[KEY_W])
    {
        moveUp = false; 
    }
    
    if(!moreKeys[KEY_J])
    {
        //attacking = true; pressedKeys.push(KEY_J);
    }
    
}

function keyDownTest(e)
{
    /*
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: moveLeft = true; moveRight = false; pressedKeys.push(KEY_A); break;
            case KEY_W: moveUp = true; pressedKeys.push(KEY_W); break;
            case KEY_S: pressedKeys.push(KEY_S); break;
            case KEY_D: moveLeft = false; moveRight = true; pressedKeys.push(KEY_D); break;
            case KEY_SPACE: break;
            case KEY_ENT: break;
			case KEY_END: console.log("End Game"); GAME_STATE = "gameOver"; break;
            case KEY_J: attacking = true; pressedKeys.push(KEY_J); break;
    }
    */
}

function keyUpTest(e)
{
    /*
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: moveLeft = false; moveRight = false; break;
            case KEY_W: moveUp = false; break;
            case KEY_S: break;
            case KEY_D: moveLeft = false; moveRight = false;break;
            case KEY_SPACE: console.log("Space up"); break;
            case KEY_ENT: console.log("Enter up"); break;
            //case KEY_J: attacking = false; break;
    }
    */
}

function keyQueue()
{
    
}


//Loading
function loadComplete(evt) 
{
    startScreenLoad();
    
    instructionScreen = new     createjs.Bitmap(queue.getResult("instructScreen"));
    gameOver = new createjs.Bitmap(queue.getResult("gameOverScreen"));
    
    var playerSprites = new createjs.SpriteSheet({
        images: [queue.getResult("PlayerSprites")],
        frames: [[40,317,40,45,0,20.3,22.65],[80,317,40,45,0,20.3,22.65],[120,317,40,45,0,20.3,22.65],[160,317,40,45,0,20.3,22.65],[200,317,38,45,0,18.3,22.65],[238,317,38,45,0,18.3,22.65],[276,317,38,45,0,18.3,22.65],[314,317,38,45,0,18.3,22.65],[352,317,38,45,0,18.3,22.65],[390,317,38,45,0,18.3,22.65],[428,317,38,45,0,18.3,22.65],[466,317,38,45,0,18.3,22.65],[0,362,38,45,0,18.3,22.65],[38,362,38,45,0,18.3,22.65],[76,362,39,45,0,19.3,22.65],[115,362,39,45,0,19.3,22.65],[154,362,38,45,0,18.3,22.65],[192,362,38,45,0,18.3,22.65],[230,362,38,45,0,17.3,22.65],[268,362,38,45,0,17.3,22.65],[306,362,37,45,0,17.3,22.65],[0,0,32,45,0,19.1,20.5],[32,0,32,45,0,20.1,20.5],[64,0,38,45,0,23.1,20.5],[102,0,42,45,0,21.1,20.5],[144,0,35,45,0,20.1,20.5],[179,0,25,45,0,13.100000000000001,20.5],[204,0,33,45,0,17.1,20.5],[237,0,39,45,0,21.1,20.5],[276,0,39,45,0,21.1,20.5],[315,0,38,45,0,20.1,20.5],[353,0,37,45,0,21.1,20.5],[343,362,40,45,0,20.15,21.4],[383,362,38,51,0,19.15,26.4],[421,362,34,51,0,19.15,26.4],[455,362,31,51,0,16.15,28.4],[0,413,31,51,0,16,23.55],[31,413,34,51,0,19,23.55],[65,413,30,51,0,16,23.55],[95,413,31,51,0,16,23.55],[126,413,31,51,0,16.6,23.2],[157,413,34,51,0,17.6,23.2],[191,413,41,51,0,22.6,24.2],[232,413,37,51,0,18.15,25.65],[269,413,36,48,0,17.15,25.65],[305,413,32,47,0,13.149999999999999,25.65],[337,413,32,51,0,13.149999999999999,25.65],[369,413,35,51,0,15.75,27.75],[404,413,74,50,0,16.75,27.75],[390,0,33,50,0,16.35,26.7],[423,0,63,50,0,19.35,26.7],[0,50,63,50,0,20.35,26.7],[63,50,64,50,0,19.35,26.7],[127,50,52,50,0,18.35,26.7],[179,50,35,50,0,18.35,26.7],[214,50,33,50,0,17.35,26.7],[247,50,34,50,0,17.35,26.7],[281,50,42,50,0,18.35,25.7],[323,50,40,45,0,19.35,21.7]],
        animations: {
            stand: [0, 20, "stand", .3],
            run: [21, 31, "run", .3],
            jump1: [32,35, "jump1", .3],
            jump2: [36, 39, "jump2", .3],
            jump3: [40,42, "jump3", .3],
            jump4: [43,46, "jump4", .3],
            jump5: [47, 48, "jump5", .3],
            "offGround": [32, 39, "jump2",.3],
            "startFalling": [40,46, "jump4", .3],
            attack1: [49,58,"stand",.6]
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

var hitbox;
var attackbox;

var playerCollidables = [];

function setPlayer()
{
	player.x = 50;
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
    
    hitbox = new createjs.Shape();
    hitbox.x = player.x - (player.width/2);
    hitbox.y = player.y - (player.height/2);
    hitbox.width = player.width;
    hitbox.height = player.height;
    
    hitbox.graphics.beginFill("#ff00ff");
    hitbox.graphics.drawRect(0,0, player.width, player.height);
    
    hitbox.alpha = .5;
    
    attackbox = new createjs.Shape();
    attackbox.x = player.x - (player.width/2);
    attackbox.y = player.y - (player.height/2);
    attackbox.width = hitbox.width;
    attackbox.height = hitbox.height;
    //attackbox.regX = attackbox.x + (attackbox.width/2);
    //attackbox.regY = attackbox.y + (attackbox.height/2);
    
    attackbox.graphics.beginFill("#ffCC00");
    attackbox.graphics.drawRect(0,0, player.width, player.height);
    
    attackbox.alpha = .5;
    
    stage.addChild(hitbox);
    
    console.log(player.regX + "," + player.regY);
    
    playerCollidables.push(player, attackbox);
    //stage.addChild(attackbox);
    
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
var platforms = [];
function loadLevel()
{
    var changeX = 50;
    var changeY = 50;
    
    testPlatform.x = (CANVAS_WIDTH/3);
    testPlatform.y = (CANVAS_HEIGHT - 50);
    
    var bounds = testPlatform.getBounds();
    
    testPlatform.regX = testPlatform.width/2;
    testPlatform.regY = testPlatform.height/2;
    testPlatform.width = testPlatform.getBounds().width;
    testPlatform.height = testPlatform.getBounds().height;
    
    for(var i = 0; i < 9; i++)
    {
        platforms[i] = testPlatform.clone();
        platforms[i] = new createjs.Bitmap(queue.getResult("platTest"));
        platforms[i].width = platforms[i].getBounds().width;
        platforms[i].height = platforms[i].getBounds().height;
        platforms[i].regX = platforms[i].getBounds().width/2;
        platforms[i].regY = platforms[i].getBounds().height/2;
        platforms[i].x = (platforms[i].x+125) + (changeX * i);
        platforms[i].y = (CANVAS_HEIGHT-25) - (changeY * i);
    }
    
    for(var j = 0; j < 9; j++)
    {
        
        stage.addChild(platforms[j]);
    }
    
    
    
    
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
    
    
	
    hitbox.x = player.x - (player.width/2);
    hitbox.y = player.y - (player.height/2);
    
    //attackbox.x = player.x - (player.width/2);
    //attackbox.y = player.y - (player.height/2);
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
    
    
    playerAttacking();
}


//invisable object for sword
function playerCollision()
{
    //console.log(platforms.length);
    
    var collide = null;
    var plats = [];
    
    for(var i = 0; i < platforms.length; i++)
    {
        //console.log(player.grounded);
        
        var col = collisionIntersect(player, platforms[i], player.velX, player.velY);
        
        if(!col)
        {
            if(player.grounded && player.y < CANVAS_HEIGHT - player.height)
            {
               player.grounded = false;
            }
        }
        else
        {
            //collide = col;
            var test = {
                index:i,
                testing: col
            };
            plats.push(test);
        }
    }
        
    
    
    plats.forEach(function(plat) 
      {
        if(plat.testing)
        {
            if(Math.floor(player.x+player.width)-5 > platforms[plat.index].x && Math.floor(player.x)+5 < (platforms[plat.index].x + platforms[plat.index].width))
            {
                
                if(Math.floor(player.y + plat.testing.height) >= (platforms[plat.index].y + platforms[plat.index].height))
                {
                    //console.log("bottom");
                    
                    player.y = (platforms[plat.index].y + platforms[plat.index].height) + 5;
                    player.velY = 0;
                    player.jumping = true;
                    
                }
                else if(Math.floor((player.y+player.height) - plat.testing.height) <= (platforms[plat.index].y))
                {
                    //console.log("top");
                    
                    player.y = platforms[plat.index].y - player.height+5;
                    player.grounded = true;
                    player.jumping = false;
                    player.velY = 0;
                    
                }
                else
                {
                    //player.grounded = false;
                }
            }
            else if(Math.floor(player.x + plat.testing.width) >= (platforms[plat.index].x + (platforms[plat.index].width)))
            {
                //console.log("stop right");
                //console.log(plat.testing.width + "," + plat.testing.height);
                player.x = platforms[plat.index].x + (platforms[plat.index].width);
                player.velX = 0;
            }
            else if(Math.floor((player.x + player.width) - plat.testing.width) <= (platforms[plat.index].x))
            {
                //console.log("stop left");
                //console.log(plat.testing.width + "," + plat.testing.height);
                player.x = platforms[plat.index].x - player.width - plat.testing.width;
                
            }
        }
    });
    
}  

Number.prototype.between = function(min, max)
{
    return this > min && this < max;
}

var playing = Boolean(false);
var anim = "";

function checkAnimation()
{
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
    else if(attacking)
    {
        if(!playing)
        {
            anim = "attack";
            player.gotoAndPlay("attack1");
            
            playing = true;
        }
        else
        {
            if(anim == "attack")
            {
                
            }
            else
            {
                anim = "attack";
                player.gotoAndPlay("attack1");
                player.addEventListener("animationend",function(){attacking = false;});
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
        attackbox.scaleX *= -1;
        flipped = true;
        stage.update();
    }
    else if(moveRight && flipped)
    {
        player.scaleX *= -1;
        attackbox.scaleX *= -1;
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
    
    
    if(dx < 0 && dy < 0)
    {
        return {width:-dx,height:-dy};
    }
    else
    {
        return null;
    }
}

function attackIntersect(rect1, rect2, x,y)
{
    x = x || 0;
    y = y || 0;
    
    var dx, dy, r1={},r2={};
    r1.cx = rect1.x+(r1.hw = (rect1.width/2));
    r1.cy = rect1.y+(r1.hh = (rect1.height/2));
    r2.cx = rect2.x;
    r2.hw = (rect2.width/2);
    r2.lx = rect2.x + r2.hw;
    r2.cy = rect2.y;
    r2.hh = (rect2.height/2);
    
    dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw);
    Ndx = Math.abs(r1.cx - r2.lx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh);
    
    //console.log(r2.cx + r2.hw + "," + r2.cy);
    
    if(dx < 0 && dy < 0)
    {
        return {width:-dx,height:-dy};
    }
    else if(Ndx < 0 && dy < 0)
    {
        return {width:-Ndx,height:-dy};
    }
    else
    {
        return null;
    }
}

function collides(a, b) {
  return a.x < b.x + b.width &&
	a.x + a.width > b.x &&
	a.y < b.y + b.height &&
	a.y + a.height > b.y;
}

var attackWidth = [];

function playerAttacking()
{
    //console.log(attackWidth);
    if(attacking)
    {
        stage.addChild(attackbox);
        attackbox.graphics.clear();
        
        if(!flipped)
        {
            attackbox.x = hitbox.x + hitbox.width;
            attackbox.y = hitbox.y;

            attackbox.graphics.clear();

            attackbox.width = 24;
            attackbox.setBounds(0,0,attackbox.width, attackbox.height);
            attackbox.graphics.beginFill("#ffCC00");
            attackbox.graphics.drawRect(0,0, attackbox.width, attackbox.height);
        }
        else
        {
            
            attackbox.x = hitbox.x;
            attackbox.y = hitbox.y;

            attackbox.graphics.clear();

            attackbox.width = 24;
            attackbox.setBounds(0,0,attackbox.width, attackbox.height);
            attackbox.graphics.beginFill("#ffCC00");
            attackbox.graphics.drawRect(0,0, attackbox.width, attackbox.height);
        }
        
        
        //attackWidth.push(attackbox.width);
        
        /*attackbox.x = hitbox.x + hitbox.width;
        attackbox.y = hitbox.y;

        attackbox.graphics.clear();

        attackbox.width = player.getBounds().width - hitbox.width;

        //if(attackbox.width > 0)
        //{
            attackbox.setBounds(0,0,attackbox.width, attackbox.height);
            attackbox.graphics.beginFill("#ffCC00");
            attackbox.graphics.drawRect(0,0, attackbox.width, attackbox.height);

            //console.log(attackbox.width);
        //}
        */
        attackCollision();
    }
    
}

function attackCollision()
{
    var collide = null;
    var hits = [];
    
    
    
    for(var i = 0; i < platforms.length; i++)
    {   
        
        //console.log((attackbox.x + attackbox.width) + "," + (platforms[0].x - (platforms[0].width/2)));
        
        
        var col = attackIntersect(attackbox, platforms[i], player.velX, player.velY);
        
        //console.log("frame");
        
        if(!col)
        {
            
        }
        else
        {
            //collide = col;
            var test = {
                index:i,
                testing: col
            };
            
            hits.push(test);
        }
    }
    
    hits.forEach(function(hit) {
        console.log("hit");
    });
    
    //stage.removeChild(attackbox);
}

//Game constant

var CANVAS_WIDTH = 700;
var CANVAS_HEIGHT = 500;
var WORLD_HEIGHT = 500;
var WORLD_WIDTH = 600;
var FPS = 60;
var GAME_STATE = 'start';
var gameTimer = 0;
var frameCount = 0;
var score = 0;
var world;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_SPACE = 32, KEY_ENT = 13, KEY_END = 80, KEY_J = 74, KEY_K = 75, KEY_L= 76;

var DOWN = "D", RIGHT = "R", LEFT="L", UP="U", REDOWN="~D", RERIGHT="~R", RELEFT="~L", REUP="~U";

document.onkeydown = keyDownTest;
document.onkeyup = keyUpTest;

var startTime, finalLevelTime;

var canvas, stage, queue;

var mouseX, mouseY, timer, scoreCount;

var background;

var levelNumber = 0;

var title, instructionScreen, gameOver;
var playButton, tutorialButton, menuButton; //Menu Buttons

var player, spot;
var playerVelX, playerVelY;
var friction = .8;
var gravity = .2;
var inAir = Boolean(false);
var MAX_HEALTH = 10;

var healthBar, healthHeight;

var testPlatform, testEnemy;

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
    
    world = new createjs.Container();
    stage.addChild(world);
    
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
    runGameTimer();
	movePlayer();
    checkAnimation();
    keyQueue();
    multiKeys();
    checkFPS();
    playerCamera();
    enemyDeath();
    bulletChecking();
    moveEnemy();
    endTheLevel();
    parallaxBackground();
	stage.update();
    
    var currentTime = (new Date()).getTime();
    
    finalLevelTime = (currentTime-startTime)/1000;
    
    if(player.health <= 0)
    {
        GAME_STATE = "gameOver";
    }
    
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

function resetGameTimer()
{
    gameTimer = 0;
}

function runGameTimer()
{
    frameCount += 1;
    if(frameCount%(FPS/10) === 0)
    {
        gameTimer = frameCount/FPS;
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
        moveLeft = true; moveRight = false;
    }
    
    if(moreKeys[KEY_S])
    {
        
    }
    
    if(moreKeys[KEY_D])
    {
        moveLeft = false; moveRight = true;
    }
    
    if(moreKeys[KEY_L])
    {
        moveUp = true;
    }
    
    if(moreKeys[KEY_J])
    {
        attacking = true;
    }
    
    if(moreKeys[KEY_K])
    {
        dashing = true;
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
    
    if(!moreKeys[KEY_L])
    {
        moveUp = false; 
    }
    
    if(!moreKeys[KEY_J])
    {
        //attacking = true; pressedKeys.push(KEY_J);
    }
    
    if(!moreKeys[KEY_K])
    {
        //player.dashing = false;
    }
    
    keyQueue();
}

function keyDownTest(se)
{
    if(!e){ var e = window.event;}
    switch(e.keyCode)
    {
            case KEY_A: pressedKeys.push(KEY_A); break;
            case KEY_W: pressedKeys.push(KEY_W); break;
            case KEY_S: pressedKeys.push(KEY_S); break;
            case KEY_D: pressedKeys.push(KEY_D); break;
            case KEY_SPACE: break;
            case KEY_ENT: break;
			case KEY_END: break;
            case KEY_J: pressedKeys.push(KEY_J); break;
            case KEY_K: pressedKeys.push(KEY_K); break;
    }
    
}

function keyUpTest(e)
{
    window.clearTimeout(clearKeysArray);
    window.setTimeout(clearKeysArray,500);
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

var combos = [];

function keyQueue()
{
    
    for(var i = 0; i < combos.length; i++)
    {
        if(pressedKeys.toString().indexOf(combos[i]) >= 0)
        {
            console.log(pressedKeys);
            console.log("combo " + i + " entered");
            if(i = 4)
            {
                superSpeed();
            }
            pressedKeys = [];
        }
    }
    
    /*
    
    var konami = '87,87,83,83,65,68,65,68,74,75';
    
    if(pressedKeys.toString().indexOf(konami) >= 0)
    {
        console.log("konami code entered");
        pressedKeys = [];
    }
    
    var newArray = [];
    var passedArray = [];
    var chosenCombo=[];
    //get key pressed
    var bleh = pressKeys.pop(); //Note: this will get the most recent key pressed. Be wary
    //check possible sequences for first key
    
    
    
    if(matchFound)
    {
        
    }
    else
    {
        //clear newArray
        
        //clear passedArray if elements exist
        pressedKeys = [];
    }
    */
}

function declareCombos()
{
    var QCF = '83,68,74';
    var DP = '68,83,68,74';
    var HCF = '65,83,68,74';
    var DQCF = '83,68,83,68,74';
    var BF = '65,68,74';
    var konami = '87,87,83,83,65,68,65,68,74,75';
    
    combos.push(HCF);
    combos.push(BF);
    
    combos.push(DQCF);
    
    combos.push(DP);
    
    combos.push(QCF);
    
    
    combos.push(konami);
}

function getPossibleCombos(num)
{
    var returnedCombo = [];
    
    for(var i = 0; i < combos.length; i++)
    {
        if(combos[i][0] == num)
        {
            returnedCombo.push(combos[i]);
        }
    }
    
    return returnedCombo;
}

function fullComboMatch(a,b)
{
    
}

function checkKonamiCode()
{
    
}

function clearKeysArray()
{
    pressedKeys = [];
}

//Loading
function loadComplete(evt) 
{
    startScreenLoad();
    
    instructionScreen = new     createjs.Bitmap(queue.getResult("instructScreen"));
    gameOver = new createjs.Bitmap(queue.getResult("gameOverScreen"));
    
    var playerSprites = new createjs.SpriteSheet({
        images: [queue.getResult("PlayerSprites")],
        frames: [[34,280,36.4,41.3,0,18.2,20.65],[71,280,37,41,0,18.5,20.65],[393,280,37,41,0,18.5,20.65],[349,281,37,41,0,18.5,20.65],[430,282,37,41,0,19.5,20.65],[467,282,37,41,0,19.5,20.65],[108,285,37,41,0,19.5,20.65],[271,286,37,41,0,19.5,20.65],[119,205,38,41,0,20.5,20.65],[278,206,38,41,0,20.5,20.65],[316,212,38,41,0,19.5,20.65],[234,231,38,41,0,19.5,20.65],[157,234,38,41,0,19.5,20.65],[195,234,38,41,0,19.5,20.65],[79,239,38,41,0,19.5,20.65],[406,239,38,41,0,19.5,20.65],[80,198,39,41,0,20.5,20.65],[445,198,39,41,0,20.5,20.65],[233,272,38,40,0,19.5,19.65],[156,275,38,40,0,19.5,19.65],[232,312,37,40,0,18.5,19.65],[480,239,32,40,0,16.85,20.1],[281,399,31,40,0,16.85,19.1],[105,326,38,37,0,21.85,17.1],[110,158,42,40,0,21.85,20.1],[344,361,34,40,0,19.85,19.1],[486,112,25,39,0,13.850000000000001,18.1],[455,398,32,40,0,17.85,19.1],[406,199,39,40,0,21.85,19.1],[0,201,39,40,0,21.85,19.1],[311,253,38,40,0,20.85,19.1],[269,327,37,38,0,21.85,17.1],[445,157,41,41,0,20,20.9],[306,333,38,37,0,19,16.9],[33,321,34,43,0,18,22.9],[0,331,31,45,0,15,24.9],[465,323,31,46,0,15.649999999999999,21.35],[0,286,33,45,0,17.65,20.35],[424,358,31,45,0,15.649999999999999,21.35],[178,361,31,44,0,15.649999999999999,20.35],[67,359,31,45,0,15.8,22.7],[0,241,34,45,0,17.8,22.7],[246,149,41,45,0,23.8,22.7],[369,199,37,43,0,18.3,21.75],[444,239,36,43,0,17.3,21.75],[145,315,32,46,0,13.3,24.75],[177,315,32,46,0,13.3,24.75],[323,67,35,47,0,17.5,23.25],[194,275,38,40,0,18.5,17.25],[98,363,33,41,0,16.3,20.5],[262,67,61,42,0,17.3,20.5],[200,67,62,43,0,17.3,21.5],[262,109,61,40,0,16.3,18.5],[0,118,52,38,0,16.3,16.5],[209,352,35,40,0,16.3,19.5],[378,396,33,40,0,15.3,19.5],[143,361,35,39,0,16.3,17.5],[404,157,41,42,0,18.3,19.5],[39,202,40,39,0,20.3,19.5],[382,359,37,37,0,18.05,18.4],[234,194,44,37,0,22.05,18.4],[244,365,47,29,0,23.35,14.95],[455,369,46,29,0,23.35,14.95],[291,370,46,29,0,23.35,14.95],[0,376,46,29,0,23.35,14.95],[424,323,41,35,0,20.7,17.15],[386,321,38,38,0,16.7,19.15],[34,241,39,39,0,19.95,19.45],[152,165,41,40,0,18.95,20.45],[354,242,39,39,0,19.95,19.45],[287,166,41,40,0,18.95,20.45],[117,246,39,39,0,19.95,19.45],[328,172,41,40,0,18.95,20.45],[272,247,39,39,0,19.95,19.45],[193,194,41,40,0,18.95,20.45]],
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
            attack1: [49,58,"stand",.6],
            dash1: [59,60,"dash2",.3],
            dash2: [61,64,"dash2",.3],
            dash3: [65,66,"stand",.3],
            stun:[67,74,"stand",.3]
            }     
        });
    
    
    
    player = new createjs.Sprite(playerSprites);
    
    testPlatform = new createjs.Bitmap(queue.getResult("platTest"));
    
    testEnemy = new createjs.Bitmap(queue.getResult("orb"));
    
    
    setBackground();
    
    
    
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
                {src:"platformTest.png", id:"platTest"},
                {src:"THEORB.png", id: "orb"},
                
            ];
			
//This function loadeds all the files in fileManifest and will rught loadComplete when it is finished. You can also get progress information. There are examples how to do this in preloadJS.
function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
    
}

function setBackground()
{
    background = createBackgroundGrid(8,4);
    stage.addChildAt(background,0);
}

function createBackgroundGrid(numX, numY)
{
    var grid = new createjs.Container();
    grid.snapToPixel = true;
    // calculating the distance between
    // the grid-lines
    var gw = CANVAS_WIDTH/numX;
    var gh = CANVAS_HEIGHT/numY;
    // drawing the vertical line
    var verticalLine = new createjs.Graphics();
    verticalLine.beginFill("#653cb0");
    verticalLine.drawRect(0,0,gw * 0.02,gh*(numY+2));
    var vs;
    // placing the vertical lines:
    // we're placing 1 more than requested
    // to have seamless scrolling later
    for ( var c = -1; c < numX+1; c++) {
        vs = new createjs.Shape(verticalLine);
        vs.snapToPixel = true;
        vs.x = c * gw;
        vs.y = -gh;
        grid.addChild(vs);
    }
    // drawing a horizontal line
    var horizontalLine = new createjs.Graphics();
    horizontalLine.beginFill("#653cb0");
    horizontalLine.drawRect(0,0,gw*(numX+1),gh * 0.02);
    var hs;
    // placing the horizontal lines:
    // we're placing 1 more than requested
    // to have seamless scrolling later
    for ( c = -1; c < numY+1; c++ ) {
        hs = new createjs.Shape(horizontalLine);
        hs.snapToPixel = true;
        hs.x = 0;
        hs.y = c * gh;
        grid.addChild(hs);
    }
 
    // return the grid-object
    return grid;
}

function parallaxBackground()
{
    background.x = (world.x *.5) % (CANVAS_WIDTH/8);
    background.y = (world.y *.5) % (WORLD_HEIGHT/4);
}

function checkLevelPatterns()
{
    for(var i = 0; i < thoseLevels.length; i++)
    {
        //console.log(thoseLevels[i].levelPattern);
        loadNewLevel();
    }
}

function trackLevelTime()
{
    
}

function levelKeys()
{
    
}

function openExit()
{
    
}



var hitbox;
var attackbox;
var line;

var playerCollidables = [];

var runSpeed = 3;
var dashSpeed = 12;
var dash = false;

var playerStartX = 0;
var playerStartY = 0;
function setPlayer()
{
	player.x = playerStartX;
	player.y = playerStartY;
    player.height = player.getBounds().height;
    player.width = player.getBounds().width;
    
    console.log(player.regY);
    
    player.speed = runSpeed;
    player.runSpeed = runSpeed;
    player.dashSpeed = dashSpeed;
	player.velX = 0;
	player.velY = 0;
	player.isJumping = false;
    player.isTouchingWall = false;
    player.isGrounded = true;
    player.isDashing = false;
    player.isStunned = false;
    player.canBeHurt = true;
    
    player.health = MAX_HEALTH;
    healthHeight = player.health * MAX_HEALTH;
    
    player.snapToPixel = true;
    
    player.gotoAndPlay("stand");
	
	world.addChild(player);
    
    hitbox = new createjs.Shape();
    hitbox.x = player.x - (player.width/2);
    hitbox.y = player.y - (player.height/2);
    hitbox.width = player.width;
    hitbox.height = player.height;
    
    hitbox.graphics.beginFill("#ff00ff");
    hitbox.graphics.drawRect(0,0, player.getBounds().width, player.getBounds().height);
    
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
    
    world.addChild(hitbox);
    
    console.log(player.regX + "," + player.regY);
    
    playerCollidables.push(player, attackbox);
    //world.addChild(attackbox);
    
    
    
    world.addChild(line);
    
	stage.update();
}

function displayPlayerHealth()
{
    healthBar = new createjs.Shape();
        healthBar.graphics.setStrokeStyle(2,'square','square');
        healthBar.graphics.beginStroke(('#666'));
        healthBar.graphics.beginFill("#DDD").drawRect(0,0,25,100);
        healthBar.graphics.beginFill("#C55").drawRect(0,0,25,healthHeight);
        healthBar.graphics.endStroke();
        healthBar.graphics.endFill();

        healthBar.graphics.endStroke();
        stage.addChild(healthBar);
        
}

function updateHealthBar()
{
    healthHeight = player.health * MAX_HEALTH;
    stage.removeChild(healthBar);
    displayPlayerHealth();
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
    if(GAME_STATE=="gameOver")
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
    world.x = world.y = 0;
    startTime = (new Date()).getTime();
    
    unloadStartButtons();
    
    gameSetup();
    
    startLoop();
	
}

function gameSetup()
{
    levelEnd();
    switchLevel();
    loadEnemies();
	setPlayer();
    displayPlayerHealth();
    declareCombos();
    declareProjectile();
}

function resetForLevel()
{
    world.removeAllChildren();
    
    gameSetup();
}

//world
var platforms = [];
var Enemies = [];
function loadLevel()
{
    var changeX = 50;
    var changeY = 50;
    
    testPlatform.x = (CANVAS_WIDTH/3);
    testPlatform.y = (CANVAS_HEIGHT - 50);
    
    
    testPlatform.width = 50;
    testPlatform.height = 50;
    testPlatform.regX = 25;
    testPlatform.regY = 25;
    
    
    drawFullLevel();
    
    /*
    for(var i = 0; i < 5; i++)
    {
        platforms[i] = testPlatform.clone();
        platforms[i] = new createjs.Bitmap(queue.getResult("platTest"));
        platforms[i].width = platforms[i].getBounds().width;
        platforms[i].height = platforms[i].getBounds().height;
        platforms[i].regX = platforms[i].getBounds().width/2;
        platforms[i].regY = platforms[i].getBounds().height/2;
        platforms[i].x = (platforms[i].x+125) + (changeX * i);
        if(i%3==0)
        {
            platforms[i].y = (CANVAS_HEIGHT-25);
        }
        else
        {
            platforms[i].y = (CANVAS_HEIGHT-25) - (changeY);
        }
    }
    
    for(var j = 0; j < 5; j++)
    {
        
        world.addChild(platforms[j]);
    }
    */
    
    
    
}

var enemyBox;

function loadEnemies()
{
    testEnemy.x = 1600;
    testEnemy.y = 1650;
    
    testEnemy.health = 2;
    
    testEnemy.width = testEnemy.getBounds().width;
    testEnemy.height = testEnemy.getBounds().height;
    
    testEnemy.regX = testEnemy.getBounds().width/2;
    testEnemy.regY = testEnemy.getBounds().height/2;
    
    testEnemy.velX = 0;
    testEnemy.velY = 0;
    
    testEnemy.topY = 0;
    testEnemy.bottomY = 0;
    
    Enemies.push(testEnemy);
    
    for(var i = 0; i < Enemies.length; i++)
    {
        world.addChild(Enemies[i]);
    }
    
    setEnemyPath();
    //console.log(Enemies);
    
}

function enemyDeath()
{
    for(var i = 0; i < Enemies.length; i++)
    {
        //console.log(Enemies[i].health);
        if(Enemies[i].health == 0)
        {
            //console.log('blar');
            world.removeChild(Enemies[i]);
            Enemies.splice(i,1);
        }
    }
}

function setEnemyPath()
{
    var startY = Enemies[0].y;
    var startX = Enemies[0].x;

    Enemies[0].topY = startY - Enemies[0].height * 3.5;
    Enemies[0].bottomY = startY + Enemies[0].height * 2;
    
    console.log(startY + "," +Enemies[0].bottomY + "," +  Enemies[0].topY);
    
    Enemies[0].velY = 2;
}

function moveEnemy()
{
    for(var i = 0; i < Enemies.length; i++)
    {
        if(Enemies[i].y < Enemies[0].topY)
        {
            Enemies[0].velY = 2;
        }

        if(Enemies[i].y > Enemies[0].bottomY)
        {
            Enemies[0].velY = -2;
        }

        Enemies[i].y += Enemies[i].velY;
    }
    
}

var bullets = [];
var Bullet;

var shotTimer = 180;

function declareProjectile()
{
    Bullet = new createjs.Shape();
    Bullet.x = 0;
    Bullet.y = 0;
    Bullet.width = 8;
    Bullet.height = 8;
    Bullet.regX = 4;
    Bullet.regY = 4;
    Bullet.graphics.beginFill("#000000");
    Bullet.graphics.drawRect(0,0, Bullet.width, Bullet.height); 
    Bullet.active = true;
    Bullet.velX = 0;
    Bullet.velY = 0;
    bulletSpeed = 3;
}

function bulletChecking()
{
    enemyShot();
    
    moveBullet();
    
    for(var i = 0; i < bullets.length; i++)
    {
        if(!bullets[i].active)
        {
            world.removeChild(bullets[i]);
        }

        if(bullets[i].x < (-world.x))
        {
            bullets[i].active = false;
            world.removeChild(bullets[i]);
        }
    }
    
    shotTimer--;
    
    bullets = bullets.filter(function(bullet) {
	return bullet.active;
  });
}

function enemyShot()
{
    for(var i = 0; i < Enemies.length; i++)
    {
        
        if((Enemies[i].x < (-world.x+CANVAS_WIDTH)) && Enemies[i].y < (-world.y+CANVAS_HEIGHT))
        {
            //console.log("fire");
            if(bullets.length < 1 && shotTimer <= 0)
            {
                shootBullet(Enemies[i].x, Enemies[i].y);
                shotTimer = 180;
            }
        }
    }
}

function shootBullet(startX, startY)
{
    var newBullet = Bullet.clone(true);
    newBullet = new createjs.Shape();
    newBullet.graphics.beginFill("#000000");
    newBullet.graphics.drawRect(0,0, Bullet.width, Bullet.height);
    newBullet.x = startX;
    newBullet.y = startY;
    newBullet.width = 8;
    newBullet.height = 8;
    newBullet.regX = 4;
    newBullet.regY = 4;
    newBullet.active = true;
    
    //console.log(newBullet.x + "," + newBullet.y);
    
    //newBullet.velX = 0;
    
    if(player.x > newBullet.x)
    {
        //console.log("fireLeft");
        newBullet.velX = 5;
    }
    else
    {
        //console.log("fireRight");
        newBullet.velX = -5;
    }
    
    //console.log(newBullet.velX);
    
    bullets.push(newBullet);
    
    world.addChild(newBullet);
}

function moveBullet()
{
    for(var i = 0; i < bullets.length; i++)
    {
        //console.log(bullets[i].x);
        bullets[i].x += bullets[i].velX;
        bulletCollision();
    }
}

function bulletCollision()
{
    var collide = null;
    var hits = [];
    
    for(var i = 0; i < bullets.length; i++)
    {   
        var col = bothMoving(player, bullets[i], player.velX, player.velY);
        
        if(!col)
        {
            //console.log("nope");
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
        if(hit.testing)
        {
            if(!player.isStunned && player.canBeHurt)
            {
                playerStun();
                bullets[hit.index].active = false;
            }
            else
            {

            }
        }
    });
}

//gameplay
function movePlayer()
{
    //console.log(player.regX);
    
    checkPlayer();
    playerCollision();
    enemyCollision();
    playerDash();
	moving();
    
    //console.log(player.isJumping + "," + player.isGrounded);
    
	player.x += player.velX;
	player.y += player.velY;

    player.velX *= friction;
	player.velY += gravity;
		
    if(player.isGrounded)
    {
        player.velY = 0;
    }
    
    //console.log(player.isStunned + "," + player.canBeHurt);
	
    hitbox.x = player.x - (player.width/2);
    hitbox.y = player.y - (player.height/2);
    
    
    
    //attackbox.x = player.x - (player.width/2);
    //attackbox.y = player.y - (player.height/2);
}

function moving()
{
	//console.log(player.speed);
    
    if(player.velX > player.dashSpeed)
    {
        console.log("blar " + player.speed);
    }
    
	if(player.velX > -player.speed && moveLeft)
	{
		player.velX -= 1.5;
        
	}
	else if(player.velX < player.speed&& moveRight)
	{
		player.velX += 1.5;
	}
	if(!player.isJumping && moveUp)
	{
		player.isJumping = true;
        player.isGrounded = false;
        inAir = true;
		player.velY = -player.runSpeed*2;
	}
    else if(player.isJumping && player.isTouchingWall && moveUp)
    {
        player.isJumping = false;
        if(flipped)
        {
            //console.log("go1");
            player.isJumping = true;
            player.velX = 10;
            player.velY = -player.runSpeed*2;
        }
        else
        {
            //console.log("go2");
            player.isJumping = true;
            player.velX = -10;
            player.velY = -player.runSpeed*2;
        }
    }
    else if(!player.isGrounded && !moveUp)
    {
        player.velY += 0.4;
    }
}

function checkPlayer()
{
    /*
	if(player.x >= CANVAS_WIDTH-10)
	{
		player.x = CANVAS_WIDTH-10;
	}
	else if(player.x <= 0)
	{
		player.x = 0;
	}
	*/
	//console.log(player.y);
    //console.log(player.isTouchingWall);
    
    //console.log(player.speed);
    
    playerAttacking();
}


//invisable object for sword
function playerCollision()
{
    //console.log(platforms.length);
    
    var collide = null;
    var plats = [];
    collisions = [];
    
    for(var i = 0; i < platforms.length; i++)
    {
        FUCKIT(player,platforms[i]);
    }
    
    //console.log(collisions.length);
    shouldPlayerFall();
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
    
    if(player.isStunned)
    {
        if(!playing)
        {
            anim = "stun";
            player.gotoAndPlay("stun");
            playing = true;
        }
        else
        {
            if(anim == "stun")
            {
                
            }
            else
            {
                anim = "stun";
                player.gotoAndPlay("stun");
                playing = true;
            }
        }
    }
    else if(!player.isGrounded)
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
            if(player.isDashing)
            {
                anim = "dash";
                player.gotoAndPlay("dash1");
                playing = true; 
            }
            else
            {
                anim = "left";
                player.gotoAndPlay("run");
                playing = true; 
            }
        }
        else
        {
            if(player.isDashing)
            {
                if(anim == "dash")
                {

                }
                else
                {
                    anim = "dash";
                    player.gotoAndPlay("dash1");
                    playing = true;
                }
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
    }
    else if(moveRight)
    {
        if(!playing)
        {
            if(player.isDashing)
            {
                anim = "dash";
                player.gotoAndPlay("dash1");
                playing = true; 
            }
            else
            {
                anim = "right";
                player.gotoAndPlay("run");
                playing = true; 
            }
        }
        else
        {
            if(player.isDashing)
            {
                if(anim == "dash")
                {

                }
                else
                {
                    anim = "dash";
                    player.gotoAndPlay("dash1");
                    playing = true;
                }
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

function bothMoving(rect1, rect2, x,y)
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

var collisions = [];

function FUCKIT(shapeA, shapeB)
{
    //console.log("blar");
     var vX = (shapeA.x) - (shapeB.x),
        vY = (shapeA.y) - (shapeB.y),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
    
    //console.log(vX + "," + hWidths);
    
    
    //console.log(vX + "," + vY + "," + hWidths + "," + hHeights);
    
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "b";
                shapeA.y += oY+1;
                player.velY = 0;
                player.isJumping = true;
                collisions.push(colDir);
                
            } else {
                colDir = "t";
                shapeA.y -= oY-1;
                player.isGrounded = true;
                player.isJumping = false;
                player.velY = 0;
                collisions.push(colDir);
                //console.log(shapeB);
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                //console.log("left");
                shapeA.x += oX+2;
                player.isTouchingWall = true;
                collisions.push(colDir);
            } else {
                colDir = "r";
                //console.log("right");
                shapeA.x -= oX;
                player.isTouchingWall = true;
                collisions.push(colDir);
            }
        }
    }
    
    return colDir;
    
}

function shouldPlayerFall()
{
    if(collisions.length > 0)
    {
        //console.log("fucking");
        var wallJump = false;
        //console.log(collisions.length);
        for(var i = 0; i < collisions.length; i++)
        {
            if(collisions[i] != "l" && collisions[i] != 'r')
            {
                //wallJump = false;
            }
            else
            {
                //console.log("go");
                wallJump = true;
                //player.isJumping = false;
            }
        }
        
        if(wallJump)
        {
            player.isTouchingWall = true;
        }
        else
        {
            player.isTouchingWall = false;
        }
    }
    else
    {
        //console.log(player.y);
        player.isTouchingWall = false;
        player.isGrounded = false;
    }
    
    /*
    if(player.y >= CANVAS_HEIGHT-20)
	{
		player.y = CANVAS_HEIGHT-20;
		player.isJumping = false;
        player.isGrounded = true;
        inAir = false;
	}
	else if(player.y <= 0)
	{
		player.y = 0;
	}
    */
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


var attackWidth = [];

function playerAttacking()
{
    
    if(attacking)
    {
        world.addChild(attackbox);
        attackbox.graphics.clear();
        
        if(!flipped)
        {
            attackbox.x = hitbox.x + hitbox.width;
            attackbox.y = hitbox.y;

            attackbox.graphics.clear();
            
            //console.log(player.getBounds().width - hitbox.width);

            attackbox.width = player.getBounds().width - hitbox.width;
            attackbox.setBounds(0,0,attackbox.width, attackbox.height);
            //attackbox.graphics.beginFill("#ffCC00");
            //attackbox.graphics.drawRect(0,0, attackbox.width, attackbox.height);
        }
        else
        {
            
            attackbox.x = hitbox.x;
            attackbox.y = hitbox.y;

            attackbox.graphics.clear();
            
            //console.log(player.getBounds().width - hitbox.width);

            attackbox.width = player.getBounds().width - hitbox.width;
            attackbox.setBounds(0,0,attackbox.width, attackbox.height);
            //attackbox.graphics.beginFill("#ffCC00");
            //attackbox.graphics.drawRect(0,0, attackbox.width, attackbox.height);
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
    
    for(var i = 0; i < Enemies.length; i++)
    {   
        var col = attackIntersect(attackbox, Enemies[i], player.velX, player.velY);
        
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
        
        if(player.currentFrame == 51)
        {
            //console.log("hit");
            Enemies[hit.index].health--;
        }
        
        //console.log(player.currentFrame);
        
        if(Enemies[hit.index].health <= 0)
        {
            world.removeChild(Enemies[hit.index]);
            Enemies.splice(hit.index,1);
        }
    });
}

var dashing = false;
var stopped = false;

function stopDash()
{
    if(player.isGrounded)
    {
        
        window.clearTimeout(stopDash);
        if((moveLeft || moveRight) && (anim != "right") && (anim != "left") && (anim != "dash"))
        {
            //console.log("what");
            player.gotoAndPlay("dash3");
            anim = "stand";
        }
        player.isDashing = false;
        dashing = false;
        player.speed = runSpeed;
        //console.log("stop");
        stopped = false;
    }
    else
    {
        stopped = false;
        //console.log("notStop");
        window.clearTimeout(stopDash);
        window.setTimeout(stopDash, 100);
    }
    
}

function playerDash()
{
    if(dashing)
    {
        if(!stopped)
        {
            player.isDashing = true;
            player.speed = dashSpeed;
            window.clearTimeout(stopDash);
            window.setTimeout(stopDash, 500);
            stopped = true;
        }
    }
}

function enemyCollision()
{
    var collide = null;
    var hits = [];
    
    for(var i = 0; i < Enemies.length; i++)
    {
        var col = collisionIntersect(player, Enemies[i], player.velX, player.velY);
        
        if(!col)
        {
            
        }
        else
        {
            var test = {
                index: i,
                testing: col
            };
            
            hits.push(test);
        }
    }
    
    hits.forEach(function(hit){
        
        if(hit.testing)
        {
            if(!player.isStunned && player.canBeHurt)
            {
                playerStun();
            }
            else
            {

            }
        }
        
        
        //console.log("player lose health");
        //player.health--;
        //player.isStunned = true;
    });
}

var hitTween;

function playerStun()
{
    player.isStunned = true;
    player.canBeHurt = false;
    
    player.health--;
    
    updateHealthBar();
    
    var moveBack = 0;
    
    if(player.velX < 0)
    {
        moveBack = 40;
    }
    else
    {
        moveBack = -40;
    }
    
    //console.log("player hit");
    player.velY = 0;
    gravity = 0;
    moveUp = false;
    
    hitTween = createjs.Tween.get(player,{loop:false})
        .wait(0)
    .to({x:player.x + moveBack, y: player.y, rotation:0},300,createjs.Ease.circOut)
    .call(completePlayerStun);
    
}

function completePlayerStun()
{
    //console.log("tween go");
    player.isStunned = false;
    player.canBeHurt = true;
    player.velY = 0;
    player.velX = 0;
    gravity = .2;
}


function playerCamera()
{
    
    if(player.x > WORLD_WIDTH*.3)
    {
        world.x = -player.x + CANVAS_WIDTH*.3;
    }
    
    if(player.y > WORLD_HEIGHT*.7)
    {
        world.y = -player.y + CANVAS_HEIGHT*.7;
    }
    else if(player.y < WORLD_HEIGHT*.3)
    {
        world.y = -player.y + CANVAS_HEIGHT*.3;
    }
    
}

function superSpeed()
{
    player.speed = 10000000;
    
    window.setTimeout(endSpeed, 2000);
}

function endSpeed()
{
    console.log("blar");
    player.speed = 3;
}

var ultAttack;

function playerUltimateAttack()
{
    /*player.canBeHurt = false;
    
    ultAttack = createjs.Tween.get(player,{loop:false})
        .wait(0)
    .to({x:Enemies[0].x + Enemies[0].width, y: player.y, rotation:0},createjs.Ease.circOut)
        .wait(500)
    .to({x:Enemies[0].x - Enemies[0].width-5, y: player.y, rotation: 0},createjs.Ease.circOut)
    .wait(500)
    .to({x:Enemies[0].x + Enemies[0].width + player.width, y: player.y - 75, rotation:0},300,createjs.Ease.circOut)
    .call(ultEnd);*/
    
    //player.canBeHurt = true;
}

function ultEnd()
{
    Enemies[0].health = 0;
    player.canBeHurt = true;
}


var collectables = [];

function placeCollectables()
{
    
}

function openExit()
{
    
}

var levelEnder;

function levelEnd()
{
    levelEnder = new createjs.Shape();
    levelEnder.x = 0;
    levelEnder.y = 0;
    levelEnder.width = 10;
    levelEnder.height = 10;
    levelEnder.regX = 5;
    levelEnder.regY = 5;
    
    
    levelEnder.graphics.beginFill("#ff0000");
    levelEnder.graphics.drawRect(0,0, levelEnder.width, levelEnder.height);
    
    world.addChild(levelEnder);
}

function resetGame()
{
    finalLevelTime = 0;
    levelNumber = 0;
    Enemies = [];
    platforms = [];
    bullets = [];
}

function endTheLevel()
{
    var collide = null;
    var hits = [];
    
    var col = collisionIntersect(player, levelEnder, player.velX, player.velY);
        
        if(!col)
        {
            
        }
        else
        {
            //write to levelTime db if logged in
            if(loggedUser)
            {
                saveLevelTime();
                levelNumber++;
                resetForLevel();
                
            }
            else
            {
                levelNumber++;
                resetForLevel();
            }
            //GAME_STATE = "gameOver";
        }
}

function saveLevelTime()
{
     if(loggedUser)
            {
                var form = document.createElement('form');
                form.setAttribute("action", '/game');
                form.setAttribute("method", "POST");

                var hiddenFieldOne = document.createElement('input');
                hiddenFieldOne.setAttribute('type', 'number');
                hiddenFieldOne.setAttribute('name', 'levelNumber');
                hiddenFieldOne.setAttribute('value', levelNumber);

                var hiddenFieldTwo = document.createElement('input');
                hiddenFieldTwo.setAttribute('type', 'text');
                hiddenFieldTwo.setAttribute('name', 'username');
                hiddenFieldTwo.setAttribute('value', loggedUser);
                
                var hiddenFieldThree = document.createElement('input');
                hiddenFieldTwo.setAttribute('type', 'number');
                hiddenFieldTwo.setAttribute('name', 'levelTime');
                hiddenFieldTwo.setAttribute('value', finalLevelTime);

                form.appendChild(hiddenFieldOne);
                form.appendChild(hiddenFieldTwo);
                form.appendChild(hiddenFieldThree);

                document.body.appendChild(form);
                form.submit();

                document.body.removeChild(form);
            }
}

function switchLevel()
{
    //find createdLevels where user = gameLevels
    //should be an array of 5 to 7
    //once that array is made, game will populate with level 1
    //upon level completion, move on until end of Array
    //Display final game over, give option to go back to main menu
    //now, on main menu, allow for loading of other levels
    
    finalLevelTime = 0;
    Enemies = [];
    platforms = [];
    bullets = [];
    loadNewLevel();
}

function loadNewLevel()
{
    console.log(levelNumber + "," + thoseLevels.length);
    if(levelNumber >= thoseLevels.length)
    {
        GAME_STATE = "gameOver";
    }
    else
    {
        var newLevel = thoseLevels[levelNumber].levelPattern;

        var loadedLevel = newLevel.split(",");

        //console.log(loadedLevel);
        drawLevel(loadedLevel);
    }
}

function drawLevel(level)
{
    var space = "0", wall = "1", item = "2", enemyPlace = "3", instaDeath = "4", collect = "5", boss = "6", passPlat = "7", levelEnd = "8", playerSpawn = "9";
    
    var placeX = 25, placeY = 25;
    
    var platNumber = 0;
    
    var offset = 2;
    
    for(var i = 0; i < ((level.length-2)/level[0]); i++)
    {
        placeY = 0;
        for(var j = 0; j < ((level.length-2)/level[1]); j++)
        {
            
            var newSpace = level[offset];
            
            if(newSpace == playerSpawn)
            {
                console.log("WORK");
            }
            
            switch(newSpace)
            {
                case space: break;
                case wall: 
                    platforms[platNumber] = testPlatform.clone();
                    platforms[platNumber] = new createjs.Bitmap(queue.getResult("platTest"));
                    platforms[platNumber].width = platforms[platNumber].getBounds().width;
                    platforms[platNumber].height = platforms[platNumber].getBounds().height;
                    platforms[platNumber].regX = platforms[platNumber].getBounds().width/2;
                    platforms[platNumber].regY = platforms[platNumber].getBounds().height/2;
                    platforms[platNumber].x = placeX;
                    platforms[platNumber].y = placeY;
                    platNumber++;
                    break; //platform
                case item: break; //item
                case enemyPlace: break; //enemy
                case instaDeath: 
                     //tempPlayer, should be hazard
                case collect: 
                    
                    break; //collect
                case boss: break; //boss
                case passPlat: break; //passPlat
                case levelEnd: 
                    levelEnder.x = placeX;
                    levelEnder.y = placeY;
                    break; //fakePlat
                case playerSpawn:
                    
                    playerStartX = placeX;
                    playerStartY = placeY;
                    break; //playerSpawn   
            }

            placeY +=50;
            offset++;
        }
        placeX += 50;
    }
    
    console.log(playerStartX);
    
    for(var i = 0; i < platforms.length; i++)
    {
        world.addChild(platforms[i]);
    }
}

var fullLeverArray = [];

var firstLevel = [35,35,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,4,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,8,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]

function drawFullLevel()
{
    var space = 0, wall = 1, item = 2, enemyPlace = 3, tempPlayer = 4, door = 5, boss = 6, passPlat = 7, fakePlat = 8, playerSpawn = 9;
    
    var placeX = 25, placeY = 25;
    
    var platNumber = 0;
    
    var offset = 2;
    
    for(var i = 0; i < ((firstLevel.length-2)/firstLevel[0]); i++)
    {
        placeY = 0;
        for(var j = 0; j < ((firstLevel.length-2)/firstLevel[1]); j++)
        {
            
            var newSpace = firstLevel[offset];
            switch(newSpace)
            {
                case 0: break;
                case 1: 
                    platforms[platNumber] = testPlatform.clone();
                    platforms[platNumber] = new createjs.Bitmap(queue.getResult("platTest"));
                    platforms[platNumber].width = platforms[platNumber].getBounds().width;
                    platforms[platNumber].height = platforms[platNumber].getBounds().height;
                    platforms[platNumber].regX = platforms[platNumber].getBounds().width/2;
                    platforms[platNumber].regY = platforms[platNumber].getBounds().height/2;
                    platforms[platNumber].x = placeX;
                    platforms[platNumber].y = placeY;
                    platNumber++;
                    break; //platform
                case 2: break; //item
                case 3: break; //enemy
                case 4: 
                    playerStartX = placeX;
                    playerStartY = placeY;
                    
                    break; //tempPlayer, should be hazard
                case 5: break; //door
                case 6: break; //boss
                case 7: break; //passPlat
                case 8: 
                    levelEnder.x = placeX;
                    levelEnder.y = placeY;
                    break; //fakePlat
                //case 9: break; //playerSpawn   
            }

            placeY +=50;
            offset++;
        }
        placeX += 50;
    }
    
    for(var i = 0; i < platforms.length; i++)
    {
        world.addChild(platforms[i]);
    }
    
    /*
    for(int i = 0; i < readIn; i++)
    {
        var newSpace = readIn[i];
        switch(newSpace)
        {
            case 0: break;
            case 1: break; //platform
            case 2: break; //item
            case 3: break; //enemy
            case 4: break; //hazard
            case 5: break; //door
            case 6: break; //boss
            case 7: break; //passPlat
            case 8: break; //fakePlat
            case 9: break; //playerSpawn   
        }
        
        placeX +=50;
        placeY += 50;
    } 
    */
}

function populateLevel()
{
    
}
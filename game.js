//Game constant

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 500;
var FPS = 60;
var GAME_STATE = 'start';
var gameTimer = 0;
var frameCount = 0;
var score = 0;
//Key codes: A=65, W=87, D=68, S=83, Space=32, Enter=13
var KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_SPACE = 32, KEY_ENT = 13, KEY_END = 80, KEY_J = 74, KEY_K = 75;

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
	stage.update();
    
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
    
    if(moreKeys[KEY_W])
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
    
    if(!moreKeys[KEY_W])
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
        frames: [[740,528,39,45,0,18.85,22.65],[779,528,39,45,0,18.85,22.65],[818,528,39,45,0,18.85,22.65],[857,528,39,45,0,18.85,22.65],[896,528,39,45,0,18.85,22.65],[935,528,39,45,0,18.85,22.65],[974,528,39,45,0,18.85,22.65],[0,600,39,45,0,18.85,22.65],[39,600,39,45,0,18.85,22.65],[78,600,39,45,0,18.85,22.65],[117,600,39,45,0,18.85,22.65],[156,600,39,45,0,18.85,22.65],[195,600,39,45,0,18.85,22.65],[234,600,39,45,0,18.85,22.65],[273,600,39,45,0,18.85,22.65],[312,600,39,45,0,18.85,22.65],[351,600,39,45,0,18.85,22.65],[390,600,39,45,0,18.85,22.65],[429,600,39,45,0,18.85,22.65],[468,600,39,45,0,18.85,22.65],[507,600,39,45,0,18.85,22.65],[0,0,44,41,0,23.1,19.2],[44,0,44,41,0,23.1,19.2],[88,0,44,41,0,23.1,19.2],[132,0,44,41,0,23.1,19.2],[176,0,44,41,0,23.1,19.2],[220,0,44,41,0,23.1,19.2],[264,0,44,41,0,23.1,19.2],[308,0,44,41,0,23.1,19.2],[352,0,44,41,0,23.1,19.2],[396,0,44,41,0,23.1,19.2],[440,0,44,41,0,23.1,19.2],[906,600,40,47,0,20.15,27],[946,600,40,47,0,20.15,27],[0,652,40,47,0,20.15,27],[40,652,40,47,0,20.15,27],[80,652,34,45,0,19,22.4],[114,652,34,45,0,19,22.4],[148,652,34,45,0,19,22.4],[182,652,34,45,0,19,22.4],[216,652,41,45,0,22.6,22.8],[257,652,41,45,0,22.6,22.8],[298,652,41,45,0,22.6,22.8],[339,652,37,46,0,18.15,25.65],[376,652,37,46,0,18.15,25.65],[413,652,37,46,0,18.15,25.65],[450,652,37,46,0,18.15,25.65],[487,652,38,46,0,16.75,27.75],[525,652,38,46,0,16.75,27.75],[484,0,63,45,0,20.35,22.55],[547,0,63,45,0,20.35,22.55],[610,0,63,45,0,20.35,22.55],[673,0,63,45,0,20.35,22.55],[736,0,63,45,0,20.35,22.55],[799,0,63,45,0,20.35,22.55],[862,0,63,45,0,20.35,22.55],[925,0,63,45,0,20.35,22.55],[0,45,63,45,0,20.35,22.55],[63,45,63,45,0,20.35,22.55],[546,600,44,38,0,22.05,20.2],[590,600,44,38,0,22.05,20.2],[634,600,47,52,0,25.9,29.15],[681,600,47,52,0,25.9,29.15],[728,600,47,52,0,25.9,29.15],[775,600,47,52,0,25.9,29.15],[822,600,42,38,0,20.75,21.1],[864,600,42,38,0,20.75,21.1]],
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
            dash3: [65,66,"stand",.3]
            }     
        });
    
    
    
    player = new createjs.Sprite(playerSprites);
    
    testPlatform = new createjs.Bitmap(queue.getResult("platTest"));
    
    testEnemy = new createjs.Bitmap(queue.getResult("orb"));
    
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

var hitbox;
var attackbox;

var playerCollidables = [];

var runSpeed = 3;
var dashSpeed = 12;
var dash = false;


function setPlayer()
{
	player.x = 50;
	player.y = CANVAS_HEIGHT;
    player.height = player.getBounds().height;
    player.width = player.getBounds().width;
    player.speed = runSpeed;
    player.runSpeed = runSpeed;
    player.dashSpeed = dashSpeed;
	player.velX = 0;
	player.velY = 0;
	player.isJumping = false;
    player.isGrounded = true;
    player.isDashing = false;
    player.isStunned = false;
    player.canBeHurt = true;
    
    player.health = MAX_HEALTH;
    healthHeight = player.health * MAX_HEALTH;
    
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
    unloadStartButtons();
    loadLevel();
    loadEnemies();
	setPlayer();
    displayPlayerHealth();
    declareCombos();
    startLoop();
	
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
    
    testPlatform.regX = testPlatform.width/2;
    testPlatform.regY = testPlatform.height/2;
    testPlatform.width = testPlatform.getBounds().width;
    testPlatform.height = testPlatform.getBounds().height;
    
    for(var i = 0; i < 5; i++)
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
    
    for(var j = 0; j < 5; j++)
    {
        
        stage.addChild(platforms[j]);
    }
    
    
    
    
}

var enemyBox;

function loadEnemies()
{
    testEnemy.x = CANVAS_WIDTH - 200;
    testEnemy.y = CANVAS_HEIGHT - 30;
    
    testEnemy.width = testEnemy.getBounds().width;
    testEnemy.height = testEnemy.getBounds().height;
    
    testEnemy.regX = testEnemy.getBounds().width/2;
    testEnemy.regY = testEnemy.getBounds().height/2;
    
    Enemies.push(testEnemy);
    
    for(var i = 0; i < Enemies.length; i++)
    {
        stage.addChild(Enemies[i]);
    }
    
    enemyBox = new createjs.Shape();
    
    enemyBox.x = testEnemy.x-15;
    enemyBox.y = testEnemy.y-15;
    enemyBox.height = testEnemy.height;
    enemyBox.width = testEnemy.width;
    
    enemyBox.graphics.beginFill("#ffCC00");
    enemyBox.graphics.drawRect(0,0, enemyBox.width, enemyBox.height);
    
    enemyBox.alpha = .5;
    
    stage.addChild(enemyBox);
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
	
	if(player.velX > -player.speed && moveLeft)
	{
		player.velX--;
        
	}
	else if(player.velX < player.speed&& moveRight)
	{
		player.velX++;
	}
	if(!player.isJumping && moveUp)
	{
		player.isJumping=true;
        player.isGrounded = false;
        inAir = true;
		player.velY = -player.runSpeed*2;
	}
    else if(!player.isGrounded && !moveUp)
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
		player.isJumping = false;
        player.isGrounded = true;
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
        //console.log(player.isGrounded);
        
        var col = collisionIntersect(player, platforms[i], player.velX, player.velY);
        
        if(!col)
        {
            if(player.isGrounded && player.y < CANVAS_HEIGHT - player.height)
            {
               player.isGrounded = false;
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
                    
                    player.y = (platforms[plat.index].y + platforms[plat.index].height);
                    player.velY = 0;
                    player.isJumping = true;
                    
                }
                else if(Math.floor((player.y+player.height) - plat.testing.height) <= (platforms[plat.index].y))
                {
                    //console.log("top");
                    
                    player.y = platforms[plat.index].y - player.height+5;
                    player.isGrounded = true;
                    player.isJumping = false;
                    player.velY = 0;
                    
                }
                else
                {
                    //player.isGrounded = false;
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
    
    if(!player.isGrounded)
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

var dashing = false;
var stopped = false;

function stopDash()
{
    if(player.isGrounded)
    {
        window.clearTimeout(stopDash);
        if(moveLeft || moveRight)
        {
            player.gotoAndPlay("dash3");
            anim = "stand";
        }
        player.isDashing = false;
        dashing = false;
        player.speed = runSpeed;
        console.log("stop");
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

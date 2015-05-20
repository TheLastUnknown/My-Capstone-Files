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
    
    //console.log(player.isGrounded);
    
    playerAttacking();
}


//invisable object for sword
function playerCollision()
{
    //console.log(platforms.length);
    
    var collide = null;
    var plats = [];
    collisions = [];
    
    console.log(player.velY);
    
    for(var i = 0; i < platforms.length; i++)
    {
        FUCKIT(player,platforms[i]);
    }
    
    //console.log(collisions.length);
    shouldPlayerFall();
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
                player.isJumping = false;
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
        
        //console.log((attackbox.x + attackbox.width) + "," + (platforms[0].x - (platforms[0].width/2)));
        
        
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
            console.log("hit");
            Enemies[hit.index].health--;
        }
        
        console.log(player.currentFrame);
        
        if(Enemies[hit.index].health <= 0)
        {
            world.removeChild(Enemies[hit.index]);
            Enemies.splice(hit.index,1);
        }
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

function playerWallJump()
{
    //gravity = 0.05;
    //jumping = false;
    //
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

var ultAttack;

function playerUltimateAttack()
{
    player.canBeHurt = false;
    
    ultAttack = createjs.Tween.get(player,{loop:false})
        .wait(0)
    .to({x:Enemies[0].x + Enemies[0].width, y: player.y, rotation:0},createjs.Ease.circOut)
        .wait(500)
    .to({x:Enemies[0].x - Enemies[0].width-5, y: player.y, rotation: 0},createjs.Ease.circOut)
    .wait(500)
    .to({x:Enemies[0].x + Enemies[0].width + player.width, y: player.y - 75, rotation:0},300,createjs.Ease.circOut)
    .call(ultEnd);
    
    //player.canBeHurt = true;
}

function ultEnd()
{
    Enemies[0].health = 0;
    player.canBeHurt = true;
}

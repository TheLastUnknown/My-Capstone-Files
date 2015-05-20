(function(window) {
Run = function() {
	this.initialize();
}
Run._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[480,239,32,40,0,16.85,20.1],[281,399,31,40,0,16.85,19.1],[105,326,38,37,0,21.85,17.1],[110,158,42,40,0,21.85,20.1],[344,361,34,40,0,19.85,19.1],[486,112,25,39,0,13.850000000000001,18.1],[455,398,32,40,0,17.85,19.1],[406,199,39,40,0,21.85,19.1],[0,201,39,40,0,21.85,19.1],[311,253,38,40,0,20.85,19.1],[269,327,37,38,0,21.85,17.1]]});
var Run_p = Run.prototype = new createjs.Sprite();
Run_p.Sprite_initialize = Run_p.initialize;
Run_p.initialize = function() {
	this.Sprite_initialize(Run._SpriteSheet);
	this.paused = false;
}
window.Run = Run;
Slash_1 = function() {
	this.initialize();
}
Slash_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[98,363,33,41,0,16.3,20.5],[262,67,61,42,0,17.3,20.5],[200,67,62,43,0,17.3,21.5],[262,109,61,40,0,16.3,18.5],[0,118,52,38,0,16.3,16.5],[209,352,35,40,0,16.3,19.5],[378,396,33,40,0,15.3,19.5],[143,361,35,39,0,16.3,17.5],[404,157,41,42,0,18.3,19.5],[39,202,40,39,0,20.3,19.5]]});
var Slash_1_p = Slash_1.prototype = new createjs.Sprite();
Slash_1_p.Sprite_initialize = Slash_1_p.initialize;
Slash_1_p.initialize = function() {
	this.Sprite_initialize(Slash_1._SpriteSheet);
	this.paused = false;
}
window.Slash_1 = Slash_1;
Slash_2 = function() {
	this.initialize();
}
Slash_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[312,399,31,37,0,15.149999999999999,18.4],[67,321,38,38,0,20.15,19.4],[0,67,67,51,0,23.15,29.4],[440,61,68,51,0,23.15,29.4],[67,67,67,47,0,22.15,28.4],[67,114,43,48,0,21.15,29.4],[200,110,46,45,0,22.15,26.4],[323,122,44,44,0,20.15,25.4],[404,122,35,34,0,14.149999999999999,15.399999999999999],[246,394,35,38,0,15.149999999999999,19.4],[345,322,37,39,0,15.149999999999999,20.4]]});
var Slash_2_p = Slash_2.prototype = new createjs.Sprite();
Slash_2_p.Sprite_initialize = Slash_2_p.initialize;
Slash_2_p.initialize = function() {
	this.Sprite_initialize(Slash_2._SpriteSheet);
	this.paused = false;
}
window.Slash_2 = Slash_2;
Slash_3 = function() {
	this.initialize();
}
Slash_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[194,155,47,39,0,23.7,19.25],[0,0,358,67,0,22.7,34.25],[110,114,46,44,0,25.7,23.25],[440,112,46,45,0,25.7,24.25],[358,0,82,61,0,26.7,37.25],[358,61,82,61,0,26.7,37.25],[440,0,67,61,0,11.7,37.25],[134,67,66,47,0,10.7,23.25],[367,122,37,50,0,11.7,25.25],[156,114,38,51,0,11.7,25.25],[0,156,39,45,0,11.7,18.25],[209,394,37,36,0,12.7,15.25],[39,162,41,40,0,13.7,19.25],[308,293,37,40,0,12.7,20.25]]});
var Slash_3_p = Slash_3.prototype = new createjs.Sprite();
Slash_3_p.Sprite_initialize = Slash_3_p.initialize;
Slash_3_p.initialize = function() {
	this.Sprite_initialize(Slash_3._SpriteSheet);
	this.paused = false;
}
window.Slash_3 = Slash_3;
Stand = function() {
	this.initialize();
}
Stand._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[34,280,37,41,0,18.5,20.65],[71,280,37,41,0,18.5,20.65],[393,280,37,41,0,18.5,20.65],[349,281,37,41,0,18.5,20.65],[430,282,37,41,0,19.5,20.65],[467,282,37,41,0,19.5,20.65],[108,285,37,41,0,19.5,20.65],[271,286,37,41,0,19.5,20.65],[119,205,38,41,0,20.5,20.65],[278,206,38,41,0,20.5,20.65],[316,212,38,41,0,19.5,20.65],[234,231,38,41,0,19.5,20.65],[157,234,38,41,0,19.5,20.65],[195,234,38,41,0,19.5,20.65],[79,239,38,41,0,19.5,20.65],[406,239,38,41,0,19.5,20.65],[80,198,39,41,0,20.5,20.65],[445,198,39,41,0,20.5,20.65],[233,272,38,40,0,19.5,19.65],[156,275,38,40,0,19.5,19.65],[232,312,37,40,0,18.5,19.65]]});
var Stand_p = Stand.prototype = new createjs.Sprite();
Stand_p.Sprite_initialize = Stand_p.initialize;
Stand_p.initialize = function() {
	this.Sprite_initialize(Stand._SpriteSheet);
	this.paused = false;
}
window.Stand = Stand;
ZX_Dash_1 = function() {
	this.initialize();
}
ZX_Dash_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[382,359,37,37,0,18.05,18.4],[234,194,44,37,0,22.05,18.4]]});
var ZX_Dash_1_p = ZX_Dash_1.prototype = new createjs.Sprite();
ZX_Dash_1_p.Sprite_initialize = ZX_Dash_1_p.initialize;
ZX_Dash_1_p.initialize = function() {
	this.Sprite_initialize(ZX_Dash_1._SpriteSheet);
	this.paused = false;
}
window.ZX_Dash_1 = ZX_Dash_1;
ZX_Dash_2 = function() {
	this.initialize();
}
ZX_Dash_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[244,365,47,29,0,23.35,14.95],[455,369,46,29,0,23.35,14.95],[291,370,46,29,0,23.35,14.95],[0,376,46,29,0,23.35,14.95]]});
var ZX_Dash_2_p = ZX_Dash_2.prototype = new createjs.Sprite();
ZX_Dash_2_p.Sprite_initialize = ZX_Dash_2_p.initialize;
ZX_Dash_2_p.initialize = function() {
	this.Sprite_initialize(ZX_Dash_2._SpriteSheet);
	this.paused = false;
}
window.ZX_Dash_2 = ZX_Dash_2;
ZX_Dash_3 = function() {
	this.initialize();
}
ZX_Dash_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[424,323,41,35,0,20.7,17.15],[386,321,38,38,0,16.7,19.15]]});
var ZX_Dash_3_p = ZX_Dash_3.prototype = new createjs.Sprite();
ZX_Dash_3_p.Sprite_initialize = ZX_Dash_3_p.initialize;
ZX_Dash_3_p.initialize = function() {
	this.Sprite_initialize(ZX_Dash_3._SpriteSheet);
	this.paused = false;
}
window.ZX_Dash_3 = ZX_Dash_3;
ZX_Jump_1 = function() {
	this.initialize();
}
ZX_Jump_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[445,157,41,41,0,20,20.9],[306,333,38,37,0,19,16.9],[33,321,34,43,0,18,22.9],[0,331,31,45,0,15,24.9]]});
var ZX_Jump_1_p = ZX_Jump_1.prototype = new createjs.Sprite();
ZX_Jump_1_p.Sprite_initialize = ZX_Jump_1_p.initialize;
ZX_Jump_1_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_1._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_1 = ZX_Jump_1;
ZX_Jump_2 = function() {
	this.initialize();
}
ZX_Jump_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[465,323,31,46,0,15.649999999999999,21.35],[0,286,33,45,0,17.65,20.35],[424,358,31,45,0,15.649999999999999,21.35],[178,361,31,44,0,15.649999999999999,20.35]]});
var ZX_Jump_2_p = ZX_Jump_2.prototype = new createjs.Sprite();
ZX_Jump_2_p.Sprite_initialize = ZX_Jump_2_p.initialize;
ZX_Jump_2_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_2._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_2 = ZX_Jump_2;
ZX_Jump_3 = function() {
	this.initialize();
}
ZX_Jump_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[67,359,31,45,0,15.8,22.7],[0,241,34,45,0,17.8,22.7],[246,149,41,45,0,23.8,22.7]]});
var ZX_Jump_3_p = ZX_Jump_3.prototype = new createjs.Sprite();
ZX_Jump_3_p.Sprite_initialize = ZX_Jump_3_p.initialize;
ZX_Jump_3_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_3._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_3 = ZX_Jump_3;
ZX_Jump_4 = function() {
	this.initialize();
}
ZX_Jump_4._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[369,199,37,43,0,18.3,21.75],[444,239,36,43,0,17.3,21.75],[145,315,32,46,0,13.3,24.75],[177,315,32,46,0,13.3,24.75]]});
var ZX_Jump_4_p = ZX_Jump_4.prototype = new createjs.Sprite();
ZX_Jump_4_p.Sprite_initialize = ZX_Jump_4_p.initialize;
ZX_Jump_4_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_4._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_4 = ZX_Jump_4;
ZX_Jump_5 = function() {
	this.initialize();
}
ZX_Jump_5._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[323,67,35,47,0,17.5,23.25],[194,275,38,40,0,18.5,17.25]]});
var ZX_Jump_5_p = ZX_Jump_5.prototype = new createjs.Sprite();
ZX_Jump_5_p.Sprite_initialize = ZX_Jump_5_p.initialize;
ZX_Jump_5_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_5._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_5 = ZX_Jump_5;
ZX_Stun = function() {
	this.initialize();
}
ZX_Stun._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[34,241,39,39,0,19.95,19.45],[152,165,41,40,0,18.95,20.45],[354,242,39,39,0,19.95,19.45],[287,166,41,40,0,18.95,20.45],[117,246,39,39,0,19.95,19.45],[328,172,41,40,0,18.95,20.45],[272,247,39,39,0,19.95,19.45],[193,194,41,40,0,18.95,20.45]]});
var ZX_Stun_p = ZX_Stun.prototype = new createjs.Sprite();
ZX_Stun_p.Sprite_initialize = ZX_Stun_p.initialize;
ZX_Stun_p.initialize = function() {
	this.Sprite_initialize(ZX_Stun._SpriteSheet);
	this.paused = false;
}
window.ZX_Stun = ZX_Stun;
}(window));


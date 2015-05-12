(function(window) {
Run = function() {
	this.initialize();
}
Run._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[0,0,44,41,0,23.1,19.2],[44,0,44,41,0,23.1,19.2],[88,0,44,41,0,23.1,19.2],[132,0,44,41,0,23.1,19.2],[176,0,44,41,0,23.1,19.2],[220,0,44,41,0,23.1,19.2],[264,0,44,41,0,23.1,19.2],[308,0,44,41,0,23.1,19.2],[352,0,44,41,0,23.1,19.2],[396,0,44,41,0,23.1,19.2],[440,0,44,41,0,23.1,19.2]]});
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
Slash_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[484,0,63,45,0,20.35,22.55],[547,0,63,45,0,20.35,22.55],[610,0,63,45,0,20.35,22.55],[673,0,63,45,0,20.35,22.55],[736,0,63,45,0,20.35,22.55],[799,0,63,45,0,20.35,22.55],[862,0,63,45,0,20.35,22.55],[925,0,63,45,0,20.35,22.55],[0,45,63,45,0,20.35,22.55],[63,45,63,45,0,20.35,22.55]]});
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
Slash_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[126,45,68,51,0,23.85,31.35],[194,45,68,51,0,23.85,31.35],[262,45,68,51,0,23.85,31.35],[330,45,68,51,0,23.85,31.35],[398,45,68,51,0,23.85,31.35],[466,45,68,51,0,23.85,31.35],[534,45,68,51,0,23.85,31.35],[602,45,68,51,0,23.85,31.35],[670,45,68,51,0,23.85,31.35],[738,45,68,51,0,23.85,31.35],[806,45,68,51,0,23.85,31.35]]});
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
Slash_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[0,96,370,72,0,34.2,39.4],[370,96,370,72,0,34.2,39.4],[0,168,370,72,0,34.2,39.4],[370,168,370,72,0,34.2,39.4],[0,240,370,72,0,34.2,39.4],[370,240,370,72,0,34.2,39.4],[0,312,370,72,0,34.2,39.4],[370,312,370,72,0,34.2,39.4],[0,384,370,72,0,34.2,39.4],[370,384,370,72,0,34.2,39.4],[0,456,370,72,0,34.2,39.4],[370,456,370,72,0,34.2,39.4],[0,528,370,72,0,34.2,39.4],[370,528,370,72,0,34.2,39.4]]});
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
Stand._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[740,528,39,45,0,18.85,22.65],[779,528,39,45,0,18.85,22.65],[818,528,39,45,0,18.85,22.65],[857,528,39,45,0,18.85,22.65],[896,528,39,45,0,18.85,22.65],[935,528,39,45,0,18.85,22.65],[974,528,39,45,0,18.85,22.65],[0,600,39,45,0,18.85,22.65],[39,600,39,45,0,18.85,22.65],[78,600,39,45,0,18.85,22.65],[117,600,39,45,0,18.85,22.65],[156,600,39,45,0,18.85,22.65],[195,600,39,45,0,18.85,22.65],[234,600,39,45,0,18.85,22.65],[273,600,39,45,0,18.85,22.65],[312,600,39,45,0,18.85,22.65],[351,600,39,45,0,18.85,22.65],[390,600,39,45,0,18.85,22.65],[429,600,39,45,0,18.85,22.65],[468,600,39,45,0,18.85,22.65],[507,600,39,45,0,18.85,22.65]]});
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
ZX_Dash_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[546,600,44,38,0,22.05,20.2],[590,600,44,38,0,22.05,20.2]]});
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
ZX_Dash_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[634,600,47,52,0,25.9,29.15],[681,600,47,52,0,25.9,29.15],[728,600,47,52,0,25.9,29.15],[775,600,47,52,0,25.9,29.15]]});
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
ZX_Dash_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[822,600,42,38,0,20.75,21.1],[864,600,42,38,0,20.75,21.1]]});
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
ZX_Jump_1._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[906,600,40,47,0,20.15,27],[946,600,40,47,0,20.15,27],[0,652,40,47,0,20.15,27],[40,652,40,47,0,20.15,27]]});
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
ZX_Jump_2._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[80,652,34,45,0,19,22.4],[114,652,34,45,0,19,22.4],[148,652,34,45,0,19,22.4],[182,652,34,45,0,19,22.4]]});
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
ZX_Jump_3._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[216,652,41,45,0,22.6,22.8],[257,652,41,45,0,22.6,22.8],[298,652,41,45,0,22.6,22.8]]});
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
ZX_Jump_4._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[339,652,37,46,0,18.15,25.65],[376,652,37,46,0,18.15,25.65],[413,652,37,46,0,18.15,25.65],[450,652,37,46,0,18.15,25.65]]});
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
ZX_Jump_5._SpriteSheet = new createjs.SpriteSheet({images: ["NewSprites.png"], frames: [[487,652,38,46,0,16.75,27.75],[525,652,38,46,0,16.75,27.75]]});
var ZX_Jump_5_p = ZX_Jump_5.prototype = new createjs.Sprite();
ZX_Jump_5_p.Sprite_initialize = ZX_Jump_5_p.initialize;
ZX_Jump_5_p.initialize = function() {
	this.Sprite_initialize(ZX_Jump_5._SpriteSheet);
	this.paused = false;
}
window.ZX_Jump_5 = ZX_Jump_5;
}(window));


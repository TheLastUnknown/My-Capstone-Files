(function(window) {
CursorCornerDownLeft = function() {
	this.initialize();
}
CursorCornerDownLeft._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[0,0,82,82,0,81.25,81.1],[82,0,82,82,0,81.25,81.1],[164,0,82,82,0,81.25,81.1],[246,0,82,82,0,81.25,81.1],[328,0,82,82,0,81.25,81.1],[410,0,82,82,0,81.25,81.1]]});
var CursorCornerDownLeft_p = CursorCornerDownLeft.prototype = new createjs.Sprite();
CursorCornerDownLeft_p.Sprite_initialize = CursorCornerDownLeft_p.initialize;
CursorCornerDownLeft_p.initialize = function() {
	this.Sprite_initialize(CursorCornerDownLeft._SpriteSheet);
	this.paused = false;
}
window.CursorCornerDownLeft = CursorCornerDownLeft;
CursorCornerDownRight = function() {
	this.initialize();
}
CursorCornerDownRight._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[0,82,83,82,0,11.3,81.1],[83,82,83,82,0,11.3,81.1],[166,82,83,82,0,11.3,81.1],[249,82,83,82,0,11.3,81.1],[332,82,83,82,0,11.3,81.1],[415,82,83,82,0,11.3,81.1]]});
var CursorCornerDownRight_p = CursorCornerDownRight.prototype = new createjs.Sprite();
CursorCornerDownRight_p.Sprite_initialize = CursorCornerDownRight_p.initialize;
CursorCornerDownRight_p.initialize = function() {
	this.Sprite_initialize(CursorCornerDownRight._SpriteSheet);
	this.paused = false;
}
window.CursorCornerDownRight = CursorCornerDownRight;
CursorHorizontal = function() {
	this.initialize();
}
CursorHorizontal._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[498,82,12,82,0,11.1,81.05],[0,164,12,82,0,11.1,81.05],[12,164,12,82,0,11.1,81.05],[24,164,12,82,0,11.1,81.05],[36,164,12,82,0,11.1,81.05],[48,164,12,82,0,11.1,81.05]]});
var CursorHorizontal_p = CursorHorizontal.prototype = new createjs.Sprite();
CursorHorizontal_p.Sprite_initialize = CursorHorizontal_p.initialize;
CursorHorizontal_p.initialize = function() {
	this.Sprite_initialize(CursorHorizontal._SpriteSheet);
	this.paused = false;
}
window.CursorHorizontal = CursorHorizontal;
CursorSingle = function() {
	this.initialize();
}
CursorSingle._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[60,164,12,12,0,11.1,11.1]]});
var CursorSingle_p = CursorSingle.prototype = new createjs.Sprite();
CursorSingle_p.Sprite_initialize = CursorSingle_p.initialize;
CursorSingle_p.initialize = function() {
	this.Sprite_initialize(CursorSingle._SpriteSheet);
	this.paused = false;
}
window.CursorSingle = CursorSingle;
CursorUpLeft = function() {
	this.initialize();
}
CursorUpLeft._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[72,164,82,82,0,11.4,11.35],[154,164,82,82,0,11.4,11.35],[236,164,82,82,0,11.4,11.35],[318,164,82,82,0,11.4,11.35],[400,164,82,82,0,11.4,11.35],[0,246,82,82,0,11.4,11.35]]});
var CursorUpLeft_p = CursorUpLeft.prototype = new createjs.Sprite();
CursorUpLeft_p.Sprite_initialize = CursorUpLeft_p.initialize;
CursorUpLeft_p.initialize = function() {
	this.Sprite_initialize(CursorUpLeft._SpriteSheet);
	this.paused = false;
}
window.CursorUpLeft = CursorUpLeft;
CursorUpRight = function() {
	this.initialize();
}
CursorUpRight._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[82,246,83,82,0,81.15,11],[165,246,83,82,0,81.15,11],[248,246,83,82,0,81.15,11],[331,246,83,82,0,81.15,11],[414,246,83,82,0,81.15,11],[0,328,83,82,0,81.15,11]]});
var CursorUpRight_p = CursorUpRight.prototype = new createjs.Sprite();
CursorUpRight_p.Sprite_initialize = CursorUpRight_p.initialize;
CursorUpRight_p.initialize = function() {
	this.Sprite_initialize(CursorUpRight._SpriteSheet);
	this.paused = false;
}
window.CursorUpRight = CursorUpRight;
CursorVertical = function() {
	this.initialize();
}
CursorVertical._SpriteSheet = new createjs.SpriteSheet({images: ["CursorSizes.png"], frames: [[83,328,82,12,0,81.05,11.1],[165,328,82,12,0,81.05,11.1],[247,328,82,12,0,81.05,11.1],[329,328,82,12,0,81.05,11.1],[411,328,82,12,0,81.05,11.1],[0,410,82,12,0,81.05,11.1]]});
var CursorVertical_p = CursorVertical.prototype = new createjs.Sprite();
CursorVertical_p.Sprite_initialize = CursorVertical_p.initialize;
CursorVertical_p.initialize = function() {
	this.Sprite_initialize(CursorVertical._SpriteSheet);
	this.paused = false;
}
window.CursorVertical = CursorVertical;
}(window));


(function(window) {
CursorCornerDownLeft = function() {
	this.initialize();
}
CursorCornerDownLeft._SpriteSheet = new createjs.SpriteSheet({images: ["cursorDownRight.png"], frames: [[0,0,32,32,0,31.25,31.099999999999994],[32,0,42,42,0,41.25,41.099999999999994],[74,0,52,52,0,51.25,51.099999999999994],[126,0,62,62,0,61.25,61.099999999999994],[0,62,72,72,0,71.25,71.1],[72,62,82,82,0,81.25,81.1]]});
var CursorCornerDownLeft_p = CursorCornerDownLeft.prototype = new createjs.Sprite();
CursorCornerDownLeft_p.Sprite_initialize = CursorCornerDownLeft_p.initialize;
CursorCornerDownLeft_p.initialize = function() {
	this.Sprite_initialize(CursorCornerDownLeft._SpriteSheet);
	this.paused = false;
}
window.CursorCornerDownLeft = CursorCornerDownLeft;
}(window));


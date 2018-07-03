var GS = 32;

function Square(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
}

Square.prototype.update = function() {

}

Square.prototype.render = function() {
	var ctx = myGameArea.context;
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x * GS, this.y * GS, this.size * GS, this.size * GS);
}

function Snake(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
}

Snake.prototype = Object.create(Square.prototype);

function BodyPart(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
}

BodyPart.prototype = Object.create(Square.prototype);
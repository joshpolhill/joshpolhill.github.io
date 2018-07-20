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
	Square.call(this);
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.dir = 'R';
	this.move = function() {
		switch (this.dir) {
			case 'L': 
				this.x--;
				break;
			case 'U': 
				this.y--;
				break;
			case 'R': 
				this.x++;
				break;
			case 'D': 
				this.y++;
				break;
		}
	};
	this.eatApple = function() {
		if(this.x === apple.x && this.y === apple.y) {
			apple.x = Math.floor(Math.random() * ((myGameArea.canvas.width - this.size)/GS));
			apple.y = Math.floor(Math.random() * ((myGameArea.canvas.height - this.size)/GS));
		}
	}
	this.changeDir = function() {
		if(keys.left)
			this.dir = 'L';
		else if(keys.up)
			this.dir = 'U';
		else if(keys.right)
			this.dir = 'R';
		else if(keys.down)
			this.dir = 'D';
	};
	this.update = function() {
		this.changeDir();
		this.move();
		this.eatApple();
	};
}

Snake.prototype = Object.create(Square.prototype);

function BodyPart(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
}

BodyPart.prototype = Object.create(Square.prototype);
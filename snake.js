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
	this.changeDir = function() {
		if(keys.left)
			this.dir = 'L';
		else if(keys.up)
			this.dir = 'U';
		else if(keys.right)
			this.dir = 'R';
		else if(keys.down)
			this.dir = 'D';
	}
}

function eatApple() {
	if(this.x === this.x && this.y === this.y) {
		this.x = math.floor(math.random() * GS);
		this.y = math.floor(math.random() * GS);
	}
}
	

Snake.prototype = Object.create(Square.prototype);

function BodyPart(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
}

BodyPart.prototype = Object.create(Square.prototype);
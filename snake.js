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
	this.body = [new BodyPart(this.x - 1, this.y, this.size, this.color, this)];
	this.move = function() {
		for (var i = this.body.length - 1; i >= 0; i--) {
			this.body[i].x = this.body[i].parent.x;
			this.body[i].y = this.body[i].parent.y;
		}
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
			var tempBody = this.body[this.body.length -1];
			this.body.push(new BodyPart(tempBody.x, tempBody.y, tempBody.size, tempBody.color, tempBody));
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
	this.render = function() {
		var ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * GS, this.y * GS, this.size * GS, this.size * GS);
		this.body.forEach(function(part) {
			part.render();
		});
	}
}

Snake.prototype = Object.create(Square.prototype);

function BodyPart(x, y, size, color, parent) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.parent = parent;
}

BodyPart.prototype = Object.create(Square.prototype);
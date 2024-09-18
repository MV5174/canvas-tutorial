class Player {
    constructor({
        collisionBlocks = []
    }) {
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.jumps = 0;

        this.jumpCount = 2;

        this.gravity = .2;

        this.collisionBlocks = collisionBlocks;
        console.log(collisionBlocks);

        this.width = 64;
        this.height = 64;
        this.sides = {
            bottom: this.position.y + this.height,

        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        //Above bottom of canvas
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity;
        } else if (this.sides.bottom + this.velocity.y < canvas.height - 2) {
            this.jumps = 0;
        } else {
            this.velocity.y = 0;
            this.jumps = 0;
        }
    }

}
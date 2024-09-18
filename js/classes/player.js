class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.gravity = .2;

        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height,

        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        //Above bottom of canvas
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }
    }

}
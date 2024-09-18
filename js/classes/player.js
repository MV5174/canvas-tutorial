class Player {
    constructor({
        collisionBlocks = []
    }) {
        this.position = {
            x: 200,
            y: 200
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

        this.checkForHorizontalCollisions();
        this.applyGravity()
        this.checkforVerticalCollisions();
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            //If a collision exists
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                //Collision on x axis going to the left
                if (this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break
                }

                //Collision on x axis going to the right
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkforVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            //If a collision exists
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                //Collision on y axis going up
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break
                }

                //Collision on y axis going down
                if (this.velocity.y > 0) {
                    this.velocity.y
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    this.jumps = 0;
                    break
                }
            }
        }
    }

}
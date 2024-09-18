class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations });
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.direction = 'right';

        this.jumps = 0;

        this.jumpCount = 2;

        this.gravity = .2;

        this.collisionBlocks = collisionBlocks;
        console.log(collisionBlocks);
        this.sides = {
            bottom: this.position.y + this.height,

        }
    }

    update() {
        //Blue box for collision
        //c.fillStyle = 'rgba(0, 0, 255, .5)';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;

        this.updateHitbox();

        //c.fillStyle = 'rgba(0, 255, 0, .5)';
        //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.checkForHorizontalCollisions();
        this.applyGravity()
        this.updateHitbox();
        this.checkforVerticalCollisions();
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) {
            return
        }
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 63,
                y: this.position.y + 36
            },
            width: 40,
            height: 53
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            //If a collision exists
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                //Collision on x axis going to the left
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break
                }

                //Collision on x axis going to the right
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
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
               this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
               this.hitbox.position.x +this.hitbox.width >= collisionBlock.position.x &&
               this.hitbox.position.y +this.hitbox.height >= collisionBlock.position.y &&
               this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                //Collision on y axis going up
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break
                }

                //Collision on y axis going down
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    this.jumps = 0;
                    break
                }
            }
        }
    }

}
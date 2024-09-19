class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations,
        loop
    }) {
        super({ imageSrc, frameRate, animations, loop });
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
        c.fillStyle = 'rgba(0, 0, 255, .5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;

        this.updateHitbox();

        c.fillStyle = 'rgba(0, 255, 0, .5)';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.checkForHorizontalCollisions();
        this.applyGravity()
        this.updateHitbox();
        this.checkforVerticalCollisions();
    }

    handleInput() {
        if (this.preventInput) {
            return
        }

        if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x = 0;
            if (player.direction === 'right') {
                player.switchSprite('idleRight');
            } else {
                player.switchSprite('idleLeft');
            } 
        } else if (keys.a.pressed) {
            player.switchSprite('runLeft');
            player.velocity.x = -4;
            player.direction = 'left';
        } else if (keys.d.pressed) {
            player.switchSprite('runRight');
            player.velocity.x = 4;
            player.direction = 'right';
        } else if (player.direction === 'right' && player.velocity.x == 0) {
            player.switchSprite('idleRight');
        } else {
            player.switchSprite('idleLeft');
        }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) {
            return
        }
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
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
                    this.jumps--;
                    break
                }

                //Collision on x axis going to the right
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    this.jumps--;
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
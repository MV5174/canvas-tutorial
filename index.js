//Selecting Canvas and specifying 2d
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024; //64 * 16
canvas.height = 576; //64 * 9

const parsedCollisions = collisionsLevel1.parse2D();

const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 6,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleleft: {
            frameRate: 11,
            frameBuffer: 6,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 12,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
        },
    }
});

const doors = [
    new Sprite({
        position: {
            x: 768,
            y: 272
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 15,
        loop: false,
        autoplay: false
    })
]

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    
}

function animate() {
    window.requestAnimationFrame(animate)

    backgroundLevel1.draw();
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw();
    })

    doors.forEach((door) => {
        door.draw();
    })

    player.velocity.x = 0;

    player.handleInput(keys);
    player.draw();
    player.update();

}

animate();
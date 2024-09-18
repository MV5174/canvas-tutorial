//Selecting Canvas and specifying 2d
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024; //64 * 16
canvas.height = 576; //64 * 9

const player = new Player();

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();
    player.update();

}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -7.5;
            }
            break
    }
})
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (player.jumps < player.jumpCount) {
                player.velocity.y = -7.5;
                player.jumps++;
            }
            break
        case 'a':
            keys.a.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
})
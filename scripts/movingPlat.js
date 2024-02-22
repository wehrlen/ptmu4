class MovingPlat {
    constructor(iInit, jInit, width, height, texture, speed_x, speed_y, coord1, coord2) {
        this.width = width * cellSize;
        this.height = height * cellSize;
        this.x = iInit * cellSize;
        this.y = jInit * cellSize;
        this.texture = texture;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.coord1 = coord1;
        this.coord2 = coord2;
        this.coord1_y = Math.trunc(this.coord1 / 20);
        this.coord1_x = Math.trunc(this.coord1 % 20);
        this.coord2_y = Math.trunc(this.coord2 / 20);
        this.coord2_x = Math.trunc(this.coord2 % 20);
        this.dir = true;
    }


    create() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move() {
        this.y += this.y_velocity;
        this.x += this.x_velocity;
        this.x_velocity *= 0.9;
        this.x_velocity *= 0.9;
    }

    collision() {
        console.log(this.coord1_x, this.coord1_y, this.coord2_x * cellSize, this.coord2_y * cellSize)
        if (this.dir === true) {
            this.x_velocity += this.speed_x;
            this.y_velocity += this.speed_y;
        } else {
            this.x_velocity -= this.speed_x;
            this.y_velocity -= this.speed_y;
        }

        if (this.speed_y === 0) {
            if (this.x <= this.coord1_x) {
                this.dir = true;
            } else if (this.x >= this.coord2_x * cellSize) {
                this.dir = false;
            }
        } else {
            if (this.y <= this.coord1_y) {
                this.dir = true;
            } else if (this.y >= this.coord2_y * cellSize) {
                this.dir = false;
            }
        }


        if (this.x <= 0) {
            this.dir = true;
        } else if (this.x >= canvas.width - cellSize) {
            this.dir = false;
        }
    }

    loop() {
        this.move();
        this.collision();
        this.create();
    }
}

let plat1 = new MovingPlat(2, 12, 3, 1, 0, 0.3, 0, 0, 10);


// function generateEnemyInKing(terrain) {
//     switch (terrain) {
//         case 1:
//             king.enemy(hedgehog1);
//             king.enemy(hedgehog2);
//             break;
//         case 2:
//             king.enemy(hedgehog3);
//             king.enemy(hedgehog4);
//             break;
//         default:
//             king.enemy(hedgehog1);
//             king.enemy(hedgehog2);
//     }
// }

function generatePlat(terrain) {
    switch (terrain) {
        case 1:
            plat1.loop();
            break;
        default:
            plat1.loop();
    }
}
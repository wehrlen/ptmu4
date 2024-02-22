class Hedgehog {
    constructor(iInit, jInit) {
        this.height = cellSize;
        this.width = cellSize;
        this.x = iInit * cellSize;
        this.y = jInit * cellSize;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.dir = true;
    }

    create() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move() {
        this.y_velocity += 1.5; // gravity
        this.y += this.y_velocity;
        this.x += this.x_velocity;
        this.x_velocity *= 0.9;
    }

    collisionWall() {
        if (this.dir === true) {
            this.x_velocity += 0.1;
            ctx.fillStyle = "green";
        } else {
            this.x_velocity -= 0.1;
            ctx.fillStyle = "lightgreen";
        }

        for (let i = 0; i < terrain.coordTab.length; i++) {
            if ((Math.round(this.x / cellSize + 0.5) === terrain.coordTab[i][0] + 1) && (Math.round(this.y / cellSize) === terrain.coordTab[i][1])) {
                // this.x = (terrain.coordTab[i][0] + 1) * cellSize;
                this.dir = true;
            }
            if ((Math.round(this.x / cellSize - 0.5) === terrain.coordTab[i][0] - 1) && (Math.round(this.y / cellSize) === terrain.coordTab[i][1])) {
                // this.x = (terrain.coordTab[i][0] - 1) * cellSize;
                this.dir = false;
            }
            if ((Math.round(this.y / cellSize - 0.5) === terrain.coordTab[i][1] - 1) && ((Math.round(this.x / cellSize + 0.5) === terrain.coordTab[i][0]) || (Math.round(this.x / cellSize - 0.5) === terrain.coordTab[i][0]))) {
                this.y = (terrain.coordTab[i][1] - 1) * cellSize;
                this.y_velocity = 0;
            }
        }

        if (this.x <= 0) {
            this.dir = true;
        } else if (this.x >= canvas.width - cellSize) { // if rectangle goes past right boundary
            this.dir = false;
        }
    }

    loop() {
        this.move();
        this.collisionWall();
        this.create();
    }
}

let hedgehog1 = new Hedgehog(2, 16);
let hedgehog2 = new Hedgehog(12, 7);
let hedgehog3 = new Hedgehog(2, 2);
let hedgehog4 = new Hedgehog(12, 12);

function generateEnemyInKing(terrain) {
    switch (terrain) {
        case 1:
            king.enemy(hedgehog1);
            king.enemy(hedgehog2);
            break;
        case 2:
            king.enemy(hedgehog3);
            king.enemy(hedgehog4);
            break;
        default:
            king.enemy(hedgehog1);
            king.enemy(hedgehog2);
    }
}

function generateEnemy(terrain) {
    switch (terrain) {
        case 1:
            hedgehog1.loop();
            hedgehog2.loop();
            break;
        case 2:
            hedgehog3.loop();
            hedgehog4.loop();
            break;
        default:
            hedgehog1.loop();
            hedgehog2.loop();
    }
}
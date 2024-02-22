controller = {

    left: false,
    right: false,
    up: false,
    upfalse: false,
    keyListener: function (event) {

        var key_down = (event.type == "keydown") ? true : false;

        var key_up = (event.type == "keyup") ? true : false;

        switch (event.keyCode) {

            case 37: // left key
                controller.left = key_down;
                break;
            case 38: // up key
                controller.up = key_down;
                break;
            case 39: // right key
                controller.right = key_down;
                break;

        }

        switch (event.keyCode) {
            case 38: // up key
                controller.upfalse = key_up;
                break;
        }
    }

};

class King {
    constructor(iInit, jInit) {
        this.height = cellSize;
        this.jumping = true;
        this.width = cellSize;
        this.iInit = iInit * cellSize;
        this.jInit = jInit * cellSize;
        this.x = this.iInit;
        this.y = this.jInit;
        this.y_velocity = 0;
        this.x_velocity = 0;
        this.keypress = false;
        this.count = 0;
        this.gameState = "play";
    }

    create() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        terrain.maps();
        generateCoin(terrain.map);
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move() {
        if (this.keypress == false && controller.up && this.jumping == false) {
            this.y_velocity -= cellSize;
            this.jumping = true;
            this.keypress = true;
            this.count = 0;
        }

        if (controller.upfalse) {
            this.keypress = false;
        }

        if (controller.left) {
            this.x_velocity -= 0.8;
        }

        if (controller.right) {
            this.x_velocity += 0.8;
        }

        this.y_velocity += 1.5; // gravity
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.x_velocity *= 0.9; // friction
        this.y_velocity *= 0.9; // friction
    }

    collision() {
        // if this is falling below floor line
        if (this.y > canvas.height) {
            this.die();
        }

        for (let i = 0; i < terrain.coordTab.length; i++) {
            if ((Math.round(this.x / cellSize + 0.5) === terrain.coordTab[i][0] + 1) && (Math.round(this.y / cellSize) === terrain.coordTab[i][1])) {
                this.x = (terrain.coordTab[i][0] + 1) * cellSize;
            }
            if ((Math.round(this.x / cellSize - 0.5) === terrain.coordTab[i][0] - 1) && (Math.round(this.y / cellSize) === terrain.coordTab[i][1])) {
                this.x = (terrain.coordTab[i][0] - 1) * cellSize;
            }
            if ((Math.round(this.y / cellSize) === terrain.coordTab[i][1] + 1) && ((Math.round(this.x / cellSize + 0.25) === terrain.coordTab[i][0]) || (Math.round(this.x / cellSize - 0.25) === terrain.coordTab[i][0]))) {
                this.y = (terrain.coordTab[i][1] + 1) * cellSize;
                this.count++;
                if (this.count > 1) {
                    this.y_velocity += cellSize / 20;
                } else {
                    this.y_velocity = 0;
                }
                // this.y_velocity += 20;
                // this.jumping = false;
            }
            if ((Math.round(this.y / cellSize - 0.5) === terrain.coordTab[i][1] - 1) && ((Math.round(this.x / cellSize + 0.25) === terrain.coordTab[i][0]) || (Math.round(this.x / cellSize - 0.25) === terrain.coordTab[i][0]))) {
                this.jumping = false;
                this.y = (terrain.coordTab[i][1] - 1) * cellSize;
                this.y_velocity = 0;
            }
        }

        // if rectangle is going off the left of the screen
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x >= canvas.width - cellSize) { // if rectangle goes past right boundary
            this.x = canvas.width - cellSize;
        }
    }

    door() {
        switch (terrain.map) {
            case 1:
                if (coin.keyOn === true) {
                    this.doorOpen();
                }
                break;
            default:
                if (coin.keyOn === true) {
                    this.doorOpen();
                }
        }
    }

    doorOpen() {
        for (let i = 0; i < terrain.coordDoor.length; i++) {
            if (this.x / cellSize + 1 >= terrain.coordDoor[i][0] && this.x / cellSize <= terrain.coordDoor[i][0] + 1 && this.y / cellSize + 1 >= terrain.coordDoor[i][1] && this.y / cellSize <= terrain.coordDoor[i][1] + 1) {
                if (this.gameState == "play") {
                    terrain.map++;
                    // this.x = this.iInit;
                    // this.y = this.jInit;
                    this.y_velocity = 0;
                    this.x_velocity = 0;
                    this.create();
                }
            }
        }

    }

    enemy(el) {
        if (this.x + this.width >= el.x && this.x <= el.x + el.width && this.y + this.height >= el.y && this.y <= el.y + el.height) {
            this.die();
        }
    }

    coin(el) {
        if (this.x + this.width >= el.x && this.x <= el.x + el.width && this.y + this.height >= el.y && this.y <= el.y + el.height) {
            el.delete();
            console.log(coinCount);
        }
    }

    movingplat(el) {
        if (this.x + this.width >= el.x && this.x <= el.x + el.width && this.y + this.height >= el.y && this.y <= el.y + el.height) {
            if (this.y_velocity < 0) {
                this.y_velocity = 0;
                this.y = el.y + cellSize;
            } else {
                if (this.keypress == false && controller.up) {
                    this.y_velocity -= cellSize;
                    this.jumping = true;
                    this.keypress = true;
                    this.count = 0;
                } else {
                    this.y_velocity = 0;
                }
                this.y = el.y - cellSize;
            }
        }
    }

    die() {
        var gameover = document.getElementById("game_over");
        gameover.style.width = canvasWidth + "px";
        gameover.style.height = canvasHeight + "px";
        // gameover.style.visibility = "visible";
        this.gameState = "stop";
        gameover.classList.add("divVisible");
        let menu = document.getElementById("menu");
        menu.style.display = "none";


        this.x = this.iInit;
        this.y = this.jInit;

        var retry = document.getElementById("retry");
        retry.addEventListener("click", function () {
            // gameover.style.opacity = "hidden";
            gameover.classList.remove("divVisible");
            document.location.reload();
        })
    }

    loop() {
        if (this.gameState == "play") {
            this.move();
        }
        generateEnemyInKing(terrain.map);
        generateCoinInKing(terrain.map);
        this.collision();
        this.door();
        this.create();
        terrain.createBackground();
    }
}

// let king = new King(0, 5);

let king = new King(2, 5);

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

function startRAF() {
    king.loop();
    generatePlat(terrain)
    generateEnemy(terrain.map);
    animationTimer = requestAnimationFrame(startRAF);
}

window.requestAnimationFrame(startRAF);
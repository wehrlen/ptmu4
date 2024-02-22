let coinCount = 0;

class Coin {
    constructor(iInit, jInit, key) {
        this.height = 20;
        this.width = 20;
        this.x = iInit * cellSize;
        this.y = jInit * cellSize;
        this.state = true;
        this.count = 0;
        this.coinstate = false;
        this.key = key;
        this.keyOn = false;
    }

    create() {
        if (this.state === true) {
            if (this.key === true) {
                this.coinstate = true;
                ctx.fillStyle = "blue";
            } else {
                ctx.fillStyle = "yellow";
            }
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();
        }
    }

    delete() {
        if (this.coinstate === false && this.key === false) {
            this.coinstate = true;
            coinCount++;
        }
        if (this.key === true) {
            this.keyOn = true;
        }
        console.log(coinCount);
        this.state = false;
        createCoinCount()
    }
}

// let coin = new Coin(3, 15, false);
let coin = new Coin(3, 15, true);
let coin2 = new Coin(14, 5, false);


function generateCoinInKing(terrain) {
    switch (terrain) {
        case 1:
            king.coin(coin);
            break;
        case 2:
            king.coin(coin2);
            break;
        default:
            king.coin(coin);
    }
}

function generateCoin(terrain) {
    switch (terrain) {
        case 1:
            coin.create();
            break;
        case 2:
            coin2.create();
            break;
        default:
            coin.create();
    }
}
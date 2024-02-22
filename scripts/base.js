let canvasHeight = window.innerHeight - 200;
let canvasWidth = window.innerHeight - 200;
let cellSize = (canvasWidth / 40 * 2);

class Canvas {
    constructor(iVal, jVal) {
        this.i = iVal;
        this.j = jVal;
    }

    createCanvas() {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        let gameover = document.createElement("div");

        let menu = document.createElement("div");
        menu.setAttribute("id", "menu");
        menu.innerHTML = '<h1>KING CAT</h1><a id=jouer class="btn effect04" data-sm-link-text="CLICK" ><span>Jouer</span></span></a>';
        menu.classList.add("menu");
        menu.style.width = canvasWidth + "px";
        menu.style.height = canvasHeight + "px";

        gameover.setAttribute("id", "game_over");
        gameover.innerHTML = '<h1>GAME OVER</h1><a id=retry class="btn effect04" data-sm-link-text="CLICK" ><span>retry</span></span></a>';
        gameover.classList.add("game_over");

        canvas.width = this.i;
        canvas.height = this.j;


        document.body.appendChild(menu);
        document.body.appendChild(gameover);
        document.body.appendChild(canvas);


        let jouer = document.getElementById("jouer");
        jouer.addEventListener("click", function () {
            // gameover.style.opacity = "hidden";
            console.log("oui");
            menu.classList.add("divInvisible");

        })

        return [ctx, canvas];
    }

}


let canvas1 = new Canvas(canvasWidth, canvasHeight);
let [ctx, canvas] = canvas1.createCanvas();
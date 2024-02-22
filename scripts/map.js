class Map {
    constructor() {
        this.cellSize = cellSize;
        this.y = 0;
        this.x = 0;
        this.tableau = [];
        this.coordTab = [];
        this.coordDoor = [];
        this.map = 1;
    }


    createMap() {
        this.coordTab = [];
        this.coordDoor = [];
        //console.log(this.tableau);

        for (let i = 0; i < this.tableau.terrain.length; i++) {
            for (let j = 0; j < this.tableau.terrain[i].length; j++) {
                // this.generateDoor(2, i, j);

                this.generateDoor(4, i, j);
                this.generateDoor(5, i, j);
                this.generateDoor(6, i, j);
                this.generateDoor(7, i, j);
                this.generateDoor(8, i, j);
                this.generateDoor(9, i, j);

                this.generateImg(17, i, j);
                this.generateImg(18, i, j);
                this.generateImg(19, i, j);
                this.generateImg(20, i, j);
                this.generateImg(21, i, j);
                this.generateImg(22, i, j);
                this.generateImg(23, i, j);
                this.generateImg(24, i, j);
                this.generateImg(25, i, j);
                this.generateImg(26, i, j);
                this.generateImg(27, i, j);
                this.generateImg(28, i, j);
                this.generateImg(29, i, j);

                this.x++;
            }
            this.x = 0;
            this.y++;
        }
        this.x = 0;
        this.y = 0;
        //console.log(this.coordTab);
    }


    maps() {
        // Création de l'objet XmlHttpRequest
        var xhr = getXMLHttpRequest();

        // Chargement du fichier
        xhr.open("GET", 'data/map' + this.map + '.json', false);
        xhr.send(null);
        if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
            throw new Error("Impossible de charger la carte nommée \"" + this.map + "\" (code HTTP : " + xhr.status + ").");

        else {
            var mapJsonData = xhr.responseText;
        }


        // Analyse des données
        var mapData = JSON.parse(mapJsonData);
        // console.log(mapData);
        this.tableau = mapData;
        // console.log(this.tableau);

        this.createMap();
    }

    generateImg(nbImg, i, j) {
        if (this.tableau.terrain[i][j] === nbImg) {
            var img = new Image(cellSize, cellSize);
            img.src = '/assets/' + nbImg + '.png';

            ctx.drawImage(img, this.x * cellSize, this.y * cellSize, this.cellSize, this.cellSize);
            this.coordTab.push([this.x, this.y]);


        }
    }

    generateDoor(nbImg, i, j) {
        if (this.tableau.terrain[i][j] === nbImg) {
            var img = new Image(cellSize, cellSize);
            img.src = '/assets/' + nbImg + '.png';

            ctx.drawImage(img, this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);
            this.coordDoor.push([this.x, this.y]);


        }
    }


    createBackground() {
        switch (this.map) {
            case 1:
                canvas.style.backgroundImage = "url('/assets/BG1.png')";
                break;
            case 2:
                canvas.style.backgroundImage = "url('/assets/BG2.png')";
                break;
            case 3:
                canvas.style.backgroundImage = "url('/assets/BG2.png')";
                break;
            case 4:
                canvas.style.backgroundImage = "url('/assets/BG3.png')";
                break;

            case 5:
                canvas.style.backgroundImage = "url('/assets/BG3.png')";
                break;

            case 6:
                canvas.style.backgroundImage = "url('/assets/BG4.png')";
                break;

            default:
                canvas.style.backgroundImage = "url('/assets/BG1.png')";
        }
    }

}

function getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}

let terrain = new Map();

terrain.maps();
/* Create and initialize 2D array */
function array2D(width, height) {
    let arr = [];

    // creating two dimensional array
    for (let i = 0; i < width; i++) {
        arr[i] = [];
    }

    // inserting elements to array
    for (let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
            arr[i][j] = undefined;
        }
    }

    return arr;
}

/* Visible board state */
class Board {
    constructor() {
        /* Board configuration */
        this.width     = undefined;
        this.height    = undefined;
        this.dbName    = undefined;
        this.fragments = [[undefined]];

        /* Word database (set) */
        this.wordSet   = undefined;

        /* Word */
        this.word = "";

        /* Cell statuses */
        this.status = [[undefined]];

        /* Pressed keys */
        this.pressed = [[undefined]];
    }

    keyIsEnabled(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.status == undefined) {
            return false;
        }

        if (this.status[x][y] == undefined) {
            return false;
        }

        return this.status[x][y];
    }

    keyEnable(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.status == undefined) {
            return false;
        }
        this.status[x][y] = true;
    }

    keyDisable(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.status == undefined) {
            return false;
        }
        this.status[x][y] = false;
    }

    keyPressed(X, Y) {
        /* Check path legality */
        if (this.keyIsEnabled(X, Y) == true) {
            return;
        }

        if (this.word.length < 20) {
            this.word = this.word + this.fragments[X][Y];
        }
    }

    solved() {
        return false;
    }

    wordClear() {
        this.word = "";
    }

    wordEnter() {
        /* Check word legality */
        if (this.wordSet.has(this.word) == false) {
        }

        this.word = "";
    }

    wordExists() {
        return true;
    }

    /* Initialize game */
    async init(info) {
        /* Parse board configuration (verborum) */
        const infoStr    = info.replaceAll('"', '');
        let boardInfo    = infoStr.split('>')[1];

        /* Handle double dash (--) (some language has words like "sub-divide") */
        boardInfo        = boardInfo.replaceAll('--', '*-');
        boardInfo        = boardInfo.replaceAll('-', ',');
        boardInfo        = boardInfo.replaceAll('*', '-');

        let infoValues   = boardInfo.split(',');

        this.width      = parseInt(infoValues[0].substr(0,1));
        this.height     = parseInt(infoValues[0].substr(2,1));
        this.dbName     = infoValues[1];

        this.fragments  = array2D(this.width, this.height);
        this.status      = array2D(this.width, this.height);
        this.pressed    = array2D(this.width, this.height);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.fragments[x][y] = infoValues[2 + y * this.width + x];
                this.status[x][y]    = false;
                this.pressed[x][y]   = false;
            }
        }

        /* Set title */
        const language = this.dbName.slice(0, 3);
        if (language == "FIN") {
            elements.instructions.innerHTML = "Etsi jokaiselle riville ja sarakkeelle sana, joka käyttää vähintään kerran kaikkia sen rivin/sarakkeen ruutuja.";
        }
        if (language =="SWE") {
            elements.instructions.innerHTML = "Bilda svenska ord i grundform genom att förena orddelar med varandra vågrätt och/eller lodrätt. "
            + "Varje stavelse ska användas exakt en gång.";
        }

        /* Read word database to set structure */
        this.wordSet = await dbReadFile("data/words_" + this.dbName + ".csv", language);
    }
}

/* Game state */
class Game {
    constructor() {
        /* Game board */
        this.board = new Board();

        /* Game level */
        this.level = 0;
    }

    init(level, info) {
        /* Initialize board */
        this.board.init(info);

        /* Set level */
        this.level = level;
    }
}




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

        /* Status */
        this.status = "";

        /* Word */
        this.word = "";

        /* Pressed keys */
        this.pressedRow = [undefined];
        this.pressedCol = [undefined];

        /* Solved lines */
        this.solvedRow = [undefined];
        this.solvedCol = [undefined];
    }

    keyIsEnabled(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }

        var rowCount = 0;
        for (let row = 0; row < this.pressedRow.length; row++) {
            if (this.pressedRow[row] == true || y == row) {
                rowCount++;
            }
        }
        var colCount = 0;
        for (let col = 0; col < this.pressedCol.length; col++) {
            if (this.pressedCol[col] == true || x == col) {
                colCount++;
            }
        }

        if (rowCount > 1 && colCount > 1) {
            // Not possible
            return false;
        }

        return true;
    }


    keyPressed(X, Y) {
        /* Check path legality */
        if (this.keyIsEnabled(X, Y) == false) {
            return;
        }

        if (this.word.length > 20) {
            return;
        }

        this.word = this.word + this.fragments[X][Y];

        this.pressedRow[Y] = true;
        this.pressedCol[X] = true;
    }

    solved() {
        return false;
    }

    wordClear() {
        this.word = "";
        this.pressedRow.fill(false);
        this.pressedCol.fill(false);
    }

    statusClear() {
        this.status = "";
    }


    wordEnter() {
        /* Check word using all fragments */
        var rowCount = 0;
        for (let row = 0; row < this.pressedRow.length; row++) {
            if (this.pressedRow[row] == true) {
                rowCount++;
            }
        }
        var colCount = 0;
        for (let col = 0; col < this.pressedCol.length; col++) {
            if (this.pressedCol[col] == true) {
                colCount++;
            }
        }

        if (rowCount != this.pressedRow.length && colCount != this.pressedCol.length) {
            this.status = "USE ALL TILES IN A ROW/COL";
            this.wordClear();
            return;
        }

        /* Check word in DB */
        var upperWord = this.word.toUpperCase();
        if (this.wordSet.has(upperWord) == false) {
            this.status = "WORD NOT FOUND";
            this.wordClear();
            return;
        }

        this.statusClear();
        this.wordClear();
    }

    wordLength() {
        return this.word.length;
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
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.fragments[x][y] = infoValues[2 + y * this.width + x];
            }
        }

        this.pressedRow = Array(this.height);
        this.pressedCol = Array(this.width);
        this.pressedRow.fill(false);
        this.pressedCol.fill(false);

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




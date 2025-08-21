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

        if (this.word.length + this.fragments[X][Y].length > 20) {
            return;
        }

        this.word = this.word + this.fragments[X][Y];

        this.pressedRow[Y] = true;
        this.pressedCol[X] = true;
    }

    solved() {
        /* Check solved lines */
        for (let row = 0; row < this.solvedRow.length; row++) {
            if (this.solvedRow[row] != true) {
                return false;
            }
        }
        for (let col = 0; col < this.solvedCol.length; col++) {
            if (this.solvedCol[col] != true) {
                return false;
            }
        }

        return true;
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
        /* Check that all tiles are used */
        var rowCount = 0;
        var rowIndex = 0;
        for (let row = 0; row < this.pressedRow.length; row++) {
            if (this.pressedRow[row] == true) {
                rowCount++;
                rowIndex = row;
            }
        }
        var colCount = 0;
        var colIndex = 0;
        for (let col = 0; col < this.pressedCol.length; col++) {
            if (this.pressedCol[col] == true) {
                colCount++;
                colIndex = col;
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

        /* Save progress */
        if (colCount == 1) {
            this.solvedCol[colIndex] = true;
        }
        if (rowCount == 1) {
            this.solvedRow[rowIndex] = true;
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

        /* Split info into fields */
        let fields = boardInfo.split(':');

        /* Database name */
        this.dbName = fields[0];


        /* Word count */
        this.height = parseInt(fields[1]);

        /* Max fragments */
        this.width = 6;

        /* Go through fragment fields */
        this.fragments = array2D(this.width, this.height);
    this.fragments[1][1] = "11";
    this.fragments[0][0] = "00";
        let wordId = 0;
        for (let field = 2; field < fields.length; field += 2) {
            let fragments = fields[field].split('.');

            console.log(fragments);
            console.log(fields[field]);
            console.log(fields[field + 1]);

            wordId++;
        }

        /* Initialize progress variables */
        this.status = "";
        this.word = "";

        this.pressedRow = Array(this.height);
        this.pressedCol = Array(this.width);
        this.pressedRow.fill(false);
        this.pressedCol.fill(false);

        this.solvedRow = Array(this.height);
        this.solvedCol = Array(this.width);
        this.solvedRow.fill(false);
        this.solvedCol.fill(false);

        /* Show instructions */
        const language = this.dbName.slice(0, 3);
        if (language == "FIN") {
            elements.instructions.innerHTML = "Etsi jokaiselle riville ja sarakkeelle sana, joka käyttää vähintään kerran kaikkia sen rivin/sarakkeen ruutuja.";
        }
        if (language == "ENG") {
            elements.instructions.innerHTML = "Find a word for each row and column so that all word tiles on that row/column are used at least once.";
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




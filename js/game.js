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

        /* Status and text */
        this.wordStatus = "";
        this.wordText   = "";

        /* Pressed keys */
        this.rowPressed = [undefined];
        this.colPressed = [undefined];

        /* Row progress */
        this.rowSolution = [undefined];
        this.rowSolved   = [undefined];
    }

    keyIsEnabled(x, y) {
        /* Check board boundaries */
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }

        /* Check if already solved */
        if (this.rowSolved[y] == true) {
            return false;
        }

        /* Check fragment content */
        if (this.fragments[x][y] == undefined) {
            return false;
        }

        /* Check that only one row used */
        var rowCount = 0;
        for (let row = 0; row < this.rowPressed.length; row++) {
            if (this.rowPressed[row] == true || y == row) {
                rowCount++;
            }
        }
        if (rowCount > 1) {
            return false;
        }

        return true;
    }


    keyPressed(X, Y) {
        /* Check path legality */
        if (this.keyIsEnabled(X, Y) == false) {
            return;
        }

        if (this.wordText.length + this.fragments[X][Y].length > 20) {
            return;
        }

        this.wordText = this.wordText + this.fragments[X][Y];

        this.rowPressed[Y] = true;
        this.colPressed[X] = true;
    }

    solved() {
        /* Check solved lines */
        for (let row = 0; row < this.rowSolved.length; row++) {
            if (this.rowSolved[row] != true) {
                return false;
            }
        }

        return true;
    }

    wordClear() {
        this.wordText = "";
        this.rowPressed.fill(false);
        this.colPressed.fill(false);
    }

    statusClear() {
        this.wordStatus = "";
    }


    wordEnter() {
        /* Check that all tiles are used */
        var rowIndex = 0;
        for (let row = 0; row < this.rowPressed.length; row++) {
            if (this.rowPressed[row] == true) {
                rowIndex = row;
            }
        }

        var colCount = 0;
        for (let col = 0; col < this.colPressed.length; col++) {
            if (this.colPressed[col] == false && this.fragments[col][rowIndex] != undefined) {
                this.wordStatus = "USE ALL TILES IN A ROW/COL";
                this.wordClear();
                return;
            }
        }

        /* Check if solutions */
        if (this.wordText == this.rowSolution[rowIndex]) {
            /* Mark row solved */
            this.rowSolved[rowIndex] = true;

            this.statusClear();
            this.wordClear();
            return;
        }

        /* Check word in DB */
        var upperWord = this.wordText.toUpperCase();
        if (this.wordSet.has(upperWord) == false) {
            this.wordStatus = "WORD NOT FOUND";
            this.wordClear();
            return;
        } else {
            this.wordStatus = "WORD FOUND BUT NOT IN THEME";
            this.wordClear();
            return;
        }
    }

    getWordTextLength() {
        return this.wordText.length;
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
        /* Initialize board variables */
        this.fragments = array2D(this.width, this.height);
        this.wordStatus = "";
        this.wordText   = "";

        this.colPressed  = Array(this.width).fill(false);
        this.rowPressed  = Array(this.height).fill(false);
        this.rowSolved   = Array(this.height).fill(false);
        this.rowSolution = Array(this.height).fill(false);

        let row = 0;
        for (let field = 2; field < fields.length; field += 2) {
            /* Parse word fragments */
            let fragments = fields[field].split('.');
            for (let fragment = 0; fragment < fragments.length; fragment++) {
                this.fragments[fragment][row] = fragments[fragment];
            }

            /* Parse solution */
            this.rowSolution[row] = "";
            const sequenceStr = fields[field + 1];
            for (let i = 0; i < sequenceStr.length; i++) {
                const fragment = parseInt(sequenceStr[i]);
                this.rowSolution[row] += this.fragments[fragment][row]
            }

            row++;
        }

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




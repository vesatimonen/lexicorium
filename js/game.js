/* Create and initialize 2D array */
function array2D(width, height, value) {
    let arr = [];

    // creating two dimensional array
    for (let i = 0; i < width; i++) {
        arr[i] = [];
    }

    // inserting elements to array
    for (let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
            arr[i][j] = value;
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

        /* Paths */
        this.paths       = [];

        /* Cells status */
        this.cells = [[undefined]];
    }

    filledCount() {
        let count = 0;
        for (let i = 0; i < this.paths.length; i++) {
            count += this.paths[i].length;
        }

        return count;
    }

    getCellStatus(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.cells == undefined) {
            return false;
        }

        if (this.cells[x][y] == undefined) {
            return false;
        }

        return this.cells[x][y].status;
    }

    setCellStatus(x, y, status) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.cells == undefined) {
            return false;
        }
        this.cells[x][y] = {status: status};
    }

    getCellId(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return false;
        }
        if (this.cells == undefined) {
            return false;
        }

        if (this.cells[x][y] == undefined) {
            return false;
        }

        /* Go through paths and find cell id */
        const paths = this.paths;
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            for (let j = 0; j < path.length; j++) {
                if (path[j].X == x && path[j].Y == y) {
                    return i;
                }
            }
        }

        return -1; /* Not found */
    }

    solved() {
        if (this.filledCount() == this.width * this.height) {
            return true;
        }

        return false;
    }

    /* Initialize game */
    async init(info) {
        /* Parse board configuration (verborum) */
        const infoStr    = info.replaceAll('"', '');
        let boardInfo    = infoStr.split('>')[1];

        /* Handle double dash (--) */
        boardInfo        = boardInfo.replaceAll('--', '*-');
        boardInfo        = boardInfo.replaceAll('-', ',');
        boardInfo        = boardInfo.replaceAll('*', '-');

        let infoValues   = boardInfo.split(',');

        this.width      = parseInt(infoValues[0].substr(0,1));
        this.height     = parseInt(infoValues[0].substr(2,1));
        this.dbName     = infoValues[1];

        this.paths       = [];

        this.fragments  = array2D(this.width, this.height, 0);
        this.cells   = array2D(this.width, this.height, 0);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.fragments[x][y] = infoValues[2 + y * this.width + x];
                this.cells[x][y]     = {status: false};
            }
        }

        /* Set title */
        const language = this.dbName.slice(0, 3);
        if (language == "FIN") {
//            elements.title.innerHTML        = "VERBORIUM-FIN";
            elements.instructions.innerHTML = "Muodosta perusmuodossa olevia suomen kielen sanoja yhdistämällä sanafragmentit toisiinsa. "
            + "Yhdistäminen on sallittu vain pysty- ja vaakasuunnassa. Jokainen solu on käytettävä täsmälleen kerran. ";
        }
        if (language =="SWE") {
//            elements.title.innerHTML        = "VERBORIUM-SWE";
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

        /* Game move history */
        this.moves = [];

        /* Game level */
        this.level = 0;
    }

    init(level, info) {
        /* Initialize board */
        this.board.init(info);

        /* Clear moves history */
        this.moves = [];

        /* Set level */
        this.level = level;
    }

    addPath(wordPath, track) {
        /* Check path legality */
        let word = "";
        for (let i = 0; i < wordPath.length; i++) {
            const X = wordPath[i].X;
            const Y = wordPath[i].Y;

            if (this.board.getCellStatus(X, Y) == true) {
                return;
            }

            word = word + this.board.fragments[X][Y];
        }
        word = word.toUpperCase();

        /* Check word legality */
        if (this.board.wordSet.has(word) == false) {
            return;
        }

        /* Make move */
        this.board.paths.push(wordPath);
        for (let i = 0; i < wordPath.length; i++) {
            const X = wordPath[i].X;
            const Y = wordPath[i].Y;
            this.board.setCellStatus(X, Y, true);
        }

        /* Add to history */
        if (track == true) {
            this.moves.push({command: "add", path: wordPath});
        }
    }

    removePath(X, Y, track) {
        const id = this.board.getCellId(X, Y);
        if (id >= 0) {
            /* Remove path */
            const path = this.board.paths[id];

            /* Add to removed path to history */
            if (track == true)  {
                this.moves.push({command: "remove", path: path});
            }

            for (let i = 0; i < path.length; i++) {
                this.board.setCellStatus(path[i].X, path[i].Y, false);
            }

            /* Remove path from paths array */
            this.board.paths.splice(id, 1);
        }
    }

    undoMove() {
        if (this.moves.length == 0) {
            return false;
        }

        /* Undo move */
        const move = this.moves.pop();
        switch (move.command) {
            case "add":
                this.removePath(move.path[0].X, move.path[0].Y, false);
                break;
            case "remove":
                this.addPath(move.path, false);
                break;
        }

        return true;
    }

    undoable() {
        if (this.moves.length == 0) {
            return false;
        }
        return true;
    }
}





// Get these from CSS
const usedColor       = "#67BFEC";

const tileRatio   = 0.90;

/*****************************************************************************
 * Calculate board cell size
 *****************************************************************************/
function uiBoardCellSize() {
    return Math.floor(elements.screen.clientWidth / globals.boardMaxSize);
}


/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/
function uiButtonsRedraw(board) {
    if (board.getWordText().length > 0) {
        elements.buttonEnter.disabled = false;
        elements.buttonClear.disabled = false;
    } else {
//    elements.buttonClear.style.height = "50px";
        elements.buttonEnter.disabled = true;
        elements.buttonClear.disabled = true;
    }
}

/*****************************************************************************
 * Redraw level element
 *****************************************************************************/
function uiInfoRedraw(game) {
    elements.gameInfo.innerHTML = "L" + (game.level + 1) + "/" + options.challenges.length;
}

/*****************************************************************************
 * Redraw status
 *****************************************************************************/
function uiStatusRedraw(board) {
    elements.wordStatus.innerHTML = board.getWordStatus();
}

/*****************************************************************************
 * Redraw word
 *****************************************************************************/
function uiWordRedraw(board) {
    elements.wordInfo.innerHTML = board.getWordText();
}

/*****************************************************************************
 * Redraw board
 *****************************************************************************/
function uiBoardRedraw(board) {
    const boardContext = elements.canvas.getContext('2d');

    /* Get board cell size */
    const cellSize = uiBoardCellSize();

    /* Board size */
    const boardWidth  = globals.boardMargin + cellSize * board.width  + globals.boardMargin;
    const boardHeight = globals.boardMargin + cellSize * board.height + globals.boardMargin;

    /* Center the board */
    elements.board.style.width  = boardWidth  + "px";
    elements.board.style.height = boardHeight + "px";
    elements.board.style.left   = elements.screen.clientWidth / 2
                                - (globals.boardMargin + cellSize * (board.width / 2))
                                + "px";

    /* Set canvas size and clear it */
    const pixelRatio = 2.0;
    elements.canvas.width  = boardWidth  * pixelRatio;
    elements.canvas.height = boardHeight * pixelRatio;
    boardContext.scale(pixelRatio, pixelRatio);
    boardContext.clearRect(0, 0, elements.canvas.width, elements.canvas.height);

    /* Define board elements sizes */
    const textRatio   = 0.42;
    const tileSize    = tileRatio * cellSize;
    const borderWidth = 2.0;
    const enabledColor  = "#202020";
    const disabledColor = "#20202080";
    const solvedColor   = "#20202020";

    /* Redraw cell content */
    for (y = 0; y < board.height; y++) {
        for (x = 0; x < board.width; x++) {
            if (board.fragments[x][y] == undefined) {
                continue;
            }

            const startX  = globals.boardMargin + cellSize * x;
            const startY  = globals.boardMargin + cellSize * y;
            const middleX = startX + cellSize / 2;
            const middleY = startY + cellSize / 2;

            /* Define color */
            var color = enabledColor;
            if (board.keyIsEnabled(x, y) == false) {
                color = disabledColor;
            }
            if (board.rowSolved[y] == true) {
                color = solvedColor;
            }

            /* Cell borders */
            boardContext.beginPath();
            const boxMargin = (cellSize - tileSize) / 2.0;
//            const boxMargin = 0;
            boardContext.roundRect(startX + boxMargin, startY + boxMargin,
                                   cellSize - 2 * boxMargin, cellSize - 2 * boxMargin,
                                   10);

            if (globals.uiKeyPressed != undefined) {
                if (x == globals.uiKeyPressed.X && y == globals.uiKeyPressed.Y) {
                    boardContext.fillStyle = usedColor;
                    boardContext.fill();
                }
            }

            boardContext.strokeStyle = color;
            boardContext.lineWidth   = borderWidth;
            boardContext.lineCap     = "round";
            boardContext.stroke();

            /* Cell content */
            const fontWeight = "bold";
            const fontStyle  = "normal";
            const fontSize   = (cellSize * textRatio) + "px";
            const fontFamily = "Courier New";

            boardContext.font         = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`;
            boardContext.textBaseline = "middle";
            boardContext.textAlign    = "center";
            boardContext.fillStyle    = color;
            boardContext.fillText(board.fragments[x][y], middleX, middleY);
        }
    }

    /* Show solution for solved rows */
    for (let row = 0; row < board.height; row++) {
        if (board.rowSolved[row] == true) {
            const middleX = globals.boardMargin + board.width * cellSize / 2;
            const middleY = globals.boardMargin + cellSize * row + cellSize / 2;

            const fontWeight = "bold";
            const fontStyle  = "normal";
            const fontSize   = (cellSize * textRatio) + "px";
            const fontFamily = "Courier New";

            boardContext.font         = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`;
            boardContext.textBaseline = "middle";
            boardContext.textAlign    = "center";
            boardContext.fillStyle    = enabledColor;

            boardContext.fillText(board.rowSolution[row], middleX, middleY);
        }
    }
}


function restartCursorAnimation() {
    const cursor = document.querySelector('.cursor');
    cursor.style.animation = 'none';           // temporarily disable
    cursor.offsetHeight;                       // force reflow (important!)
    cursor.style.animation = '';               // restore to CSS value
}


/*****************************************************************************
 * Redraw UI
 *****************************************************************************/
function uiRedraw() {
    /* Redraw board elements */
    uiStatusRedraw(globals.game.board);
    uiWordRedraw(globals.game.board);
    uiBoardRedraw(globals.game.board);
    uiInfoRedraw(globals.game);
    uiButtonsRedraw(globals.game.board);

    restartCursorAnimation();
}



/*****************************************************************************
 * Refresh board elements and check if game over
 *****************************************************************************/
function uiAnimationEnd(event) {
    event.stopPropagation();

    if (globals.game.level + 1 >= options.challenges.length) {
        /* Show game over modal */
        elements.gameOver.style.visibility = "visible";
        elements.board.style.visibility = "hidden";
    }

    gameStart(globals.game.level + 1); /* Start new level */

    return false;
}





//document.getElementById("debug-text").innerHTML = window.innerWidth;


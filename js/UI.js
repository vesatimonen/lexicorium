
// Get these from CSS
const usedColor       = "#67BFEC";
const backgroundColor = "#B0DDFF";



/*****************************************************************************
 * Calculate board cell size
 *****************************************************************************/
function uiBoardCellSize() {
    return Math.floor(elements.screen.clientWidth / globals.boardMaxSize);
}


/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/
function uiButtonsRedraw(game) {
    if (game.undoable()) {
        elements.buttonUndo.disabled    = false;
        elements.buttonRestart.disabled = false;
    } else {
        elements.buttonUndo.disabled    = true;
        elements.buttonRestart.disabled = true;
    }
}

/*****************************************************************************
 * Redraw level elements
 *****************************************************************************/
function uiInfoRedraw(game) {
    let gameInfo = document.getElementById("game-info");
    gameInfo.innerHTML = "L" + (game.level + 1) + "/" + options.challenges.length;
}

/*****************************************************************************
 * Redraw board
 *****************************************************************************/
function uiBoardRedraw(board) {
    const boardContext = elements.canvas.getContext('2d');

    /* Get board cell size */
    const cellSize = uiBoardCellSize();

    /* Center the board */
    elements.board.style.width  = cellSize * board.width + "px";
    elements.board.style.height = cellSize * board.height + "px";
    elements.board.style.left   = elements.screen.clientWidth / 2
                                - cellSize * (board.width / 2)
                                + "px";

    /* Set canvas size and clear it */
    const pixelRatio = 2.0;
    elements.canvas.width  = cellSize * board.width * pixelRatio;
    elements.canvas.height = cellSize * board.height * pixelRatio;
    boardContext.scale(pixelRatio, pixelRatio);
    boardContext.clearRect(0, 0, elements.canvas.width, elements.canvas.height);

    /* Define board elements sizes */
    const textRatio   = 0.42;
    const circleRatio = 0.90;
    const borderWidth = 0.5;
    const borderColor = "#202020";

    /* Redraw cell content */
    for (y = 0; y < board.height; y++) {
        for (x = 0; x < board.width; x++) {
            const middleX = cellSize * x + cellSize / 2;
            const middleY = cellSize * y + cellSize / 2;
            const startX = cellSize * x;
            const startY = cellSize * y;

            /* Draw value circles */
            boardContext.beginPath();
            boardContext.arc(middleX, middleY, circleRatio * cellSize / 2, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
            if (board.getCellStatus(x, y)) {
                boardContext.fillStyle = usedColor;
                boardContext.fill();
            }
            boardContext.strokeStyle = borderColor;
            boardContext.lineWidth   = borderWidth;
            boardContext.lineCap     = "round";
            boardContext.stroke();

            /* Draw value inside a cell */
            const fontWeight = "bold";
            const fontStyle  = "normal";
            const fontSize   = (cellSize * textRatio) + "px";
            const fontFamily = "Courier New";

            boardContext.font         = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`;
            boardContext.textBaseline = "middle";
            boardContext.textAlign    = "center";
            boardContext.fillStyle    = borderColor;
            boardContext.fillText(board.fragments[x][y], middleX, middleY);
        }
    }
}

/*****************************************************************************
 * Redraw cursor path
 *****************************************************************************/
function lineAngle(x1, y1, x2, y2) {
    let angle = Math.atan2(y2 - y1, x2 - x1);

    /* Use only positive angles */
    while (angle < 0) {
        angle += Math.PI * 2;
    }

    return angle;
}

function uiPathRedraw(path) {
    const boardContext = elements.canvas.getContext('2d');

    if (path.length == 0) {
        return;
    }

    /* Path characteristics */
    const cellSize = uiBoardCellSize();
    const pathColor       = "#20202040";
    const pathLineWidth   = cellSize / 3;
    const pathStartRadius = 0.1;

    /* Draw circle */
    let X = cellSize * path[0].X + cellSize / 2;
    let Y = cellSize * path[0].Y + cellSize / 2;
    boardContext.beginPath();
    boardContext.arc(X, Y, pathStartRadius, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
    boardContext.strokeStyle = pathColor;
    boardContext.lineWidth   = pathLineWidth;
    boardContext.lineCap     = "round";
    boardContext.stroke();

    if (path.length <= 1) {
        return;
    }

    /* Draw path */
    boardContext.beginPath();
    boardContext.strokeStyle = pathColor;
    boardContext.lineWidth   = pathLineWidth;
    boardContext.lineCap     = "round";
    for (let i = 0; i < path.length; i++) {
        let X = cellSize * path[i].X + cellSize / 2;
        let Y = cellSize * path[i].Y + cellSize / 2;

        if (i == 0) {
            /* Start polyline */
            boardContext.moveTo(X, Y);
        } else {
            const Xmiddle = cellSize * path[i - 1].X + cellSize / 2;
            const Ymiddle = cellSize * path[i - 1].Y + cellSize / 2;

            if (i >= 2) {
                const Xlast = cellSize * path[i - 2].X + cellSize / 2;
                const Ylast = cellSize * path[i - 2].Y + cellSize / 2;

                /* Calculate the angle of the line segment */
                let angle1 = lineAngle(Xmiddle, Ymiddle, Xlast, Ylast);
                let angle2 = lineAngle(Xmiddle, Ymiddle, X, Y);

                /* Use acute angle side, so that average is calculated right */
                if (angle1 - angle2 > Math.PI) {
                    angle2 += Math.PI * 2;
                }
                if (angle2 - angle1 > Math.PI) {
                    angle1 += Math.PI * 2;
                }

                /* Check if angle, not straight */
                if (Math.abs(angle1 - angle2) != Math.PI) {
                    /* Calculate the position for the arc (corner of the polyline) */
                    const radius = cellSize / 3;

                    /* Circle center point distance from middle */
                    let angle_beta = 0;
                    if (angle1 > angle2) {
                        angle_beta = Math.abs(Math.PI + angle2 - angle1);
                    } else {
                        angle_beta = Math.abs(Math.PI + angle1 - angle2);
                    }
                    while (angle_beta > Math.PI) {
                        angle_beta -= Math.PI;
                    }
                    angle_beta /= 2;

                    const distance = Math.abs(radius / Math.cos(angle_beta));

                    /* Center point angle from middle */
                    const angle_gamma = (angle1 + angle2) / 2;

                    /* Draw round corner */
                    const cornerX = Xmiddle + distance * Math.cos(angle_gamma);
                    const cornerY = Ymiddle + distance * Math.sin(angle_gamma);
                    let counterClockwise = false;
                    let arcStart = 0;
                    let arcEnd = 0;
                    if (angle2 > angle1) {
                        counterClockwise = true;
                        arcStart         = angle1 - Math.PI / 2;
                        arcEnd           = angle2 + Math.PI / 2;
                    } else {
                        counterClockwise = false;
                        arcStart         = angle1 + Math.PI / 2;
                        arcEnd           = angle2 - Math.PI / 2;
                    }
                    boardContext.arc(cornerX, cornerY, radius, arcStart, arcEnd, counterClockwise);

if (false) {
console.log("radius: " + radius);
console.log("Xmiddle: " + Xmiddle);
console.log("Ymiddle: " + Ymiddle);
console.log("Xmiddle dx: " + distance * Math.cos(angle_gamma));
console.log("Ymiddle dy: " + distance * Math.sin(angle_gamma));
console.log("angle1: " + angle1 * 360 / (Math.PI * 2));
console.log("angle2: " + angle2 * 360 / (Math.PI * 2));
console.log("beta: " + angle_beta * 360 / (Math.PI * 2));
console.log("distance: " + distance);
console.log("gamma: " + angle_gamma * 360 / (Math.PI * 2));
}
                }
            }
        }
    }

    /* Close path with last */
    X = cellSize * path[path.length - 1].X + cellSize / 2;
    Y = cellSize * path[path.length - 1].Y + cellSize / 2;
    boardContext.lineTo(X, Y);

    boardContext.strokeStyle = pathColor;
    boardContext.lineWidth   = pathLineWidth;
    boardContext.lineCap     = "round";
    boardContext.stroke();
}


/*****************************************************************************
 * Redraw UI
 *****************************************************************************/
function uiRedraw() {
    /* Redraw board */
    uiBoardRedraw(globals.game.board);

    /* Redraw word paths */
    const paths = globals.game.board.paths;
    for (let i = 0; i < paths.length; i++) {
        uiPathRedraw(paths[i]);
    }

    /* Redraw cursor path */
    uiPathRedraw(globals.cursorPath);

    /* Redraw info */
    uiInfoRedraw(globals.game);

    /* Redraw buttons */
    uiButtonsRedraw(globals.game);

    /* Check if end of level */
    if (globals.game.board.solved()) {
        /* Start animation */
        elements.board.addEventListener("animationend", uiAnimationEnd);
        elements.board.style.animation = "none";
        elements.board.offsetHeight; /* trigger reflow */
        elements.board.style.animation = "image-appear 0.5s ease-in 0.2s 1 reverse";
    }
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


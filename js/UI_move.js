
/*****************************************************************************
 * Move helpers
 *****************************************************************************/
function uiEventPosition(event) {
    let X, Y;

    switch (event.type) {
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseleave":
            X = event.clientX;
            Y = event.clientY;
            break;
        case "touchstart":
        case "touchmove":
            /* Ignore if touched multiple fingers */
            if (event.targetTouches.length != 1) {
                return undefined;
            }

            X = event.targetTouches[0].clientX;
            Y = event.targetTouches[0].clientY;
            break;
        case "touchcancel":
        case "touchend":
            /* Ignore if touched multiple fingers */
            if (event.changedTouches.length != 1) {
                return undefined;
            }

            X = event.changedTouches[0].clientX;
            Y = event.changedTouches[0].clientY;

            break;
        default:
            return undefined;
    }

    const rect = elements.canvas.getBoundingClientRect();
    X -= rect.left;
    Y -= rect.top;

    const cellSize = uiBoardCellSize();
    X = Math.floor(X / cellSize);
    Y = Math.floor(Y / cellSize);

    return {X, Y};
}


/*****************************************************************************
 * Event handlers
 *****************************************************************************/
let mouseDownStatus   = false;

let cursorGridX = -1;
let cursorGridY = -1;


function uiMoveReset()
{
    /* Reset mouse status */
    mouseDownStatus   = false;

    /* Remove cursor from board */
    cursorGridX = -1;
    cursorGridY = -1;

    /* Clear path */
    globals.cursorPath = [];

    /* Redraw UI */
    uiRedraw();
}


function uiMoveHandler(event)
{
    /* Get cursor grid position */
    move = uiEventPosition(event);
    if (move == undefined) {
        return;
    }

    X = move.X;
    Y = move.Y;

    /* Check legality */
    if (X < 0 || Y < 0 || X >= globals.game.board.width || Y >= globals.game.board.height) {
        return;
    }

    /* Check if moved */
    if (X == cursorGridX && Y == cursorGridY) {
        /* Not moved */
        return;
    }

    /* Check if touches the previous one */
    if (globals.cursorPath.length > 0) {
        const prevPosition = globals.cursorPath[globals.cursorPath.length - 1];
        if (Math.abs(X - prevPosition.X) + Math.abs(Y - prevPosition.Y) != 1) {
            return;
        }
    }

    /* Check if backtrack */
    if (globals.cursorPath.length >= 2
     && globals.cursorPath[globals.cursorPath.length - 2].X == X
     && globals.cursorPath[globals.cursorPath.length - 2].Y == Y) {
        /* Remove two elements */
        globals.cursorPath.pop();
        globals.cursorPath.pop();
    }

    /* Check if collide with itself */
    for (let i = 0; i < globals.cursorPath.length; i++) {
        if (globals.cursorPath[i].X == X && globals.cursorPath[i].Y == Y) {
            return;
        }
    }

    /* Check if used */
    if (globals.game.board.getCellStatus(X, Y)) {
        return;
    }

    /* Add position to cursor path */
    globals.cursorPath.push({X, Y});

    /* Redraw UI */
    uiRedraw();

    /* Cursor moved in grid */
    cursorGridX = X;
    cursorGridY = Y;

    return;
}


function uiMouseDown(event) {
    event.preventDefault();

    /* Get event position */
    position = uiEventPosition(event);

    /* Check position legality */
    if (position == undefined) {
        mouseDownStatus = false;
    } else {

        /* Handle click */
        if (globals.game.board.getCellStatus(position.X, position.Y)) {
            /* Remove path */
            mouseDownStatus = false;
            globals.game.removePath(position.X, position.Y, true);
            uiRedraw();
        } else {
            mouseDownStatus = true;
            uiMoveHandler(event);
        }
    }

    return false;
}

function uiMouseUp(event) {
    event.preventDefault();

    if (mouseDownStatus == true) {
        const position = uiEventPosition(event);
        if (position != undefined) {
            /* Make move */
            globals.game.addPath(globals.cursorPath, true);
        }
    }

    uiMoveReset();

    return false;
}

function uiMouseMove(event) {
    event.preventDefault();

    if (mouseDownStatus == true) {
        uiMoveHandler(event);
    }

    return false;
}

function uiMouseLeave(event) {
    event.preventDefault();

    uiMoveReset();

    return false;
}


/*****************************************************************************
 * Register game board event handlers
 *****************************************************************************/
elements.board.addEventListener("mousedown",  uiMouseDown);
elements.board.addEventListener("mousemove",  uiMouseMove);
elements.board.addEventListener("mouseup",    uiMouseUp);
elements.board.addEventListener("mouseleave", uiMouseLeave);

elements.board.addEventListener("touchstart", uiMouseDown, {passive: true});
elements.board.addEventListener("touchmove",  uiMouseMove, {passive: true});
elements.board.addEventListener("touchend",   uiMouseUp);



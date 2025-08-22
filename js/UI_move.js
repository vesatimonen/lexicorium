
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
    X -= (rect.left + globals.boardMargin);
    Y -= (rect.top);

    const cellSize = uiBoardCellSize();
    X = Math.floor(X / cellSize);
    Y = Math.floor(Y / cellSize);

    return {X, Y};
}



/*****************************************************************************
 * Key handlers
 *****************************************************************************/
function uiKeyDown(board)
{
    /* Get event position */
    position = uiEventPosition(event);
    if (position == undefined) {
        return;
    }

    X = position.X;
    Y = position.Y;

    /* Check legality */
    if (X < 0 || Y < 0 || X >= globals.game.board.width || Y >= globals.game.board.height) {
        return;
    }

    /* Check position legality */
    if (board.keyIsEnabled(X, Y) == false) {
        return;
    }

    /* Set key pressed information */
    globals.uiKeyPressed = {X: X, Y: Y};

    board.keyPressed(X, Y);

    /* Redraw UI */
    uiRedraw();
}

function uiKeyUp(board)
{
    /* Clear key pressed information */
    globals.uiKeyPressed = undefined;

    /* Redraw UI */
    uiRedraw();
}



/*****************************************************************************
 * Event handlers
 *****************************************************************************/
function uiMouseDown(event) {
    event.preventDefault();
    if (globals.game.board.getWordStatus().length > 0) {
        globals.game.board.statusClear();
    } else {
        uiKeyDown(globals.game.board);
    }
    event.stopPropagation();
    return false;
}

function uiMouseUp(event) {
    event.preventDefault();
    uiKeyUp(globals.game.board);
    return false;
}

function uiMouseLeave(event) {
    event.preventDefault();
    uiKeyUp(globals.game.board);
    return false;
}

function uiScreenMouseDown() {
    globals.game.board.statusClear();

    /* Redraw UI */
    uiRedraw();
}


/*****************************************************************************
 * Register game board event handlers
 *****************************************************************************/
elements.board.addEventListener("mousedown",  uiMouseDown);
elements.board.addEventListener("mouseup",    uiMouseUp);
elements.board.addEventListener("mouseleave", uiMouseLeave);

elements.board.addEventListener("touchstart", uiMouseDown, {passive: true});
elements.board.addEventListener("touchend",   uiMouseUp);

elements.screen.addEventListener("mousedown", uiScreenMouseDown);


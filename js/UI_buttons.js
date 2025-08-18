/*****************************************************************************
 * Button handlers
 *****************************************************************************/

function uiClear(event) {
    /* Undo all moves back */
    while (true) {
        if (globals.game.undoMove() == false) {
            break;
        }
    }

    /* Redraw UI */
    uiRedraw();

    return false;
}

function uiEnter(event) {
    /* Make undo if possible */
    globals.game.undoMove();

    /* Redraw UI */
    uiRedraw();
}


/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
elements.buttonClear.addEventListener("click", uiClear);
elements.buttonEnter.addEventListener("click", uiEnter);

function preventZoom(event) {
    /* Disable double click zoom */
    event.preventDefault();
}

elements.screen.addEventListener("click", preventZoom);


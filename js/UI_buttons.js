/*****************************************************************************
 * Button handlers
 *****************************************************************************/

function uiClear(event) {
    globals.game.board.wordClear();

    /* Redraw UI */
    uiRedraw();
    return false;
}

function uiEnter(event) {
    status = globals.game.board.wordEnter();

    elements.wordStatus.innerHTML = status;

    /* Redraw UI */
    uiRedraw();
    return false;
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


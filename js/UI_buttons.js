/*****************************************************************************
 * Button handlers
 *****************************************************************************/

function uiClear() {
    globals.game.board.wordClear();

    /* Redraw UI */
    uiRedraw();
    return false;
}

function uiEnter() {
    globals.game.board.wordEnter();

    /* Redraw UI */
    uiRedraw();

    /* Check if end of level */
    if (globals.game.board.solved()) {
        /* Start animation */
        elements.board.addEventListener("animationend", uiAnimationEnd);
        elements.board.style.animation = "none";
        elements.board.offsetHeight; /* trigger reflow */
        elements.board.style.animation = "image-appear 1.0s ease-in 0.2s 1 reverse";
    }

    return false;
}


function uiKeyboard(event) {
    if (globals.game.board.getWordStatus().length > 0) {
        globals.game.board.statusClear();
        uiRedraw();
        return;
    }

    if (event.key === 'Enter') {
        uiEnter();
    }
    if (event.key === 'Escape') {
        uiClear();
    }
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

document.addEventListener('keydown', uiKeyboard);


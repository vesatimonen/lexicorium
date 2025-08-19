/*****************************************************************************
 * Button handlers
 *****************************************************************************/

function uiClear(event) {
    /* Redraw UI */
    uiRedraw();
    return false;
}

function uiEnter(event) {
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


/*****************************************************************************
 * Global variables
 *****************************************************************************/
var globals = {
    game:         undefined,
    storage:      undefined,

    boardMaxSize: 6,

    uiKeyPressed: undefined,
};

/*****************************************************************************
 * URL options
 *****************************************************************************/
var options = {
    challenges: [],
    level:      0
};

/*****************************************************************************
 * UI elements
 *****************************************************************************/
const elements = {
    screen:         document.getElementById("game-screen"),
    board:          document.getElementById("game-board"),
    canvas:         document.getElementById('game-canvas'),
    gameOver:       document.getElementById("game-over-modal"),

    title:          document.getElementById("game-title"),
    instructions:   document.getElementById("game-instructions"),

    buttonClear:    document.getElementById("word-restart"),
    buttonEnter:    document.getElementById("word-enter"),

    debug:          document.getElementById("debug-text")
};



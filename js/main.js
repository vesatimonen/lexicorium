const strorageName = "lexicorium/game-progress";

/*****************************************************************************
 * Game challenges (levels)
 *****************************************************************************/
const challengeSetFIN = [
    {info: "INFO: >FIN:5:a.j.n.o:1023:i.l.u.v:3012:i.k.p.u:1023:h.k.y.ä:3012:k.l.n.ä:23103"}, // physical feelings
    {info: "INFO: >FIN:5:a.h.i.m:10230:a.i.p.s:30221:a.k.m.s:20130:a.e.n.p.r:31420:a.e.i.m.n.u:354502414"}, // internal organs
    {info: "INFO: >FIN:5:n.t.y:12202:a.j.p.t:20310:a.k.l.n:201030:i.l.t.v:301220:e.i.o.p.t:301442"}, // bedclothes
    {info: "INFO: >FIN:5:a.o.s.t:120231:e.j.k.o.u:1342240:a.j.l.n.o.p.t:5060214430:a.i.k.m.n.o.p:253660410:a.d.i.n.o.s.v:1262524430"}, // military groups
    {info: "INFO: >FIN:5:e.i.s.t:20131:a.d.i.n.r.s:50412232:a.i.k.l.m.r:40251331:a.k.r.s.t.u:452310:a.e.i.k.n.r.s:04315206"}, // sea fishes

    {info: "INFO: >FIN:5:i.l.o.p:32102:o.r.t.u:13220:a.e.l.p.r:21340:a.i.l.m.r:3020410:a.i.l.p.s.t:43150021"}, // infectious diseases
    {info: "INFO: >FIN:5:a.h.i.s:10323:a.i.k.n.o:24201131:a.b.i.k.n.s:30440125:e.h.i.n.o.r:10542232:a.h.i.m.n.r.u:305216040"}, // drugs
    {info: "INFO: >FIN:5:a.p.r.u:13211320:e.i.n.s:3121202:i.k.n.p:302110:a.e.i.n.p.u:45302313:a.e.i.k.l.n.t:314602515"}, // colors
    {info: "INFO: >FIN:5:a.b.i.r:030120:d.h.i.n:12302:a.i.l.n.t:204130:a.d.i.m.n.r:3041052242:a.e.g.i.l.n.t:15240563"}, // languages
    {info: "INFO: >FIN:5:a.b.e.g.r:3241240:a.i.n.r.s:20341441:a.d.e.i.k.o.r:5643120:a.h.i.n.s.t.y:160423552:a.i.l.n.p.t.u:562440031"}, // flowers
];

const challengeSetFIN2 = [
    {info: "INFO: >FIN:5:a.l.o.s:3012:a.b.o.s.t:124403:b.e.g.o.r.s:4350142:e.h.i.k.n.ä:15332404:e.i.k.n.r.ä.ö:451226303"},            // F1 drivers
    {info: "INFO: >FIN:5:e.k.n.o:10113202:a.i.k.l.o:203314:a.e.h.l.n.o:2035414:a.i.k.p.s.v:300412151:i.k.o.s.t.v:12050342"},          // presidents
    {info: "INFO: >FIN:5:a.k.l.o:132110:h.i.p.y.ä:033214:a.i.n.o.t:401213:a.e.n.p.s:3040212:a.e.i.l.m.n.t:32640515"},                 // football players
    {info: "INFO: >FIN:5:a.k.l.u:13320:e.k.n.o:13113202:a.e.i.l.n.s:50332414:b.e.i.l.s.u:42013254:a.d.e.j.m.o.t:40126530"},           // composers
    {info: "INFO: >FIN:5:a.k.l.o.t:401023:e.n.o.p.r:4232101:a.e.i.n.r.s:50042313:e.h.i.l.m.n.ä:1646362505:a.e.i.k.m.n.t:4062302515"}, // female skiers

    {info: "INFO: >FIN:5:e.i.n.r:30121:e.n.v.ä:23313101:a.e.n.t.v:4030212:a.l.o.s.u:3423012:a.e.i.l.m.p:3155230452"},                 // male actors
    {info: "INFO: >FIN:5:a.e.h.l.n:213140:a.e.l.s.v:413020:a.e.i.n.r.t.v:6045202313:a.e.m.o.r.t.v:51463200:a.i.k.l.m.u.v:613225400"}, // female artists
    {info: "INFO: >FIN:5:l.m.y.ä:1200203:e.i.m.o.t:21043:a.e.i.k.n.s:42530414:a.m.n.r.t.y.ä:1624530240:e.i.m.o.s.t.ä:14320546"},      // male skiers
    {info: "INFO: >FIN:5:a.i.l.t.v:4113020:e.k.n.o.s:1343202:i.l.p.y.ä:310244:a.e.k.l.m.o:2314530:a.h.k.l.p.y.ä:10042536"},           // female actresses
    {info: "INFO: >FIN:5:a.l.o.t:0103012:a.k.l.n.o:020314:e.k.n.t.u:10334202:e.i.k.l.n.s:30521404:e.k.n.o.s.t.u:166453202"},          // male artists
];

const challengeSetENG = [
    {info: "INFO: F03.0 W05(09.6) R00000-02000 P03.2 L0-1-2-2-0-0-0-0 S01 T0000001 W015 >4x4-ENG-fes-sor-con-end-pro-con-str-fri-vat-ser-uct-ion-ive-age-ant-adv"},
];

const challengeSetITA = [
    {info: "INFO: F03.0 W05(09.6) R01000-02000 P03.2 L0-1-2-2-0-0-0-0 S01 T0000001 W010 >4x4-ITA-ARE-SAR-EBB-PRE-ORD-RIC-ERO-ZZI-MAG-IST-INT-ERE-URA-RAT-NTE-SSA"},
];

const challengeSetSWE = [
    {info: "INFO: >SWE:5:a.d.l.s:302201:a.e.f.l:2030213:a.p.s.t:10230:h.i.s.u:23201:i.o.r.s.t:2031441"},
    {info: "INFO: >SWE:5:a.e.p.r:212203:a.e.k.l.n:20413:a.i.k.p.r:3034120:k.m.o.s.t.u:153024:a.d.e.k.m.r.u:3051246440"},
    {info: "INFO: >SWE:5:a.i.k.p.r:3034120:e.i.l.r.s:4022031:a.i.o.p.s.t:3250514:b.c.i.l.o.r:05411432:b.k.l.m.o.å:0243152"},
];

const challengeSetFRA = [
    {info: "INFO: F03.0 W05(09.6) R00000-02000 P03.2 L0-0-1-2-2-0-0-0-0-0-0-0-0-0-0-0-0 S01 T0001 W013 >4x4-FRA-BER-TOM-LIO-BIB-ION-SAT-THÈ-CER-CON-VER-QUE-PLA-ÈRE-NDP-GRA-REM"},
];



const challengeSetDefault = challengeSetFIN;

/*****************************************************************************
 * Parse URL options
 *****************************************************************************/
function parseOptions() {
    /* Get URL */
    const url = new URL(window.location.href);

    /* Challenge set option */
    var setOption = url.searchParams.get("set");
    switch (setOption) {
        case "FIN":
            options.challenges = challengeSetFIN;
            globals.storage    = strorageName + "-FIN";
            break;
        case "FIN2":
            options.challenges = challengeSetFIN2;
            globals.storage    = strorageName + "-FIN2";
            break;
        case "SWE":
            options.challenges = challengeSetSWE;
            globals.storage    = strorageName + "-SWE";
            break;
        case "ENG":
            options.challenges = challengeSetENG;
            globals.storage    = strorageName + "-ENG";
            break;
        case "ITA":
            options.challenges = challengeSetITA;
            globals.storage    = strorageName + "-ITA";
            break;
        case "FRA":
            options.challenges = challengeSetFRA;
            globals.storage    = strorageName + "-FRA";
            break;
        default:
            options.challenges = challengeSetDefault;
            globals.storage    = strorageName;
            break;
    }

    /* Level option */
    const levelOption = url.searchParams.get("level");
    if (levelOption == null) {
        /* Read from storage */
        options.level = JSON.parse(localStorage.getItem(globals.storage));
    } else {
        options.level = Number(levelOption - 1);
    }

    /* Challenge option */
    var challengeOption = url.searchParams.getAll("challenge");
    if (challengeOption.length == 0) {
    } else {
        if (challengeOption.length > 0) {
            options.challenges = [];
            for (let index = 0; index < challengeOption.length; index++) {
                /* Convert URL special characters */
                challengeOption[index] = challengeOption[index].replace("%3E",'>');

                /* Insert it to manual challenges table */
                options.challenges.push({info: challengeOption[index]});
            }

            /* Set manual challenges to be played */
            globals.storage = strorageName + "-manual";
            options.level   = 0;
        }
    }
}


/*****************************************************************************
 * Modal window handling (Game over)
 *****************************************************************************/
function modalClick(event) {
    event.preventDefault();

    elements.gameOver.style.visibility = "hidden";
    elements.board.style.visibility    = "visible";

    gameStart(globals.game.level);
}

elements.gameOver.addEventListener("click",      modalClick);
elements.gameOver.addEventListener("touchend",   modalClick, {passive: true});


/*****************************************************************************
 * Game initialization
 *****************************************************************************/
function gameStart(level) {
    /* Check level value */
    if (level == undefined || level < 0) {
        level = 0;
    }

    if (level >= options.challenges.length) {
        level = options.challenges.length - 1;
    }

    /* Use predefined challenges */
    globals.game.init(level, options.challenges[level].info);

/* Debug text */
//document.getElementById("debug-text").innerHTML = options.challenges[level].info.split("#")[0];

    /* Save game point */
    localStorage.setItem(globals.storage, JSON.stringify(globals.game.level));

    /* Redraw UI */
    uiRedraw();
}


window.onload = function () {
    /* Parse options */
    parseOptions();

    /* Start game */
    globals.game = new Game();
    gameStart(options.level);

    /* Show window */
    document.getElementById("game-screen").style.visibility = "visible";
}





const strorageName = "lexicorium/game-progress";

/*****************************************************************************
 * Game challenges (levels)
 *****************************************************************************/
const challengeSetFIN = [
    {info: "INFO: >FIN:5:h.i.k.s.y.ä:5025134:a.k.p.r.u:20314:i.k.t.u:0213:e.j.l.s.u:4102243:a.n.r.u:10323"},
    {info: "INFO: >FIN:5:a.h.j.k.u:14413020:e.l.m.n.p.u:45125303:i.l.t.y:23110:e.k.l.o.s:1341023:h.i.n.r.ä:24301"},
    {info: "INFO: >FIN:5:e.h.m.u:13320:k.m.r.y:132003:a.i.k.n.o:24201131:a.i.o.p.t:23100441:a.b.i.n.o.t:03521244552"},
    {info: "INFO: >FIN:5:a.e.i.k.l.r:3144052:a.k.o.t:10332:k.t.v.y.ä:0431424:e.i.n.t:0301202:a.k.t:20110"},
    {info: "INFO: >FIN:5:ai.t.us.vu:10312:i.ne.tr.u:1320:at.i.iv.n.om:34130121:e.la.s.u:1320:k.ku.l.pi:3201"},
    {info: "INFO: >FIN:5:a.el.i.p.s:40312:as.i.ko.mp.s:23041:a.k.ro.u:131102:ik.ko.l.ta:3201:i.iv.lä.s:30102"},

    {info: "INFO: >FIN:5:i.l.o.v:210030:a.k.r.v:10230:a.i.l.m.r:03140021:a.e.h.k.t.u:212354400:a.k.l.u:10320"},
    {info: "INFO: >FIN:5:a.e.i.l.p.s:142314520:e.i.l.n.t.v:503441121:a.i.r.t:21130:e.i.k.n.s:204201303:e.i.n.t:0321202"},
    {info: "INFO: >FIN:5:e.l.mp.ys:10203:a.ta.vit:0210:jum.p.pa:012:a.n.rsk.tel.u.ut:102534:a.k.r.uss:230110"},
    {info: "INFO: >FIN:5:b.ler.o:0212:a.h.me:102:a.ik.it.k:2130:l.o.rdi:012:s.yv.ä:012"},

    {info: "INFO: >FIN:5:a.h.i.l.v:321040:at.i.p.r.s.yk:2451031:a.em.n.ol.to:31042:en.in.ju.lk:2310:e.r.u:22110"},
    {info: "INFO: >FIN:5:im.pi.ä:102:jä.k.ky.y.ys:03124:a.s.ti:0120:ai.as.m:210:ke.ky.t.ä:1203"},
    {info: "INFO: >FIN:5:a.h.ko.o.t:2134400:a.al.i.l.p.ur:435012:k.n.ne.nä.öi:30421:au.l.ta:102:ni.s.to.uo:13012"},
    {info: "INFO: >FIN:5:i.is.l.m:302010:a.ar.i.t:3210:a.ho.l.t:20130:i.ni.ov.s.ti:320134:ik.iä.k.le:3021"},
    {info: "INFO: >FIN:5:i.r.s.u:1302:a.gu.ja.ri:21003:er.i.on.p.pe:433021:e.l.li.n.o:410012303:a.i.k.m.nt.se:530411220"},
];

const challengeSetENG = [
    {info: "INFO: F03.0 W05(09.6) R00000-02000 P03.2 L0-1-2-2-0-0-0-0 S01 T0000001 W015 >4x4-ENG-fes-sor-con-end-pro-con-str-fri-vat-ser-uct-ion-ive-age-ant-adv"},
];

const challengeSetITA = [
    {info: "INFO: F03.0 W05(09.6) R01000-02000 P03.2 L0-1-2-2-0-0-0-0 S01 T0000001 W010 >4x4-ITA-ARE-SAR-EBB-PRE-ORD-RIC-ERO-ZZI-MAG-IST-INT-ERE-URA-RAT-NTE-SSA"},
];

const challengeSetSWE = [
    {info: "INFO: F02.4 W04(09.5) R00000-02000 P04.0 L0-0-1-2-1-0-0-0 T000069 >4x4-SWE-mar-be-mok-ra-sa-te-de-ti-la-re-kom-mu-pe-des-skå-nal"},
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





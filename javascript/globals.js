const QTDOSTAB_MULTIPLIER       = 20;

const QTDOSTIMEMS_HEXCOLOR      = "#d400ff";
const QTDOSPROCESS_HEXCOLOR     = "#fbff00";
const QTDOSHEAL_HEXCOLOR        = "#09ff00";
const QTDOSCRITICAL_HEXCOLOR    = "#ff5757";
const QTDOSSPECIAL_HEXCOLOR     = "#00f7ff";

const QTDOS_HELPC               = "-h"
const QTDOS_ACHIEVEMENTC        = "-ach";
const QTDOS_SECRC               = "-secr";
const QTDOS_WHOAMIC             = "-whoami";

const QTDOS_MNAMEC              = "__NAME";

const QTDOS_STARTRPGC           = "start_rpg";
const QTDOS_CLSC                = "cls";
const QTDOS_RESTARTC            = "restart";
const QTDOS_SHUTDOWNC           = "shutdown";

const QTDOS_EXITRPG             = "/exit";
const QTDOS_EFFECTRPG           = "/effect";
const QTDOS_TRACKRPG            = "/track";

// [final, pego/restante]
const QTDOS_FINALS = [
    {
        finalMessage: "Simplesmente você se senta e chora, triste. Mal sabe o que te aguarda...",
        achievement: "Chorão",
    },
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],
    ["Final", 0],   
    {
        finalMessage: "Teste fork (false).",
        achievement: "DEV_PLACEHOLDER"
    },
    {
        finalMessage: "Ele entrou na caverna e descobriu uma grande mina de ouro e ficou rico!",
        achievement: "Podre de rico"
    },
]

let systemTrack = "C:\\QTDOS\\system32>";
let gameTrack = "C:\\qtdosgame>"
let commandHistory = [];
let historyIndex = 0;
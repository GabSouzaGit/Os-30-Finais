import { 
    skipLineInPrompt, 
    tabulation, 
    createSecretInput, 
    togglePromptContent, 
    skipParagraphInPrompt, 
    appendPromptContent
} from "./utils.js";

import { gameStart } from "./game/game.js";
import { color } from "./utils.js";

import { SystemQTDOSManagement, SystemQTDOSPrompt, SystemQTDOSSound } from "./system/SystemQTDOS.js";

function setupCommandsFromGlobals(){
    const modifications = [
        [ QTDOS_MNAMEC,         SystemQTDOSPrompt.m_name]
    ];

    const commands = [
        [ QTDOS_HELPC,          SystemQTDOSPrompt.q_helpList],
        [ QTDOS_ACHIEVEMENTC,   SystemQTDOSPrompt.q_achievements],
        [ QTDOS_SECRC,          () => {}],
        [ QTDOS_WHOAMIC,        SystemQTDOSPrompt.q_whoami],
        [ QTDOS_STARTRPGC,      gameStart],
        [ QTDOS_CLSC,           SystemQTDOSPrompt.a_cls],
        [ QTDOS_RESTARTC,       SystemQTDOSPrompt.a_restart],
        [ QTDOS_SHUTDOWNC,      SystemQTDOSPrompt.a_shutdown],
    ]

    const COMMAND_FLAG = 0;
    const COMMAND_EXEC = 1;

    const commandTable      = {},
          modificationTable = {};

    for(let i = 0; i < modifications.length; i++){
        modificationTable[
            modifications[i][COMMAND_FLAG]
        ] = modifications[i][COMMAND_EXEC];
    }

    for(let i = 0; i < commands.length; i++){
        commandTable[
            commands[i][COMMAND_FLAG]
        ] = commands[i][COMMAND_EXEC];
    }

    // TEMP
    commandTable[QTDOS_FMTDEV] = () => {
        const arrayFromLocalStorage = [];

        for(let i = 0; i < localStorage.length; i++){
            const local = localStorage.key(i);
            
            if(local.startsWith("QTDOS")) arrayFromLocalStorage.push(local);
        }

        arrayFromLocalStorage.map(key => localStorage.removeItem(key));
        SystemQTDOSManagement.destroyCookieSession();
        
        window.location.reload();
    }
    /* -- */

    return {
        commandTable,
        modificationTable
    }
}

const { commandTable, modificationTable } = setupCommandsFromGlobals();

function defaultPromptErrorMessage(inputValue){
    appendPromptContent(`Parece que "${inputValue}" não é um comando reconhecido pelo sistema operacional.
                        <br/> Digite ${QTDOS_HELPC} para mais informações.`);

    skipParagraphInPrompt(); 
}

async function sendCommandEvent(inputValue){
    const currentActiveEntry = document.querySelector("#active-entry");
    currentActiveEntry.id = "";

    currentActiveEntry.innerHTML = `${systemTrack}${inputValue}`;
    
    let result = null;
    
    if(inputValue != ""){
        const [ flag, value ] = inputValue.split(" ");
        
        if(value == undefined){
            if(Object.hasOwn(commandTable, flag)){
                if(flag == "start_rpg"){
                    result = await commandTable[flag](); 
                }
                else{    
                    result = commandTable[flag]();
                    appendPromptContent(result);
                }
                
                if(flag.startsWith("--")) skipLineInPrompt();

            } else defaultPromptErrorMessage(inputValue);
        }else{
            if(Object.hasOwn(modificationTable, flag)){
                result = modificationTable[flag](value);
                appendPromptContent(result);

                if(flag.startsWith("__")) skipLineInPrompt();

            } else defaultPromptErrorMessage(inputValue);
        }
    }

    waitSystemCommand();
}

export function waitSystemCommand(){
    const secretInput = createSecretInput(sendCommandEvent);
    
    const divInput = document.createElement("div");
    const track = document.createElement("div");
    track.textContent = systemTrack;
    divInput.id = "active-entry";
    
    divInput.appendChild(track);
    divInput.appendChild(secretInput);
    document.body.appendChild(divInput);

    window.scrollTo(0, document.body.scrollHeight);
    
    secretInput.focus();
}
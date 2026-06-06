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

const modificationTable = {
    // Comandos de modificação (funções)
    "__NAME":           SystemQTDOSPrompt.m_name,
}

const commandTable = {
    // Comandos de consulta (funções)
    "--help":           SystemQTDOSPrompt.q_helpList,
    "-h":               SystemQTDOSPrompt.q_helpList,
    "--achievements":   SystemQTDOSPrompt.q_achievements,
    "--whoami":         SystemQTDOSPrompt.q_whoami,

    // Comandos de ação (procedimentos)
    "start_rpg":        gameStart,
    "cls":              SystemQTDOSPrompt.a_cls,
    "restart":          SystemQTDOSPrompt.a_restart,
    "shutdown":         SystemQTDOSPrompt.a_shutdown,

    // Opções de desenvolvedor
    "**dev-opt[flush]": () => {
        const storagelen = localStorage.length;

        for(let i = 0; i < storagelen; i++){
            const local = localStorage.key(i);
            
            console.log(local);

            if(local == null) continue;
            if(local.startsWith("QTDOS")) localStorage.removeItem(local);
        }

        SystemQTDOSManagement.destroyCookieSession();
        window.location.reload();
    }
}

function defaultPromptErrorMessage(inputValue){
    appendPromptContent(`Parece que "${inputValue}" não é um comando reconhecido pelo sistema operacional.
                        <br/> Digite --help para mais informações.`);

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

                console.log(flag);
                
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
    
    skipLineInPrompt();

    window.scrollTo(0, document.body.scrollHeight);
    
    secretInput.focus();
}
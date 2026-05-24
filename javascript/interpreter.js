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

import { SystemQTDOSPrompt } from "./system/SystemQTDOS.js";

const commandTable = {
    // Comandos de consulta (funções)
    "--help":           SystemQTDOSPrompt.q_helpList,
    "-h":               SystemQTDOSPrompt.q_helpList,
    "--achievements":   SystemQTDOSPrompt.q_achievements,

    // Comandos de ação (procedimentos)
    "start_rpg":        gameStart,
    "cls":              SystemQTDOSPrompt.a_cls,
    "restart":          SystemQTDOSPrompt.a_restart
}

async function sendCommandEvent(inputValue){
    const currentActiveEntry = document.querySelector("#active-entry");
    currentActiveEntry.id = "";

    currentActiveEntry.innerHTML = `${systemTrack}${inputValue}`;

    if(inputValue != ""){
        if(Object.hasOwn(commandTable, inputValue)){
            let result = null;

            if(inputValue == "start_rpg"){
                result = await commandTable[inputValue](); 
            }else{
                result = commandTable[inputValue]();
                appendPromptContent(result);
        
                if(inputValue.startsWith("--")) skipLineInPrompt();
            }
            
        }else{
            appendPromptContent(`Parece que "${inputValue}" não é um comando reconhecido pelo sistema operacional.
                                <br/> Digite --help para mais informações.`);

            skipParagraphInPrompt(); 
        }
    }

    waitSystemCommand();
}

export function waitSystemCommand(){
    const secretInput = createSecretInput(sendCommandEvent);

    const spanInput = document.createElement("span");
    spanInput.textContent = systemTrack;
    spanInput.id = "active-entry";

    spanInput.appendChild(secretInput);
    document.body.appendChild(spanInput);

    skipLineInPrompt();

    window.scrollTo(0, document.body.scrollHeight);

    const input = document.querySelector("#secret-input");
    input.focus();
}
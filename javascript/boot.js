import { greetings, sleep } from "./utils.js";
import { waitSystemCommand } from "./interpreter.js";
import { SystemQTDOSSound } from "./system/SystemQTDOS.js";

function qtdosPromptActiveEventHandler(){
    const secretInput = document.querySelector("#secret-input");
    secretInput.focus();
}

document.addEventListener('click', qtdosPromptActiveEventHandler)

const keydownEvents = {
    ArrowUp: () => {
        if(historyIndex > 0){
            historyIndex--;
        } 
    },

    ArrowDown: () => {
        if(historyIndex < commandHistory.length - 1){
            historyIndex++;
        }
    }
}

export function boot(){
    document.addEventListener("keydown", (event) => {
        const input = document.querySelector("#secret-input");

        if(event.key == "ArrowUp"
        || event.key == "ArrowDown"){
            keydownEvents[event.key]()

            input.value = commandHistory[historyIndex];
        }
    });

    document.body.innerHTML = greetings();
    waitSystemCommand();
}
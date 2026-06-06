import { greetings, sleep } from "./utils.js";
import { waitSystemCommand } from "./interpreter.js";
import { SystemQTDOSSound } from "./system/SystemQTDOS.js";

function qtdosPromptActiveEventHandler(){
    const secretInput = document.querySelector("#secret-input");
    secretInput.focus();
}

document.addEventListener('click', qtdosPromptActiveEventHandler)

export function boot(){
    document.body.innerHTML = greetings();
    waitSystemCommand();
}
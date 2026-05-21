import { greetings } from "./utils.js";
import { waitSystemCommand } from "./interpreter.js";

function qtdosPromptActiveEventHandler(){
    const secretInput = document.querySelector("#secret-input");
    secretInput.focus();
}

document.addEventListener('click', qtdosPromptActiveEventHandler)

export default function boot(){
    document.body.innerHTML = greetings();
    waitSystemCommand();
}
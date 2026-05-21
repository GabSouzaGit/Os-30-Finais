const FIRST_OPTION = 0;
const SECOND_OPTION = 1;
const THIRD_OPTION = 2;

import { decisionTree } from "./decision_tree.js";

import { 
    togglePromptContent, 
    skipLineInPrompt,
    appendPromptContent,
    skipParagraphInPrompt,
    tabulation,
    color
} from "../utils.js";

import { createSecretInput } from "../utils.js";

let exitGameLoopHandler = null;
let gameRunning = false;
let subtreeReference = { ...decisionTree };

function gameLog(text){
    document.body.innerHTML += `<span>${text}</span>`;

    skipParagraphInPrompt();
}

function sendGameCommand(inputValue){    
    const currentActiveEntry = document.querySelector("#game-entry");
    currentActiveEntry.id = "";

    currentActiveEntry.innerHTML = `${gameTrack}${inputValue}`;

    const subtreeKeys = Object.keys(subtreeReference.paths);
    const nInputValue = Number(inputValue);

    if(nInputValue != NaN) {
        if(nInputValue == FIRST_OPTION
        || nInputValue == SECOND_OPTION
        || nInputValue == THIRD_OPTION){
            subtreeReference = subtreeReference.paths[nInputValue];

            walk()
            return;
        }

        gameLog("Insira um valor dentro das opções.");
    }else{
        gameLog("Insira um valor dentro das opções.");
    }

    waitGameCommand();
}

function waitGameCommand(){
    const secretInput = createSecretInput(sendGameCommand);

    const spanInput = document.createElement("span");
    spanInput.textContent = gameTrack;
    spanInput.id = "game-entry";

    spanInput.appendChild(secretInput);
    document.body.appendChild(spanInput);

    skipLineInPrompt();

    window.scrollTo(0, document.body.scrollHeight);

    const input = document.querySelector("#secret-input");
    input.focus();
}

function walk(sub = null){
    if(Object.hasOwn(subtreeReference, "itsFinal")){
        appendPromptContent(`<div>Final desbloqueado: ${color(subtreeReference.itsFinal.achievement, QTDOSPROCESS_HEXCOLOR)}</div>`);
        appendPromptContent(`<span>${subtreeReference.itsFinal.finalMessage}</span>`);
        skipLineInPrompt();
        
        subtreeReference = { ...decisionTree };
        skipParagraphInPrompt();

        exitGameLoopHandler();
        return
    }else{
        appendPromptContent(`<span>${subtreeReference.message}</span>`);

        const currentPaths = Object.keys(subtreeReference.paths);
        const choiceOptions = `<div>0 - ${subtreeReference.paths[0].optionMessage}</div>
                               <div>1 - ${subtreeReference.paths[1].optionMessage}</div>
                               <div>2 - ${subtreeReference.paths[2].optionMessage}</div>`;
            
        appendPromptContent(tabulation(choiceOptions, 1, true));
        skipLineInPrompt();

    }   

    waitGameCommand();
}

export function gameStart(){ 
    return new Promise((resolve, reject) => {
        exitGameLoopHandler = resolve;

        walk();
    });
}
import { decisionTree } from "./decision_tree.js";

import {
    skipLineInPrompt,
    skipParagraphInPrompt,
    appendPromptContent
} from "../utils.js";

import { createSecretInput } from "../utils.js";
import pathTypesProcedures from "./pathtypesProcedures.js";

import SystemQTDOSGameCommands from "../system/SystemQTDOSGameCommands.js";

const inGameCommandsActions = SystemQTDOSGameCommands.setupGameCommands();

let exitGameLoopHandler = null;
let subtreeReference = null;

function sendGameCommand(inputValue){    
    const currentActiveEntry = document.querySelector("#game-entry");
    currentActiveEntry.id = "";

    currentActiveEntry.innerHTML = `${gameTrack}${inputValue}`;

    if(inputValue === QTDOS_EXITRPG){
        exitGameLoopHandler();
        return;
    }

    const actionCommand = SystemQTDOSGameCommands.gameCommandAssoc(
        inGameCommandsActions,
        inputValue
    );

    if(actionCommand.exists){
        actionCommand.action({ 
            subtree: subtreeReference 
        });
    }else{
        const subtreeKeys = Object.keys(subtreeReference.paths);
        const nInputValue = Number(inputValue);
    
        if(nInputValue != NaN) {
            if(nInputValue >= 0
            || nInputValue <= 2){
                subtreeReference = subtreeReference.paths[nInputValue];
                
                walk()
                return;
            }
    
            appendPromptContent("Insira um valor dentro das opções.");
        }else{
            appendPromptContent("Insira um valor dentro das opções.");
        }
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
    const pathType = subtreeReference.type;
    console.log(pathType);
    
    const itsKnownPathtype = Object.hasOwn(pathTypesProcedures, pathType);

    if(itsKnownPathtype){
        const { keepLoop, fork } = pathTypesProcedures[pathType](subtreeReference);
        
        if(keepLoop){
            if(fork != null) {
               subtreeReference = { ...subtreeReference.cases[fork] }
               walk(); 
               return;
            }

            waitGameCommand();
        }else{
            exitGameLoopHandler();
            return;
        }
    }else{
        console.log("Ocorreu um erro: o tipo do caminho escolhido não é resolvível");
        exitGameLoopHandler();
    }   
}

export function gameStart(){ 
    subtreeReference = { ...decisionTree };

    return new Promise((resolve, reject) => {
        exitGameLoopHandler = resolve  
        
        walk();
    });
}
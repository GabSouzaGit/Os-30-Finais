import {
    skipLineInPrompt,
    appendPromptContent,
    skipParagraphInPrompt,
    tabulation,
    color,
    chance
} from "../utils.js";

import { createSecretInput } from "../utils.js";

const keepWalking = (keepLoop = true, fork = null) => {
    return {
        keepLoop,
        fork
    }
}

const pathTypesProcedures = {
    "common": (subtree) => {
        appendPromptContent(`<span>${subtree.message}</span>`);

        const currentPaths = Object.keys(subtree.paths);
        const choiceOptions = `<div>0 - ${subtree.paths[0].optionMessage}</div>
                               <div>1 - ${subtree.paths[1].optionMessage}</div>
                               <div>2 - ${subtree.paths[2].optionMessage}</div>`;
            
        appendPromptContent(tabulation(choiceOptions, 1, true));
        skipLineInPrompt();

        return keepWalking();
    },

    "final": (subtree) => {
        const { final } = subtree;
        
        appendPromptContent(`<div>Final desbloqueado: ${color(final.achievement, QTDOSPROCESS_HEXCOLOR)}</div>`);
        appendPromptContent(`<span>${final.finalMessage}</span>`);
        skipLineInPrompt();
    
        skipParagraphInPrompt();

        return keepWalking(false)
    },

    "fork": (subtree) => {
        const reachedOnChance = chance(subtree.chance); 

        return keepWalking(
            true,
            Number(reachedOnChance)
        );
    },
    
    "effect": (subtree) => {},
    "chance-effect": (subtree) => {},
    "secret": (subtree) => {},
    "fork-effect": (subtree) => {},
    "defeat": (subtree) => {},
};

export default pathTypesProcedures;
import { 
    appendPromptContent,
    tabulation
} from "../utils.js";

import SystemQTDOSPrompt from "./SystemQTDOSPrompt.js";

export default class SystemQTDOSGameCommands {
    static track(command, options){
        appendPromptContent("Trackeado");
    }

    static effect(command, options){
        appendPromptContent("Efeitos exibidos")
    }

    static repeat(command, options){
        const { message, paths } = options.subtree;

        appendPromptContent(message);
        const choiceOptions = `<div>0 - ${paths[0].optionMessage}</div>
                               <div>1 - ${paths[1].optionMessage}</div>
                               <div>2 - ${paths[2].optionMessage}</div>`;
        
        appendPromptContent(tabulation(choiceOptions, 1, true));
    }

    static repeatc(command, options){
        const { message, paths } = options.subtree;

        SystemQTDOSPrompt.a_cls();

        appendPromptContent(message);
        const choiceOptions = `<div>0 - ${paths[0].optionMessage}</div>
                               <div>1 - ${paths[1].optionMessage}</div>
                               <div>2 - ${paths[2].optionMessage}</div>`;
        
        appendPromptContent(tabulation(choiceOptions, 1, true));
    }

    static setupGameCommands(){
        const inGameCommandsActions = {};

        const commands = [
            // O /exit não está aqui pois é uma implementação unica e bem curta em game.js
            [QTDOS_EFFECTRPG, SystemQTDOSGameCommands.effect],
            [QTDOS_TRACKRPG,  SystemQTDOSGameCommands.track ],
            [QTDOS_REPEATRPG, SystemQTDOSGameCommands.repeat],
            [QTDOS_REPEATRPG_CFLAG, SystemQTDOSGameCommands.repeatc]
        ]

        const COMMAND_FLAG = 0;
        const COMMAND_EXEC = 1;

        for(let i = 0; i < commands.length; i++){
            inGameCommandsActions[
                commands[i][COMMAND_FLAG]
            ] = commands[i][COMMAND_EXEC];
        }

        return inGameCommandsActions;
    }

    static gameCommandAssoc(inGameCommandsActions, command){
        const exists = Object.hasOwn(inGameCommandsActions, command);
        const action = exists ? (options) => inGameCommandsActions[command](command, options) : null;
        
        return {
            exists,
            action
        }
    }
}
import { 
    skipLineInPrompt, 
    tabulation, 
    createSecretInput, 
    togglePromptContent, 
    skipParagraphInPrompt 
} from "./utils.js";

import { gameStart } from "./game/game.js";
import { color } from "./utils.js";

const commandTable = {
    // Comandos de consulta (funções)
    "--help": () => {
        const queryCommands = `${color("--help", QTDOSPROCESS_HEXCOLOR)}: Lista de comandos do sistema.<br/>
                               ${color("--achievements", QTDOSPROCESS_HEXCOLOR)}: Lista de finais obtidos.<br/>
                               ${color("--secrets", QTDOSPROCESS_HEXCOLOR)}: Lista de segredos obtidos.<br/>
                               ${color("--name", QTDOSPROCESS_HEXCOLOR)}: Exibe o nome atual.`;
    
        const modCommands = `${color("__NAME", QTDOSTIMEMS_HEXCOLOR)} ${color("seu_nome", QTDOSPROCESS_HEXCOLOR)}: Modifica seu nome no RPG.<br/>` 
        
        const actionCommands = `${color("start_rpg", QTDOSCRITICAL_HEXCOLOR)}: Inicia o jogo.<br/>
                                ${color("cls", QTDOSCRITICAL_HEXCOLOR)}: Limpa o console (fora do jogo)<br/>
                                ${color("delete_all", QTDOSCRITICAL_HEXCOLOR)}: Apaga todos os dados (conquistas, segredos, etc.).<br/>
                                ${color("restore", QTDOSCRITICAL_HEXCOLOR)}: Retorna dados comuns para as configurações de fabrica.`
                            
        const response = `<p></p>
                            Consulta:<br/>
                                ${tabulation(queryCommands, 1, true)}<p></p>
                            Modificação:<br/>
                                ${tabulation(modCommands, 1, true)}<p></p>
                            Ação:<br/>
                                ${tabulation(actionCommands, 1, true)}
                            `;
        return response;
    },

    // Comandos de ação (procedimentos)
    "start_rpg": gameStart,
    "cls": () => {
        togglePromptContent("");
        return ""
    }
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
                document.body.innerHTML += result;
        
                if(inputValue.startsWith("--")) skipLineInPrompt();
            }
            
        }else{
            document.body.innerHTML += `Parece que "${inputValue}" não é um comando reconhecido pelo sistema operacional.
                                    <br/> Digite --help para mais informações.`
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
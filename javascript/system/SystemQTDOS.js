import { 
    togglePromptContent,
    color,
    tabulation, 
    appendPromptContent
} from "../utils.js";

/**
 * 
 * @param {string[]} commandsep 
 * @param {string} description 
 * @returns 
 */
function command(commandsep, description){
    if(commandsep.length == 2){
        if(commandsep[0].startsWith("__")){
            const mod = `${color(commandsep[0], QTDOSTIMEMS_HEXCOLOR)} ${color(commandsep[1], QTDOSPROCESS_HEXCOLOR)}`;
            return mod;
        }
    }

    if(commandsep[0].startsWith("--") 
    || commandsep[0].startsWith("-")){
        return color(commandsep[0], QTDOSPROCESS_HEXCOLOR);
    }

    return color(commandsep[0], QTDOSCRITICAL_HEXCOLOR);
}

export class SystemQTDOSPrompt {
    static a_cls(){
        togglePromptContent("");
        return ""
    }

    static a_restart(){
        localStorage.removeItem("QTDOS_HAS_INSTALLED");
        window.location.reload();
    }

    static q_helpList(){
        const queryCommands = `${command(["--help"])}: Lista de comandos do sistema.<br/>
                               ${command(["--achievements"])}: Lista de finais obtidos.<br/>
                               ${command(["--secrets"])}: Lista de segredos obtidos ${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}.<br/>
                               ${command(["--name"])}: Exibe o nome atual ${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}.`;
        
        const modCommands = `${command(["__NAME", "seu nome"])}: Modifica seu nome no RPG ${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}.<br/>` 
        
        const actionCommands = `${command(["start_rpg"])}: Inicia o jogo.<br/>
                                ${command(["cls"])}: Limpa o console (fora do jogo).<br/>
                                ${command(["restart"])}: Reinicia o QTDOS.<br>
                                ${command(["delete_all"])}: Apaga todos os dados (conquistas, segredos, etc.) ${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}.<br/>
                                ${command(["restore"])}: Retorna dados comuns para as configurações de fabrica ${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}.`
                            
        const response = `<p></p>
                            Consulta:<br/>
                                ${tabulation(queryCommands, 1, true)}<p></p>
                            Modificação:<br/>
                                ${tabulation(modCommands, 1, true)}<p></p>
                            Ação:<br/>
                                ${tabulation(actionCommands, 1, true)}
                            `;
        return response;
    } 

    static q_achievements(){
        appendPromptContent("<p>FINAIS JÁ ENCONTRADOS:</p>");

        const discoveredFinals = rpgFinals.filter(f => f[1]);
        let completeHTML = "<div>";

        for(let i = 0; i < discoveredFinals.length; i++){
            const final= discoveredFinals[i][0];
            completeHTML += "<div>" + color(final, QTDOSPROCESS_HEXCOLOR) + "</div>"
        }

        completeHTML += "</div>";

        return completeHTML;
    }
}

export class SystemQTDOSManagement {

}
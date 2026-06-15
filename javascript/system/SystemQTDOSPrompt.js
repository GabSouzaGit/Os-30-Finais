import { 
    togglePromptContent,
    color,
    tabulation, 
    appendPromptContent,
    command,
    developing
} from "../utils.js";

import SystemQTDOSManagement from "./SystemQTDOSManagement.js";

export default class SystemQTDOSPrompt {
    static a_cls(){
        togglePromptContent();
        return ""
    }

    static a_restart(){
        SystemQTDOSManagement.dispatchRestart();
        window.location.reload();
    }

    static a_shutdown(){
        SystemQTDOSManagement.destroyCookieSession();
        window.location.reload();
    }

    static q_helpList(){
        const queryCommands = `${command([QTDOS_HELPC])}: Lista de comandos do sistema.<br/>
                               ${command([QTDOS_ACHIEVEMENTC])}: Lista de finais obtidos.<br/>
                               ${command([QTDOS_SECRC])}: Lista de segredos obtidos ${developing()}.<br/>
                               ${command([QTDOS_WHOAMIC])}: Exibe o nome atual.
                               `;
        
        const modCommands = `${command([QTDOS_MNAMEC, "seu nome"])}: Modifica seu nome no RPG. Digite "${QTDOS_MNAMEC} -h" para ver detalhes do comando.<br/>` 
        
        const actionCommands = `${command([QTDOS_STARTRPGC])}: Inicia o jogo.<br/>
                                ${command([QTDOS_CLSC])}: Limpa o console.<br/>
                                ${command([QTDOS_RESTARTC])}: Reinicia o QTDOS.<br>
                                ${command([QTDOS_SHUTDOWNC])}: Desliga o computador.<br/>
                                `;
        
                                
        const inGameCommands = `${command([QTDOS_EXITRPG])}: Encerra a execução do jogo.<br/>
                                ${command([QTDOS_REPEATRPG])}: Mostra novamente a mensagem do caminho. Use ${command([QTDOS_REPEATRPG_CFLAG])} para limpar o console antes de mostrar.<br/>
                                ${command([QTDOS_EFFECTRPG])}: Lista os efeitos ativos e os detalhes. ${developing()}.<br/>
                                ${command([QTDOS_TRACKRPG])}: Retorna o histórico de opções escolhidas ${developing()}.<br/>`;
                                
        const devCommands = `${command([QTDOS_FMTDEV])}: Formata todo o sistema, removendo todos os dados (sério, não brinque com ele (ó﹏ò｡) ).<br/>
                             `;

        const response = `<p></p>
                            Consulta:<br/>
                                ${tabulation(queryCommands, 1, true)}<p></p>
                            Modificação:<br/>
                                ${tabulation(modCommands, 1, true)}<p></p>
                            Ação:<br/>
                                ${tabulation(actionCommands, 1, true)}<p></p>
                            Durante o jogo (apenas estes funcionam durante o jogo):<br/>
                                ${tabulation(inGameCommands, 1, true)}<p></p>
                            Opções de desenvolvedor (use por conta e risco):<br/>
                                ${tabulation(devCommands, 1, true)}<p></p>
                            `;
        return response;
    } 

    static q_whoami(){
        return username;
    }

    static q_achievements(){
        appendPromptContent("<p>FINAIS JÁ ENCONTRADOS:</p>");

        const discoveredFinals = QTDOS_FINALS.filter(f => f[1]);
        let completeHTML = "<div>";

        for(let i = 0; i < discoveredFinals.length; i++){
            const final= discoveredFinals[i][0];
            completeHTML += "<div>" + color(final, QTDOSPROCESS_HEXCOLOR) + "</div>"
        }

        completeHTML += "</div>";

        return completeHTML;
    }

    static m_name(name){
        const regex = /[^A-Za-z0-9]/g;

        if(name == "-h") return `<p>Modifique seu nome com este comando. Algumas informações:</p>
                                ${color("* Seu nome precisa ter de 2 a 30 caracteres", QTDOSCRITICAL_HEXCOLOR)}<br/>
                                ${color("* Nada de caracteres especiais!", QTDOSCRITICAL_HEXCOLOR)}
                                <p>E só :)</p>
                                `;

        if(name.length < 2) return "Mas ai também não dá... (¬_¬)"
        if(name.length > 30) return "Vamo diminuir esse nome ai meu camarada? ¯\\_(ツ)_/¯";
        if(regex.test(name)) return "Pode ir arrumando isso... ( -_•)╦̵̵̿╤─";


        SystemQTDOSManagement.editUsername(name);

        return "Nome modificado com sucesso!";
    }
}
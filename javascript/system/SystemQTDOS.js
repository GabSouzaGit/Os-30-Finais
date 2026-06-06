import { 
    installationLogs,
    setupLogs
} from "../install/logs.js";

import { 
    togglePromptContent,
    color,
    sleep,
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

function relativeURL(url){
    const rurl = new URL(url, import.meta.url);
    return rurl.href;
}

export class SystemQTDOSSound {
    static TURNON_PC = "../audios/turnon.mp3";
    static KEYPRESSING = "";
    static ENTER_PRESS = "";
    static PC_IDLE = "";
    static PC_WARN = "";
    static PC_SUCESS = "";
    static PC_ERROR = "";

    static play(url){
        const javascriptAudio = new Audio(url);
        javascriptAudio.play();
    }

    static callTurnOnPCSong(){
        const url = relativeURL(SystemQTDOSSound.TURNON_PC);
        SystemQTDOSSound.play(url);
    }
}

export class SystemQTDOSPrompt {
    static a_cls(){
        togglePromptContent("");
        return ""
    }

    static a_restart(){
        SystemQTDOSManagement.dispatchRestart();
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

export class SystemQTDOSSetuping {
    static async turnOnPC(){
        const showBiosScreen = () => {
            turnOnWaitScreen.classList.add("hide");
            biosScreen.classList.remove("hide");
        }

        const showWaitingScreen = () => {
            biosScreen.classList.add("hide");
            turnOnWaitScreen.classList.remove("hide");
        }

        SystemQTDOSSound.callTurnOnPCSong();

        const turnOnWaitScreen = document.querySelector("#turn-on-wait-screen");
        const biosScreen = document.querySelector(".bios-container");
        const biosStylesheet = document.querySelector("#bios-stylesheet");
        
        turnOnWaitScreen.classList.remove("hide");
        
        await sleep(1000);
            showBiosScreen();

        await sleep(2000);
            showWaitingScreen();

        await sleep(1500);

        turnOnWaitScreen.remove();
        biosScreen.remove();
        biosStylesheet.remove();
        // Alcançar 26 segundos de inicialização (sincronizados com o som de inicialização).
    }

    static install(){
        return new Promise(async (resolve) => {
            const initDisplayer = document.createElement("div");
            document.body.appendChild(initDisplayer);
        
            for(let i = 0; i < installationLogs.length; i++){
                const [log, ms, tab] = installationLogs[i];
                
                if(tab > 0) initDisplayer.innerHTML += tabulation(log, tab);
                else initDisplayer.innerHTML += log;
        
                initDisplayer.innerHTML += "<br/>";
        
                window.scrollTo(0, document.body.scrollHeight);
        
                await sleep(ms);
            }

            SystemQTDOSManagement.completeSetup(
                {
                    installation: true, 
                    resolve
                }
            );
        });
    }

    static setup(){
        return new Promise(async (resolve) => {
            const initDisplayer = document.createElement("div");
            document.body.appendChild(initDisplayer);
        
            for(let i = 0; i < setupLogs.length; i++){
                const [log, ms, tab, asyncProcedure] = setupLogs[i];
                
                if(tab > 0) initDisplayer.innerHTML += tabulation(log, tab);
                else initDisplayer.innerHTML += log;

                initDisplayer.innerHTML += "<br/>";
                window.scrollTo(0, document.body.scrollHeight);

                if(asyncProcedure == undefined){
                    await sleep(ms);
                    continue;
                }
                
                await asyncProcedure(); // Função personalizada do log
            }

            SystemQTDOSManagement.completeSetup(
                {
                    installation: false, 
                    resolve
                }
            );
        });
    }
}

export class SystemQTDOSManagement {
    static QTDOS_HAS_INSTALLED_MEMKEY = "QTDOS_HAS_INSTALLED";
    static QTDOS_RESTART_KEY = "QTDOS_RESTART";

    static QTDOS_COOKIE_SESSION_KEY = "qtdos_active";
    static QTDOS_COOKIE_EXPIRATION = 24; // Em horas

    static isFirstAcess(){
        return localStorage.getItem(SystemQTDOSManagement.QTDOS_HAS_INSTALLED_MEMKEY) == null;
    }

    static dispatchRestart(){
        localStorage.setItem(SystemQTDOSManagement.QTDOS_RESTART_KEY, "1");
    }

    static itsRestarting(){
        const restart = localStorage.getItem(SystemQTDOSManagement.QTDOS_RESTART_KEY) != null; 
        
        if(restart) localStorage.removeItem(SystemQTDOSManagement.QTDOS_RESTART_KEY);

        return restart;
    }

    static completeSetup({ installation, resolve }){
        const ready = () => {
            document.removeEventListener('keypress', ready);
            document.removeEventListener('click', ready);

            if(installation) localStorage.setItem(SystemQTDOSManagement.QTDOS_HAS_INSTALLED_MEMKEY, '1');

            resolve();
        }

        document.addEventListener('click', ready);
        document.addEventListener('keypress', ready);
    }
}

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
 * @returns 
 */
function command(commandsep){
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

    if(commandsep[0].startsWith("/")){
        return color(commandsep[0], QTDOSSPECIAL_HEXCOLOR);
    }

    return color(commandsep[0], QTDOSCRITICAL_HEXCOLOR);
}

function developing(){
    return `${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}`;
}

function relativeURL(url){
    const rurl = new URL(url, import.meta.url);
    return rurl.href;
}

export class SystemQTDOSSound {
    static BASE_DIR = "../audios";
    static AUDIOS = [
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/turnon.mp3`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/keypressing.mp3`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/enter keypressing.mp3`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}`)),
    ];

    static PC_TURNON = 0;
    static KEYPRESSING = 1;
    static ENTER_PRESS = 2;
    static PC_IDLE = 3;
    static PC_WARN = 4;
    static PC_SUCESS = 5;
    static PC_ERROR = 6;

    static call(audioIndex){
        const audioObject = SystemQTDOSSound.AUDIOS[audioIndex];
        audioObject.currentTime = 0;
        
        audioObject.play();
    }

    static loop(){}
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
                                ${command([QTDOS_EFFECTRPG])}: Lista os efeitos ativos e os detalhes. ${developing()}.<br/>
                                ${command([QTDOS_TRACKRPG])}: Retorna o histórico de opções escolhidas ${developing()}.<br/>`;
                            
        const response = `<p></p>
                            Consulta:<br/>
                                ${tabulation(queryCommands, 1, true)}<p></p>
                            Modificação:<br/>
                                ${tabulation(modCommands, 1, true)}<p></p>
                            Ação:<br/>
                                ${tabulation(actionCommands, 1, true)}<p></p>
                            Durante o jogo (apenas estes funcionam durante o jogo):<br/>
                                ${tabulation(inGameCommands, 1, true)}<p></p>
                            `;
        return response;
    } 

    static q_whoami(){
        return SystemQTDOSManagement.getUsername();
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

        SystemQTDOSSound.call(
            SystemQTDOSSound.PC_TURNON
        );

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
    static QTDOS_USERNAME_KEY = "QTDOS_USERNAME";

    static QTDOS_COOKIE_SESSION_KEY = "qtdos_active_cookie";
    static QTDOS_COOKIE_FLAG = "1";
    static QTDOS_COOKIE_EXPIRATION = 24; // Em horas
    static QTDOS_COOKIE_HEADER = "path=/; SameSite=Strict; Secure"

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

    static defineCookieSession(){
        const cookieName = SystemQTDOSManagement.QTDOS_COOKIE_SESSION_KEY;
        const cookieValue = SystemQTDOSManagement.QTDOS_COOKIE_FLAG;
        const cookieHeader = SystemQTDOSManagement.QTDOS_COOKIE_HEADER;

        const expires = new Date().getTime() + SystemQTDOSManagement.QTDOS_COOKIE_EXPIRATION * 60 * 1000;

        const cookieMeta = `${cookieName}=${cookieValue}; ${expires}; ${cookieHeader}`;

        document.cookie = cookieMeta;
    }

    static cookieExists(){
        const cookies = decodeURIComponent(document.cookie).split(";");

        for(let i = 0; i < cookies.length; i++){
            const currentCookieID = cookies[i]
                                    .trim()
                                    .split("=")[0]; // Primeiro indice do cookie=value (id do cookie)

            if(currentCookieID == SystemQTDOSManagement.QTDOS_COOKIE_SESSION_KEY){
                return true
            }
        }

        return false;
    }

    static destroyCookieSession(){
        const cookieName = SystemQTDOSManagement.QTDOS_COOKIE_SESSION_KEY;
        document.cookie = `${cookieName}=; max-age=0; ${SystemQTDOSManagement.QTDOS_COOKIE_HEADER}`;
    }

    static giveBasicUserProfile(){
        if(localStorage.getItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY) == undefined){
            localStorage.setItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY, "guest");
        }
    }

    static editUsername(name){
        localStorage.setItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY, name);
    }

    static getUsername(){
        return localStorage.getItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY);
    }
}

import { 
    sleep,
    tabulation, 
} from "../utils.js";

import { 
    installationLogs,
    setupLogs
} from "../install/logs.js";

import SystemQTDOSSound from "./SystemQTDOSSound.js";
import SystemQTDOSManagement from "./SystemQTDOSManagement.js";

export default class SystemQTDOSSetuping {
    static async turnOnPC(){
        const turnOnWaitScreen = document.querySelector("#turn-on-wait-screen");
        const biosScreen = document.querySelector(".bios-container");
        const biosStylesheet = document.querySelector("#bios-stylesheet");

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
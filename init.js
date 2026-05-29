import { boot } from "./javascript/boot.js";
import { togglePromptContent } from "./javascript/utils.js";
import { SystemQTDOSManagement, SystemQTDOSSetuping } from "./javascript/system/SystemQTDOS.js";

const turnOnButton = document.querySelector("#turn-on-button");

/*
function relativeURLFrom(url){
    const rurl = new URL(url, import.meta.url);
    return rurl.href;
}
const url = relativeURLFrom("./javascript/audios/boot.mp3")
console.log(url);

const javascriptAudio = new Audio(url);
javascriptAudio.play();
    */

async function bootSystemHandler(){
    const firstAccess = SystemQTDOSManagement.isFirstAcess();
    
    await SystemQTDOSSetuping.turnOnPC();

    document.body.classList.remove("body-before-init");
    togglePromptContent();

    if(firstAccess) await SystemQTDOSSetuping.install(); 
    else            await SystemQTDOSSetuping.setup();

    boot();
}

turnOnButton.addEventListener('click', async () => {
    await bootSystemHandler();
});

document.addEventListener("DOMContentLoaded", async () => {
    const biosDate = document.querySelector("#bios-date");
    biosDate.textContent = "Generated at: "+ new Date().toLocaleDateString();

    if(SystemQTDOSManagement.itsRestarting()) await bootSystemHandler();
});

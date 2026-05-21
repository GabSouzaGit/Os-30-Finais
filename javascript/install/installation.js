import { logs } from "./logs.js";
import { sleep, tabulation } from "../utils.js";

export async function setup(){
    const initDisplayer = document.createElement("div");
    document.body.appendChild(initDisplayer);

    for(let i = 0; i < logs.length; i++){
        const [log, ms, tab] = logs[i];
        
        if(tab > 0) initDisplayer.innerHTML += tabulation(log, tab);
        else initDisplayer.innerHTML += log;

        initDisplayer.innerHTML += "<br/>";

        window.scrollTo(0, document.body.scrollHeight);

        await sleep(ms);
    }

    return true;
}

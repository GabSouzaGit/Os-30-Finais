import { setup } from "./javascript/install/installation.js";
import boot from "./javascript/boot.js";

function completeInstallation(){
    document.removeEventListener('keypress', clearListenerOnPC);
    document.removeEventListener('click', clearListenerOnSmartphone);

    localStorage.setItem('QTDOS_HAS_INSTALLED', '1');

    boot();
}

function clearListenerOnPC(){
    completeInstallation();
}

function clearListenerOnSmartphone(){
    completeInstallation();
}

document.addEventListener('DOMContentLoaded', async () => {
    const firstAccess = localStorage.getItem('QTDOS_HAS_INSTALLED') == null;

    if(firstAccess) { 
        const setupEnd = await setup(); 

        if(setupEnd){
            document.addEventListener('click',    clearListenerOnSmartphone);
            document.addEventListener('keypress', clearListenerOnPC);
        }

        return;
    }

    boot();
});

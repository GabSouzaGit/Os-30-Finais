export default class SystemQTDOSManagement {
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
            
            if(installation) {
                SystemQTDOSManagement.giveBasicUserProfile();
                localStorage.setItem(SystemQTDOSManagement.QTDOS_HAS_INSTALLED_MEMKEY, '1');

                resolve();
                return;
            }

            SystemQTDOSManagement.recoveryUserData();
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
            SystemQTDOSManagement.editUsername("guest");
        }

        SystemQTDOSManagement.recoveryUserData();
    }

    static editUsername(name){
        localStorage.setItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY, name);
        username = localStorage.getItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY);
    }

    static getUsername(){
        return username;
    }

    static recoveryUserData(){
        username = localStorage.getItem(SystemQTDOSManagement.QTDOS_USERNAME_KEY);
    }
}

import SystemQTDOSSound from "./system/SystemQTDOSSound.js";

/**
 * 
 * @param {string} text Texto que será colorido.
 * @param {string} c Cor em haxadecimal.
 * @returns Texto colorido.
 */
export function color(text, c){
    return `<span style="color: ${c}">${text}</span>`;
}

/**
 * 
 * @param {number} ms Tempo em milissegundos.
 * @description Pausa execução pelo tempo em milissegundos definido pelo argumento.
 */
export function sleep(ms){
    return new Promise((resolve) => {
        let timeout = setTimeout(() => {
            resolve();
            clearTimeout(timeout);
        }, ms);
    });
}

/**
 * 
 * @returns Mensagem de boas vindas do prompt.
 */
export function greetings(){
    const QTDOS_GREETINGS = `${color("Seja bem vindo ao QTDOS!", QTDOSHEAL_HEXCOLOR)}<br/>
                                 ${color("Versão 1.0.05.7x64", QTDOSPROCESS_HEXCOLOR)}<br/>
                                 Todos os direitos reservados.<p></p>
                                 Digite ${QTDOS_HELPC} para ver todos os comandos.<p></p>`;

    return QTDOS_GREETINGS;
}

/**
 * @description Pula uma linha no prompt atual.
 */
export function skipLineInPrompt(){
    const br = document.createElement("br");
    document.body.appendChild(br);
}

/**
 * @description Pula parágrafo no prompt atual.
 */
export function skipParagraphInPrompt(){
    const p = document.createElement("p");
    document.body.appendChild(p);
}

/**
 * 
 * @description Substitui todo o conteudo do prompt por outro elemento ou texto.
 * @param {string} html Conteudo HTML que vai substituir o conteúdo.
 */
export function togglePromptContent(html = ""){
    document.body.innerHTML = html;
}

/**
 * @description Insere um novo conteúdo no documento, abaixo dos demais.
 * @param {string} html Conteúdo HTML ou texto que será adicionado.
 */
export function appendPromptContent(html){
    const span = document.createElement('span');
    span.innerHTML = html;
    document.body.appendChild(span);

    skipParagraphInPrompt();
}

/**
 * 
 * @param {string} html Texto ou elemento HTML serializado.
 * @param {number} tab Multiplicador de tabulação padrão.
 * @param {boolean} stacked Indica se a tabulação é para um elemento ou pilha de elementos.
 * @returns Elemento ou pilha de elementos com tabulação personalizada.
 */
export function tabulation(html, tab, stacked = false){
    const tagname = stacked ? "div" : "span";

    return `<${tagname} style="margin-left: ${tab * QTDOSTAB_MULTIPLIER}px">${html}</${tagname}>`;
}

/**
 * 
 * @param {(value : string) => void} eventHandler Função que será disparada quando o o valor do input for enviado.
 * @returns Nova instancia do input do prompt.
 */
export function createSecretInput(eventHandler){
    const secretInput = document.createElement('input');

    function keyPressingSoundHandler(event){
        SystemQTDOSSound.call(
            SystemQTDOSSound.KEYPRESSING
        );
    }

    function handlerWrapper(event){
         if(event.key == "Enter") {
            SystemQTDOSSound.call(
                SystemQTDOSSound.ENTER_PRESS
            );

            const input = document.querySelector("#secret-input");
            const value = input.value;

            eventHandler(value.trim());
                         
            document.removeEventListener("keypress", handlerWrapper);
            input.removeEventListener("input", keyPressingSoundHandler);

            if(input.value != ""){
                commandHistory.push(input.value);
                historyIndex = commandHistory.length;
    
                if(commandHistory.length > 10){
                    commandHistory.shift();
                    historyIndex--;
                    return;
                }
            }
        }
    }
    
    document.addEventListener("keypress", handlerWrapper);
    secretInput.addEventListener("input", keyPressingSoundHandler);

    secretInput.type = "text";
    secretInput.id = "secret-input";
    secretInput.autocomplete = "off";

    return secretInput;
}

/**
 * 
 * @param {number} percentual Numero entre 1 e 0 que represente a chance de um retorno verdadeiro.
 * @returns {boolean} Valor verdadeiro de ocorrer tal possibilidade, senão, falso.
 */
export function chance(percentual){
    if (percentual > 1 || percentual < 0) {
        throw new Error('O percentual precisa ser um numero entre 0 e 1');
    }

    return Math.random() < percentual;
}

/**
 * 
 * @description Retorna o texto comando colorido de acordo com o prefixo e a adicional dele (parametro, flag, etc;)
 * @param {string[]} commandsep Um array contendo o comando (indice 0) e os demais parametros.
 * 
 */
export function command(commandsep){
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

    if(commandsep[0].startsWith("$_")){
        return color(commandsep[0], QTDOSDEV_HEXCOLOR);
    }

    return color(commandsep[0], QTDOSCRITICAL_HEXCOLOR);
}

/**
 * 
 * @description Devolve sinalização de desenvolvimento para qualquer texto.
 */
export function developing(){
    return `${color("(em desenvolvimento)", QTDOSHEAL_HEXCOLOR)}`;
}

/**
 * 
 * @param {string} url URL do arquivo.
 * @returns Retorna a URL relativa do caminho para acesso de arquivos.
 */
export function relativeURL(url){
    const rurl = new URL(url, import.meta.url);
    
    return rurl.href;
}
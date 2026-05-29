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
                                 Digite --help ou -h para ver os possiveis comandos.<p></p>`;

    return QTDOS_GREETINGS;
}

/**
 * @description Pula uma linha no prompt atual.
 */
export function skipLineInPrompt(){
    document.body.innerHTML += "<br/>"
}

/**
 * @description Pula parágrafo no prompt atual.
 */
export function skipParagraphInPrompt(){
    document.body.innerHTML += "<p></p>";
}

/**
 * 
 * @description Substitui todo o conteudo do prompt por outro elemento ou texto.
 * @param {string} html Conteudo HTML que vai substituir o conteúdo.
 */
export function togglePromptContent(html = ""){
    document.body.innerHTML = html;
}

export function appendPromptContent(html){
    document.body.innerHTML += html;
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

    function handlerWrapper(event){
         if(event.key == "Enter") {
            const input = document.querySelector("#secret-input");
            const value = input.value;

            eventHandler(value.trim());
                         
            document.removeEventListener("keypress", handlerWrapper);
        }
    }
    
    document.addEventListener("keypress", handlerWrapper);

    secretInput.type = "text";
    secretInput.id = "secret-input";
    secretInput.autocomplete = "off";

    return secretInput;
}
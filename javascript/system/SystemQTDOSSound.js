import { relativeURL } from "../utils.js";

export default class SystemQTDOSSound {
    static BASE_DIR = "/javascript/audios";
    static AUDIOS = [
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/turnon.mp3`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/keypressing.mp3`)),
        new Audio(relativeURL(`${SystemQTDOSSound.BASE_DIR}/enter keypressing.mp3`)),
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
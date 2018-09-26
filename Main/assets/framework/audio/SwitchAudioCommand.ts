// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html





import {ICommand} from "../facade/ICommand";
import {Music} from "./Music";
import Window from "../component/View";

const {ccclass, property} = cc._decorator;

@ccclass("SwitchAudioCommand")
export default class SwitchAudioCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise(async resolve => {
            let flag = !Music.getMusicOpen();
            if (typeof args[0] == "object" && args[0].constructor == cc.Toggle){
                flag = args[0].isChecked;
                if (flag != Music.getMusicOpen()){
                    Window.executeClickSoundCommand(args[0], args[1]);
                }
            }
            Music.setMusicOpen(flag);
            Music.sfxOpen = flag;
            Music.persistence();
            resolve();
        });
    }
}

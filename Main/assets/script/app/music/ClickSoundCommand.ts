// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {ICommand} from "../../../framework/facade/ICommand";
import {MusicPaths} from "../config/MusicPaths";
import {Music} from "../../../framework/audio/Music";

const {ccclass, property} = cc._decorator;

@ccclass("ClickSoundCommand")
export default class ClickSoundCommand implements ICommand {

    async execute (...args):Promise{
        let event = args[0];
        let data = args[1];
        /** 这里可以做一些过滤或特殊处理 */
        Music.playSFX(MusicPaths.ClickUI);
    }
}

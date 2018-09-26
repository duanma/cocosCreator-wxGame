// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {Music} from "../audio/Music";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("自定义/ButtonSoundPlay")
export default class ButtonSoundPlay extends cc.Component {

    @property({type:cc.AudioClip})
    audioClip:cc.AudioClip = null;

    @property
    text: string = 'hello';

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.handleEvent, this);
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.handleEvent, this);
    }

    async handleEvent(event){
        let audioClip:cc.AudioClip = this.audioClip;
        if (!audioClip){
            audioClip = await cc.loader.loadResAwait("Sound/click.mp3");
        }
        Music.playSFX(audioClip);
    }

}

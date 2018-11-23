// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {Music} from "../../../framework/audio/Music";
import Facade from "../../../framework/facade/Facade";
import View from "../../../framework/component/View";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeMediator extends cc.Component {

    @property(cc.Toggle)
    soundToggle:cc.Toggle = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.updateSound();
        let checkEventHandler = new cc.Component.EventHandler();
        checkEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        checkEventHandler.component = "HomeMediator";
        checkEventHandler.handler = "soundToggleCallback";
        checkEventHandler.customEventData = "";

        this.soundToggle.checkEvents.push(checkEventHandler);
    }

    soundToggleCallback(event, data){
        View.executeClickSoundCommand(event, data);
        Facade.executeCommand("SwitchAudioCommand", event);
    }

    updateSound(){
        if (Music.getMusicOpen()){
            this.soundToggle.check();
        }else {
            this.soundToggle.uncheck();
        }
    }
}




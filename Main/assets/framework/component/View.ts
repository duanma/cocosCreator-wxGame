// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ext} from "../extend/Extend";
import Facade from "../facade/Facade";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("自定义/View")
export default class View extends cc.Component {

    static clickSoundCommand:string = null;

    static IPHONEX_TOP_BLACK_HEIGHT = 66;

    @property({displayName:"启动命令", tooltip:"加载成功后执行启动命令"})
    startCommandName = "";

    @property({type:cc.Widget, displayName:"适配IphoneX", tooltip:"widget.top += 66"})
    adapterIphoneX:[cc.Widget] = [];

    @property({type:cc.Widget, displayName:"绑定Canvas", tooltip:"widget.target=canvas"})
    targetToCanvas:[cc.Widget] = [];

    @property({type:cc.Node, displayName:"设置屏幕大小", tooltip:"node.setContentSize(screenSize)"})
    screenSize:[cc.Node] = [];

    @property
    releasePrefab = false;

    onLoad(){
        if (ext.isIphoneX){
            this.adapterIphoneX.forEach(value => value.top += View.IPHONEX_TOP_BLACK_HEIGHT);
        }
        this.targetToCanvas.forEach(value => value.target = Facade.canvasNode);
        this.screenSize.forEach(value => value.setContentSize(Facade.canvasNode.getContentSize()))
    }

    start(){
        if (this.startCommandName != ""){
            Facade.executeCommand(this.startCommandName);
        }
    }

    onDestroy(){
        if (this.releasePrefab){
            Facade.releasePrefab("Prefab/"+this.node.name);
        }
    }

    /**
     * @param data commandName
     * */
   async closeView(event, data){
       if(typeof data == "string" && data != ""){
           await Facade.executeCommand(data);
       }
       await Facade.executeCommand("CloseViewCommand", this.node.name);
    }

    /**
     * @param data commandName
     * */
    async closeViewWithClickSound(event, data){
        View.executeClickSoundCommand(event, data);
        await this.closeView(event, data);
    }

    /**
     * @param data prefabName
     * */
    async openView(event, data){
        await Facade.executeCommand("OpenViewCommand", data);
    }

    /**
     * @param data prefabName
     * */
    async openViewWithClickSound(event, data){
        View.executeClickSoundCommand(event, data);
        await this.openView(event, data);
    }

    /**
     * @param data sceneName
     * */
    async loadScene(event, data){
        await Facade.executeCommand("LoadSceneCommand", data);
    }

    /**
     * @param data sceneName
     * */
    async loadSceneWithClickSound(event, data){
        View.executeClickSoundCommand(event, data);
        await Facade.executeCommand("LoadSceneCommand", data);
    }


    /**
     * @param data commandName
     * */
    async executeCommand(event, data){
        await Facade.executeCommand(data, event);
    }

    /**
     * @param data commandName
     * */
    async executeCommandWithClickSound(event, data){
        View.executeClickSoundCommand(event, data);
        await this.executeCommand(event, data);
    }


    /**
     * 点击按钮时播放声音
     * */
    static executeClickSoundCommand(event, data){
        if (View.clickSoundCommand){
            Facade.executeCommand(View.clickSoundCommand, event, data);
        }
    }




}

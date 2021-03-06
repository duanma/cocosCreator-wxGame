// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Facade, {CanvasEvent} from "../facade/Facade";
import {ICommand} from "../facade/ICommand";

const {ccclass, property} = cc._decorator;

@ccclass("ShowCommand")
export default class ShowCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise((resolve, reject) => {
            let scene = cc.director.getScene();
            console.log("WXSub===>sceneName="+scene.name);
            let onLaunch = function () {
                Facade.canvasNode.active = true;
                Facade.canvasNode.emit(CanvasEvent.domainShow);
            };

            if(scene.name != args[0]){
                Facade.canvasNode.active = false;
                cc.director.loadScene(args[0], onLaunch);
            }else {
                Facade.canvasNode.emit(CanvasEvent.domainShow);
            }
        });
    }
}

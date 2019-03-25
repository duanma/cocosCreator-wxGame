// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ICommand} from "./ICommand";
import Facade from "./Facade";

const {ccclass, property} = cc._decorator;

let currentSceneName:string = "WelcomeScene";

let blockInputNode:cc.Node = null;

@ccclass("LoadSceneCommand")
export default class LoadSceneCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise(async(resolve, reject) => {
            /** 由于cocos切换场景在部分android手机上会黑屏一下，所以加载场景改为加载对应prefab */
            /*cc.director.loadScene(sceneName, function () {
                resolve();
            })*/
            let sceneName = args[0];
            console.log(sceneName, "sceneName.");
            if (blockInputNode == null){
                blockInputNode = new cc.Node();
                blockInputNode.zIndex = cc.macro.MAX_ZINDEX;
                blockInputNode.addComponent(cc.BlockInputEvents);
                blockInputNode.setContentSize(cc.view.getVisibleSize());
                blockInputNode.setPosition(cc.view.getViewportRect().center);
                blockInputNode.setParent(cc.director.getScene());
            }

            blockInputNode.active = true;
            let prefab = await cc.loader.loadResAwait("prefab/"+sceneName, cc.Prefab);
            /** 先把场景上的资源都干掉除了摄像机 */
            let deletes = Facade.canvasNode.children.filter(value => value.getComponent(cc.Camera) == null);
            deletes.forEach(value => {
                value.removeFromParent(true);
                value.destroy();
            });
            blockInputNode.active = false;
            let node:cc.Node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);
            currentSceneName = sceneName;
            resolve(node);
        });
    }
}

export function getCurrentSceneName():string {
    return currentSceneName;
}

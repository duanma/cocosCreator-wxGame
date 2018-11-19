// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import Facade from "../facade/Facade";
import preventExtensions = Reflect.preventExtensions;

const {ccclass, property, menu, executionOrder} = cc._decorator;

let bLaunch = false;


@ccclass
@menu("自定义/CanvasMediator")
@executionOrder(-10)
export default class CanvasMediator extends cc.Component {

    @property(cc.Prefab)
    scenePrefab:cc.Prefab = null;

    async onLoad () {
        // console.log(this);
        Facade.canvasNode = this.node;
        if (this.scenePrefab){
            let node = cc.instantiate(this.scenePrefab);
            node.setParent(this.node);
        }
        if (!bLaunch){
            let [result] = await Facade.executeCommand("StartupCommand");
            if (result){
                console.log("程序启动成功...");
            } else {
                console.log("程序启动失败!!!");
            }
            bLaunch = true;
        }
    }

    onDestroy(){
        Facade.canvasNode = null;
    }

}

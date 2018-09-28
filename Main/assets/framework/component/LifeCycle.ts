// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class LifeCycle extends cc.Component {

    addCall(lifeName:String, callFunc:Function, callObj?:Object){
        let thatCall = this[lifeName];
        this[lifeName] = function () {
            if (thatCall){
                thatCall();
            }
            if (callObj){
                callFunc.call(callObj);
            } else {
                callFunc();
            }
        }
    }

    static onDestroyFollow(node:cc.Node, followNode:cc.Node){
        let lifeCycle = followNode.addComponent(LifeCycle);
        lifeCycle.addCall("onDestroy", function () {
            if (node.isValid){
                node.destroy();
            }
        });
    }

    static onDisableFollow(node:cc.Node, followNode:cc.Node){
        let lifeCycle = followNode.addComponent(LifeCycle);
        lifeCycle.addCall("onDisable", function () {
            node.active = false;
        });
    }

    static onEnableFollow(node:cc.Node, followNode:cc.Node){
        let lifeCycle = followNode.addComponent(LifeCycle);
        lifeCycle.addCall("onEnable", function () {
            node.active = true;
        });
    }
}

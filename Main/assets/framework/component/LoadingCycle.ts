// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import Actions from "../actions/Actions";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingCycle extends cc.Component {

    @property({displayName:"360度分成多少份"})
    partNum: number = 1;

    @property({displayName:"下一帧的延时"})
    interval: number = 0;

    @property(cc.Node)
    targetNode:cc.Node = null;


    async start () {
        let angle = 360/this.partNum;
        let self = this;
        let call = function(){
            self.targetNode.rotation += angle;
        };
        this.targetNode.runAction(Actions.scheduleCall(this.interval, call));
    }
}

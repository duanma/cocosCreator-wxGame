// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, menu} = cc._decorator;

@ccclass
@menu("自定义/PauseAllRunningActions")
export default class PauseAllRunningActions extends cc.Component {

    private pauseNodes:Array<cc.Node> = [];
    onLoad () {
        this.pauseNodes = cc.director.getActionManager().pauseAllRunningActions();
        console.log("PauseAllRunningActions==>onLoad", this.pauseNodes);
    }

    onDestroy(){
        console.log("PauseAllRunningActions==>onDestroy", this.pauseNodes);
        cc.director.getActionManager().resumeTargets(this.pauseNodes);
    }
}

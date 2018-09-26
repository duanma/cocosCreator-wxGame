// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import RankTodayItemMediator from "./RankTodayItemMediator";
import TableViewMediator from "../../../framework/tableview/TableViewMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankTodayMediator extends cc.Component {

    @property({type:cc.SpriteFrame})
    topThreeSpriteFrames:[cc.SpriteFrame] = [];

    @property(TableViewMediator)
    tableViewMediator:TableViewMediator = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        RankTodayItemMediator.topThreeSpriteFrames = this.topThreeSpriteFrames;
    }

    setData(data){
        this.tableViewMediator.setData(data);
    }
}

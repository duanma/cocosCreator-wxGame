// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import OverRankItemMediator from "./OverRankItemMediator";
import {World} from "../../info/World";
import {ext} from "../../facade/Extend";
import Facade, {CanvasEvent} from "../../facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OverMediator extends cc.Component {

    static myScore = 0;

    @property({type:OverRankItemMediator})
    rankItemList:[OverRankItemMediator] = [];

    @property({type:cc.Label})
    maxScoreLabel:cc.Label = null;

    @property({type:cc.Label})
    scoreLabel:cc.Label = null;

    otherDataList = [];

    maxScore = 0;

    onLoad(){
        Facade.canvasNode.on(CanvasEvent.domainShow, this.handleDomainShow, this);
    }

    onDestroy(){
        Facade.canvasNode.off(CanvasEvent.domainShow, this.handleDomainShow, this);
    }

    handleDomainShow(event){
        this.start();
    }

    start () {
        /** 取数据 */
        let self = this;
        this.otherDataList = World.friendOrderData.filter(value => {
            if (value["openid"] != World.My.openId){
                return true;
            } else {
                self.maxScore = value["wxStorageFormat"].score;
                return false;
            }
        });
        this.maxScore = Math.max(this.maxScore, OverMediator.myScore);

        this.maxScoreLabel.string = `历史最高分：${this.maxScore}`;
        this.scoreLabel.string = OverMediator.myScore.toString();

        let myItem = this.rankItemList[1];
        ext.wxCreateImageToSprite(myItem.headSprite, World.My.avatarUrl);
        myItem.nameLabel.string = World.My.nickName;
        myItem.scoreLabel.string = this.maxScore.toString();

        this.updateRank();
    }

    updateRank(){
        let myRank = this.otherDataList.length + 1;
        let index = this.otherDataList.findIndex(value => value["wxStorageFormat"].score <= this.maxScore);
        if (index >= 0){
            myRank = index+1;
        }
        let myItem = this.rankItemList[1];
        myItem.rankLabel.string = myRank.toString();

        let prevItem = this.rankItemList[0];
        prevItem.node.active = myRank > 1;
        if (myRank > 1){
            prevItem.rankLabel.string = (myRank-1).toString();
            let data = this.otherDataList[myRank-2];
            prevItem.scoreLabel.string = data["wxStorageFormat"].score.toString();
            prevItem.nameLabel.string = data["nickname"];
            ext.wxCreateImageToSprite(prevItem.headSprite, data.avatarUrl);
        }

        let lastItem = this.rankItemList[2];
        lastItem.node.active = myRank < this.otherDataList.length+1;
        if (myRank < this.otherDataList.length+1){
            lastItem.rankLabel.string = (myRank+1).toString();
            let data = this.otherDataList[myRank-1];
            lastItem.scoreLabel.string = data["wxStorageFormat"].score.toString();
            lastItem.nameLabel.string = data["nickname"];
            ext.wxCreateImageToSprite(lastItem.headSprite, data.avatarUrl);
        }
    }


}

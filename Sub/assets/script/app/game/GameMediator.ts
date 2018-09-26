// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {World} from "../../info/World";
import {ext} from "../../facade/Extend";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMediator extends cc.Component {

    @property({type:cc.Label})
    maxScoreLabel: cc.Label = null;

    @property({type:cc.Sprite})
    mIconSprite: cc.Sprite = null;

    @property({type:cc.Label})
    mScoreLabel: cc.Label = null;

    @property({type:cc.Label})
    mRankLabel: cc.Label = null;


    @property({type:cc.Sprite})
    oIconSprite: cc.Sprite = null;

    @property({type:cc.Label})
    oScoreLabel: cc.Label = null;

    @property({type:cc.Label})
    oRankLabel: cc.Label = null;

    myScore = 0;

    maxScore = 0;

    otherDataList = [];

    onLoad () {
        ext.wxCreateImageToSprite(this.mIconSprite, World.My.avatarUrl);
        this.updateFirendData();
    }

    updateFirendData(){
        let self = this;
        this.otherDataList = World.friendOrderData.filter(value => {
            if (value["openid"] != World.My.openId){
                return true;
            } else {
                self.maxScore = value["wxStorageFormat"].score;
                return false;
            }
        });
        this.updateRank();
    }

    setMyScore(score:Number){
        this.myScore = score;
        if (this.maxScore < this.myScore){
            this.maxScore = this.myScore;
        }
        this.updateRank();
    }

    updateRank(){
        /** 根据我的分数查找排名 */
        let myRank = this.otherDataList.length + 1;
        let index = this.otherDataList.findIndex(value => value["wxStorageFormat"].score <= this.myScore);
        if (index >= 0){
            myRank = index+1;
        }
        this.mScoreLabel.string = this.myScore.toString();
        this.mRankLabel.string = `第 ${myRank} 名`;

        /** 竞争对手的排名 */
        let otherRank = myRank-1;
        let hasOther = otherRank > 0;
        this.oIconSprite.node.active = hasOther;
        this.oScoreLabel.node.active = hasOther;
        this.oRankLabel.node.active = hasOther;
        if (hasOther){
            let oData = this.otherDataList[otherRank-1];
            ext.wxCreateImageToSprite(this.oIconSprite, oData.avatarUrl);
            this.oRankLabel.string = `第 ${otherRank} 名`;
            this.oScoreLabel.string = oData["wxStorageFormat"].score;
        }

        this.maxScoreLabel.string = `最高分数：${this.maxScore}`;
    }

}

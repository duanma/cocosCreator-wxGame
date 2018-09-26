// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {ITableItem} from "../../../framework/tableview/ITableItem";
import {ext} from "../../../framework/extend/Extend";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankTodayItemMediator extends cc.Component implements ITableItem {

    @property({type:cc.Sprite})
    bgSprite:cc.Sprite = null;

    @property({type:cc.Label})
    rankLabel:cc.Label = null;

    @property({type:cc.Label})
    nameLabel:cc.Label = null;

    @property({type:cc.Label})
    scoreLabel:cc.Label = null;

    @property({type:cc.Sprite})
    headSprite:cc.Sprite = null;

    @property({type:cc.Sprite})
    topThreeSprite:cc.Sprite = null;

    static topThreeSpriteFrames:[cc.SpriteFrame] = [];

    upadteItem(data:any, index:number){
        if (index >= 0 && index <=2){
            this.topThreeSprite.node.active = true;
            this.rankLabel.node.active = false;

            this.topThreeSprite.spriteFrame = RankTodayItemMediator.topThreeSpriteFrames[index];
        } else {
            this.topThreeSprite.node.active = false;
            this.rankLabel.node.active = true;
            this.rankLabel.string = "" + (index+1);
        }


        this.nameLabel.string = data.name;
        ext.wxCreateImageToSprite(this.headSprite, data.headUrl);

        this.scoreLabel.string = data.score.toString();

        this.bgSprite.node.active = index%2 == 0;
    }
}

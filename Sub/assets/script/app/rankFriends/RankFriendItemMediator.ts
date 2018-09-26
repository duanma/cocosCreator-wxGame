// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {ext} from "../../facade/Extend";
import {WxStorageFormat} from "../../storage/WxStorageFormat";
import {ITableItem} from "../../tableview/ITableItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankFriendItemMediator extends cc.Component implements ITableItem {

    @property({type:cc.Sprite})
    bgSprite:cc.Sprite = null;

    @property({type:cc.Label})
    rankNumLabel:cc.Label = null;

    @property({type:cc.Sprite})
    headSprite:cc.Sprite = null;

    @property({type:cc.Label})
    nameLabel:cc.Label = null;

    @property({type:cc.Label})
    scoreLabel:cc.Label = null;

    @property({type:cc.Sprite})
    topThreeSprite:cc.Sprite = null;

    static topThreeSpriteFrames:[cc.SpriteFrame] = [];

    upadteItem(data:any, index:number){
        // console.log(data, "WxSub=======>updateItem");
        // console.log(typeof index, "====index");
        if (index >= 0 && index <=2){
            this.topThreeSprite.node.active = true;
            this.rankNumLabel.node.active = false;

            this.topThreeSprite.spriteFrame = RankFriendItemMediator.topThreeSpriteFrames[index];
        } else {
            this.topThreeSprite.node.active = false;
            this.rankNumLabel.node.active = true;
            this.rankNumLabel.string = "" + (index+1);
        }


        this.nameLabel.string = data.nickname;
        ext.wxCreateImageToSprite(this.headSprite, data.avatarUrl);

        this.scoreLabel.string = (<WxStorageFormat>(data.wxStorageFormat)).score.toString();

        if (this.bgSprite){
            this.bgSprite.node.active = index%2 == 0;
        }
    }
}

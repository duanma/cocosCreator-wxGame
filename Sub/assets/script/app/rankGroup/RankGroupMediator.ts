// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import TableViewMediator from "../../tableview/TableViewMediator";
import {World} from "../../info/World";
import RankFriendItemMediator from "../rankFriends/RankFriendItemMediator";
import Facade, {CanvasEvent} from "../../facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankGroupMediator extends cc.Component {

    static groupOrderData = [];

    @property(RankFriendItemMediator)
    myItemMediator:RankFriendItemMediator = null;

    @property(TableViewMediator)
    tableViewMediator:TableViewMediator = null;

    @property({type:cc.SpriteFrame})
    topThreeSpriteFrames:[cc.SpriteFrame] = [];

    onLoad(){
        Facade.canvasNode.on(CanvasEvent.domainShow, this.handleDomainShow, this);
        this.myItemMediator.node.active = false;
    }

    onDestroy(){
        RankGroupMediator.groupOrderData = [];
        Facade.canvasNode.off(CanvasEvent.domainShow, this.handleDomainShow, this);
    }

    handleDomainShow(event){
        this.updateData(RankGroupMediator.groupOrderData);
    }

    start () {
        RankFriendItemMediator.topThreeSpriteFrames = this.topThreeSpriteFrames;
    }


    updateData(orderData:Array){
        this.tableViewMediator.setData(orderData);
        for(let i in orderData){
            if (orderData[i]["openid"] == World.My.openId){
                this.myItemMediator.node.active = true;
                this.myItemMediator.upadteItem(orderData[i], parseInt(i));
                break;
            }
        }
    }

}

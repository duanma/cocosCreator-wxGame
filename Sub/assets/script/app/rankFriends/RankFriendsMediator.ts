// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import RankFriendItemMediator from "./RankFriendItemMediator";
import {World} from "../../info/World";
import TableViewMediator from "../../tableview/TableViewMediator";
import Facade, {CanvasEvent} from "../../facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankFriendsMediator extends cc.Component {

    @property(RankFriendItemMediator)
    myItemMediator:RankFriendItemMediator = null;

    @property(TableViewMediator)
    tableViewMediator:TableViewMediator = null;

    onLoad(){
        Facade.canvasNode.on(CanvasEvent.domainShow, this.handleDomainShow, this);
        this.myItemMediator.node.active = false;
    }

    onDestroy(){
        Facade.canvasNode.off(CanvasEvent.domainShow, this.handleDomainShow, this);
    }

    handleDomainShow(event){
        this.updateData(World.friendOrderData);
    }


    updateData(orderData:Array){
        let newData = orderData.slice(0);
        newData.forEach((value, index) => value['dividing'] = index < orderData.length-1);
        this.tableViewMediator.setData(newData);
        for(let i in newData){
            if (newData[i]["openid"] == World.My.openId){
                this.myItemMediator.node.active = true;
                this.myItemMediator.upadteItem(newData[i], parseInt(i));
                this.myItemMediator.dividingLineNode.active = false;
                break;
            }
        }
    }

}

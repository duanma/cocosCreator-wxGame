// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ICommand} from "../facade/ICommand";
import {World} from "./World";
import Facade from "../facade/Facade";
import {WxStorageConverter} from "../storage/WxStorageConverter";
import RankFriendsMediator from "../app/rankFriends/RankFriendsMediator";
import {WxStorageFormat} from "../storage/WxStorageFormat";
import GameMediator from "../app/game/GameMediator";
import RankGroupMediator from "../app/rankGroup/RankGroupMediator";

const {ccclass, property} = cc._decorator;

@ccclass("LoadGroupCloudStorageCommand")
export default class LoadGroupCloudStorageCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise((resolve, reject) => {
            console.log(args[0], "===WxSub args[0]");
            wx.getGroupCloudStorage({
                shareTicket:args[0].shareTicket,
                keyList:args[0].keyList,
                success: function (res) {
                    console.log(typeof World.My.openId, "=======");
                    if (typeof World.My.openId == "undefined"){
                        console.error("WxSub==>ReadMyInfoCommand must be execute before LoadFriendCloudStorageCommand.");
                        return;
                    }
                    let friendData:Array = res.data.filter(value=>value.KVDataList.length > 0);
                    console.log(friendData, "=====");
                    let wxStorageConverter = new WxStorageConverter();
                    friendData.forEach(value=>{
                        if (value.KVDataList.length == 1){
                            /** 默认只保存一个排行榜(好友排行榜) */
                            value.wxStorageFormat = wxStorageConverter.decode<WxStorageFormat>(value.KVDataList[0].value, WxStorageFormat);
                        }else if (value.KVDataList.length > 1) {
                            console.error("WxSub===>有未处理的的排行数据");
                        }
                    });
                    /** 对数据排序 */
                    let orderData = friendData.sort(function (a, b) {
                        return a.wxStorageFormat.score < b.wxStorageFormat.score;
                    });
                    RankGroupMediator.groupOrderData = orderData;
                    // console.log(orderData, "Wx sub orderData===>");
                    let sceneName = cc.director.getScene().name;
                    switch (sceneName){
                        case "GroupRankScene":
                            let rankMediator = Facade.mediatorOf<RankGroupMediator>("rankGroup", RankGroupMediator);
                            if (rankMediator){
                                rankMediator.updateData(orderData);
                            }
                            break;
                        case "GameScene":
                            let gameMediator = Facade.mediatorOf<GameMediator>("top", GameMediator);
                            gameMediator.updateFirendData();
                            break;
                    }
                    resolve(true);
                },
                fail: function (res) {
                    console.log("WxSub==>getFriendCloudStorage fail", res);
                    reject(res);
                }
            });
        });
    }
}

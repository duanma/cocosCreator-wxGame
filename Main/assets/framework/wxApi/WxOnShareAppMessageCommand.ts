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
import {ext} from "../extend/Extend";
import {InviteConfig} from "../../script/app/config/InviteConfig";
import {NetworkConfig} from "../../script/app/config/NetworkConfig";
import {World} from "../../script/app/info/World";

const {ccclass, property} = cc._decorator;

@ccclass("WxOnShareAppMessageCommand")
export default class WxOnShareAppMessageCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise(resolve => {
            wx.onShareAppMessage(function (res) {
                let data = ext.randomElement(InviteConfig.datas);
                let title = data["title"];
                let imageUrl = NetworkConfig.host + "/cli/image/" + data["icon"];
                let query = `shareKey=share1&playerId=${World.My.playerId}`;
                return {
                    imageUrl : imageUrl,
                    title:  title,
                    query : query,
                }
            });
            resolve();
        });

    }
}


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
import Facade from "../facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass("WxOnShowCommand")
export default class WxOnShowCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise(async (resolve, reject) => {
            wx.onShow(async function (res) {
                if( res.shareTicket){ //群点开
                    //发送打开群排行榜界面 游戏返回主菜单
                    await Facade.executeCommand("ToHomeCommand");
                    await Facade.executeCommand("WxShowGroupCommand");
                    await Facade.executeCommand("WxLoadGroupCloudStorageCommand", res.shareTicket);
                    await Facade.executeCommand("ShowRankFriendsCommand");
                }
            });
            resolve();
        });
    }
}

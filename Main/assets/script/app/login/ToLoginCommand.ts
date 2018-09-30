// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {World} from "../info/World";
import {LoginProxy} from "./LoginProxy";
import LoginServerCommand from "./LoginServerCommand";
import {GroupConfig} from "../config/GroupConfig";
import {ICommand} from "../../../framework/facade/ICommand";
import {wxApi} from "../../../framework/wxApi/wxApi";
import Facade from "../../../framework/facade/Facade";
const {ccclass, property} = cc._decorator;

@ccclass("ToLoginCommand")
export default class ToLoginCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async resolve => {
            if (wxApi.enable){
                let separationLayer = Facade.addSeparationLayer(GroupConfig.ui, 0);
                let proxy = new LoginProxy();

                /** 获取userInfo */
                let userInfo:object = await proxy.getUserInfo();

                /** 设置玩家自己的信息 */
                World.My.nickName = userInfo.nickName;
                World.My.avatarUrl = userInfo.avatarUrl;
                World.My.gender = userInfo.gender;
                World.My.province = userInfo.province;
                World.My.city = userInfo.city;
                World.My.country = userInfo.country;

                console.log(userInfo, "userInfo");
                await Facade.executeCommand("LoginServerCommand");
                wx.postMessage({command:"ReadMyInfoCommand", data:{nickName:World.My.nickName, avatarUrl:World.My.avatarUrl, gender:World.My.gender, openId:World.My.openId}});
                separationLayer.destroy();
                await Facade.executeCommand("LoadSceneCommand", "HomeScene");
            }else {
                // await Facade.executeCommand("LoginServerCommand");
                await Facade.executeCommand("LoadSceneCommand", "HomeScene");
            }
            resolve();
        });
    }
}

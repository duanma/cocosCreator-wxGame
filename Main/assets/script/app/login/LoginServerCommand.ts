// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {LoginResponse} from "../http/LoginRespone";
import {World} from "../info/World";
import {AppConfig} from "../config/AppConfig";
import {LoginRequest} from "../http/LoginRequest";
import {ICommand} from "../../../framework/facade/ICommand";
import {wxApi} from "../../../framework/wxApi/wxApi";
import {HttpClient} from "../../../framework/http/HttpClient";

const {ccclass, property} = cc._decorator;

@ccclass("LoginServerCommand")
export default class LoginServerCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async(resolve, reject) => {
            let jsCode = null;
            try {
                let res = await wxApi.login();
                jsCode = res.code;
            }catch (e) {
                console.log("微信登陆失败==>jscode fail", e);
                reject();
                return;
            }

            let request = new LoginRequest();
            request.gameId = AppConfig.GameID;
            request.name = World.My.nickName;
            request.sex = World.My.gender;
            request.headUrl = World.My.avatarUrl;
            request.city = World.My.city;
            request.jsCode = jsCode;

            try {
                let loginInfo = <LoginResponse>await HttpClient.post("/game/login", request, new LoginResponse());
                /** 设置玩家信息 */
                World.My.playerId = loginInfo.playerId;
                World.My.openId = loginInfo.openid;
                World.My.rebirthCoins = loginInfo.rebirthCoins;
                World.My.todayAdd = loginInfo.todayAdd;
                World.My.lastAddTime = loginInfo.lastAddTime;
                World.My.bestScore = loginInfo.bestRecord;
                resolve();
            }catch (e) {
                console.error("http login", e);
                reject();
            }
        });
    }
}

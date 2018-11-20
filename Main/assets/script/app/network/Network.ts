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
import {NetworkConfig} from "../config/NetworkConfig";
import {AppConfig} from "../config/AppConfig";
import HttpProtocol from "../../../framework/http/HttpProtocol";
import {wxApi} from "../../../framework/wxApi/wxApi";
import {HttpClient} from "../../../framework/http/HttpClient";
import Facade from "../../../framework/facade/Facade";
import {HttpOption} from "../../../framework/http/HttpOption";

export default class Network {

    static async post(protocol:HttpProtocol, httpOption?:HttpOption):Promise{
        return new Promise(async(resolve, reject) => {
            try {
                let data = await HttpClient.post(protocol);
                resolve(data);
            }catch (e) {
                /** not login */
                if(e.status == -2){
                    try {
                        await Facade.executeCommand("LoginServerCommand");
                        let data = await Network.post(protocol, httpOption);
                        resolve(data);
                    }catch (e) {
                        reject();
                    }
                }else {
                    reject();
                }
            }
        });
    }

    static async login():Promise{
        return new Promise(async (resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/login";
            let request = {};
            if (NetworkConfig.host.startsWith("http://192.168")){
                request["token"] = "123456";
                request["platformId"] = 0;
            }else {
                try {
                    let res = await wxApi.login();
                    request["jsCode"] = res.code;
                    request["platformId"] = 1;
                }catch (e) {
                    console.log("微信登陆失败==>jscode fail", e);
                    reject();
                    return;
                }
            }

            request["gameId"] = AppConfig.GameID;
            request["name"] = World.My.nickName;
            request["sex"] = World.My.gender;
            request["headUrl"] = World.My.avatarUrl;
            request["city"] = World.My.city;
            protocol.request = request;
            let data = await Network.post(protocol);
            /** 设置玩家信息 */
            World.My.playerId = data["playerId"];
            World.My.openId = data["openid"];
            World.My.rebirthCoins = data["rebirthCoins"];
            World.My.todayAdd = data["todayAdd"];
            World.My.lastAddTime = data["lastAddTime"];
            World.My.bestScore = data["bestRecord"];
            World.My.diamond = data['diamond'];
            resolve();
        });
    }



    static async uploadScore(score:number):Promise{
        return new Promise(async (resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/addRecord";
            protocol.request = {gameId:AppConfig.GameID, key:AppConfig.rankKey, score:score};
            await Network.post(protocol);
            resolve();
        });
    }


    static async buyItem(itemId:number, num:number = 1):Promise{
        return new Promise(async(resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/mall/buy";
            protocol.request = {id:itemId, num:num};
            await Network.post(protocol);
            resolve();
        });
    }

    static async syncBought():Promise<Array>{
        return new Promise<Array>(async(resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/user/items";
            let list = <Array>await Network.post(protocol);
            resolve(list);
        });
    }

    static async totalRankList():Promise<Array>{
        return new Promise<Array>(async (resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/getTotalRank";
            protocol.request = {gameId: AppConfig.GameID, key:AppConfig.rankKey};
            let {list} = await Network.post(protocol);
            resolve(list);
        });
    }

    static async currentIllustration():Promise<number>{
        return new Promise<number>(async(resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/currentIllustration";
            protocol.request = {};
            let {id} = await Network.post(protocol);
            resolve(id);
        });
    }

    static async rewardIllustration():Promise<number>{
        return new Promise<number>(async(resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/rewardIllustration";
            protocol.request = {};
            let data = await Network.post(protocol);
            resolve();
        });
    }

    static async addDiamond(add:number):Promise<number>{
        return new Promise<number>(async (resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/user/addDiamond";
            protocol.request = {num:add};
            let {diamond} = await Network.post(protocol);
            resolve(diamond);
        });
    }

    static async expendDiamond(expend:number):Promise<number>{
        return new Promise<number>(async (resolve, reject) => {
            let protocol = new HttpProtocol();
            protocol.uri = "/game/user/expendDiamond";
            protocol.request = {num:expend};
            let {diamond} = await Network.post(protocol);
            resolve(diamond);
        });
    }
}

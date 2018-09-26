// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {AppConfig} from "../config/AppConfig";
import {GetRankTodayRequest} from "../http/GetRankTodayRequest";
import {GetRankTodayResponse} from "../http/GetRankTodayResponse";
import RankTodayMediator from "./RankTodayMediator";
import {GroupConfig} from "../config/GroupConfig";
import {ICommand} from "../../../framework/facade/ICommand";
import Facade from "../../../framework/facade/Facade";
import LifeCycle from "../../../framework/component/LifeCycle";
import {HttpClient} from "../../../framework/http/HttpClient";

const {ccclass, property} = cc._decorator;

@ccclass("ShowRankTodayCommand")
export default class ShowRankTodayCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise(async(resolve, reject) => {
            let separationLayer = Facade.addSeparationLayer(GroupConfig.ui, 0);
            let prefab = <cc.Prefab>await cc.loader.loadResAwait("prefab/todayRank", cc.Prefab);
            let node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);
            LifeCycle.onDestroyFollow(separationLayer, node);

            let request = new GetRankTodayRequest();
            request.gameId = AppConfig.GameID;
            request.key = AppConfig.rankKey;

            try {
                let response = <GetRankTodayResponse>await HttpClient.post("/game/getTotalRank", request, new GetRankTodayResponse());
                let rankTodayMediator = node.getComponent<RankTodayMediator>(RankTodayMediator);
                rankTodayMediator.setData(response.list);
            }catch (e) {
                if (e.status == -2){
                    await Facade.executeCommand("NoLoginDialogCommand");
                }else {
                    console.error(e);
                }
            }
            resolve();
        });
    }
}

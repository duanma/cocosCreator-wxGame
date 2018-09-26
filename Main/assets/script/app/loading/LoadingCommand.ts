// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import LoadingMediator from "./LoadingMediator";
import {ResConfig} from "../config/ResConfig";
import {ICommand} from "../../../framework/facade/ICommand";
import Facade from "../../../framework/facade/Facade";
import {ExcelConfig} from "../../../framework/config/ExcelConfig";

const {ccclass, property} = cc._decorator;

@ccclass("LoadingCommand")
export default class LoadingCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise(async resolve => {
            let loadingMediator = Facade.mediatorOf("loading", LoadingMediator);
            let [resources, urls] = await cc.loader.loadResDirAwait("prefab/", cc.Prefab, function (completeCount, totalCount, item) {
                loadingMediator.updateProgress(completeCount / totalCount);
            });
            await ExcelConfig.loadAllExcel("data/");
            let releaseArr = urls.filter(value=>ResConfig.retainPrefabs.indexOf(value)<0);
            // releaseArr.forEach(value=>Facade.releasePrefab(value, ["Prefab/login", "Prefab/home", "Prefab/download"]));
            // await Facade.executeCommand("GamePreLoadCommand");
            await Facade.executeCommand("WxLoadSubAllSceneCommand");
            await Facade.executeCommand("ToLoginCommand");
            cc.sys.garbageCollect();
            resolve(urls);
        });
    }
}

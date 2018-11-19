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
            let loadingMediator = Facade.mediatorOf("WelcomeScene", LoadingMediator);
            let fileNames = cc.loader.getFileNames("/", cc.Prefab);
            let totalCount = fileNames.length + 10;
            for (let i=0; i<fileNames.length; i++){
                await cc.loader.loadResAwait(fileNames[i], cc.Prefab);
                loadingMediator.updateProgress((i+1)/totalCount);
            }
            await ExcelConfig.loadAllExcel("data/");
            loadingMediator.updateProgress((fileNames.length +5)/totalCount);
            let releaseArr = fileNames.filter(value=>ResConfig.retainPrefabs.indexOf(value)<0);
            releaseArr.forEach(value=>Facade.releasePrefab(value, ["prefab/HomeScene", "prefab/WelcomeScene"]));
            // await Facade.executeCommand("GamePreLoadCommand");
            loadingMediator.updateProgress(1);
            await Facade.executeCommand("WxLoadSubAllSceneCommand");
            await Facade.executeCommand("ToLoginCommand");
            cc.sys.garbageCollect();
            resolve();
        });
    }
}

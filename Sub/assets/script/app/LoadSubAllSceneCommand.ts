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
const {ccclass, property} = cc._decorator;


function preloadScene(sceneName:string) {
    cc.director.preloadScene(sceneName, function (completedCount: number, totalCount: number, item: any) {
        if (completedCount == totalCount){
            console.log(`WxSub===>preloadScene(${sceneName}) completed.`);
        }
    }, function (error) {
        if (error == null){
            console.log(`WxSub===>onLoaded(${sceneName}) success.`);
        } else {
            console.log(`WxSub===>onLoaded(${sceneName}) fail.`);
            console.error(error);
        }
    });
}

@ccclass("LoadSubAllSceneCommand")
export default class LoadSubAllSceneCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise((resolve, reject) => {
            preloadScene("FriendRankScene");
            preloadScene("GameScene");
            preloadScene("GroupRankScene");
            preloadScene("OverScene");
            resolve();
        });
    }
}

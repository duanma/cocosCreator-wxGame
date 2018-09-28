// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ICommandInterceptor} from "../../../framework/interceptor/CommandInterceptor";
import {Music} from "../../../framework/audio/Music";
import {MusicPaths} from "../config/MusicPaths";
import Facade from "../../../framework/facade/Facade";
import LifeCycle from "../../../framework/component/LifeCycle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadSceneIntercetor implements ICommandInterceptor {

    /**
     * 加载场景之前处理
     * */
    async preHandle(...args):Promise{
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }



    /**
     * 加载场景完成之后处理
     * */
    async postHandle(...args):Promise{
        return new Promise(async (resolve, reject) => {
            let sceneName = args[0];
            if (sceneName == "HomeScene"){
                /** 背景音乐 */
                Music.setBgm(MusicPaths.HomeBg);
                /** 加载子工程好友排行数据 */
                await Facade.executeCommand("WxLoadFriendCloudStorageCommand");
                /** 显示新手引导 */
                let prefab = await cc.loader.loadResAwait("prefab/newbie", cc.Prefab);
                let node = cc.instantiate(prefab);
                let homeNode = Facade.canvasNode.getChildByName("home");
                let startGameNode = homeNode.getChildByName("startGame");
                node.position = startGameNode.position;
                node.setParent(Facade.canvasNode);
                LifeCycle.onDestroyFollow(node, homeNode);

            }else if (sceneName == "GameScene"){
                /** 背景音乐 */
                Music.setBgm(MusicPaths.GameBg);
            }else if (sceneName == "GameOverScene"){
                Music.stopBGM();
            }
            resolve();
        });
    }
}

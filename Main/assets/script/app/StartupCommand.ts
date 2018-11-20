// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {AppConfig} from "./config/AppConfig";
import {AdConfig} from "./config/AdConfig";
import {NetworkConfig} from "./config/NetworkConfig";
import {localStorageKeys} from "./config/LocalStorageKeys";
import {World} from "./info/World";
import {InviteConfig} from "./config/InviteConfig";
import {ICommand} from "../../framework/facade/ICommand";
import {LocalStorage} from "../../framework/persistence/LocalStorage";
import Facade from "../../framework/facade/Facade";
import {ext} from "../../framework/extend/Extend";
import DialogMediator from "../../framework/dialog/DialogMediator";
import {AdManager} from "../../framework/wxApi/AdManager";
import {wxApi} from "../../framework/wxApi/wxApi";
import {HttpOption} from "../../framework/http/HttpOption";
import {HttpClient} from "../../framework/http/HttpClient";
import {Music} from "../../framework/audio/Music";
import View from "../../framework/component/View";
import {Interceptor} from "../../framework/interceptor/Interceptor";
import OpenViewInterceptor from "./interceptor/OpenViewInterceptor";
import CloseViewInterceptor from "./interceptor/CloseViewInterceptor";
import LoadSceneIntercetor from "./interceptor/LoadSceneIntercetor";

const {ccclass, property} = cc._decorator;

@ccclass("StartupCommand")
export default class StartupCommand implements ICommand {
    async execute(...args):Promise{
        return new Promise(async resolve => {
            console.log(AppConfig.gameName);
            console.log(AppConfig.version);
            LocalStorage.prefix = AppConfig.GameID;
            let physicsManager = cc.director.getPhysicsManager();
            physicsManager.enabled = true;
            physicsManager.enabledAccumulator = false;


            physicsManager.debugDrawFlags =
                0;
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            //cc.PhysicsManager.DrawBits.e_jointBit |
            //cc.PhysicsManager.DrawBits.e_shapeBit
            ;

            let manager = cc.director.getCollisionManager();
            manager.enabled = false;
            // manager.enabledDebugDraw = true;
            // manager.enabledDrawBoundingBox = true;

            console.log(ext.isIphoneX, "isIphoneX===>");
            console.log(ext.isLandscape, "isLandscape===>");

            //关闭debug
            if(!AppConfig.isDebug){
                console.log = function () {

                };
            }

            View.clickSoundCommand = "ClickSoundCommand";

            DialogMediator.dialogPrefabName = "prefab/dialog";

            /** 初始化视频广告组件 */
            AdManager.initVideo(AdConfig.videoAdUintId);
            AdManager.maxDailyVideoCount = AdConfig.maxDailyVideoCount;

            wxApi.start();
            wxApi.friendRankKey = AppConfig.rankKey;
            wxApi.shareImageUrls = InviteConfig.icon.map(value => NetworkConfig.host+"/cli/image/"+InviteConfig.icon);
            wxApi.shareTitles = InviteConfig.InviteTitleSingle;
            wxApi.shareQuery = "key1=val1&key2=val2";


            /** http默认配置 */
            let httpOption = new HttpOption();
            httpOption.host = NetworkConfig.host;
            httpOption.port = 443;
            httpOption.timeout = 3*6000;
            httpOption.timeoutCommand = "HttpTimeoutCommand";
            httpOption.not200Command = "HttpNot200Command";
            httpOption.cookieKey = "vertx-cookie";
            // 不支持FormData的浏览器的处理
            if(typeof FormData == "undefined") {
                httpOption.headers.set("content-type", "application/x-www-form-urlencoded");
            }
            HttpClient.defaultHttpOption = httpOption;

            /** 读取声音配置 */
            Music.init();

            console.log(Music.getMusicOpen(), "=================getMusicOpen");
            console.log(Music.sfxOpen, "===============sfxOpen");


            /** 读取胡萝卜数量 */
            World.My.diamond = LocalStorage.getNumber(localStorageKeys.carrotNumKey) || 0;
            World.My.diamond += 200;

            console.log(World.My.diamond, "World.My.diamond=========");

            /** 后台切入切出回调---引擎已经做了暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。所以我们一般情况下不需要做什么 */
            /*cc.game.on(cc.game.EVENT_SHOW, function () {
                console.log("cc.game.EVENT_SHOW============>");
            });

            cc.game.on(cc.game.EVENT_HIDE, function () {
                console.log("cc.game.EVENT_HIDE============>");
            });*/

            /** 注册拦截器 */
            Interceptor.register("OpenViewCommand", OpenViewInterceptor);
            Interceptor.register("CloseViewCommand", CloseViewInterceptor);
            Interceptor.register("LoadSceneCommand", LoadSceneIntercetor);


            /** 初始化隔离层prefab */
            await Facade.initSeparationLayer("prefab/separationLayer");
            await Facade.initTextTips("prefab/textTips");
            /** 开始加载 */
            Facade.executeCommand("LoadingCommand");

            resolve(true);
        });
    }
}

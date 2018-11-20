// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {LocalStorage} from "../persistence/LocalStorage";
import {BannerStyle} from "./BannerStyle";

export enum AdVideoResult{
    forceClose = 0,/**强制关闭*/
    finishClose = 1,/**看完关闭*/
    notInit = 2,/** 未初始化视频组件 */
    loadFail = 3,/** 加载失败 */
    multiLoadFail = 4,/** 多次尝试后加载失败 */
}

let dailyVideoKey = "dailyVideo";

export class AdManager {

    private static bannerAdunitIdMap = {};
    private static videoAdInstance = null;//单例

    static maxDailyVideoCount:number = 8;

    //banner
    static createBanner(positionName:String, adunitId:String, style:BannerStyle){
        if (typeof (wx) == "undefined") {
            return
        }
        let info = wx.getSystemInfoSync();
        console.log("createBanner SDKVersion:");
        console.log(info.SDKVersion);
        if (info.SDKVersion < "2.0.4"){
            return
        }
        if (this.bannerAdunitIdMap[positionName]){
            this.destoryBanner(positionName);
        }
        if (typeof (style.bottom) != "undefined" && typeof (style.height) != "undefined"){
            style.top = window.innerHeight - style.bottom - style.height
        }

        if (style.width < 300){
            style.width = 300;
        }
        if (typeof (style.center) != "undefined"){
            style.left = window.innerWidth / 2 - style.width/2 + style.center;
        }

        console.log(style);
        let bannerAd = wx.createBannerAd({
            adUnitId: adunitId,
            style: style
        });
        bannerAd.onLoad(() => {
            console.log('bannerAd.onLoad['+positionName+'] 广告加载成功');
        });
        bannerAd.onResize(res=>{
            // console.log("res===>width="+res.width+"  hegiht="+res.height);
            bannerAd.style.left = style.left;
            bannerAd.style.width = res.width;
            bannerAd.style.height = res.height;
            if (typeof (style.bottom) != "undefined" && typeof (style.height) != "undefined"){
                let {screenHeight} = wx.getSystemInfoSync();
                bannerAd.style.top = screenHeight - style.bottom - res.height
            }else {
                bannerAd.style.top = style.top;
            }
        });
        this.bannerAdunitIdMap[positionName] = bannerAd;
    }

    static destoryBanner(positionName:String){
        if (this.bannerAdunitIdMap[positionName]) {
            this.bannerAdunitIdMap[positionName].destory();
            this.bannerAdunitIdMap[positionName] = null;
        }
    }

    static showBanner(positionName:String){
        if (this.bannerAdunitIdMap[positionName]) {
            let promise = this.bannerAdunitIdMap[positionName].show();
            promise.catch(err => {console.log("rejected showBanner["+positionName+"===>");console.log(err)});
            promise.then(() => console.log('resolved showBanner['+positionName+']  Banner广告显示'));
        }else {
            console.log("showBanner未找到该位置上的banner["+positionName+"]")
        }
    }

    static hideBanner(positionName:String){
        if (this.bannerAdunitIdMap[positionName]) {
            this.bannerAdunitIdMap[positionName].hide();
        }else {
            console.log("hideBanner未找到该位置上的banner["+positionName+"]")
        }
    }



    //video
    static canPlayVideo(){
        let result = false;
        let count = this.getPlayVideoCount();
        console.log("canPlayVideo count===>"+count);
        if (count < this.maxDailyVideoCount){
            result = true
        }
        return result;
    }

    private static getPlayVideoCount(){
        let dateStr = LocalStorage.getString(dailyVideoKey);
        if (dateStr == null){
            return 0
        }else {
            let currentDate = new Date();
            let list = dateStr.split("-");
            if (list.length == 4 && list[0] === currentDate.getFullYear().toString()
                && list[1] === currentDate.getMonth().toString()
                && list[2] === currentDate.getDate().toString()){
                return parseInt(list[3])
            }else {
                return 0
            }
        }
    }

    static subPlayVideoCount(){
        let currentCount = this.getPlayVideoCount();
        currentCount++;
        let currentDate = new Date();
        let dateStr = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentCount;
        LocalStorage.setString(dailyVideoKey, dateStr);
    }

    static initVideo(adunitId:String){
        if (typeof (wx) == "undefined") {
            return
        }
        if (!adunitId || adunitId == ""){
            return
        }
        if (this.videoAdInstance){
            return
        }
        let info = wx.getSystemInfoSync();
        console.log("initVideo SDKVersion:");
        console.log(info.SDKVersion);
        if (info.SDKVersion < "2.0.4"){
            return
        }
        this.videoAdInstance = wx.createRewardedVideoAd({ adUnitId: adunitId });
        this.videoAdInstance.onLoad(() => {
            console.log('激励视频 广告加载成功');
        });
        this.videoAdInstance.onError(err => {
            console.log("激励视频 广告加载失败");
            console.log(err)
        });
        this.videoAdInstance.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            let completed = AdVideoResult.finishClose;
            if ((res && res.isEnded) || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                AdManager.subPlayVideoCount();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                completed = AdVideoResult.forceClose;
            }
            this.showVideoResult(completed);
        })
    }


    private static videoCallback = null;
    private static videoLoadCount = 0;
    private static showVideoResult(result:AdVideoResult){
        if (this.videoCallback){
            this.videoCallback(result);
            this.videoCallback = null;
        }
    }
    private static showVideo(callback){
        let self = this;
        self.videoCallback = callback;
        if (self.videoAdInstance){
            self.videoLoadCount++;
            self.videoAdInstance.load()
                .then(()=>self.videoAdInstance.show())
                .catch(err=>{
                    console.log(err.errMsg, "loadAd fail???");
                    if (self.videoLoadCount > 3){
                        self.videoLoadCount = 0;
                        self.showVideoResult(AdVideoResult.multiLoadFail);
                    } else {
                        self.showVideo(callback);
                    }
                })
        }else {
            console.log("视频广告未初始化");
            self.showVideoResult(AdVideoResult.notInit);
        }
    }

    static async showVideoAwait():Promise<AdVideoResult>{
        return new Promise<AdVideoResult>((resolve, reject) => {

            this.showVideo(function (res) {
                resolve(res);
            })
        });
    }
}

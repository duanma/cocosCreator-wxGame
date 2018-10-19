// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import Facade from "../facade/Facade";

const {ccclass, property} = cc._decorator;

let wxplatform = false;
let systemInfo:wx.SystemInfo = null;
if (typeof wx != "undefined"){
    wxplatform = true;
    systemInfo = wx.getSystemInfoSync();
}

export class wxApi {
    static enable = wxplatform;
    static sysInfo = systemInfo;

    static friendRankKey:string = null;

    static shareImageUrls:Array<string> = [];
    static shareTitles:Array<string> = [];
    static shareQuery:string = null;

    static start() {
        if (!wxApi.enable)return;
        let boj = wx.getLaunchOptionsSync();
        console.log("wx.getLaunchOptionsSync", boj);

        wx.setKeepScreenOn({keepScreenOn:true});
        wx.showShareMenu({withShareTicket: false});


        Facade.executeCommand("WxOnShowCommand");
        Facade.executeCommand("WxOnHideCommand");
        Facade.executeCommand("WxOnShareAppMessageCommand");
    }


    static async checkSession():Promise{
        return new Promise((resolve, reject) => {
            wx.checkSession({
                success: function () {
                    resolve();
                },
                fail: function () {
                    reject();
                },
                complete: function () {
                },
            });
        });
    }

    static async authorize(scope:string):Promise{
        return new Promise((resolve, reject) => {
            wx.authorize({
                scope:scope,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res);
                }
            })
        });
    }
    
    static async login():Promise {
        return new Promise((resolve, reject) => {
            wx.login({
                success: function (code) {
                    resolve(code);
                },
                fail: function (...args) {
                    reject(...args);
                },
                complete: function () {
                },
            })
        });
    }

    static async getUserInfo(withCredentials:boolean, lang?:string):Promise{
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials:withCredentials,
                lang:lang,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res)
                }
            })
        });
    }


    static async shareAppMessage(title:string,imageUrl:string,query:string):Promise {
        return new Promise(((resolve, reject) => {
            wx.shareAppMessage({
                title:title,
                imageUrl:imageUrl,
                query:query,
                success:function () {
                    console.log("=====分享成功///////////////////");
                    resolve();
                },
                fail:function () {
                    console.log("=====分享失败///////////////////");
                    reject();
                }
            })
        }));
    }

    static async updateShareMenu(withShareTicket:boolean):Promise {
        return new Promise((resolve, reject) => {
            wx.updateShareMenu({
                withShareTicket: withShareTicket,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res);
                }
            })
        });
    }

    static async showShareMenu(withShareTicket:boolean):Promise {
        return new Promise((resolve, reject) => {
            wx.showShareMenu({
                withShareTicket: withShareTicket,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
    }

    static backGameCommand:string = null;

    static async navigateToMiniProgram(appId:String, path:String, extraData:Object, backCommand:string, envVersion:string = "develop"):Promise{
        return new Promise((resolve, reject) => {
            this.backGameCommand = backCommand;
            wx.navigateToMiniProgram({
                appId: appId,
                path:path,
                extraData: extraData,
                envVersion: envVersion,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
    }


    static async previewImage(urls:Array<string>, current?:string):Promise{
        return new Promise((resolve, reject) => {
            wx.previewImage({
                urls: urls,
                current:current,
                success: function (res) {
                    resolve(res);
                },
                fail: function (res) {
                    reject(res);
                }
            })
        });
    }

}

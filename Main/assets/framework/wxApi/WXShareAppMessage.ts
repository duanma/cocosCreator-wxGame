// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export function backgroundTime(callback:(number)=>void) {
    let hideTime = 0;
    let onHide = function (res) {
        wx.offHide(onHide);
        hideTime = new Date().getTime();
    };
    let onShow = function (res) {
        wx.offShow(onShow);
        let currentTime = new Date().getTime();
        callback(currentTime-hideTime);
    };

    wx.onHide(onHide);
    wx.onShow(onShow);
}


/**
 0-3秒返回失败, 提示分享到群
 3-5秒群已被分享,重新分享
 5秒以上成功
 统一位置三次成功
 */

/** 内存记录同一位置分享的次数 */
let map = new Map<string, number>();

@ccclass
export default class WXShareAppMessage {

    public static share(key:string, title:string,imageUrl:string,query:string):Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            console.log("shareKey===>", key, map.get(key));
            if (typeof wx != "undefined" || key == undefined || key == null || key == ""){
                let num = map.get(key);
                if (num == undefined){
                    num = 0;
                    map.set(key, num);
                }
                backgroundTime(delta=>{
                    if (map.get(key) > 3){
                        this.showSuccess();
                        resolve(true);
                    } else {
                        map.set(key, num+1);
                        let second = delta/1000;
                        if (second < 3){
                            this.showFail();
                            resolve(false);
                        } else if (second < 5){
                            this.showRepeat();
                            resolve(false);
                        } else {
                            this.showSuccess();
                            resolve(true);
                        }
                    }
                });
                wx.shareAppMessage({
                    title:title,
                    imageUrl:imageUrl,
                    query:query
                });
            } else {
                reject();
            }

        });
    }

    private static showFail(){
        this.showText("分享失败,请分享到群");
    }

    private static showSuccess(){
        this.showText("分享成功");
    }

    private static showRepeat(){
        this.showText("该群短时间内已经分享,请重新分享");
    }

    /** 飘动显示效果(适合显示label提示，类似toast) */
    private static flutterAction(): cc.FiniteTimeAction {
        let moveSeq = cc.sequence([
            cc.moveBy(0.6, cc.v2(0, 0)),
            cc.moveBy(1, cc.v2(0, 84))
        ]);

        let scaleSeq = cc.sequence([
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.1, 1),
        ]);

        let alphaSeq = cc.sequence([
            cc.fadeTo(0.8, 255),
            cc.fadeTo(0.8, 0),
        ]);

        let spawn = cc.spawn(moveSeq, alphaSeq);
        return spawn;
    }


    private static showText(str:string){
        console.log(str, "WXShareAppMessage==>showText");
        let node = new cc.Node();
        node.group = "ui";
        node.position = cc.visibleRect.center;
        let richText = node.addComponent(cc.RichText);
        richText.fontSize = 38;
        richText.string = `<color=#ff0000>${str}</c></b>`;
        richText.lineHeight = richText.fontSize + 2;
        cc.director.getScene().addChild(node, 100);
        node.runAction(cc.sequence(cc.delayTime(0.6), this.flutterAction(), cc.callFunc(()=>node.destroy())));
    }
}

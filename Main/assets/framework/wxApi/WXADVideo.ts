// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

let _map = {};

function createVideo(adunit:string) {
    if (!_map[adunit]){
        let videoAd = wx.createRewardedVideoAd({ adUnitId: adunit });
        videoAd.onLoad(() => {
            console.log('激励视频 广告加载成功');
        });
        videoAd.onError(err => {
            console.log("激励视频 广告加载失败");
            console.log(err)
        });
        _map[adunit] = videoAd;
    }
    return _map[adunit];
}

@ccclass
export default class WXADVideo {

    static play(adunit:string):Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            if (typeof (wx) != "undefined" && adunit != null && adunit != "") {
                let videoAd = createVideo(adunit);
                let onClose = function(res) {
                    videoAd.offClose(onClose);
                    if ((res && res.isEnded) || res === undefined) {
                        resolve(true);
                    } else {
                        resolve(false)
                    }
                };
                videoAd.onClose(onClose);
                videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                        videoAd.offClose(onClose);
                        reject(err.errMsg);
                    });
            }

        });
    }
}

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property, menu, disallowMultiple} = cc._decorator;

let bannerAdunitIdMap = {};

@ccclass
@disallowMultiple
@menu("自定义/WXADBanner")
export default class WXADBanner extends cc.Component {

    /** true表示显示在节点坐标的下方 false则在节点下方 */
    @property
    downward = true;

    @property
    center = true;

    @property
    left = 0;

    @property
    width = 0;

    @property
    height = 0;

    @property
    key:string = "";

    @property
    adunitId:string = "";

    @property
    delayTime = 0;

    onLoad(){
        let self = this;
        this.scheduleOnce(function () {
            if (typeof (wx) != "undefined" && self.adunitId != "" && self.key != ""){
                if (!bannerAdunitIdMap[self.key]){
                    let width_ratio = cc.view.getVisibleSize().width/window.innerWidth;
                    let height_ratio = cc.view.getVisibleSize().height / window.innerHeight;
                    let worldPos = self.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    console.log(worldPos, "=====worldPos", height_ratio);

                    let style = {};
                    style['left'] = self.left/width_ratio;
                    style['width'] = self.width/width_ratio;
                    style['height'] = self.height/height_ratio;
                    if (self.center){
                        style['left'] = window.innerWidth / 2 - style['width']/2;
                    }
                    if (self.downward){
                        style['top'] = window.innerHeight - worldPos.y/height_ratio;
                    }else {
                        style['top'] = window.innerHeight - worldPos.y/height_ratio - style['height'];
                    }

                    let bannerAd = wx.createBannerAd({
                        adUnitId: self.adunitId,
                        style: style
                    });

                    bannerAd.onLoad(() => {
                        console.log('bannerAd.onLoad['+self.key+'] 广告加载成功');
                    });
                    bannerAd.onError(()=>{
                        console.log('bannerAd.onError['+self.key+'] banner出错');
                    });


                    bannerAd.onResize(res=>{
                        /** 计算top */
                        console.log("bannerAd.onResize res===>width="+res.width+"  hegiht="+res.height);
                        if (self.center){
                            bannerAd.style.left = window.innerWidth / 2 - res.width/2;
                        }else{
                            bannerAd.style.left = res.left;
                        }
                        if (self.downward){
                            bannerAd.style.top = window.innerHeight - worldPos.y/height_ratio;
                        }else {
                            bannerAd.style.top = window.innerHeight - worldPos.y/height_ratio - res.height;
                        }

                    });
                    bannerAdunitIdMap[self.key] = bannerAd;
                }
                WXADBanner.showBanner(self.key);
            }
        }, this.delayTime);
    }

    onEnable () {
        if (this.key != ""){
            WXADBanner.showBanner(this.key);
        }
    }

    onDisable(){
        if (this.key != ""){
            WXADBanner.hideBanner(this.key);
        }
    }

    static destoryBanner(positionName:String){
        if (bannerAdunitIdMap[positionName]) {
            bannerAdunitIdMap[positionName].destory();
            bannerAdunitIdMap[positionName] = null;
        }
    }

    static showBanner(positionName:String){
        if (bannerAdunitIdMap[positionName]) {
            let promise = bannerAdunitIdMap[positionName].show();
            promise.catch(err => {console.log("rejected showBanner["+positionName+"===>");console.log(err)});
            promise.then(() => console.log('resolved showBanner['+positionName+']  Banner广告显示'));
        }else {
            console.log("showBanner未找到该位置上的banner["+positionName+"]")
        }
    }

    static hideBanner(positionName:String){
        if (bannerAdunitIdMap[positionName]) {
            bannerAdunitIdMap[positionName].hide();
        }else {
            console.log("hideBanner未找到该位置上的banner["+positionName+"]")
        }
    }


    // update (dt) {}
}

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, menu, disallowMultiple} = cc._decorator;

@ccclass
@disallowMultiple
@menu("自定义/CDTimer")
export default class CDTimer extends cc.Component {
    @property({displayName:"是否一次性", textTips:"选是则在倒计时结束会销毁自己"})
    once = false;

    @property({displayName:"倒计时(秒)"})
    cd = 0;

    @property({displayName:"暂停开关"})
    pause = false;

    @property({type:cc.Component.EventHandler, displayName:"进度事件", textTips:"每一帧都会收到进度信息"})
    frameEventHandlers:[cc.Component.EventHandler] = [];

    @property({type:cc.Component.EventHandler, displayName:"归零事件", textTips:"CD归零时会收到此消息"})
    zeroEventHandlers:[cc.Component.EventHandler] = [];


    private _curTime = 0;

    get curTime(): number {
        return this._curTime;
    }

    reset(){
        this._curTime = 0;
    }

    update (dt) {
        if (this.pause)return;
        if (this.cd > 0 && this._curTime < this.cd){
            this._curTime += dt;
            let progress = this._curTime/this.cd;
            cc.Component.EventHandler.emitEvents(this.frameEventHandlers, progress);
            if (this._curTime >= this.cd){
                cc.Component.EventHandler.emitEvents(this.zeroEventHandlers, progress);
                if (this.once){
                    this.destroy();
                } else {
                    this.reset();
                }
            }
        }
    }
}

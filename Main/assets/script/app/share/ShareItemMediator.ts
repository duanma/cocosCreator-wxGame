// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {ext} from "../../../framework/extend/Extend";

const {ccclass, property} = cc._decorator;

export enum ShareItemState {
    none = 0,/** 未达成 */
    pass = 1,/** 已完成 */
    take = 2,/** 已达成，待领取 */
}

@ccclass
export default class ShareItemMediator extends cc.Component {

    @property(cc.Sprite)
    headSprite:cc.Sprite = null;

    @property(cc.Label)
    rewardLabel:cc.Label = null;

    @property(cc.Node)
    passNode:cc.Node = null;

    @property(cc.Button)
    takeBtn:cc.Button = null;

    @property(cc.RichText)
    takeRich:cc.RichText = null;

    _state:ShareItemState = null;

    get state():ShareItemState{
        return this._state;
    }

    set state(val:ShareItemState){
        this._state = val;
        this.updateView();
    }

    setHead(url:string){
        ext.wxCreateImageToSprite(this.headSprite, url);
    }

    setReward(count:number){
        this.rewardLabel.string = `x${count}`;
    }

    updateView(){
        this.passNode.active = this._state == ShareItemState.pass;
        this.takeBtn.node.active = this._state != ShareItemState.pass;
        this.takeBtn.interactable = this._state == ShareItemState.take;
        if (this._state == ShareItemState.none){
            this.takeRich.string = `<color=#1b1b1b><b>领取</b></color>`;
        }else {
            this.takeRich.string = `<color=#fff45c><outline color=#ee8535 width=2><b>领取</b></outline></color>`;
        }
    }
}

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import EventEmitter from "../component/EventEmitter";
import Window from "../component/View";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogMediator extends cc.Component {

    static dialogPrefabName:string = null;

    @property({type:cc.RichText})
    title: cc.RichText = null;

    @property({type:cc.RichText})
    content: cc.RichText = null;

    @property({type:cc.Node})
    closeButtonNode:cc.Node = null;

    @property({type:cc.Sprite})
    closeButtonSrpite:cc.Sprite = null;

    @property({type:cc.Layout})
    layoutOfLeftRight:cc.Layout = null;

    /** 左边按钮 */
    @property({type:cc.Node})
    leftButtonNode:cc.Node = null;

    @property({type:cc.Sprite})
    leftButtonSprite:cc.Sprite = null;

    @property({type:cc.Layout})
    layoutOfLeftButton:cc.Layout = null;

    @property({type:cc.Node})
    iconNodeOfLeftButton:cc.Node = null;

    @property({type:cc.Sprite})
    iconSpriteOfLeftButton:cc.Sprite = null;

    @property({type:cc.Node})
    textNodeOfLeftButton:cc.Node = null;

    @property({type:cc.RichText})
    textOfLeftButton:cc.RichText = null;

    /** 右边按钮 **/
    @property({type:cc.Node})
    rightButtonNode:cc.Node = null;

    @property({type:cc.Sprite})
    rightButtonSprite:cc.Sprite = null;

    @property({type:cc.Layout})
    layoutOfRightButton:cc.Layout = null;

    @property({type:cc.Node})
    iconNodeOfRightButton:cc.Node = null;

    @property({type:cc.Sprite})
    iconSpriteOfRightButton:cc.Sprite = null;

    @property({type:cc.Node})
    textNodeOfRightButton:cc.Node = null;

    @property({type:cc.RichText})
    textOfRightButton:cc.RichText = null;

    onClickLeft(event, data){
        Window.executeClickSoundCommand(event, data);
        this.node.emit(EventEmitter.type, "left");
        this.node.destroy();
    }

    onClickRight(event, data){
        Window.executeClickSoundCommand(event, data);
        this.node.emit(EventEmitter.type, "right");
        this.node.destroy();
    }

    onClickClose(event, data){
        Window.executeClickSoundCommand(event, data);
        this.node.emit(EventEmitter.type, "close");
        this.node.destroy();
    }

}

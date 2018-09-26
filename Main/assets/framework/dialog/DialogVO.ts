// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export class DialogVO {
    title: Object = {string:"提示"};

    content: Object = {string:"您还没有设置内容"};

    closeButtonNode:Object = null;

    closeButtonSrpite:Object = null;

    layoutOfLeftRight:Object = null;

    /** 左边按钮 */
    leftButtonNode:Object = {active:false};

    leftButtonSprite:Object = null;

    layoutOfLeftButton:Object = null;

    iconNodeOfLeftButton:Object = {active:false};

    iconSpriteOfLeftButton:Object = null;

    textNodeOfLeftButton:Object = null;

    textOfLeftButton:Object = {string:"取消"};

    /** 右边按钮 **/
    rightButtonNode:Object = null;

    rightButtonSprite:Object = null;

    layoutOfRightButton:Object = null;

    iconNodeOfRightButton:Object = {active:false};

    iconSpriteOfRightButton:Object = null;

    textNodeOfRightButton:Object = null;

    textOfRightButton:Object = {string:"确认"};


    static colorString(str:string, color?:string):string{
        let colorValue = color || "##7c4800";
        return `<color=#7c4800>${str}</c>`;
    }

}

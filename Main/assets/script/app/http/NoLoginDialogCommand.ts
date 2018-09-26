// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {ICommand} from "../../../framework/facade/ICommand";
import {DialogVO} from "../../../framework/dialog/DialogVO";
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass("NoLoginDialogCommand")
export default class NoLoginDialogCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async (resolve, reject) => {
            let vo = new DialogVO();
            vo.title = {string:DialogVO.colorString("提示")};
            vo.content = {string:DialogVO.colorString("您已掉线，请重新登陆")};
            vo.closeButtonNode = {active:false};
            await Facade.executeCommand("ShowDialogCommand", vo);
            await Facade.executeCommand("ToLoginCommand");
        });
    }
}

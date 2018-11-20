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

@ccclass("ExitGameDialogCommand")
export default class ExitGameDialogCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async (resolve, reject) => {
            cc.director.getPhysicsManager().enabled = false;
            let pauseTargets = cc.director.getActionManager().pauseAllRunningActions();
            let vo = new DialogVO();
            vo.title = {string:DialogVO.colorString('退出游戏')};
            vo.content = {string:DialogVO.colorString("确认退出本局游戏吗？")};
            let [res] = await Facade.executeCommand("ShowDialogCommand", vo);
            cc.director.getActionManager().resumeTargets(pauseTargets);
            cc.director.getPhysicsManager().enabled = true;
            if (res == "right"){
                /*let gameMediator = Facade.mediatorOf<GameMediator>("game", GameMediator);
                let score = gameMediator.model.score;
                let diamond = gameMediator.model.diamond;
                Facade.executeCommand("GameUploadScoreCommand", score, diamond);
                await Facade.executeCommand("ToHomeCommand");*/
            }
            resolve();
        });
    }
}

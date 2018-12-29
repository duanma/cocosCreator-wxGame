// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ICommand} from "../../facade/ICommand";
import Facade from "../../facade/Facade";
import GameMediator from "./GameMediator";
import OverMediator from "../over/OverMediator";

const {ccclass, property} = cc._decorator;

@ccclass("UpdateMyScoreCommand")
export default class UpdateMyScoreCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise((resolve, reject) => {
            OverMediator.myScore = args[0];
            let mediator = Facade.mediatorOf("top", GameMediator);
            if (mediator){
                mediator.setMyScore(args[0]);
            }
        });
    }
}

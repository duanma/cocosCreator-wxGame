// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {ICommand} from "./ICommand";
import Facade from "./Facade";

const {ccclass, property} = cc._decorator;

@ccclass("CloseViewCommand")
export default class CloseViewCommand implements ICommand {

    async execute (...args):Promise{
        let nodeName = args[0];
        return new Promise((resolve, reject) => {
            let node = Facade.canvasNode.getChildByName(nodeName);
            if (node){
                node.destroy();
            }
        });
    }
}



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
import {wxApi} from "../../../framework/wxApi/wxApi";

const {ccclass, property} = cc._decorator;

@ccclass('ShareCallbackCommand')
export default class ShareCallbackCommand implements ICommand {

    async execute (...args):Promise<boolean>{
        let flag = false;
        if (wxApi.enable){
            let backgroundTime = await wxApi.backgroundTime();
            flag = Math.floor(backgroundTime/1000) > 3;
        }

        return flag;
    }
}

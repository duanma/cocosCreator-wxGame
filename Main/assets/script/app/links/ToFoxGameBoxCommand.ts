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
import {ext} from "../../../framework/extend/Extend";
import {wxApi} from "../../../framework/wxApi/wxApi";

const {ccclass, property} = cc._decorator;

@ccclass("ToFoxGameBoxCommand")
export default class ToFoxGameBoxCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async resolve => {
            let url = "https://x.198174.com/cli/image/fox_center.png";
            if (ext.isLandscape && cc.sys.os != cc.sys.OS_IOS){
                url = "https://x.198174.com/cli/image/fox_center_landscape.png";
            }
            if (wxApi.enable){
                await wxApi.previewImage([url]);
            }
            resolve();
        })
    }
}

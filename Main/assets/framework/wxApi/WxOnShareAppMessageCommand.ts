// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {ICommand} from "../facade/ICommand";
import {ext} from "../extend/Extend";
import {wxApi} from "./wxApi";

const {ccclass, property} = cc._decorator;

@ccclass("WxOnShareAppMessageCommand")
export default class WxOnShareAppMessageCommand implements ICommand {
    async execute (...args):Promise{
        console.log("===WxOnShareAppMessageCommand///////////", args);
        let url:string = ext.randomElement(wxApi.shareImageUrls);
        let title = ext.randomElement(wxApi.shareTitles);
        let query = wxApi.shareQuery;
        return {
            imageUrl : url,
            title:  title,
            query : query,
        }
    }
}


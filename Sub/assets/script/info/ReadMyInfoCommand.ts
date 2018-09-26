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
import {World} from "./World";

const {ccclass, property} = cc._decorator;

@ccclass("ReadMyInfoCommand")
export default class ReadMyInfoCommand implements ICommand {
    async execute (...args):Promise{
        let userInfo = args[0];
        World.My.nickName = userInfo.nickName;
        World.My.avatarUrl = userInfo.avatarUrl;
        World.My.gender = userInfo.gender;
        World.My.openId = userInfo.openId;

        console.log(World, "WxSub===>World");
    }
}

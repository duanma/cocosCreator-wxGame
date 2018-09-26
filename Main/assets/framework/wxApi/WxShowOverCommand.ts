import {ICommand} from "../facade/ICommand";
import {wxApi} from "./wxApi";

const {ccclass, property} = cc._decorator;

@ccclass("WxShowOverCommand")
export default class WxShowOverCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise((resolve, reject) => {
            if (wxApi.enable){
                wx.postMessage({command:"ShowCommand", data:"OverScene"});
            }
            resolve();
        });
    }
}

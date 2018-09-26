// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {IConverter} from "../converter/IConverter";

export class WxStorageConverter implements IConverter{
    encode(){
        let obj = {};
        for(let attr in this) {
            if (typeof this[attr] != "function"){
                obj[attr] = this[attr];
            }
        }
        return JSON.stringify(obj);
    }

    decode<T>(data:any, returnType:Function):T{
        let obj = JSON.parse(data);
        let returnObj = new returnType();
        for(let attr in returnObj) {
            if (typeof returnObj[attr] != "function"){
                if (typeof obj[attr] == "undefined") {
                    throw `${returnObj.constructor.name}.decode data not found attr===>${attr}`;
                }
                returnObj[attr] = obj[attr];
            }
        }
        return returnObj;
    }
}

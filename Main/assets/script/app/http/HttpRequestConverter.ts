// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {JsonConverter} from "../../../framework/converter/JsonConverter";

export class HttpRequestConverter extends JsonConverter{
    encode(){
        let obj = super.encode();
        let result = null;
        if(typeof FormData == "function") {
            let data = new FormData();
            for(let attr in obj) {
                data.append(attr,obj[attr]);
            }
            result = data;
        }else {
            // 不支持FormData的浏览器的处理
            let arr = [];
            let i = 0;
            for(let attr in obj) {
                arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
                i++;
            }
            result = arr.join("&");
        }
        console.log("####http request===>", result);
        return result;
    }
}

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class HttpProtocol {
    uri:string = null;
    request:object = {};
    response:object = null;

    getResponseStatus():number{
        return this.response.status;
    }

    getResponseData<T>():T{
        return this.response.data;
    }

    getResponseMessage():string{
        return this.response.message;
    }

    encode(){
        console.log(">>>>http request==="+this.uri, this.request);
        let result = null;
        if(typeof FormData == "function") {
            let data = new FormData();
            for(let attr in this.request) {
                if (typeof this.request[attr] != "function"){
                    data.append(attr,this.request[attr]);
                }
            }
            result = data;
        }else {
            // 不支持FormData的浏览器的处理
            let arr = [];
            let i = 0;
            for(let attr in this.request) {
                if (typeof this.request[attr] != "function"){
                    arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(this.request[attr]);
                    i++;
                }
            }
            result = arr.join("&");
        }

        return result;
    }

    decode(data:any){
        this.response = JSON.parse(data);
        console.log("<<<<http response==="+this.uri, data);
        if (this.response.status != 0){
            throw this.response;
        }
    }
}

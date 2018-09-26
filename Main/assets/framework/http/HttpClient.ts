// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {HttpOption} from "./HttpOption";
import {IConverter} from "../converter/IConverter";
import Facade from "../facade/Facade";

const {ccclass, property} = cc._decorator;

let cookieMap = new Map<string, any>();

export class HttpClient{

    static defaultHttpOption:HttpOption = null;

    static deleteCookie(cookieKey:string){
        cookieMap.delete(cookieKey);
    }

    static async get(uri:string, request:IConverter, response:IConverter, httpOption?:HttpOption){
        return this.send("GET", uri, request, response, httpOption);
    }

    static async post(uri:string, request:IConverter, response:IConverter, httpOption?:HttpOption){
        return this.send("POST", uri, request, response, httpOption);
    }


    static async send(method:string, uri:string, request:IConverter, response:IConverter, httpOption?:HttpOption){
        return new Promise(async(resolve, reject) => {
            let option = httpOption || HttpClient.defaultHttpOption;
            let xmlrequest = new XMLHttpRequest();
            xmlrequest.timeout = option.timeout;
            xmlrequest.ontimeout = async function () {
                if (option.timeoutCommand){
                    let res = await Facade.executeCommand(option.timeoutCommand, method, uri, request, response, httpOption);
                    resolve(res);
                }
                xmlrequest.abort();
            };

            xmlrequest.onreadystatechange = async function () {
                if (xmlrequest.readyState == 4){
                    if (option.cookieKey && !cookieMap.get(option.cookieKey)){
                        cookieMap.set(option.cookieKey, xmlrequest.getResponseHeader(option.cookieKey))
                    }
                    if (xmlrequest.status === 200) {
                        try {
                            let res = response.decode(xmlrequest.responseText);
                            resolve(res);
                        }catch (e) {
                            reject(e);
                        }
                    }else{
                        await Facade.executeCommand(option.not200Command, xmlrequest.status);
                    }
                }
            };

            let url = option.host;
            if (option.port != 80 && option.port != 443){
                url += `:${option.port}`;
            }
            url += uri;
            xmlrequest.open(method,url);

            if (option.cookieKey){
                let val = cookieMap.get(option.cookieKey);
                if (val != null){
                    xmlrequest.setRequestHeader(option.cookieKey, val);
                }
            }

            option.headers.forEach((value, key) => xmlrequest.setRequestHeader(key, value));
            let res = request.encode();
            xmlrequest.send(res);
        });
    }
}



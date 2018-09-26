// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {PostCommandInterceptor} from "./PostCommandInterceptor";
import {Interceptor} from "./Interceptor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestInterceptor extends PostCommandInterceptor {

    async postHandle(...args):Promise{
        return new Promise(resolve => {
            setTimeout(function () {
                console.log("postHandle");
                resolve(true);
            }, 3000);
        });
    }

    async preHandle(...args):Promise{
        return new Promise(resolve => {
            setTimeout(function () {
                console.log(Interceptor.interceptorsOf("test.TestCommand"), "====");
                Interceptor.unregister("test.TestCommand", TestInterceptor);
                // InterceptorManager.unregister("test.TestCommand", TestInterceptor2);
                console.log(Interceptor.interceptorsOf("test.TestCommand"), "====22");
                resolve(true);
            }, 3000);
        });
    }
}

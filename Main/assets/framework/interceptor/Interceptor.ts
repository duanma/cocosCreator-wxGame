// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


/// <reference path="CommandInterceptor.ts" />

import {ICommandInterceptor} from "./CommandInterceptor";

let map = new Map<string, Array<ICommandInterceptor>>();

export class Interceptor{

    static register<T extends ICommandInterceptor>(command:string, interceptor: {prototype: T});

    static register(command:string, interceptor: ICommandInterceptor){
        let constructor = null;
        if (typeof interceptor == "function"){
            constructor = interceptor
        }else{
            constructor = interceptor.constructor;
        }
        let arr = this.interceptorsOf(command);
        if (arr.every(value => value.constructor != constructor)){
            if (typeof interceptor == "function"){
                arr.push(new interceptor());
            }else {
                arr.push(interceptor);
            }
        }
    }

    static unregister<T extends ICommandInterceptor>(command:string, interceptor: {prototype: T});

    static unregister(command:string, interceptor:ICommandInterceptor){
        let arr = this.interceptorsOf(command);
        let constructor = null;
        if (typeof interceptor == "function"){
            constructor = interceptor
        }else{
            constructor = interceptor.constructor;
        }
        let newArr = arr.filter(value => value.constructor != constructor);
        map.set(command, newArr);
    }

    static interceptorsOf(command:string):[ICommandInterceptor]{
        let arr = map.get(command);
        if (typeof arr == "undefined"){
            arr = [];
            map.set(command, arr);
        }
        return arr;
    }
}

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html




import {ext} from "./Extend";
import {ICommand} from "./ICommand";

/** canvas事件 */
export enum CanvasEvent {
    domainShow = "DomainShowEvent",/**显示到主域中*/
}

export default class Facade {

    static findComponent<T>(nodeName:string, type: {prototype: T}, referenceNode?: cc.Node): T;

    static  findComponent(nodeName:string, type, referenceNode?: cc.Node){
        referenceNode = referenceNode || this.canvasNode;
        let node = cc.find(nodeName, referenceNode);
        if (node){
            return node.getComponent(type);
        }
    }

    static executeCommand(name:string|[string], ...args):Promise{
        return new Promise(async (resolve, reject) => {
            if (typeof name == "string"){
                let arr = name.split(",");
                let results = [];
                for (let i in arr){
                    let name = arr[i];
                    console.log(`-----WXSub execute command===>${name}`);
                    let command = <ICommand>(ext.createObj(name));
                    if(!command){
                        reject(Error(`-----WXSub createObj(${name})===>${name} not found`));
                        return;
                    }
                    let res = await command.execute(...args).catch(reason => {
                        let err;
                        if (typeof reason == "string"){
                            err = Error(reason);
                        }else if(reason instanceof Error){
                            err = reason;
                        }else{
                            err = Error(`-----WXSub command.execute()===>commandName=${name}`);
                        }
                        reject(err);
                    });
                    results.push(res);
                    resolve(results);
                }
            }else if (name instanceof Array){
                let results = [];
                for (let i in name){
                    let res = await Facade.executeCommand(name[i], ...args).catch(reason => reject(reason));
                    results.push(res);
                }
                resolve(results);
            }else {
                reject(Error("-----WXSub executeCommand typeof(name)===>"+typeof name));
            }
        });
    }

    /** 当前canvas的控制器 */
    static canvasNode:cc.Node = null;
}


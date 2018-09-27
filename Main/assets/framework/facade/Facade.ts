// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html




import {ICommand} from "./ICommand";
import {ext} from "../extend/Extend";
import {Interceptor} from "../interceptor/Interceptor";
import LifeCycle from "../component/LifeCycle";

export default class Facade {

    static mediatorOf<T>(nodeName:string, type: {prototype: T}, referenceNode?: cc.Node): T;

    static  mediatorOf(nodeName:string, type, referenceNode?: cc.Node){
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
                    let name = arr[i].trim();
                    let interceptors = Interceptor.interceptorsOf(name);
                    if (interceptors.length > 0){
                        let flag = true;
                        let tempArr = interceptors.slice(0);
                        while (tempArr.length > 0){
                            let commandInterceptor = tempArr.shift();
                            console.log(`execute interceptor===>commandName=${name} interceptorName=${commandInterceptor.toString()}`);
                            flag = await commandInterceptor.preHandle(...args).catch(reason => {
                                let err;
                                if (typeof reason == "string"){
                                    err = Error(reason);
                                }else if(reason instanceof Error){
                                    err = reason;
                                }else{
                                    err = Error(`commandName=${name} ${commandInterceptor.constructor.name}.preHandle()`);
                                }
                                reject(err);
                            }) && flag;
                            tempArr = tempArr.filter(value => Interceptor.interceptorsOf(name).some(value2 => value2 == value));
                        }
                        if (!flag){
                            return;
                        }
                    }
                    console.log(`execute command===>${name}`);
                    let command = <ICommand>(ext.createObj(name));
                    if(!command){
                        reject(Error(`createObj(${name})===>${name} not found`));
                        return;
                    }
                    let res = await command.execute(...args).catch(reason => {
                        let err;
                        if (typeof reason == "string"){
                            err = Error(reason);
                        }else if(reason instanceof Error){
                            err = reason;
                        }else{
                            err = Error(`command.execute()===>commandName=${name}`);
                        }
                        reject(err);
                    });
                    results.push(res);

                    interceptors = Interceptor.interceptorsOf(name);
                    if (interceptors.length > 0){
                        let tempArr = interceptors.slice(0);
                        while (tempArr.length > 0){
                            let commandInterceptor = tempArr.shift();
                            console.log(`execute postHandle===>commandName=${name} interceptorName=${commandInterceptor.toString()}`);
                            await commandInterceptor.postHandle(...args).catch(reason => {
                                let err;
                                if (typeof reason == "string"){
                                    err = Error(reason);
                                }else if(reason instanceof Error){
                                    err = reason;
                                }else{
                                    err = Error(`commandName=${name} ${commandInterceptor.constructor.name}.postHandle`);
                                }
                                reject(err);
                            });
                            tempArr = tempArr.filter(value => Interceptor.interceptorsOf(name).some(value2 => value2 == value));
                        }
                    }
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
                reject(Error("executeCommand typeof(name)===>"+typeof name));
            }
        });
    }


    static releasePrefab(prefab:string, excludePrefab?:string|[string]){
        let excludes = [];
        if (excludePrefab){
            if (typeof excludePrefab == "string"){
                excludes.push(excludePrefab);
            } else {
                excludes = excludePrefab;
            }
        }

        if (excludes.indexOf(prefab) >= 0){
            console.log("release fail,this prefab in retainPrefab or excludes===>"+prefab);
            return
        }

        let deps = cc.loader.getDependsRecursively(prefab);
        let arr = deps.filter(value => {
            for (let i in excludes){
                let retainPrefab = excludes[i];
                if(cc.loader.getDependsRecursively(retainPrefab).indexOf(value) >= 0){
                    return false;
                }
            }
            return true;
        });
        arr.forEach(value => {
            cc.loader.release(value);
            console.log(value, "release====>");
        });
    }

    /** 当前canvas节点 */
    static canvasNode:cc.Node = null;


    private static _separationPrefab:cc.Prefab = null;

    static async initSeparationLayer(separationPrefabName:string){
        this._separationPrefab = await cc.loader.loadResAwait(separationPrefabName, cc.Prefab);
    }

    /** 加入隔断层 */
    static addSeparationLayer(group:string = null, opacity:Number = 115, zOrder:Number = 0):cc.Node{
        if (this._separationPrefab == null){
            console.error("please call Facade.initSeparationLayer before call Facade.addSeparationLayer");
            return;
        }
        let node = cc.instantiate(this._separationPrefab);
        node.setParent(this.canvasNode);
        node.position = cc.v2(0, 0);
        if (typeof opacity == "number"){
            node.opacity = opacity;
        }
        node.zIndex = zOrder;

        if (group){
            node.group = group;
        }
        return node;
    }

    /**
     * 关闭视图
     * */
    static closeView(nodeName:string){
        let node = this.canvasNode.getChildByName(nodeName);
        if (node){
            node.destroy();
        }
    }

    /**
     * 打开视图
     * */
    static async openView(prefabName:string, separationLayerOpacity?:number, group?:string, zOrder?:number):Promise{
        return new Promise(async(resolve, reject) => {
            let separationLayer = Facade.addSeparationLayer(group, separationLayerOpacity, zOrder);
            let prefab = await cc.loader.loadResAwait(prefabName, cc.Prefab);
            let node:cc.Node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);
            LifeCycle.onDestroyFollow(separationLayer, node);
            if (group){
                node.group = group;
            }

            if (zOrder){
                node.zIndex = zOrder;
            }
            resolve(node);
        });
    }

}


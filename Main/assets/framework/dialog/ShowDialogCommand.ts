// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {DialogVO} from "./DialogVO";
import {ICommand} from "../facade/ICommand";
import Facade from "../facade/Facade";
import LifeCycle from "../component/LifeCycle";
import DialogMediator from "./DialogMediator";
import EventEmitter from "../component/EventEmitter";

const {ccclass, property} = cc._decorator;

@ccclass("ShowDialogCommand")
export default class ShowDialogCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise(async (resolve, reject) => {
            let separationLayer = Facade.addSeparationLayer(args[1], args[2]);
            let prefab = <cc.Prefab>await cc.loader.loadResAwait(DialogMediator.dialogPrefabName, cc.Prefab);
            let node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);
            LifeCycle.onDestroyFollow(separationLayer, node);

            let obj = <DialogVO>args[0];
            let mediator = node.getComponent(DialogMediator);

            for (let key in obj){
                if (obj[key] != null && typeof obj[key] != "function"){
                    for(let attr in obj[key]){
                        mediator[key][attr] = obj[key][attr];
                    }
                }
            }
            mediator.content.node.children.forEach(value => value.active = true);

            try {
                let res = await node.onceAwait(EventEmitter.type);
                resolve(res);
            } catch (e) {
                reject(e);
            }
        });
    }
}

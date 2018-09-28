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
import LifeCycle from "../component/LifeCycle";
import Facade from "./Facade";

const {ccclass, property} = cc._decorator;

@ccclass("OpenViewCommand")
export default class OpenViewCommand implements ICommand {

    async execute(...args):Promise{
        let prefabName = args[0];
        let separationLayerOpacity = args[1];
        let group = args[2];
        let zOrder = args[3];
        let separationLayer = Facade.addSeparationLayer(group, separationLayerOpacity, zOrder);
        return new Promise(async(resolve, reject) => {
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

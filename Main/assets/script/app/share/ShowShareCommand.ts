// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {GroupConfig} from "../config/GroupConfig";
import ShareLayerMediator from "./ShareLayerMediator";
import {ShareItemState} from "./ShareItemMediator";
import {ICommand} from "../../../framework/facade/ICommand";
import Facade from "../../../framework/facade/Facade";
import LifeCycle from "../../../framework/component/LifeCycle";

const {ccclass, property} = cc._decorator;

@ccclass("ShowShareCommand")
export default class ShowShareCommand implements ICommand {

    async execute (...args):Promise{
        return new Promise(async (resolve, reject) => {
            let separationLayer = Facade.addSeparationLayer(GroupConfig.ui);
            let prefab = await cc.loader.loadResAwait("Prefab/shareLayer", cc.Prefab);
            let node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);

            LifeCycle.onDestroyFollow(separationLayer, node);

            let shareLayerMediator = node.getComponent(ShareLayerMediator);
            shareLayerMediator.itemList.forEach((value, index) => {
                value.state = ShareItemState.none;
            });

        });
    }

}

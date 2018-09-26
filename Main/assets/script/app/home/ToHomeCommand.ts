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
import {ICommand} from "../../../framework/facade/ICommand";
import Facade from "../../../framework/facade/Facade";
import {MusicPaths} from "../config/MusicPaths";
import {Music} from "../../../framework/audio/Music";

const {ccclass, property} = cc._decorator;

@ccclass("ToHomeCommand")
export default class ToHomeCommand implements ICommand {
    async execute (...args):Promise {
        return new Promise(async resolve => {
            let separationLayer = Facade.addSeparationLayer(GroupConfig.ui, 0);
            let prefab = await cc.loader.loadResAwait("prefab/home", cc.Prefab);
            Facade.canvasNode.children
                .filter(value => !value.getComponent(cc.Camera) && value.name != "separationLayer")
                .forEach(value => value.destroy());
            let node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);

            Music.setBgm(MusicPaths.HomeBg);
            await Facade.executeCommand("WxLoadFriendCloudStorageCommand");
            resolve();
            separationLayer.destroy();
        });
    }
}

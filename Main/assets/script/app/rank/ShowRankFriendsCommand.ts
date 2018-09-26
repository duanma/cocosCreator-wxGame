import {GroupConfig} from "../config/GroupConfig";
import {ICommand} from "../../../framework/facade/ICommand";
import Facade from "../../../framework/facade/Facade";
import LifeCycle from "../../../framework/component/LifeCycle";


const {ccclass, property} = cc._decorator;

@ccclass("ShowRankFriendsCommand")
export default class ShowRankFriendsCommand implements ICommand {
    async execute (...args):Promise{
        return new Promise(async (resolve, reject) => {
            if(Facade.canvasNode.getChildByName("friendRank")){
                resolve();
                return;
            }
            Facade.executeCommand("WxShowFriendsCommand");
            let separationLayer = Facade.addSeparationLayer(GroupConfig.ui, 0);
            let prefab = await cc.loader.loadResAwait("prefab/friendRank", cc.Prefab);
            let node = cc.instantiate(prefab);
            node.setParent(Facade.canvasNode);
            LifeCycle.onDestroyFollow(separationLayer, node);

            resolve();
        });
    }
}
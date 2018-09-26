// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html




import Facade from "../facade/Facade";

const {ccclass, property, menu} = cc._decorator;

enum RigidBodyCollisionType{
    onBeginContact,
    onEndContact,
    onPreSolve,
    onPostSolve,
}

let map = new Map<RigidBodyCollisionType, string>();
map.set(RigidBodyCollisionType.onBeginContact, "onBeginContact");
map.set(RigidBodyCollisionType.onEndContact, "onEndContact");
map.set(RigidBodyCollisionType.onPreSolve, "onPreSolve");
map.set(RigidBodyCollisionType.onPostSolve, "onPostSolve");


@ccclass
@menu("自定义/RigidBodyCollisionToCommand")
export default class RigidBodyCollisionToCommand extends cc.Component {

    @property({type:cc.Enum(RigidBodyCollisionType), displayName:"刚体碰撞类型"})
    collisions:[RigidBodyCollisionType] = [];

    @property({type:cc.String, displayName:"碰撞触发命令"})
    commands:[string] = [];

    onLoad(){
        let self = this;
        this.collisions.forEach((value, index) => this[map.get(value)] = async function (...args) {
            await Facade.executeCommand(self.commands[index], ...args);
        });
    }

}

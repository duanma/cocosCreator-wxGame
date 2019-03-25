// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


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
@menu("自定义/RigidBodyCollisionEvent")
export default class RigidBodyCollisionEvent extends cc.Component {

    @property({type:cc.Enum(RigidBodyCollisionType), displayName:"刚体碰撞类型"})
    collisionType:RigidBodyCollisionType = RigidBodyCollisionType.onBeginContact;

    @property({type:cc.Component.EventHandler, displayName:"触发事件"})
    eventHandlers:[cc.Component.EventHandler] = [];

    onLoad(){
        this[map.get(this.collisionType)] = async (...args)=>{
            cc.Component.EventHandler.emitEvents(this.eventHandlers, ...args);
        }
    }

}

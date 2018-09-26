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

enum NodeEventType{
    TOUCH_START,
    TOUCH_MOVE,
    TOUCH_END,
    TOUCH_CANCEL,
    MOUSE_DOWN,
    MOUSE_MOVE,
    MOUSE_ENTER,
    MOUSE_LEAVE,
    MOUSE_UP,
    MOUSE_WHEEL,
    POSITION_CHANGED,
    ROTATION_CHANGED,
    SCALE_CHANGED,
    SIZE_CHANGED,
    ANCHOR_CHANGED,
    CHILD_ADDED,
    CHILD_REMOVED,
    CHILD_REORDER,
    GROUP_CHANGED,
}

let map = new Map<NodeEventType, string>();
map.set(NodeEventType.TOUCH_START, cc.Node.EventType.TOUCH_START);
map.set(NodeEventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_MOVE);
map.set(NodeEventType.TOUCH_END, cc.Node.EventType.TOUCH_END);
map.set(NodeEventType.TOUCH_CANCEL, cc.Node.EventType.TOUCH_CANCEL);
map.set(NodeEventType.MOUSE_DOWN, cc.Node.EventType.MOUSE_DOWN);
map.set(NodeEventType.MOUSE_MOVE, cc.Node.EventType.MOUSE_MOVE);
map.set(NodeEventType.MOUSE_ENTER, cc.Node.EventType.MOUSE_ENTER);
map.set(NodeEventType.MOUSE_LEAVE, cc.Node.EventType.MOUSE_LEAVE);
map.set(NodeEventType.MOUSE_UP, cc.Node.EventType.MOUSE_UP);
map.set(NodeEventType.MOUSE_WHEEL, cc.Node.EventType.MOUSE_WHEEL);
map.set(NodeEventType.POSITION_CHANGED, cc.Node.EventType.POSITION_CHANGED);
map.set(NodeEventType.SCALE_CHANGED, cc.Node.EventType.SCALE_CHANGED);
map.set(NodeEventType.ANCHOR_CHANGED, cc.Node.EventType.ANCHOR_CHANGED);
map.set(NodeEventType.CHILD_ADDED, cc.Node.EventType.CHILD_ADDED);
map.set(NodeEventType.CHILD_REMOVED, cc.Node.EventType.CHILD_REMOVED);
map.set(NodeEventType.CHILD_REORDER, cc.Node.EventType.CHILD_REORDER);
map.set(NodeEventType.GROUP_CHANGED, cc.Node.EventType.GROUP_CHANGED);

@ccclass
@menu("自定义/NodeEventToCommand")
export default class NodeEventToCommand extends cc.Component {

    @property({type:cc.Enum(NodeEventType), displayName:"事件类型"})
    eventTypes:[NodeEventType] = [];

    @property({type:cc.String, displayName:"事件对应命令"})
    commands:[string] = [];

    private handleEvents = [];

    onLoad () {
        let self = this;
        this.eventTypes.forEach((value, index) => {
            let f = async function (...args) {
                await Facade.executeCommand(self.commands[index], ...args);
            };
            self.handleEvents[index] = f;
            self.node.on(map.get(value), f);
        });
    }


    onDestroy(){
        this.eventTypes.forEach((value, index) => this.node.off(map.get(value), this.handleEvents[index]));
    }
}

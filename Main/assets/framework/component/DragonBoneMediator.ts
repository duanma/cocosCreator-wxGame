// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html




const {ccclass, property, menu, requireComponent} = cc._decorator;

enum DragonBonesEventType{
    START,
    LOOP_COMPLETE,
    COMPLETE,
    FADE_IN,
    FADE_IN_COMPLETE,
    FADE_OUT,
    FADE_OUT_COMPLETE,
    FRAME_EVENT,
    SOUND_EVENT,
}


let map = new Map<DragonBonesEventType, string>();
map.set(DragonBonesEventType.START, dragonBones.EventObject.START);
map.set(DragonBonesEventType.LOOP_COMPLETE, dragonBones.EventObject.LOOP_COMPLETE);
map.set(DragonBonesEventType.COMPLETE, dragonBones.EventObject.COMPLETE);
map.set(DragonBonesEventType.FADE_IN, dragonBones.EventObject.FADE_IN);
map.set(DragonBonesEventType.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_IN_COMPLETE);
map.set(DragonBonesEventType.FADE_OUT, dragonBones.EventObject.FADE_OUT);
map.set(DragonBonesEventType.FADE_OUT_COMPLETE, dragonBones.EventObject.FADE_OUT_COMPLETE);
map.set(DragonBonesEventType.FRAME_EVENT, dragonBones.EventObject.FRAME_EVENT);
map.set(DragonBonesEventType.SOUND_EVENT, dragonBones.EventObject.SOUND_EVENT);

@ccclass
@menu("自定义/DragonBoneMediator")
@requireComponent(dragonBones.ArmatureDisplay)
export default class DragonBoneMediator extends cc.Component {

    private armatureDisplay:dragonBones.ArmatureDisplay = null;

    animationState:dragonBones.AnimationState = null;

    @property
    armatureName:string = "Armature";

    @property({type:cc.Enum(DragonBonesEventType)})
    eventType:DragonBonesEventType = DragonBonesEventType.COMPLETE;

    @property({type:cc.Component.EventHandler, displayName:"触发事件"})
    eventHandlers:[cc.Component.EventHandler] = [];

    onLoad(){
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    }

    private _playAnim(name:string, playTimes=0, timeScale=1){
        this.armatureDisplay.timeScale = timeScale;
        this.armatureDisplay.armatureName = this.armatureName;
        this.animationState = this.armatureDisplay.playAnimation(name, playTimes);
        console.log(`playAnim===>name=${this.animationState.name} playTimes=${playTimes} timeScale=${timeScale}`);
    }

    playAnim(name:string, timeScale?){
        this._playAnim(name, 0, timeScale);
    }

    playAnimOnce(name:string, timeScale?){
        this._playAnim(name, 1, timeScale);
    }

    isAnim(name:string){
        if (this.animationState == null) return false;
        return this.animationState.name === name;
    }

    /** 更换slot.display */
    replaceSlotDisplay(slotName:string, spriteFrame:cc.SpriteFrame | number){
        // this.armatureDisplay.armature().getSlot(slotName).display = new cc.Scale9Sprite(spriteFrame);
        // this.armatureDisplay.armature().getSlot(slotName).display = spriteFrame;
        if (typeof spriteFrame == "number"){
            this.armatureDisplay.armature().getSlot(slotName).displayIndex = spriteFrame;
        }
    }

    /**获取骨骼bone的坐标*/
    getBoneWorldPosition(boneName:string):cc.Vec2{
        let bone = this.armatureDisplay.armature().getBone(boneName);
        return this.node.convertToWorldSpaceAR(cc.v2(bone.global.x, -bone.global.y));
    }

    initDragonBone(dragonAsset:dragonBones.DragonBonesAsset, dragonAtlasAsset:dragonBones.DragonBonesAtlasAsset, armatureName?:string){
        if (!dragonAsset || !dragonAtlasAsset) {
            throw Error(`dragonAsset=${dragonAsset} dragonAtlasAsset=${dragonAtlasAsset}`);
        }
        this.node.removeComponent(dragonBones.ArmatureDisplay);
        let armatureDisplay = this.node.addComponent(dragonBones.ArmatureDisplay);
        armatureDisplay.dragonAsset = dragonAsset;
        armatureDisplay.dragonAtlasAsset = dragonAtlasAsset;
        armatureDisplay.armatureName = armatureName || this.armatureName;
        this.animationState = null;
        this.armatureDisplay = armatureDisplay;
    }


    async handleEvent(event){
        cc.Component.EventHandler.emitEvents(this.eventHandlers, event);
    }

    onLoad () {
        this.armatureDisplay.addEventListener(map.get(this.eventType), this.handleEvent, this);
    }

    onDestroy(){
        this.armatureDisplay.removeEventListener(map.get(this.eventType), this.handleEvent, this);
    }

}

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

@ccclass
@menu("自定义/UIScale")
export default class UIScale extends cc.Component {

    @property
    fitScale = false;

    @property
    fitPosition = true;

    start () {
        let heightScale = cc.view.getVisibleSize().height/cc.view.getDesignResolutionSize().height;
        let widthScale = cc.view.getVisibleSize().width/cc.view.getDesignResolutionSize().width;

        let addScale = Math.abs(heightScale - widthScale);
        if (this.fitScale){
            this.node.setScale(this.node.scale + addScale);
        }

        if (this.fitPosition){
            let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            if (heightScale > widthScale){
                let y = worldPos.y * (1+addScale);
                this.node.y = this.node.convertToNodeSpaceAR(cc.v2(0, y)).y;
            } else{
                let x = worldPos.x * (1 + addScale);
                this.node.x = this.node.convertToNodeSpaceAR(cc.v2(x, 0)).x;
            }
        }
    }
}

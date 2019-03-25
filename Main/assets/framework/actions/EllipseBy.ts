// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;



/** 椭圆运动 */
@ccclass
export default class EllipseBy extends cc.ActionInterval {

    private _center = cc.v2();
    private _a = 0;
    private _b = 0;

    /***
     * @param duration  时间
     * @param center  中间点坐标
     * @param a  长半轴
     * @param b  短半轴
     * */
    public static create(duration:number, center:cc.Vec2, a:number, b:number):EllipseBy{
        let ret = new EllipseBy();
        ret.initWithDuration(duration, center, a, b);
        return ret;
    }

    initWithDuration(duration:number, center:cc.Vec2, a:number, b:number):boolean{
        cc.ActionInterval.prototype['initWithDuration'].apply(this,arguments);
        this._center = center;
        this._a = a;
        this._b = b;
        return true;
    }

    update(dt:number){
        let x = -this._a * Math.cos(2*Math.PI*dt)+this._a;
        let y = this._b * Math.sin(2*Math.PI*dt);
        this.getTarget().setPosition(this._center.add(cc.v2(x-this._a, y)));
    }

    /*public startWithTarget(target:cc.Node):void
    {
        console.log("====startWithTarget=====", this._a, this._c);
        cc.ActionInterval.prototype['startWithTarget'].apply(this,arguments);
    }

    public stop():void
    {
        console.log("====stop=====");
        cc.ActionInterval.prototype['stop'].apply(this);
    }*/
}

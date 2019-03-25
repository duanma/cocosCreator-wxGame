//creator from pabble 2018-11-12
cc.Circle = cc.Class({
    name : 'cc.Circle',
    extends : cc.ActionInterval,
    /**
     * @param duration  时间
     * @param center  圆心点
     * @param r  半径
     * @param s  起点弧度
     * @param e  终点弧度
     * @param revert  是否顺时针(默认顺时针，逆时针传false)
     * */
    ctor:function(duration,center,r,s,e,revert=false){
        this._duration = duration;
        this._center = center;
        this._radius = r;
        this._startAngle = s;
        this._endAngle = e;
        this._dstartAngle = s% (2*Math.PI)
        this._dendAngle = e% (2*Math.PI)
        this._runTime = 0;
        this._direction = revert
        if(this._direction){
            if(this._dendAngle >= this._dstartAngle){
                this._dstartAngle+=2*Math.PI
            }
        } else {
            if(this._dendAngle <= this._dstartAngle){
                this._dendAngle+=2*Math.PI
            }
        }
        cc.Circle.prototype.initWithDuration.call(this, duration,center,r,s,e,revert);	
    },
    initWithDuration:function(duration){
        cc.ActionInterval.prototype.initWithDuration.call(this, duration)
        return true;
    },
    startWithTarget(target){
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
    },
    update(dt){
        dt = this._computeEaseTime(dt);
        if(this.target){
            var a = (this._dendAngle - this._dstartAngle) * (dt) + this._dstartAngle
            
            var x = this._center.x + this._radius * Math.sin(a);
            var y = this._center.y + this._radius * Math.cos(a);
            this.target.x = x;
            this.target.y = y
        }
    },
    reverse:function () {
        var action = new cc.Circle(this._duration,this._center,this._radius,this._endAngle,this._startAngle,!this._direction)
        this._cloneDecoration(action);
        this._reverseEaseList(action);
        return action;
    },
    clone:function(){
        var action = new cc.Circle(this._duration,this._center,this._radius,this._startAngle,this._endAngle,this._direction)
        this._cloneDecoration(action);
        this._reverseEaseList(action);
        return action;
    }
})

cc.circle = function(duration,center,r,s,e,revert){
    return new cc.Circle(duration,center,r,s,e,revert)
}
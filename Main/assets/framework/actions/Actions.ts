// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class Actions {

    /** 向下移动 */
    static downward(speed: Number, height: Number): cc.ActionInterval {
        return cc.moveBy(height / speed, cc.v2(0, -height));
    }

    /** 向上移动 */
    static upward(speed: Number, height: Number): cc.ActionInterval {
        return cc.moveBy(height / speed, cc.v2(0, height));
    }

    /** 周期性动作 */
    static cycleAction(action: Function, startValue: Number, endValue: Number, deltaValue: Number, speed: Number, times: Number, damping: Number = 0, cycleDelay: Number = 0): cc.ActionInterval {
        let deltaValue_abs = Math.abs(deltaValue);
        let actions: [cc.FiniteTimeAction] = [];
        actions.push(action(deltaValue_abs / speed, startValue + deltaValue));
        if (cycleDelay > 0) {
            actions.push(cc.delayTime(cycleDelay));
        }
        for (let i = 0; i < times; i++) {
            let newDeltaRotation = deltaValue_abs - (i * damping);
            let duation = newDeltaRotation * 2 / speed;
            let rotation = newDeltaRotation;
            if (deltaValue > 0) {
                if (i % 2 == 0) {
                    rotation = -rotation;
                }
            } else {
                if (i % 2 == 1) {
                    rotation = -rotation;
                }
            }

            actions.push(action(duation, startValue + rotation));
            if (cycleDelay > 0 && i % 2 == 1) {
                actions.push(cc.delayTime(cycleDelay));
            }
        }
        let lastValue = deltaValue_abs - (times - 1) * damping;
        if (deltaValue > 0) {
            if (times % 2 == 0) {
                lastValue = -lastValue;
            }
        } else {
            if (times % 2 == 1) {
                lastValue = -lastValue;
            }
        }
        actions.push(action(Math.abs(endValue - (startValue + lastValue)) / speed, endValue));
        return cc.sequence(actions);
    }

    /** 延迟执行 */
    static delayTimeCall(delay: Number, call: Function): cc.ActionInterval {
        return cc.sequence(cc.delayTime(delay), cc.callFunc(call));
    }

    /** 循环任务 */
    static scheduleCall(interval: Number, call: Function|cc.FiniteTimeAction): cc.ActionInterval {
        if (typeof call == "function"){
            return cc.repeatForever(cc.sequence(cc.delayTime(interval), cc.callFunc(call)));
        }else {
            return cc.repeatForever(cc.sequence(cc.delayTime(interval), call));
        }
    }


    /** 高亮显示动作（先放大再缩小,适合更换字体时调用） */
    static highlightAction(maxScaleCall?: Function): cc.ActionInterval {
        let call = function () {
            if (maxScaleCall) maxScaleCall();
        };
        let seq = cc.sequence([
            cc.scaleTo(0.1, 1.4),
            cc.callFunc(call),
            cc.scaleTo(0.07, 0.8),
            cc.scaleTo(0.07, 1.1),
            cc.scaleTo(0.07, 0.9),
            cc.scaleTo(0.07, 1),
        ]);
        return seq;
    }

    /** 飘动显示效果(适合显示label提示，类似toast) */
    static flutterAction(): cc.FiniteTimeAction {
        let moveSeq = cc.sequence([
            cc.moveBy(0.6, cc.v2(0, 0)),
            cc.moveBy(1, cc.v2(0, 84))
        ]);

        let scaleSeq = cc.sequence([
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.1, 1),
        ]);

        let alphaSeq = cc.sequence([
            cc.fadeTo(0.8, 255),
            cc.fadeTo(0.8, 0),
        ]);

        let spawn = cc.spawn(moveSeq, scaleSeq, alphaSeq);
        return spawn;
    }

    /**
     * 圆运动
     * @param {Number} duration
     * @param {cc.Node|cc.p} dot 圆心点坐标或者node
     * @param {Number}   半径 如果为负数, 反时钟方向
     * @param {Number}  旋转角度
     * @returns {cc.CardinalSplineTo}
     */
    static circleBy(duration, dot, r, angle):cc.ActionInterval{
        var dp = angle || 20, dpr = 360 / dp, ary = [];
        r = r || 20;
        if(r < 0) dpr = -dpr;
        r = Math.abs(r);

        let rad = Math.PI/180;

        for(var i = 0; i < dp; i ++){
            ary.push(cc.v2(Math.sin(dpr * i * rad) * r + dot.x, Math.cos(dpr * i * rad) * r + dot.y));
        }
        ary.push(ary);
        return cc.cardinalSplineTo(duration, ary, 0);
    };

}



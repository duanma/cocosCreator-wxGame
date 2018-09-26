// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

async function runAction (actionOrActionArray: cc.FiniteTimeAction|cc.FiniteTimeAction[], tag?:Number):Promise {
    let self = <cc.Node>this;
    return new Promise(resolve => {
        let seq = cc.sequence(actionOrActionArray, cc.callFunc(function () {
            resolve();
        }));
        if (tag) {
            seq.setTag(tag);
        }
        self.runAction(seq);
    });
}


async function once(type: string, useCapture?: boolean):Promise{
    let self = <cc.Node>this;
    return new Promise(resolve => {
        self.once(type, function (event) {
            resolve(event);
        }, null, useCapture);
    });
}

cc.Node.prototype.runActionAwait = runAction;
cc.Node.prototype.onceAwait = once;
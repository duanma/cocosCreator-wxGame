// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 命令拦截器
 * 可以拦截command命令，在执行command之前或之后做一些自己的处理工作，比如：
 * 1.切换背景音乐
 * 2.新手引导
 * 3.优化性能(提前加载资源)
 * etc.
 * 在不修改游戏逻辑的代码完成这些功能。
 * */

export interface ICommandInterceptor{
    preHandle(...args):Promise<boolean>;
    postHandle(...args):Promise;
}


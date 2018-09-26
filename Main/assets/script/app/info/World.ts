// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export module World{
    export module My{
        /** 昵称 */
        export let nickName:string;
        /** 头像url */
        export let avatarUrl:string;
        /** 性别 0：未知、1：男、2：女  */
        export let gender:number;
        /** 省份 */
        export let province:string;
        /** 城市 */
        export let city:string;
        /** 国家 */
        export let country:string;

        /** openId */
        export let openId:string;
        /** 加入复活币 */
        export let todayAdd:number;

        /** 上次添加时间 */
        export let lastAddTime:number;

        /** 复活币数量 */
        export let rebirthCoins:number;

        /** 玩家id */
        export let playerId:number = 0;
        /** 皮肤id */
        export let skinId:number = 1;
        /** 道具数量 */
        export let carrotNum:number = 0;

        /** 购买过的皮肤 */
        export let ownedSkins:[number] = [1];

        /** 最高分 */
        export let bestScore:number = 0;

    }

    /** 新手引导--根据模块划分 */
    export module Newbies{
        export let startGame = false;
    }

}


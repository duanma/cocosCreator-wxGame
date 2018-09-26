import {HttpResponseConverter} from "./HttpResponseConverter";


export class LoginResponse extends HttpResponseConverter{
    session_key:string = null;
    openid:string = null;
    playerId:number = null;
    todayAdd:number = null;//加入复活币
    lastAddTime:number = null;//上次添加时间
    rebirthCoins:number = null;//复活币数量
    bestRecord:number = null;//最高分
}
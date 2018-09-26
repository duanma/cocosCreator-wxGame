/// <reference path=HttpConverter.ts">



import {HttpRequestConverter} from "./HttpRequestConverter";

export class LoginRequest extends HttpRequestConverter{
    gameId:string;
    name:string;
    headUrl:string;
    jsCode:string;
    sex:number;
    city:string;
}



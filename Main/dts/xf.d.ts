declare module cc {
    export class loader{
        static async getResAwait(url: string, type?: Function):Promise;

        static async loadResAwait(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResAwait(url: string, type: typeof cc.Asset): Promise;
        static async loadResAwait(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResAwait(url: string): Promise;


        static async loadResArrayAwait(url: string[], type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResArrayAwait(url: string[], type: typeof cc.Asset): Promise;
        static async loadResArrayAwait(url: string[], progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResArrayAwait(url: string[]): Promise;


        static async loadResDirAwait(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResDirAwait(url: string, type: typeof cc.Asset): Promise;
        static async loadResDirAwait(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void): Promise;
        static async loadResDirAwait(url: string): Promise;
    }


    export class Node {
        async runActionAwait(actionOrActionArray: cc.FiniteTimeAction | cc.FiniteTimeAction[], tag?: Number): Promise;

        async onceAwait(type: string, useCapture?: boolean): Promise;
    }


    export class WXSubContextView {
        update(): void;
    }

}



declare module wx{
    export function getLaunchOptionsSync();
    export function setKeepScreenOn(obj:any);
    export function onShow(f:(res)=>void);
    export function onHide(f:(res)=>void);
    export function onShareAppMessage(f:(res)=>void);
    export function checkSession(obj:any);
    export function login(obj:any);
    export function shareAppMessage(obj:any);
    export function updateShareMenu(obj:any);
    export function showShareMenu(obj:any);
    export function getSystemInfoSync():SystemInfo;
    export function createBannerAd(obj:any);
    export function createRewardedVideoAd(obj:any);
    export function previewImage(obj:any);
    export function navigateToMiniProgram(obj:any);
    export function authorize(obj:any);
    export function createUserInfoButton(obj:any);
    export function getUserInfo(obj:any);
    export function postMessage(obj:any);
    export function createImage();

    class SystemInfo {
        brand:string;// 	手机品牌 	1.5.0
        model:string;// 	手机型号
        pixelRatio:number;// 	设备像素比
        screenWidth:number;// 	屏幕宽度 	1.1.0
        screenHeight:number;// 	屏幕高度 	1.1.0
        windowWidth:number;// 	可使用窗口宽度
        windowHeight:number;// 	可使用窗口高度
        statusBarHeight:number;// 	状态栏的高度 	1.9.0
        language:string;// 	微信设置的语言
        version:string;// 	微信版本号
        system:string;// 	操作系统版本
        platform:string;// 	客户端平台
        fontSizeSetting:number;// 	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px 	1.5.0
        SDKVersion:string;// 	客户端基础库版本
    }
}




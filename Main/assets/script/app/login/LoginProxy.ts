// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {wxApi} from "../../../framework/wxApi/wxApi";

export class LoginProxy {

    async getUserInfo(){
        let userInfo:object = null;
        if (wxApi.sysInfo.SDKVersion >= "2.0.1"){
            /** 先授权 */
            try {
                await wxApi.authorize("scope.userInfo");
                /** 直接获取userInfo,已经授权 */
                let res = await wxApi.getUserInfo(false, "zh_CN");
                userInfo = res.userInfo;
            }catch (e) {
                console.log(e, "authorize err");
                /** 创建登陆按钮 */
                let x = window.innerWidth / 2 - 146 / 2;
                let y = window.innerHeight / 1.4;
                let button = wx.createUserInfoButton({
                    type: "text",
                    text: "微信登陆",
                    image: "",
                    style: {
                        left: x,
                        top: y,
                        width: 150,
                        height: 48,
                        lineHeight: 48,
                        backgroundColor: "#09bb07",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 22,
                        borderRadius: 24
                    }
                });
                /** 用户点击登陆按钮后获取userInfo */
                userInfo = await new Promise(resolve => {
                    button.onTap((res) => {
                        console.log("用户授权:", res);
                        button.destroy();
                        resolve(res.userInfo);
                    });
                });
            }
        }else {
            /** 直接获取userInfo,不需要授权 */
            let res = await wxApi.getUserInfo(false, "zh_CN");
            userInfo = res.userInfo;
        }

        return userInfo;
    }

}

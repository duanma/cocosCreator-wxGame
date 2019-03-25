// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let _isLandscape = false;
if (window.innerWidth > window.innerHeight){
    _isLandscape = true;
}

let _isIphoneX = false;
if (window.innerWidth < window.innerHeight){
    _isIphoneX = window.innerWidth/window.innerHeight == 1125/2436;
} else{
    _isIphoneX = window.innerWidth/window.innerHeight == 1125/2436;
}

export module ext{
    export function shuffle(aArr){
        let iLength = aArr.length,
            i = iLength,
            mTemp,
            iRandom;

        while(i--){
            if(i !== (iRandom = Math.floor(Math.random() * iLength))){
                mTemp = aArr[i];
                aArr[i] = aArr[iRandom];
                aArr[iRandom] = mTemp;
            }
        }

        return aArr;
    }

    export function randomElement(aArr:Array) {
        if (aArr.length == 0){
            return null;
        }
        let index = Math.floor(Math.random() * aArr.length);
        return aArr[index];
    }

    export function createObj(name:String, ...args) {
        let obj = cc.js.getClassByName(name);
        if (typeof obj == "undefined"){
            cc.error(`${name} not define @ccclass(${name})`);
        } else if (typeof obj == "function") {
            obj.prototype.constructor.apply(obj, ...args);
            return obj.prototype;
        }
        return null;
    }
    
    export function everyNode(root:cc.Node, f:(node)=>void) {
        f(root);
        root.children.forEach(value => everyNode(value, f));
    }

    export const isLandscape = _isLandscape;
    export const isIphoneX = _isIphoneX;


    export function wxCreateImageToSprite(sprite,url){
        let node = sprite.node;
        let size = {width:node.width , height:node.height};
        let image = wx.createImage();
        image.onload = function () {
            if (sprite && sprite.node && sprite.node.isValid){
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                node.width = size.width;
                node.height = size.height;
            }
        };
        image.src = url;
    }
}










// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

async function getRes(url: string, type?: Function):Promise{
    return new Promise(async (resolve, reject) => {
        let res = cc.loader.getRes(url, type);
        if(res == null){
            let res = await loadRes(url, type).catch(function (err) {
                reject(err);
            });
            resolve(res);
        }else {
            resolve(res);
        }
    });
}

async function loadRes(...args):Promise{
    return new Promise((resolve, reject) => {
        cc.loader.loadRes(...args, function (err, res) {
            if (err == null){
                resolve(res);
            } else {
                reject(err);
            }
        });
    });
}

async function loadResArray(...args):Promise{
    return new Promise((resolve, reject) => {
        cc.loader.loadResArray(...args, function (err, res) {
            if (err == null){
                resolve(res);
            } else {
                reject(err);
            }
        });
    });
}

async function loadResDir(...args):Promise{
    return new Promise((resolve, reject) => {
        cc.loader.loadResDir(...args, function (err: Error, resource: any[], urls: string[]) {
            if (err == null){
                resolve([resource, urls]);
            } else {
                reject(err);
            }
        });
    });
}

cc.loader.getResAwait = getRes;
cc.loader.loadResAwait = loadRes;
cc.loader.loadResArrayAwait = loadResArray;
cc.loader.loadResDirAwait = loadResDir;

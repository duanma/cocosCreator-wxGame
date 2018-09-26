// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



function data2Json(str:Array){
    let d:Array =  str;
    //转换数据
    //第二排是key 把key提出来
    let keys = d.splice(0,1);
    let temp1 = [];
    for(let i in keys[0]){
        temp1[i] = keys[0][i];
    }
    //合并的数据
    let newData = [];
    for(let i in d){
        let temp2 = d[i];
        newData[i] = {};
        for(let j in temp2){
            let key = temp1[j];
            let val = null;
            val = temp2[j];
            newData[i][key] = val;
        }
    }
    return newData;
}

let excelTables = new Map<String, Array>();

export class ExcelConfig{
    static async loadAllExcel(excelDir:string, progressCallback?: (completedCount: number, totalCount: number, item: any) => void){
        let [objects, urls] = await cc.loader.loadResDirAwait(excelDir, progressCallback);
        for (let i=0; i<objects.length; i++){
            let json = objects[i];
            if (typeof objects[i].json != "undefined"){
                json = objects[i].json;
            }
            excelTables.set(urls[i], data2Json(json));
        }
    }

    static async loadExcel(filePath:String):Array{
        let object = await cc.loader.loadResAwait(filePath);
        let json = object;
        if (typeof object.json != "undefined"){
            json = object.json;
        }
        let dataArr =data2Json(json);
        excelTables.set(filePath, dataArr);
        return dataArr;
    }

    static getExcelTable(filePath:string) {
        return excelTables.get(filePath);
    }

    static getExcelLine(filePath:String, key:String, findValue:any):Object{
        let array = this.getExcelTable(filePath);
        for (let index in array){
            if (array[index][key] == findValue){
                return array[index];
            }
        }
        return null;
    }
}

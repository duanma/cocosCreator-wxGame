// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import {ITableItem} from "./ITableItem";

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("自定义/TableViewMediator")
export default class TableViewMediator extends cc.Component {

    @property({type:cc.ScrollView})
    scrollView:cc.ScrollView = null;

    @property({type:cc.Prefab})
    itemPrefab:cc.Prefab = null;

    @property({type:cc.Integer})
    marginTop:Number = 0;

    @property({type:cc.Integer})
    marginBottom:Number = 0;

    @property({type:cc.Integer})
    margin:Number = 0;

    @property
    itemMediatorName = "";

    @property
    itemAction:boolean = false;

    private itemHeight = 0;

    private list:Array<cc.Node> = [];

    private firstIndex = 0;

    private firstIndexMax = 0;

    private data = [];
    // LIFE-CYCLE CALLBACKS:

    setData(data:Array){
        let itemNode = cc.instantiate(this.itemPrefab);
        // itemNode.active = false;
        this.itemHeight = itemNode.getContentSize().height;
        let itemHeightHalf = this.itemHeight/2;
        /** 计算出view能装下多少个item */
        let viewSize = this.scrollView.node.getContentSize();
        let content = this.scrollView.content;

        let height = this.marginTop;
        while (true){
            if (height > viewSize.height){
                break;
            }
            let node = cc.instantiate(itemNode);
            node.x = 0;
            node.y = -height - itemHeightHalf;
            node.parent = content;
            this.list.push(node);
            height += this.itemHeight + this.margin;
            // console.log("wx sub===>node.y", node.y);
        }

        itemNode.y = -height - itemHeightHalf;
        itemNode.parent = content;
        this.list.push(itemNode);

        /** 计算最大firstIndexMax */
        let num = Math.ceil((this.scrollView.content.height - this.marginTop - this.marginBottom + this.margin) / (this.itemHeight+this.margin));
        this.firstIndexMax = this.list.length - num - 1;
        // console.log(this.firstIndexMax, "this.firstIndexMax");

        this.data = data.slice(0);
        // this.data = [1,2,3,4,5,6,7,8,9];
        this.updateData();
        if (this.itemAction){
            this.showAction();
        }
    }

    itemRunAction(item:cc.Node, index:number){
        item.scaleX = 0;
        item.runAction(cc.scaleTo(0.2+(0.04*index), 1).easing(cc.easeSineOut()));
    }

    showAction(){
        this.list.forEach((value, index) => {
            if (index < this.data.length){
                this.itemRunAction(value, index);
            }
        });
    }

    updateData(){
        if(this.list.length  == 0)return;
        this.list.forEach((value, index) => {
            if (index < this.data.length){
                value.active = true;
                this.updateItem(value, index);
            }else {
                value.active = false;
            }
        });

        this.scrollView.content.height = this.marginTop + this.marginBottom + this.itemHeight * this.data.length + this.margin * (this.data.length - 1);
        // console.log(this.scrollView.content.getContentSize().height, "content.height");
    }


    updateItem(node:cc.Node, index:Number){
        let value = this.data[index];
        let itemMediator = <ITableItem>node.getComponent(this.itemMediatorName);
        itemMediator.upadteItem(value, index);
    }

    onScrollEvent(event){
        // console.log(event, "event");
        let content = this.scrollView.content;
        // let contentHeight = content.getContentSize().height;
        let viewHeight = this.scrollView.node.getContentSize().height;
        /*if ((!this.scrollView.isAutoScrolling() && !this.scrollView.isScrolling()) || content.y < 0 || content.y >= contentHeight - viewHeight){
            return;
        }*/
        let contentY = content.y;
        // console.log(contentY, "contentY");
        /** 判断第1个元素 和 倒数第1个元素的位置 */
        /** 上边界 */
        let itemHeightHalf = this.itemHeight/2;

        /** 头插入 */
        while(this.firstIndex > 0 && this.list[0].y + this.marginTop + itemHeightHalf < -contentY){
            let last = this.list.pop();
            last.y = this.list[0].y + this.itemHeight + this.margin;
            this.list.unshift(last);
            this.firstIndex--;
            // console.log("===========>尾移头");
            this.updateItem(last, this.firstIndex);
        }

        /** 尾插入 */
        while(this.firstIndex < this.firstIndexMax && this.list[this.list.length-1].y - itemHeightHalf - this.marginBottom > -contentY - viewHeight){
            let first = this.list.shift();
            first.y = this.list[this.list.length-1].y - this.itemHeight - this.margin;
            this.list.push(first);
            this.firstIndex++;
            // console.log("===========>头移尾", this.list[this.list.length-1].y);
            this.updateItem(first, this.firstIndex+this.list.length-1);
        }
    }
}

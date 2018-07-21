export default class Text {
    constructor(container){
        
    }
    elementWidth(element){
        if(element.constructor.name==='Text'){
            let metrics = PIXI.TextMetrics.measureText(element.text, element.style);
            return metrics.width+10;
        } else {
            return element.width+10;
        }
    }
    generate(content){
        let container = new PIXI.Container();
        let pointer = 0;
        for(const [i, element] of content.entries()){
            if(typeof(element.item)==='string'){
                let text = new PIXI.Text(element.item);
                text.anchor.set(0,0.5);
                text.y = (element.size/2);
                if(i>0){
                    pointer += this.elementWidth(container.children[i-1])
                }
                text.x = pointer;
                text.style.fontSize = (element.size/2)
                container.addChild(text);
            } else if(typeof(element.item)==='object'){
                if(i>0){
                    pointer += this.elementWidth(container.children[i-1])
                }
                element.item.x = pointer;
                element.item.width = element.size;
                element.item.height = element.size;
                container.addChild(element.item);
            }
        }
        return container;
    }
}
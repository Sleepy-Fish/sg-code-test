import Button from './button';

export default class Menu {
    constructor(app, buttonActions=[], options={}){
        let buttons = [];
        this.buttonWidth = options.buttonWidth||200;
        this.buttonHeight = options.buttonHeight||50;
        this.buttonGutter = options.buttonGutter||10;
        this.xPositioning = options.xPositioning||0.5;
        this.yPositioning = options.yPositioning||0.2;
        for(const [i, buttonAction] of buttonActions.entries()){
            if(typeof(buttonAction)==='function'){
                buttons.push(
                    new Button({
                        x: Math.round(window.innerWidth*this.xPositioning),
                        y: Math.round(window.innerHeight*this.yPositioning)+((this.buttonHeight+this.buttonGutter)*i),
                        width: this.buttonWidth,
                        height: this.buttonHeight,
                    }, buttonAction)
                );
            }
        }
        for(const button of buttons){
            app.stage.addChild(button.init);
        }
        window.addEventListener("resize", () => {
            for(const [i, button] of buttons.entries()){
                button.x = Math.round(window.innerWidth*this.xPositioning);
                button.y = Math.round(window.innerHeight*this.yPositioning) + ((this.buttonHeight+this.buttonGutter)*i);
            }
        });
    }
}
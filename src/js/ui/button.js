import * as PIXI from 'pixi.js';
export default class Button {
    constructor(options={}, callback=()=>{console.trace(`No callback set for ${this.constructor.name}`)}){
        this.isDown = false;
        this.isHover = false;
        this.callback = callback;

        this.plain = options.plainTexture||PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUmPj/PwAFGgKplHdb/wAAAABJRU5ErkJggg==", true);
        this.hover = options.hoverTexture||PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNs3/fxPwAHQQM3YEwWdQAAAABJRU5ErkJggg==", true);
        this.click = options.clickTexture||PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUS137HwAD6gIpM6FI4wAAAABJRU5ErkJggg==", true);

        this.sprite = new PIXI.Sprite(this.plain);
        this.sprite.buttonMode = true;
        this.sprite.interactive = true;
        this.sprite.anchor.set(0.5);
        this.sprite.x = options.x||0;
        this.sprite.y = options.y||0;
        this.sprite.width = options.width||10;
        this.sprite.height = options.height||10;

        this.sprite
            .on('pointerdown', this.onDown.bind(this))
            .on('pointerup', this.onUp.bind(this))
            .on('pointerupoutside', this.onUp.bind(this))
            .on('pointerover', this.onHover.bind(this))
            .on('pointerout', this.onUnhover.bind(this));
    }

    get init(){
        return this.sprite;
    }
    set x(x){
        this.sprite.x = x;
    }
    set y(y){
        this.sprite.y = y;
    }

    onDown() {
        this.isDown = true;
        this.sprite.texture = this.click;
        this.callback();
    }
    onUp() {
        this.isDown = false;
        if(this.isHover){
            this.sprite.texture = this.hover;
        } else {
            this.sprite.texture = this.plain;
        }
    }
    onHover() {
        this.isHover = true;
        if(this.isDown){
            return;
        }
        this.sprite.texture = this.hover;
    }
    onUnhover() {
        this.isHover = false;
        if(this.isDown){
            return;
        }
        this.sprite.texture = this.plain;
    }

}
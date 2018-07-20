import * as PIXI from 'pixi.js';

export default class State {
    constructor(app){
        this.active = false;
        this.scene = new PIXI.Container();
        this.scene.visible = false;
        app.stage.addChild(this.scene);
    }
    run(delta){
        
    }
    activate(){
        this.active = true;
        this.scene.visible = true;
    }
    deactivate(){
        this.active = false;
        this.scene.visible = false;
    }
}
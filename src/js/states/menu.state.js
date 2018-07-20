import * as PIXI from 'pixi.js';
import State from './state'
import Menu from '../ui/menu';

export default class MenuState extends State{
    constructor(app){
        super(app)
        this.menu = new Menu(this.scene,[
            ()=>{window.game.setState('stack');},
            ()=>{window.game.setState('text');},
            ()=>{window.game.setState('fire');},
        ]);
    }
    run(delta){
        super.run(delta);

    }
}
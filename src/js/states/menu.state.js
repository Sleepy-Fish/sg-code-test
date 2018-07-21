import * as PIXI from 'pixi.js';
import State from './state'
import Menu from '../ui/menu';

export default class MenuState extends State{
    constructor(app){
        super(app)
        this.menu = new Menu(this.scene,[
            { label: 'Stacking Demo', callback: ()=>{window.game.setState('stack');}},
            { label: 'Text Image Demo', callback: ()=>{window.game.setState('text');}},
            { label: 'Fire Demo', callback: ()=>{window.game.setState('fire');}},
        ]);
    }
    run(delta){
        super.run(delta);

    }
}
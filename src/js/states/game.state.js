import State from './state'
import Button from '../ui/button'

export default class GameState extends State {
    constructor(app){
        super(app);
        this.backButton = new Button({
            x:35,
            y: 30,
            width:50,
            height:40
        },()=>{
            window.game.setState('menu')
        });
        this.scene.addChild(this.backButton.init);
    }
    run(delta){
        super.run(delta);
    }
}
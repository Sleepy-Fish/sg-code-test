import State from './state'
import Button from '../ui/button'

export default class GameState extends State {
    constructor(app){
        super(app);
        this.fpsText = new PIXI.Text(Math.round(app.ticker.FPS));
        this.fpsText.x = 100;
        this.fpsText.y = 10;

        this.backButton = new Button({
            text:'Back',
            x:45,
            y: 30,
            width:70,
            height:40
        },()=>{
            window.game.setState('menu')
        });
        this.scene.addChild(this.backButton.init, this.fpsText);
    }
    run(delta){
        super.run(delta);
        this.fpsText.text = Math.round(this.app.ticker.FPS);
    }
    activate(){
        super.activate();
        this.backButton.reset();
    }
}
import GameState from './game.state'
import TextGenerator from '../ui/text';
import { Rectangle } from 'pixi.js';
import Button from '../ui/button'

export default class TextState extends GameState{
    constructor(app){
        super(app);

        this.textPool = [
            "Great",
            "Awesome",
            "Epic",
            "Uber",
            "Super",
            "Amazing",
            "Fine",
            "Exquisite",
            "Wonderful",
            "Unreal",
            "Superior",
            "Excellent",
            "Good",
            "Rare"
        ];

        this.running = false;
        this.gearTexture = PIXI.loader.resources['gear'].texture;
        this.gearTexture.frame = this.randomFrame(16, 16, 48, 48);

        this.textContainer = new PIXI.Container()
        this.textContainer.x = 30;
        this.textContainer.y = 200;

        this.textGenerator = new TextGenerator();

        this.startButton = new Button({
            text:'Start',
            x:45,
            y: 80,
            width:70,
            height:40
        },()=>{
            this.start();
        });
        this.stopButton = new Button({
            text: 'Stop',
            x:45,
            y: 130,
            width:70,
            height:40
        },()=>{
            this.stop();
        });

        this.scene.addChild(this.textContainer, this.startButton.init, this.stopButton.init);
    }
    
    run(delta){
        super.run(delta);

    }
    activate(){
        super.activate();
        this.start();
    }
    deactivate(){
        super.deactivate();
        this.stop();
    }
    generateText(){
        let content = [];
        let size = (Math.floor(Math.random() * 15) + 12) * 2;
        for(let i = 0; i < 3; i++){
            if(Math.random() > 0.5){
                content.push({ item: this.textPool[Math.floor(Math.random()*this.textPool.length)], size: size});
            } else {
                content.push({ item: new PIXI.Sprite(new PIXI.Texture(this.gearTexture, this.randomFrame(16, 16, 48, 48))), size: size});
            }
        }
        this.textContainer.children = [];
        return this.textContainer.addChild(this.textGenerator.generate(content));
    }
    randomFrame(xframes, yframes, framewidth, frameheight){
        let xpos = Math.floor(Math.random() * xframes);
        let ypos = Math.floor(Math.random() * yframes);
        let rect = new Rectangle(framewidth*xpos, frameheight*ypos, framewidth, frameheight);
        return rect
    }
    start(){
        if(!this.running){
            this.generateText();
            this.running = true;
            this.generationInterval = setInterval(this.generateText.bind(this), 2000);
        }
    }
    stop(){
        if(this.running){
            this.running = false;
            this.textContainer.children = [];
            clearInterval(this.generationInterval)
        }
    }
}
import * as PIXI from 'pixi.js';
import 'pixi-tween';
import GameState from './game.state'
import Button from '../ui/button'

export default class StackState extends GameState{
    constructor(app){
        super(app);
        this.fpsText = new PIXI.Text(app.ticker.FPS.toFixed(8));
        this.fpsText.x = 80;
        this.fpsText.y = 5;

        this.startingLocation = {x: 100, y: 50};
        this.endingLocation = {x: 30, y: 180};
        this.tweenTime = 2000;
        this.restackTime = 1000
        this.numberOfCards = 144;
        this.restacking = false;
        this.cardStack = new PIXI.Container();
        for(let i = 0; i < this.numberOfCards; i++){
            let card = new PIXI.Sprite(PIXI.Texture.WHITE);
            card.tint = Math.random() * 0xFFFFFF;
            card.x = this.startingLocation.x+i;
            card.y = this.startingLocation.y+i;
            card.width = 45;
            card.height = 70;
            card.zOrder = i;
            card.displayGroup = this.layer;
            card.moving = false;
            this.cardStack.addChild(card);
        }
        this.goButton = new Button({
            x:35,
            y: 80,
            width:50,
            height:40
        },()=>{
            this.restack();
        });
        this.resetButton = new Button({
            x:35,
            y: 130,
            width:50,
            height:40
        },()=>{
            this.reset();
        });
        this.scene.addChild(this.goButton.init, this.resetButton.init, this.cardStack, this.fpsText);
    }
    run(delta){
        super.run(delta);
        this.fpsText.text = this.app.ticker.FPS.toFixed(12);
        if(this.restacking){
            PIXI.tweenManager.update();
        }
    }
    restack(){
        if(!this.restacking){
            this.restacking = true;
            let cardOrder = this.numberOfCards;
            this.restackInterval = setInterval(()=>{
                cardOrder--;
                let newCardOrder = this.numberOfCards - 1 - cardOrder;
                let cardToMove = this.cardStack.children[cardOrder];
                if(!cardToMove.moving){
                    cardToMove.moving = true;
                    let tween = PIXI.tweenManager.createTween(cardToMove);
                    tween
                        .from({ x: cardToMove.x, y: cardToMove.y })
                        .to({ x: this.endingLocation.x + newCardOrder, y: this.endingLocation.y + newCardOrder });
                    tween.time = this.tweenTime;
                    tween.start();
                    tween.on('start', () => {
                        //faster than z order sorting in this case.
                        this.cardStack.removeChild(cardToMove)
                        this.cardStack.addChild(cardToMove);
                    })
                    if(cardOrder === 0){
                        clearInterval(this.restackInterval);
                        tween.on('end', () => {
                            this.restacking = false;
                            PIXI.tweenManager.tweens = [];
                            
                        })
                    }
                }
            },this.restackTime);
        }
    }
    reset(){
        clearInterval(this.restackInterval)
        for(const [i, card] of this.cardStack.children.entries()){
            card.x = this.startingLocation.x+i;
            card.y = this.startingLocation.y+i;
            card.moving = false;
        }
        PIXI.tweenManager.tweens = [];
        this.restacking = false;
    }
}
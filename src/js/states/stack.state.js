import * as PIXI from 'pixi.js';
import 'pixi-tween';
import GameState from './game.state'
import Button from '../ui/button'

export default class StackState extends GameState{
    constructor(app){
        super(app);
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
            text:'Restack',
            x:45,
            y: 80,
            width:70,
            height:40
        },()=>{
            this.restack();
        });
        this.resetButton = new Button({
            text: 'Reset',
            x:45,
            y: 130,
            width:70,
            height:40
        },()=>{
            this.reset();
        });
        this.scene.addChild(this.goButton.init, this.resetButton.init, this.cardStack);
    }
    run(delta){
        super.run(delta);
        if(this.restacking){
            PIXI.tweenManager.update();
        }
    }
    activate(){
        super.activate();
        this.restack();
    }
    deactivate(){
        super.deactivate();
        this.reset();
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
        clearInterval(this.restackInterval);
        for(const [i, card] of this.cardStack.children.entries()){
            card.x = this.startingLocation.x+i;
            card.y = this.startingLocation.y+i;
            card.moving = false;
        }
        PIXI.tweenManager.tweens = [];
        this.restacking = false;
    }
}
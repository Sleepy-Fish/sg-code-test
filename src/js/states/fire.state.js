import * as PIXI from 'pixi.js';
import 'pixi-particles';
import GameState from './game.state'
import flameSettings from '../emitter-settings/flame';
import sparkSettings from '../emitter-settings/spark';

export default class FireState extends GameState{
    constructor(app){
        super(app);
        this.elapsed = Date.now();
        this.flameContainer = new PIXI.particles.ParticleContainer();
        this.sparkContainer = new PIXI.particles.ParticleContainer();

         let fireParticleTextures = [];
        for(let i = 1; i <= 6; i++){
            fireParticleTextures.push(PIXI.loader.resources[`fire${i}`].texture);
        }

        this.flameEmitter = new PIXI.particles.Emitter(
            this.flameContainer,
            fireParticleTextures,
            flameSettings
        );
        this.sparkEmitter = new PIXI.particles.Emitter(
            this.sparkContainer,
            [PIXI.Texture.WHITE],
            sparkSettings
        );
        this.scene.addChild(this.flameContainer, this.sparkContainer);
        window.addEventListener("resize", () => {
            this.flameEmitter.spawnPos.x = window.innerWidth/2;
            this.flameEmitter.spawnPos.y = window.innerHeight/2;
            this.sparkEmitter.spawnPos.x = window.innerWidth/2;
            this.sparkEmitter.spawnPos.y = window.innerHeight/2;
        });
    }
    run(delta){
        super.run(delta);
        let now = Date.now();
        this.flameEmitter.update((now - this.elapsed) * 0.001);
        this.sparkEmitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;
    }
    activate(){
        super.activate();
        this.flameEmitter.emit = true;
        this.sparkEmitter.emit = true;

    }
    deactivate(){
        super.deactivate();
        this.flameEmitter.emit = false;
        this.sparkEmitter.emit = false;
        this.flameEmitter.cleanup();
        this.sparkEmitter.cleanup();
    }
}
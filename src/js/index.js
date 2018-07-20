import * as PIXI from 'pixi.js';
import config from './app-config';
import MenuState from './states/menu.state';
import StackState from './states/stack.state';
import TextState from './states/text.state';
import FireState from './states/fire.state';

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)
let app = new PIXI.Application(window.innerWidth, window.innerHeight, config);
window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(app.view);


window.game = {
    states:{
        menu: new MenuState(app),
        stack: new StackState(app),
        text: new TextState(app),
        fire: new FireState(app),
    },
    setState: stateName=>{
        for(const state in window.game.states){
            state
            window.game.states[state].deactivate();
        }
        window.game.state = window.game.states[stateName];
        window.game.states[stateName].activate()
    },
    loop: delta => {
        window.game.state.run(delta);
    }
}
window.game.setState('menu');
app.ticker.add(delta=>window.game.loop(delta));
import * as PIXI from 'pixi.js';
import config from './app-config';
import Menu from './ui/menu';

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
let menu = new Menu(app,[
    ()=>{console.log('button 1 clicked')},
    ()=>{console.log('button 2 clicked')},
    ()=>{console.log('button 3 clicked')},
]);
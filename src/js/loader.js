import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    //fire particles
    for(let i = 1; i <= 6; i++){
        loader.add(`fire${i}`, `../assets/particles/fire/F${i}.png`)
    }
    loader
        .add('gear', '../assets/icons/gear.png')
        .on("progress", handleProgress)
        .load(cb);
}
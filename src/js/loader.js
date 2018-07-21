import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    //fire particles
    for(let i = 1; i <= 6; i++){
        loader.add(`fire${i}`, `public/assets/particles/fire/F${i}.png`)
    }
    loader
        .add('gear', 'public/assets/icons/gear.png')
        .on("progress", handleProgress)
        .load(cb);
}
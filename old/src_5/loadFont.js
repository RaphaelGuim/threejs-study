import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";


export default function(callback_fn){
    const fontLoader = new FontLoader();
    const callback = (font)=> font
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", callback_fn)
   
}

// Modo usando só Javascript 
// let image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = ()=> {
  
//   console.log("Image Load")
//   texture.needsUpdate = true
// }

// image.src = 'textures/door.jpg'

import * as THREE from "three";
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = ()=>{
  console.log("onStart")
}
loadingManager.onProgress = ()=>{
  console.log("onProgress")
}
loadingManager.onLoad = ()=>{
  console.log("onLoad")
}
loadingManager.onError = ()=>{
  console.log("onError")
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('textures/color.jpg')
const alphaTexture = textureLoader.load('textures/alpha.jpg')
const heigthTexture = textureLoader.load('textures/height.png')
const metalTexture = textureLoader.load('textures/metal.jpg')
const normalTexture = textureLoader.load('textures/normal.jpg')

 
export {
  colorTexture,
  alphaTexture,
  heigthTexture,
  metalTexture,
  normalTexture
  
}
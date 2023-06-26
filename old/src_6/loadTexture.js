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
loadingManager.onError = (err)=>{
  console.log("onError",err)
}

 
 
export default new THREE.TextureLoader(loadingManager) 
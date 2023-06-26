import * as THREE from "three";
 
 
import Simulation from "./Simulation";
import GUI from 'lil-gui'; 
const gui = new GUI();
import {alphaTexture, colorTexture} from "./loadTexture"
 
 

let cubes = [];
let simulation;
 
function createCube(width, height, depth, color) {
  // const geometry = new THREE.BoxGeometry(width, height, depth,3,3,3);
  const geometry = new THREE.PlaneGeometry(width, height,3,3,3);
  // const geometry = new THREE.CapsuleGeometry( 1, 6, 20, 20 ); 
  // const geometry = new THREE.CircleGeometry( 1, 32 );
  // const material = new THREE.MeshBasicMaterial({color: color});  // greenish blue
  const material = new THREE.MeshPhongMaterial({ 
    // color: color ,
    map:colorTexture,
    opacity: 1,
    transparent: true,
    alphaMap:alphaTexture,
   
  });

  return new THREE.Mesh(geometry, material);
} 

const main = function(){

  simulation = new Simulation("#canvas",animation)

  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+')';
  }
  function getRandomArbitrary(min=-5, max=5) {
    return Math.random() * (max - min) + min;
  }
  
  let range = 10
  for(let i = 0 ; i < range; i++){
    var color = random_rgba();
    let cube = createCube(3, 3, 1, color);
    
    cube.position.x = getRandomArbitrary()
    
    cube.position.y = getRandomArbitrary()
    cube.position.z = getRandomArbitrary()
    let folder = gui.addFolder( `Cube ${i+1}` );
    folder.add(cube.position,"x",-5,5)
    folder.add(cube.position,"y",-5,5)
    folder.add(cube.position,"z",-5,5)
    folder.add(cube.material,"opacity",0,1)
    folder.addColor(cube.material,`color`).name("Color").onChange( value=>{             
      cube.material.color.set(value);
       
    })     
     
    simulation.addMesh(cube);

    cubes.push(cube)
  }
  
  
}

function animation() {
  
  let delta = simulation.deltaTime * 0.001
   
  cubes.forEach((cube, idx) => {
    const speed = 1 + idx * 0.1;
    const rot = delta * speed;    
    cube.rotation.x += rot;
    cube.rotation.y += rot;
  });
  
}


main()
 
 
const estaticObjects = {
  
  simulation,
  THREE
}

export default estaticObjects

window.app = estaticObjects
 



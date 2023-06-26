import * as TH from "three";
import { Vector3 } from "three";
import { getRandomArbitrary } from "../old/src_7/random";
import Simulation from "./Simulation";

let simulation;
let particle;

let parameters={
  "amplitude":0.4,
  "delta":10
}

      
 
const main = function () {
  simulation = new Simulation("#canvas", animation);
  simulation.addDirectionalLight();
  simulation.createAmbientLight();

  let folder = simulation.gui.addFolder("Amplitude");
      folder.add(parameters, "amplitude", 0, 5, 0.1);
      folder.add(parameters, "delta", 0, 500, 0.1);
  //Particles
  
    let sizeX = 50
    let sizeY = 50
    let particlesGeometry = new TH.PlaneGeometry(15, 15,sizeX,sizeY);
    let particlesMaterial = new TH.MeshPhongMaterial( 
      
      
      { 
        color:"gray"
      });
       
    particle = new TH.Mesh(particlesGeometry, particlesMaterial);
    particle.position.x = 0
    particle.position.y = 0
    particle.position.z = 0
    simulation.addMesh(particle);
    
    
    

  
};

function updateMesh(mesh){
  const { geometry } = mesh

  
   
  const { position } = geometry.attributes
  for(let i = 0 ; i < position.array.length; i+=3){
    // console.log(position.array[i]) 
    position.array[i+2] =  parameters.amplitude*(Math.sin(position.array[i] +time*parameters.delta)
    +  Math.sin(position.array[i+1]+ time*parameters.delta))
    
    
    
  }
  
  position.needsUpdate = true
  geometry.computeVertexNormals()

}
let time = 0
function animation() {
  time +=simulation.deltaTime/10000
  let delta = simulation.deltaTime * 0.000001;
 

  updateMesh(particle)

  // particle.rotation.x +=0.01
  // particle.rotation.y +=0.01
  // particle.rotation.z +=0.01
 
}

main();
const estaticObjects = {
  simulation,
  TH,
};

export default estaticObjects;

window.app = estaticObjects;

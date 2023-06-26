import * as THREE from "three";

import Simulation from "./Simulation";

import textureLoader from "./loadTexture"

let simulation, cube, cylinder, dodeca, plane;

const main = function () {
  simulation = new Simulation("#canvas", animation);

  let cementTexture = textureLoader.load("textures/cement.jpg")

  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshPhongMaterial({ color: "white",map:cementTexture });
  
  cube = new THREE.Mesh(geometry, material);

  cube.position.set(1, 0, 0);
  cube.castShadow = true
  simulation.addMesh(cube);

  geometry = new THREE.CylinderGeometry(1, 1, 1, 20);
  
  material = new THREE.MeshPhongMaterial({ color: "yellow",map:cementTexture  });
  cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(4, 0, 0);
  cylinder.castShadow = true
  simulation.addMesh(cylinder);

  geometry = new THREE.DodecahedronGeometry(1, 0);
  material = new THREE.MeshPhongMaterial({ color: "gray",map:cementTexture  });
  dodeca = new THREE.Mesh(geometry, material);
  dodeca.position.set(-3, 0, 0);
  dodeca.castShadow = true
  simulation.addMesh(dodeca);

  geometry = new THREE.PlaneGeometry(15, 15);
  material = new THREE.MeshPhongMaterial({
    color: "#a9a9a9",
    
  });
  plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true

  plane.lookAt(new THREE.Vector3(0, 1, 0));
  plane.position.y = -2;
  simulation.addMesh(plane);
 
  //DirectionalLigth está sempre olhando para o centro,
  // a sua posição muda a direção sempre olhando pro centro
  let light = new THREE.DirectionalLight("#ffffff",0.5); 
  light.castShadow = true    
  
  simulation.addMesh(light);
   

  simulation.gui.add(light, "intensity", 0, 1, 0.2);
  simulation.gui.addColor(light, "color");

  simulation.gui.add(light.position, "x",-10,10,0.1);
  simulation.gui.add(light.position, "y",-10,10,0.1);
  simulation.gui.add(light.position, "z",-10,10,0.1);
 
 
 
   
};

function animation() {
  let delta = simulation.deltaTime * 0.001;

  cube.rotation.x += delta;
  cylinder.rotation.x += delta;
  dodeca.rotation.x += delta;

  cube.rotation.y += delta;
  cylinder.rotation.y += delta;
  dodeca.rotation.y += delta;
}

main();
const estaticObjects = {
  simulation,
  THREE,
};

export default estaticObjects;

window.app = estaticObjects;

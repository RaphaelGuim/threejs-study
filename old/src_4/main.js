import * as THREE from "three";

import Simulation from "./Simulation";

import textureLoader from "./loadTexture";

let simulation, cube, cylinder;
let texture;
const main = function () {
  simulation = new Simulation("#canvas", animation);

  texture = textureLoader.load("textures/watter.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  let waterW = 20;
  let waterH = 5;
  let waterD = 5;

  texture.repeat.set(waterW, waterH);

  let sandTexture = textureLoader.load("textures/sand.jpg");
  let cementTexture = textureLoader.load("textures/cement.jpg");

  let geometry = new THREE.BoxGeometry(waterW, waterH, waterD);
  let materialWater = new THREE.MeshPhongMaterial({
    color: "white",
    map: texture,
    transparent: true,
    opacity: 0.5,
  });

  cube = new THREE.Mesh(geometry, materialWater);

  cube.position.set(0, 0, 0);
  // simulation.addMesh(cube);

   geometry = new THREE.PlaneGeometry(20, 20, 1);
  let material = new THREE.MeshPhongMaterial({
    color: "white",
    map: sandTexture,
  });

  let plane = new THREE.Mesh(geometry, material);

  plane.position.set(0, 0, -15);

  simulation.addMesh(plane);

  //DirectionalLigth está sempre olhando para o centro,
  // a sua posição muda a direção sempre olhando pro centro
  let light = new THREE.DirectionalLight("#ffffff", 0.5);
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 1;

  simulation.addMesh(light);

  simulation.gui.add(light, "intensity", 0, 1, 0.2);
  simulation.gui.addColor(light, "color");

  simulation.gui.add(light.position, "x", -10, 10, 0.1);
  simulation.gui.add(light.position, "y", -10, 10, 0.1);
  simulation.gui.add(light.position, "z", -10, 10, 0.1);

  light = new THREE.DirectionalLight("#ffffff", 0.5);
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 1;

  simulation.addMesh(light);

  simulation.gui.add(light, "intensity", 0, 1, 0.2);
  simulation.gui.addColor(light, "color");

  simulation.gui.add(light.position, "x", -10, 10, 0.1);
  simulation.gui.add(light.position, "y", -10, 10, 0.1);
  simulation.gui.add(light.position, "z", -10, 10, 0.1);


  simulation.gui.add(materialWater, "opacity", 0, 1, 0.1);
  let props = {
    radiusTop: 1,
    radiusBottom: 1,
    height: 3,
    radialSegments: 11,
    heightSegments: 11,
    openEnded: true,
    thetaStart: 0,
    thetaLength: 1,
  }

  let pi = 3.14
  geometry = new THREE.CylinderGeometry( 2,2,5,11,0,true,pi/2,pi );

  let cy_material = new THREE.MeshPhongMaterial({
    color: "gray",
    side:THREE.DoubleSide,
    map:cementTexture
  });

  cylinder = new THREE.Mesh(geometry, cy_material);
  simulation.addMesh(cylinder);


};
let offsetAnimation = 0;
Math.sin();
function animation() {
  let delta = simulation.deltaTime * 0.001;
  offsetAnimation += delta;
  texture.offset.set(
    Math.sin(offsetAnimation / 10),
    Math.cos(offsetAnimation / 10)
  );
}

main();
const estaticObjects = {
  simulation,
  THREE,
};

export default estaticObjects;

window.app = estaticObjects;

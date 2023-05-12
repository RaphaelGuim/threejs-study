import * as THREE from "three";

import Simulation from "./Simulation";
import GUI from "lil-gui";

const gui = new GUI();

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const fontLoader = new FontLoader();
let font = null;
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (response) => {
  font = response;
  console.log("Loaded");
  main();
});

let simulation;

let params = {
  size :2,
  height: 0,
  curveSegments: 20,
  bevelEnabled: true,
  bevelThickness: 0.2,
  bevelSize: 0.05,
  bevelOffset: 0.01,
  bevelSegments: 20,
   
};

let folder = gui.addFolder(`Text`);
folder.add(params, "size", 0, 10).onChange((value) => {
  refreshText();
});
folder.add(params, "height", 0, 10).onChange((value) => {
  refreshText();
});
folder.add(params, "curveSegments", 1, 20,1).onChange((value) => {
  refreshText();
});

folder.add(params, "bevelEnabled").onChange((value) => {
  refreshText();
});
folder.add(params, "bevelThickness",0,1).onChange((value) => {
  refreshText();
});

folder.add(params, "bevelSize",0,0.5,0.001).onChange((value) => {
  refreshText();
});
folder.add(params, "bevelOffset",0,2,0.01).onChange((value) => {
  refreshText();
});
folder.add(params, "bevelSegments",0,100,1).onChange((value) => {
  refreshText();
});

 
 
function refreshText() {
  group.remove(textMesh);
  

  createText();
}
let group = new THREE.Group();
let textMesh;
const main = function () {
  console.log("Main");
  simulation = new Simulation("#canvas", animation);

  simulation.addMesh(group);
  createText();
};

function createText() {
  let textGeo = new TextGeometry("Hello three.js!", {
    font: font,
    ...params
  });
   
  textGeo.computeBoundingBox();

  let materials = [
    new THREE.MeshPhongMaterial({ color: "gray",  }), // front
    new THREE.MeshPhongMaterial({ color: "gray" }), // side
  ];
  textMesh = new THREE.Mesh(textGeo, materials);
  textMesh.rotation.x = 0;
  textMesh.position.y = 0;
  textMesh.position.z = 0;

  group.add(textMesh);
}

function animation() {
  let delta = simulation.deltaTime * 0.001;
}

const estaticObjects = {
  simulation,
  THREE,
};

export default estaticObjects;

window.app = estaticObjects;

import * as THREE from "three";
import HoverEventsListener from "./HoverEventsListener";
import { hoverInterface } from "./HoverInterface";
import Simulation from "./Simulation";
import { createDrillMesh, createShoeMesh } from "./phases";
import { createLithologyMeshes } from "./lithology";
import Scale from "./scale";
import { Vector3 } from "three";
import config from "./config";
import { createAxisMesh } from "./axis";
import loadFont from "./loadFont";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { lithologyInfos,phaseInfos } from "./infoBox";
let hoverEventsListener;

window.addEventListener("pointermove", onPointerMove);

const mouse = new THREE.Vector2();

function moveBox(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  infoBox.style.left = `${mouse.x}px`;
  infoBox.style.top = `${mouse.y}px`;
}

function onPointerMove(event) {
  hoverEventsListener.onPointerMove(event);
  // moveBox(event)
}

let data = {};
data.lithology = [
  { base_tvd: 2482, name: "CLU" },
  { base_tvd: 2869, name: "FLH" },
  { base_tvd: 3062, name: "MRG" },
  { base_tvd: 3074, name: "AND" },
  { base_tvd: 3330, name: "CRN" },
  { base_tvd: 3444.1971, name: "HAL" },
  { base_tvd: 3616.2819, name: "CRN" },
  { base_tvd: 3805.0021, name: "HAL" },
  { base_tvd: 3933.915, name: "TQD" },
  { base_tvd: 4026.8465, name: "HAL" },
  { base_tvd: 4326.3508, name: "CRN" },
  { base_tvd: 4698.1492, name: "HAL" },
  { base_tvd: 5202.9172, name: "CRN" },
  { base_tvd: 5294.5758, name: "HAL" },
  { base_tvd: 5315.2313, name: "AND" },
  { base_tvd: 5462.4015, name: "CAL" },
  { base_tvd: 5752.869, name: "COQ" },
];

data.lda = 1000;
data.airgap = 0;
data.phases = [
  { base_tvd: 2228, shoe_tvd: 2200 },
  { base_tvd: 3398, shoe_tvd: 3388 },
  { base_tvd: 5354, shoe_tvd: 5349 },
  { base_tvd: 5751, shoe_tvd: 5741 },
];

let meshes = {};
let font;
let simulation;

const main = function () {
  simulation = new Simulation("#canvas", animation);
  hoverEventsListener = new HoverEventsListener(simulation);

  let y = -80;
  let z = 160;
  simulation.camera.position.x = 0;
  simulation.camera.position.y = y;
  simulation.camera.position.z = z;
  let target = new Vector3(0, y, 0)
  simulation.camera.lookAt(target);
  simulation.controls.target = target.clone()
   

  simulation.createAmbientLight();

  let lightA = simulation.addDirectionalLight();
  lightA.position.x = -2.5;
  lightA.position.y = 6;
  lightA.position.z = 10;

  const tvd_list = data.phases.map((phase) => phase.shoe_tvd);
  const max = Math.max(...tvd_list);

  let scale = Scale.getInstance();
  scale.setHeight(max);

  //LDA

  let material = new THREE.MeshPhongMaterial({
    color: "blue",
    transparent:true,
    opacity:0.2
  });
  let depth = 20;
  let geometry = new THREE.BoxGeometry(500, scale.map_range(data.lda), depth);
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -depth / 2;
  mesh.position.y =-scale.map_range(data.lda) /2
  simulation.addMesh(mesh)
  meshes["lithologyMeshs"] = createLithologyMeshes(data);
  
  const folder = simulation.gui.addFolder( 'Lithology' );
  folder.open(false)

  meshes["lithologyMeshs"].forEach((lithology, idx) => {
    let hoverIntf = new hoverInterface(lithology);
    hoverIntf.font = font;
    lithology.mesh.hoverInterface = hoverIntf;    
    lithology.mesh.hoverInterface.showInfos = lithologyInfos.bind(hoverIntf);
    
    lithology.lookAt = () => {     
      simulation.controls.target = lithology.mesh.position.clone()
      simulation.camera.position.y =lithology.mesh.position.y  
      simulation.camera.lookAt(lithology.mesh.position) 
    };
    folder.add(lithology, "lookAt").name( `${lithology.infos.rock}`);
   
   
    simulation.addMesh(lithology.mesh);
  });

  meshes["drillMeshs"] = createDrillMesh(data, 0);

  let fasefolder = simulation.gui.addFolder( 'Fases' );
  fasefolder.open(false)
  meshes["drillMeshs"].forEach((drill) => {
    let hoverIntf = new hoverInterface(drill);
    hoverIntf.font = font;
    drill.mesh.hoverInterface = new hoverInterface(drill);   
    drill.mesh.hoverInterface.showInfos = phaseInfos.bind(hoverIntf);


    drill.lookAt = () => {     
      simulation.controls.target = drill.mesh.position.clone()
      simulation.camera.position.y =drill.mesh.position.y  
      simulation.camera.lookAt(drill.mesh.position) 
    };
    fasefolder.add(drill, "lookAt").name( `${drill.infos.name}`);

    simulation.addMesh(drill.mesh);
  });

  createAxisMesh(simulation, font, data);
};

let passTime = 0;
let count = 0;
function animation() {}

loadFont((font_reponse) => {
  font = font_reponse;
  main();
});

// main();
const estaticObjects = {
  simulation,
  THREE,
  meshes,
};

export default estaticObjects;

window.app = estaticObjects;

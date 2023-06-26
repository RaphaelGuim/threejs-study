import * as TH from "three";

import Simulation from "./Simulation";
import HoverMesh from "./HoverMesh";
import HoverEventsListener from "./HoverEventsListener"
let simulation, cube, alvo, alvo2;

class RandomBox extends HoverMesh {
  constructor(geometry, material) {
    super(geometry, material);
    this.initialMaterial = material.clone();
    this.mouseOver = false;
  }
  onMouseOut() {
    
    this.mouseOver = false
  }

  onMouseIn() {
    if (!this.mouseOver) {
      this.position.x = Math.random() * 10 - 5;
      this.position.y = Math.random() * 10 - 5;
      this.position.z = Math.random() * 10 - 5;
    }
    this.mouseOver = true
  }
}
let hoverEventsListener;

window.addEventListener("pointermove", onPointerMove);
const main = function () {
  simulation = new Simulation("#canvas", animation);
  hoverEventsListener = new HoverEventsListener(simulation);
    for(let i = 0 ;i < 100;i++){
      let geometry = new TH.BoxGeometry(1, 1, 1);
      let material = new TH.MeshPhongMaterial({
        color: "red",
      });

      cube = new RandomBox(geometry, material);

      cube.position.set(0, 0, 0);

      simulation.addMesh(cube);
    }
     

  

   

  //DirectionalLigth está sempre olhando para o centro,
  // a sua posição muda a direção sempre olhando pro centro
  let light = new TH.DirectionalLight("#ffffff", 0.5);
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 1;

  simulation.addMesh(light);

  let folder = simulation.gui.addFolder("Light");
  folder.add(light, "intensity", 0, 1, 0.2);
  folder.addColor(light, "color");

  folder.add(light.position, "x", -10, 10, 0.1);
  folder.add(light.position, "y", -10, 10, 0.1);
  folder.add(light.position, "z", -10, 10, 0.1);

   
};



function animation() {
  let delta = simulation.deltaTime * 0.001;

   
}

function onPointerMove(event) {
   
  hoverEventsListener.onPointerMove(event)
}

 

main();
const estaticObjects = {
  simulation,
  TH,
};

export default estaticObjects;

window.app = estaticObjects;

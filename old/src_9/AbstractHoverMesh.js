import * as THREE from "three";

export default class AbstractHoverMesh extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material);
    if (this.constructor == AbstractHoverMesh) {
      throw new Error("Your Error Message...");
    }    
  }

  onMouseOut(simulation) {
    throw new Error("You have to implement the method onMouseOut!");
  }

  onMouseIn(simulation) {
    throw new Error("You have to implement the method onMouseIn!");
  }
}

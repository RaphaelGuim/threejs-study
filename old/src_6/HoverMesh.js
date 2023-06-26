import * as THREE from "three";

export default class HoverMesh extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material);
    this.initialMaterial = material.clone();
    this.mouseOver = false;
  }

  onMouseOut() {
    this.mouseOver = false  
  }

  onMouseIn() {
    this.mouseOver = true
    
  }
}

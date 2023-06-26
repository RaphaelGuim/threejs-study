import HoverMesh from "./HoverMesh";

import * as THREE from "three";
export default class HoverEventsListener {
  constructor(simulation) {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(Infinity, Infinity);
    this.simulation = simulation;
  }
  checkHover = function (nearest = false) {
    this.raycaster.setFromCamera(this.pointer, this.simulation.camera);

    // calculate objects intersecting the picking ray
    let filtered = this.simulation.scene.children.filter(
      (children) => children instanceof HoverMesh
    );

    let intersects = this.raycaster.intersectObjects(filtered);
    if (nearest) intersects = intersects.slice(0, 1);

    if (intersects.length > 0) {
      filtered.forEach((object) => {
        let found = intersects.find(
          (intersect) => intersect.object.uuid == object.uuid
        );
        if (found) {
          object.onMouseIn();
        } else {
          object.onMouseOut();
        }
      });
    } else {
      filtered.forEach((object) => {
        object.onMouseOut();
      });
    }
  };

  onPointerMove = function (event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkHover(true);
  };
}

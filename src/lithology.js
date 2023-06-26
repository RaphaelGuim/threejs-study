import * as THREE from "three";
import { validateDepths } from "./utils";
import CSG from "./CSG/three-csg";
import { random_rgba } from "./random";
import Scale from "./scale";
import { createShoeMesh } from "./phases";
import { rockLabels,rockColors } from "./rocks";

export const createLithologyMeshes = function (data) {
  let shoeMesh = createShoeMesh(data.phases, data.lda, data.airgap, false);
  let lithology = createLithology(data.lithology, data.lda, data.airgap);
  shoeMesh.mesh.updateMatrix();
  let bspB = CSG.fromMesh( shoeMesh.mesh);

  return lithology.map((lit) => {
    let mesh = lit.mesh;
    mesh.updateMatrix();
    let bspA = CSG.fromMesh(mesh);
    let bspResult = bspA.subtract(bspB);
    lit.mesh = CSG.toMesh(bspResult, mesh.matrix, mesh.material);
    return lit;
  });
};
export const createLithology = function (lithology, lda, airgap) {
  let scale = Scale.getInstance();
  let last_tvd = scale.map_range(lda + airgap);
  if (validateDepths(lithology)) {
    return lithology.map((rock, idx) => {
      let base_tvd = scale.map_range(rock.base_tvd);
      let length = base_tvd - last_tvd;
      let rockMesh = createRockMesh(rock, length);
      rockMesh.position.y = -base_tvd + length / 2;
      let top = last_tvd;
      last_tvd = base_tvd;

      return {
        mesh: rockMesh,
        infos: {
          rock:rockLabels[rock.name],
          length: scale.re_map(length),
          top: scale.re_map(top),
          base: scale.re_map(base_tvd),
        },
      };
    });
  }
};

const createRockMesh = function (rock, length) {
  let material = new THREE.MeshPhongMaterial({
    color: rockColors[rock.name],
  });
  let depth = 20;
  let geometry = new THREE.BoxGeometry(500, length, depth);
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -depth / 2;
  return mesh;
};

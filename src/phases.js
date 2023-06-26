import * as THREE from "three";
import { validateDepths } from "./utils";
import CSG from "./CSG/three-csg";
import config from "./config";
import Scale from "./scale";

export function createCutMesh(data) {
  let phases = data.phases;
  let height = phases[phases.length - 1].base_tvd;
  let width = (phases.length + 1) * config.phasesMultiplier * 2;
  let depth = 200;
  let geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);

  let material = new THREE.MeshStandardMaterial({
    color: "gray",
  });

  let cutMesh = new THREE.Mesh(geometry, material);
  cutMesh.position.y = -height / 2;
  cutMesh.position.z = depth / 2;
  return cutMesh;
}

export function createDrillMesh(data, clip = 0) {
  let pipes = createShoeMesh(data.phases, data.lda, data.airgap, true);
  let cutMesh = createCutMesh(data);
  cutMesh.position.z += clip;
  cutMesh.updateMatrix();

  return pipes.map((pipe) => {
    let bspA = CSG.fromMesh(pipe.mesh);
    let bspB = CSG.fromMesh(cutMesh);

    let bspC = bspA.subtract(bspB);
    let result = CSG.toMesh(bspC, pipe.mesh.matrix);
    result.material = pipe.mesh.material;
    pipe.mesh = result

    return pipe;
  });
}
const validateShoeTVD = function (phases) {
  if (!Array.isArray(phases)) return false;

  return phases.map((phase, idx) => {
    if (!phase.shoe_tvd) {
      phase.shoe_tvd = phase.base_tvd;
    } else if (phase.shoe_tvd > phase.base_tvd) {
      phase.shoe_tvd = phase.base_tvd;
    }

    return phase;
  });
};
export const createShoeMesh = (phases, lda, airgap, pipes = false) => {
  if (!validateDepths(phases)) {
    return null; // Retorna null se as profundidades não forem válidas
  }
  let scale = Scale.getInstance();

  phases = validateShoeTVD(phases);
  let last_tvd = scale.map_range(lda + airgap);
  let phasesMeshs = [];
  

  phases.forEach((phase, idx) => {
    let base_tvd = scale.map_range(phase.base_tvd);
    let shoe_tvd = scale.map_range(phase.shoe_tvd - lda - airgap);

    let length, position, buildFn, innerWidth;


    innerWidth = (phases.length - idx + 1) * config.phasesMultiplier;
    if (pipes) {
      length = shoe_tvd;
      position = -length / 2 - scale.map_range(lda + airgap);
      buildFn = createPipe;
    }else{

      length = base_tvd - last_tvd;
      position = -last_tvd - length / 2;
      buildFn = createDrillHole;    

    }

    let buildObj = buildFn(innerWidth, length);

    buildObj.mesh.position.y = position;
    buildObj.mesh.updateMatrix();
    buildObj.infos ={
      name:`Fase ${idx+1}` ,
      base_tvd:phase.base_tvd,
      shoe_tvd:phase.shoe_tvd,
    }
    phasesMeshs.push(buildObj);
    last_tvd = base_tvd;
  });

  if (pipes) {
    return phasesMeshs;
  }   
  
  const meshResult = phasesMeshs.reduce((phase, currentMesh) => {
    const bspA = CSG.fromMesh(phase.mesh);
    const bspB = CSG.fromMesh(currentMesh.mesh);
    const unionBSP = bspA.union(bspB);
    phase.mesh = CSG.toMesh(unionBSP, phase.mesh.matrix, phase.mesh.material);
    return phase
  });
  return meshResult;
};

const createDrillHole = function (innerWidth, height) {
  let geometryA = new THREE.CylinderGeometry( innerWidth, innerWidth, height, 30, 2, false );

  let material = new THREE.MeshPhongMaterial({
    color: "gray",
  });
  return {mesh:new THREE.Mesh(geometryA, material)}
  
};

export const createPipe = function (innerWidth, height) {
  let geometryA = new THREE.CylinderGeometry(
    innerWidth,
    innerWidth,
    height,
    30,
    1,
    false
  );
  let material = new THREE.MeshPhongMaterial({
    color: "gray",
    transparent: true,
    opacity: 1,
  });

  let meshA = new THREE.Mesh(geometryA, material);

  let geometryB = new THREE.CylinderGeometry(
    innerWidth - config.phasesInnerCut,
    innerWidth - config.phasesInnerCut,
    height,
    30,
    10,
    false
  );
  let meshB = new THREE.Mesh(geometryB, material);

  let bspA = CSG.fromMesh(meshA);
  let bspB = CSG.fromMesh(meshB);
  bspA = bspA.subtract(bspB);
  return   {mesh:CSG.toMesh(bspA, meshA.matrix, meshA.material),
    
  }
  
};

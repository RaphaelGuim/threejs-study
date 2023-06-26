import * as TH from "three";
import { Vector3 } from "three";
import { getRandomArbitrary } from "../old/src_7/random";
import Simulation from "./Simulation";

let simulation;
let particles = [];
let parameters = {
  dx: 100,
  dy: 100,
  dz: 100,
  rx: 1,
  ry: 1,
  rz: 1,
};
const main = function () {
  simulation = new Simulation("#canvas", animation);
  simulation.addDirectionalLight();
  simulation.createAmbientLight();

  //Particles
  for (let i = 0; i < 20; i++) {
    let particlesGeometry = new TH.PlaneGeometry(20, 20,5,5);
    let particlesMaterial = new TH.PointsMaterial({
      size: 0.05,
      transparent: true,
      // blending: TH.AdditiveBlending,
      sizeAttenuation: true,
      fog: true,
    });
    let particle = new TH.Points(particlesGeometry, particlesMaterial);
    simulation.addMesh(particle);
    particle.position.x = getRandomArbitrary(-3, 3);
    particle.position.y = getRandomArbitrary(-3, 3);
    particle.position.z = getRandomArbitrary(-3, 3);

    particle.rotation.x += Math.random() * 5;
    particle.rotation.y += Math.random() * 5;
    particle.rotation.z += Math.random() * 5;
    particles.push(particle);
  }

  let folder = simulation.gui.addFolder("Parameters");
  folder.add(parameters, "dx", 0, 100, 0.01);
  folder.add(parameters, "dy", 0, 100, 0.01);
  folder.add(parameters, "dz", 0, 100, 0.01);
  folder.add(parameters, "rx", 0, 100, 0.01);
  folder.add(parameters, "ry", 0, 100, 0.01);
  folder.add(parameters, "rz", 0, 100, 0.01);
};

function animation() {
  let delta = simulation.deltaTime * 0.000001;

  particles.forEach((particle, idx) => {
    particle.rotation.y += ((idx + 1) * delta*parameters.rx) / 3;
    particle.rotation.x -= ((idx + 1) * delta*parameters.ry) / 5;
    particle.rotation.z += ((idx + 1) * delta*parameters.rz) / 8;

    particle.position.x =
      3 * Math.cos((Date.now() / (parameters.dx * 10000)) * (idx + 1));

    particle.position.y =
      2 * Math.sin((-Date.now() / (parameters.dy * 10000)) * (idx + 1));

    particle.position.y =
      -3 * Math.sin((-Date.now() / (parameters.dz * 10000)) * (idx + 1));


    
  });
}

main();
const estaticObjects = {
  simulation,
  TH,
};

export default estaticObjects;

window.app = estaticObjects;

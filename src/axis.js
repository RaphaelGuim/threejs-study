import * as THREE from "three";
import Scale from "./scale";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import config from "./config";

const scale = Scale.getInstance();
export const createAxisMesh = function (simulation, font, data) {
  let positionX = -(data.phases.length + 1) * config.phasesMultiplier * 2;
  let positionZ = config.axis.positionZ;
  let fontSize = config.axis.fontSize;
  let lineHeight = scale.map_range(scale.getHeight());

  //Plane para eixo
  let planeW = config.axis.planeW;
  const geometry = new THREE.PlaneGeometry(planeW, lineHeight * 1.05);
  const material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
    opacity: 0.6,
    transparent: true,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.x = positionX + planeW / 2 - 1;
  plane.position.y = -lineHeight / 2;
  plane.position.z = positionZ - 0.1;
  simulation.addMesh(plane);

  // Criação da linha vertical

  const points = [];
  points.push(new THREE.Vector3(positionX, 0, positionZ));
  points.push(new THREE.Vector3(positionX, -lineHeight, positionZ));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
  simulation.addMesh(new THREE.Line(lineGeometry, lineMaterial));

  let tickNum = 10;

  let realDistante = scale.getHeight();

  let tickDistance = config.remapMax / (tickNum*10);

  const textMaterial = new THREE.MeshBasicMaterial({ color: "black" });  

  for (let i = 0; i <= tickNum * 10; i++) {
    let tick = tickDistance * i;
    let text = parseInt(scale.re_map(tick));
    let tickSize = 1
    if (i % 10 == 0) {
      tickSize = 2
      const textGeometry = new TextGeometry(`${i > 0 ? text : 0}`, {
        font: font,
        size: fontSize,
        height: 0,
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.05,
        bevelOffset: 0.01,
        bevelSegments: 20,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = positionX + 3;
      textMesh.position.y = -tick - fontSize / 2;
      textMesh.position.z = positionZ;
      textGeometry.computeBoundingBox();

      simulation.addMesh(textMesh);
    }
    const points = [];
    points.push(new THREE.Vector3(positionX, -tick, positionZ));
    points.push(new THREE.Vector3(positionX + tickSize, -tick, positionZ));
    const lineTick = new THREE.BufferGeometry().setFromPoints(points);
    simulation.addMesh(new THREE.Line(lineTick, lineMaterial));
  }
};

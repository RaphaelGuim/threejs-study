import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GUI from "lil-gui";

export default class Simulation {
  constructor(canvasID, animate) {
    this.canvas = document.querySelector(canvasID);
    this.animate = animate;

    this.time = Date.now();

    this.gui = new GUI();
    this.gui.add(this, "toggleGrid");
    this.gui.add(this, "toggleAxis");

    this.init();
  }

  get deltaTime() {
    let currentTime = Date.now();
    let delta = currentTime - this.time;
    this.time = Date.now();
    return delta;
  }

  toggleGrid() {
    if (this.grid) {
      this.scene.remove(this.grid);
      this.grid = null;
    } else {
      this.grid = new THREE.GridHelper(20, 20, "gray", "#222222");
      this.scene.add(this.grid);
    }
  }

  toggleAxis() {
    if (this.axis) {
      this.scene.remove(this.axis);
      this.axis = null;
    } else {
      this.axis = new THREE.AxesHelper(20, 20, "gray", "#222222");
      this.scene.add(this.axis);
    }
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.shadowMap.enabled=true

    this.renderer.setClearColor(new THREE.Color(0x333333));
    this.camera = this.createCamera();

    this.scene = new THREE.Scene();
    this.createLight();

    // Add the Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.start();
  }
  addMesh(mesh) {
    this.scene.add(mesh);
  }
  start() {
    requestAnimationFrame(this.loopAnimation.bind(this));
  }

  createCamera() {
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.2;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 10;
    camera.position.x = 10;
    camera.position.y = 10;
    
    return camera;
  }

  createLight() {
    let light = new THREE.AmbientLight("#ffffff", 0.1);
    this.scene.add(light);

    this.gui.add(light, "intensity", 0, 10, 0.2);
    this.gui.addColor(light, "color");

  

     
  }

  loopAnimation(time) {
    if (this.animate) this.animate(time);
    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loopAnimation.bind(this));
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

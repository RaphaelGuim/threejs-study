import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import textureLoader from "./loadTexture";
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

  loadTexture(path) {
    return textureLoader.load(path);
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
    this.renderer.shadowMap.enabled = true;

    this.renderer.setClearColor(new THREE.Color("gray"));
    this.renderer.localClippingEnabled = true;
    this.camera = this.createCamera();
    this.scene = new THREE.Scene();  
    
    this.scene.fog = new THREE.Fog( 0x828282, 0.1, 800 );

    // Add the Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.start();
  }
  addMesh(mesh) {
    this.scene.add(mesh);
  }
  removeMesh(mesh) {
    mesh.geometry.dispose();
    mesh.material.dispose();
    this.scene.remove(mesh);
    this.renderer.renderLists.dispose();
  }
  start() {
    requestAnimationFrame(this.loopAnimation.bind(this));
  }
  addDirectionalLight(showGui=true) {
    //DirectionalLigth está sempre olhando para o centro,
    // a sua posição muda a direção sempre olhando pro centro
    let light = new THREE.DirectionalLight("#ffffff", 0.6);
    light.castShadow = true;
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 1000; // default

    light.position.x = 0;
    light.position.y = 0;
    light.position.z = 10;

     
    this.scene.add(light);
    if(this.gui && showGui){
      let folder = this.gui.addFolder("Light");
      folder.add(light, "intensity", 0, 1, 0.2);
      folder.addColor(light, "color");
  
      folder.add(light.position, "x", -10, 10, 0.1);
      folder.add(light.position, "y", -10, 10, 0.1);
      folder.add(light.position, "z", -10, 10, 0.1);
    }
    return light;
  }

  createCamera() {
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.2;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
     
    
    return camera;
  }

  createAmbientLight(showGui=true) {
    let light = new THREE.AmbientLight("#ffffff", 0.1);
    this.scene.add(light);
    if(this.gui && showGui){
      let folder = this.gui.addFolder("Ambient Light");
      folder.add(light, "intensity", 0, 1, 0.01);
      folder.addColor(light, "color");
    }
    return light
   
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

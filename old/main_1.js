//Drawing a Cube and animation looping
import * as THREE from 'three';
 

//To actually be able to display anything with three.js, 
//we need three things: 
//scene, camera and renderer, 
//so that we can render the scene with camera.

const scene = new THREE.Scene();

//field of view. 
//aspect ratio.
//near and far clipping plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer(
    {
        canvas:canvas,
    }
);
 
renderer.setSize( window.innerWidth, window.innerHeight );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5

function animate() {
    
	requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
	renderer.render( scene, camera );
   
}
 
animate();


 
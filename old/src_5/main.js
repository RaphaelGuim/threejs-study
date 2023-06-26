import * as TH from "three";

import Simulation from "./Simulation";

 

let simulation, cube, alvo,alvo2;

class MeshObject extends TH.Mesh{
  constructor(geometry, material ) {
    super(geometry, material);    
    this.color = material.color.clone()
    
  }
  setOriginalColor(){
    // console.log("SET ORIGINAL",this.color)
    this.material.color.set( this.color)
  }
}
 
window.addEventListener( 'pointermove', onPointerMove );
const main = function () {

  simulation = new Simulation("#canvas", animation); 

  let geometry = new TH.BoxGeometry(1, 1, 1);
  let material = new TH.MeshPhongMaterial({
    color: "red",    
  });

  cube = new MeshObject(geometry, material);

  cube.position.set(0, 0, 0);
  simulation.addMesh(cube); 
  
  geometry = new TH.BoxGeometry(1, 1, 1);
  material = new TH.MeshPhongMaterial({
    color: "green",    
  });

  alvo = new MeshObject(geometry, material);

  alvo.position.set(-10, 0, 0);
  simulation.addMesh(alvo);

  material = new TH.MeshPhongMaterial({
    color: "green",    
  });

  alvo2 = new MeshObject(geometry, material);

  alvo2.position.set(-15, 0, 0);
  simulation.addMesh(alvo2);

  //DirectionalLigth está sempre olhando para o centro,
  // a sua posição muda a direção sempre olhando pro centro
  let light = new TH.DirectionalLight("#ffffff", 0.5);
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 1;

  simulation.addMesh(light);

  let folder = simulation.gui.addFolder("Light")
  folder.add(light, "intensity", 0, 1, 0.2);
  folder.addColor(light, "color");

  folder.add(light.position, "x", -10, 10, 0.1);
  folder.add(light.position, "y", -10, 10, 0.1);
  folder.add(light.position, "z", -10, 10, 0.1);

  folder = simulation.gui.addFolder("Cube")
  folder.add(cube.position, "x", -5, 5, 0.2);
  folder.add(cube.position, "y", -5, 5, 0.2);
  folder.add(cube.position, "z", -5, 5, 0.2);
  
  
   
     
  

  
  
  

   
};




function animation() {
  let delta = simulation.deltaTime * 0.001;
  raycaster.setFromCamera( pointer, simulation.camera );
  let checkObjects = [cube,alvo]
	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(checkObjects );
   
 
  for ( let i = 0; i <  checkObjects.length; i ++ ) {
    
    if( checkObjects[ i ].material){
      if(checkObjects[ i ].setOriginalColor){
        checkObjects[ i ].setOriginalColor()
      }
    }
   

 }
	for ( let i = 0; i < intersects.length; i ++ ) {
    
		 intersects[ i ].object.material.color.set( "blue" );

	}
 

 
   
}


const raycaster = new TH.Raycaster();
const pointer = new TH.Vector2(Infinity,Infinity);

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

// let ray = new TH.Raycaster()
// let dir = new TH.Vector3(-1,0,0)
// dir.normalize()
// onmousedown = (env)=>{
//   ray.set(new TH.Vector3(-1,0,0),dir)
  
//   if(ray.intersectObject(alvo).length>0){
    
    
//     alvo.material.color.set("white")
//   }


// }

main();
const estaticObjects = {
  simulation,
  TH,
};

export default estaticObjects;

window.app = estaticObjects;

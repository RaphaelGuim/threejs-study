 

export const hoverInterface = function(obj){
  this.mesh = obj.mesh
  this.infos = obj.infos
  this.mouseOver = false
  this.z = this.mesh.position.z
  this.tilt = 1
  this.onMouseOut =function(listener) {
    if(this.mouseOver && this.showInfos ){
      this.showInfos(listener,true)
    }
    this.mouseOver = false  
    this.mesh.position.z = this.z
    this.mesh.material.opacity = 1
     
    
  }
  this.onMouseIn = function(listener) {
    this.mouseOver = true
    this.mesh.position.z = this.z +this.tilt
    this.mesh.material.opacity = 0.9
    if(this.showInfos){
      this.showInfos(listener)
    }
     
  }
  

}  

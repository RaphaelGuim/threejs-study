import * as THREE from "three";

 
export function lithologyInfos(listener, hide = false) {
  if (hide) {
    let infoBox = document.getElementById("info-box");
    if (infoBox) {
      infoBox.remove();
    }

    return null;
  }

  let infoBox = document.getElementById("info-box");
  if (!document.getElementById("info-box")) {
    infoBox = createInfoBox()
    infoBox.innerHTML = `
       Rocha: <i>${this.infos.rock}</i> <br>        
        Topo(TVD):${Math. floor(this.infos.top)}m Base(TVD):${Math. floor(this.infos.base)}m <br>
        Extensão:${Math. floor(this.infos.length)}m
  `;
   
    document.body.appendChild(infoBox);
  }
  const mouse = new THREE.Vector2();
  mouse.x = (listener.event.clientX) 
  mouse.y = (listener.event.clientY)
  infoBox.style.left = `${mouse.x + 10}px`;
  infoBox.style.top = `${mouse.y - 35}px`;
   
}



const createInfoBox = function(){
  const infoBox = document.createElement("div");
    infoBox.id = "info-box";   
    infoBox.style.height= "70px"
    infoBox.style.width= "190px"
    infoBox.style.borderRadius= "15px";
    infoBox.style.borderStyle= "solid";
    infoBox.style.borderWidth= "thin";
    infoBox.style.borderColor= "black";

    infoBox.style.position = "absolute";
    infoBox.style.top = "10px";
    infoBox.style.left = "10px";
    infoBox.style.padding = "15px";
    infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    infoBox.style.color = "#ffffff";
    infoBox.style.fontFamily = "Arial, sans-serif";
    return infoBox
}


export function phaseInfos(listener, hide = false) {
  if (hide) {
    let infoBox = document.getElementById("info-box");
    if (infoBox) {
      infoBox.remove();
    }

    return null;
  }

  let infoBox = document.getElementById("info-box");
  if (!document.getElementById("info-box")) {
    infoBox = createInfoBox()
    infoBox.innerHTML = `
        <i>${this.infos.name}</i> <br>        
        Sapata(TVD) : ${Math. floor(this.infos.shoe_tvd)}m<br>
        Base(TVD):    ${Math. floor(this.infos.base_tvd)}m <br>
       
  `;
   
    document.body.appendChild(infoBox);
  }
  const mouse = new THREE.Vector2();
  mouse.x = (listener.event.clientX) 
  mouse.y = (listener.event.clientY)
  infoBox.style.left = `${mouse.x + 10}px`;
  infoBox.style.top = `${mouse.y - 35}px`;
   
}

 
 
 
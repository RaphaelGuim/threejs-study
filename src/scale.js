import config from "./config";
 

export default (function() {
  let instance; // Instância privada do Singleton
  
  function createInstance() {
    let low = 0
    let height = 0
        
  
    return {
      map_range : function (value) {
        if(value <config.remapMin) return config.remapMin
        let low2 = config.remapMin
        let height2 = config.remapMax
        return low2 + ((height2 - low2) * (value - low)) / (height - low);
      },
      re_map:function(value){
        let low2 = config.remapMin
        let height2 = config.remapMax
        return (value - low2) * (height - low) / (height2 - low2) + low;
      },      
      setHeight :function(h){
        height = h
      },
      getLow:function(){return low},
      getHeight:function(){return height},
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

 
class Cama extends THREE.Object3D {
  constructor() {
    super();
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../models/cama/cama.mtl',
    (materials)=>{
      objectLoader.setMaterials(materials);
      objectLoader.load('../models/cama/cama.obj',
      (object)=>{
        
        object.castShadow = true;
        object.receiveShadow = true;
        object.traverse(function(node){
          if(node.isMesh){
            node.castShadow = true;
          }
        });
        this.add(object);
      },null,null);
    });
    this.scale.set(2.5, 2.5, 2.5);
    this.rotateY(Math.PI/2);
    this.rotateX(-Math.PI/2);
    this.translateY(240);
    this.translateZ(115);
    this.translateX(-360);

}   
  
update () {
}
}

export { Cama };
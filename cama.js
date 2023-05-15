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
        object.scale.set(2.5, 2.5, 2.5);
        object.rotateY(Math.PI/2);
        object.rotateX(-Math.PI/2);
        object.translateY(240);
        object.translateZ(115);
        object.translateX(-360);
        object.castShadow = true;
        object.receiveShadow = true;
        object.traverse(function(node){
          if(node.isMesh){
            node.castShadow = true;new THREE.Box3().getFromObject(object)
            node.receiveShadow = true;
          }
        });
        this.userData.caja1 = new THREE.Box3().setFromObject(object);
        this.add(object);
      },null,null);
    });
    

}   

getbBox(){
  return this.userData.caja1;
}
  
update () {
}
}

export { Cama };
import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

 
class Cama extends THREE.Object3D {
  constructor() {
    super();
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    this.box = new THREE.Box3();
    materialLoader.load('../models/cama/cama.mtl',
        (materials) => {
            objectLoader.setMaterials(materials);
            objectLoader.load('../models/cama/cama.obj',
                (object) => {
                  object.scale.set(2.5, 2.5, 2.5);
                  object.rotateY(Math.PI/2);
                  object.rotateX(-Math.PI/2);
                  object.translateY(240);
                  object.translateX(-360);
                  object.translateZ(115);
                  this.box = new THREE.Box3().setFromObject(object);
                  this.add(object);
                }, null, null);
         });
    this.traverse(function(node){
      if(node.isMesh){
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    
    

}   
  
update () {
  
}
}

export { Cama };
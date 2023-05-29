import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Llave extends THREE.Object3D {
    constructor() {
      super();
    var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/key/key.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/key/key.obj',
                    (object) => {
                        object.scale.set(2, 2, 2);
                        object.rotateX(Math.PI/2);
                        object.rotateZ(Math.PI/4);
                        object.translateY(-10);
                        object.translateX(40);
                        object.translateZ(20);
                        this.add(object);
                    }, null, null);
            });
    }

            
    update () {
    
    }
    use(mesh){
        
    }
}

export { Llave };
import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'

class Ventana extends THREE.Object3D {
  constructor() {
    super();
    var glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        ior: 1.52,
        transmission: 1,
        specularIntensity: 1,
        clearcoat: 1,
      });
  
      var glassGeometry = new THREE.BoxGeometry( 200, 200, 10);
      var glass = new THREE.Mesh( glassGeometry, glassMaterial);
      glass.translateY(250);
      glass.translateZ(-500);
      glass.translateX(105);
      var glass2 = new THREE.Mesh( glassGeometry, glassMaterial);
      glass2.translateY(250);
      glass2.translateZ(-500);
      glass2.translateX(-105);
      glass.castShadow = true;
      glass2.castShadow = true;
      this.add(glass);
      this.add(glass2); 
}   
  
update () {
}
}

export { Ventana };
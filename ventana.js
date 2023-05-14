import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'

class Ventana extends THREE.Object3D {
  constructor() {
    super();
    
    let imgTexture = new THREE.TextureLoader().load( '../imgs/moon_1024.jpg' );
				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
				imgTexture.colorSpace = THREE.SRGBColorSpace;
				imgTexture.anisotropy = 16;
				imgTexture = null;

    var glassMaterial = new THREE.MeshPhysicalMaterial({
        //map: imgTexture,
        //roughness: 0,
        //transmission: 1,
        //reflectivity: 1,
        //thickness: 1,
      // transmission: .95,
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        ior: 1.52,
        transmission: 1,
        specularIntensity: 1,
        opacity: 1,
        reflectivity: 1,
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

import * as THREE from '../libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'
class Aspas extends THREE.Object3D {
constructor() {
    super();

    
    const aspasShape = new THREE.Shape();
    var material = new THREE.MeshPhongMaterial({color: 0x800000});
    aspasShape.moveTo(0,0);

    aspasShape.lineTo(100, 0);
    aspasShape.bezierCurveTo(110, 5, 110, 15, 100, 20);
    aspasShape.lineTo(0, 20);
    
    const extrudeSett = { 
      depth: 8, 
      bevelEnabled: true, 
      bevelSegments: 2, 
      steps: 2, 
      bevelSize: 1, 
      bevelThickness: 1 
    };

    const aspasGeom = new THREE.ExtrudeGeometry(aspasShape, extrudeSett);
    aspasGeom.rotateX(Math.PI/2);
    aspasGeom.translate(10, 470, -10);
    const aspa1 = new THREE.Mesh(aspasGeom, material);
    const aspa2 = new THREE.Mesh(aspasGeom, material);
    const aspa3 = new THREE.Mesh(aspasGeom, material);
    const aspa4 = new THREE.Mesh(aspasGeom, material);
    const aspa5 = new THREE.Mesh(aspasGeom, material);
    aspa2.rotateY(2*Math.PI/5);
    aspa3.rotateY(4*Math.PI/5);
    aspa4.rotateY(6*Math.PI/5);
    aspa5.rotateY(8*Math.PI/5);
    var csg = new CSG();
    csg.union([aspa1, aspa2, aspa3, aspa4, aspa5]);
    var aspas = csg.toMesh()
    aspas.castShadow = true;
    this.add(aspas);
}
update () {
    this.rotation.y += 0.01;
}
}

export { Aspas };
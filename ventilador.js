import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'

class Ventilador extends THREE.Object3D {
  constructor() {
    super();
    
    var baseVGeom = new THREE.CylinderGeometry (50, 40, 10, 50);
    var cylindMat = new THREE.MeshNormalMaterial();
    var baseV = new THREE.Mesh (baseVGeom, cylindMat);
    baseV.translateY(495);
    this.add (baseV);

    var conVGeom = new THREE.CylinderGeometry (10, 10, 40, 50);
    var conV = new THREE.Mesh (conVGeom, cylindMat);
    conV.translateY(480);
    this.add(conV);

    var points = [];

    var curve = new THREE.CatmullRomCurve3(new THREE.Vector3(0, 460, 0),
                                              new THREE.Vector3(20, 460, 0), 
                                              new THREE.Vector3(20, 440, 0), 
                                              new THREE.Vector3(0, 440, 0));
                            
    points = curve.getPoints(50);
    
    var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line (lineGeometry, cylindMat);

    var latheObject_var = new THREE.Mesh (new THREE.LatheGeometry (points), cylindMat);
    this.add(latheObject_var);
    this.add(line);
}   
  
update () {
}
}

export { Ventilador };
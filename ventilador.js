import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'
import  *  as TWEEN from '../libs/tween.esm.js'
class Ventilador extends THREE.Object3D {
  constructor() {
    super();

    
    var baseVGeom = new THREE.CylinderGeometry (35, 30, 10, 50);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff});
    const material2 = new THREE.MeshBasicMaterial( {
      color: 0xffffff,
      reflectivity: 1
    } );
    var baseV = new THREE.Mesh (baseVGeom, material);
    baseV.translateY(495);
    this.add (baseV);

    var conVGeom = new THREE.CylinderGeometry (10, 10, 40, 50);
    var conV = new THREE.Mesh (conVGeom, material);
    conV.translateY(480);
    this.add(conV);

    var points = [];

    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 480, 0),
                                              new THREE.Vector3(20, 480, 0), 
                                              new THREE.Vector3(20, 440, 0), 
                                              new THREE.Vector3(0, 430, 0)]);
                            
    points = curve.getPoints(100);
    points.reverse();

    var latheObject_var = new THREE.Mesh (new THREE.LatheGeometry (points), material2);
    latheObject_var.recieveShadow = true;
    this.add(latheObject_var);

    
    
}   
  
}

export { Ventilador };
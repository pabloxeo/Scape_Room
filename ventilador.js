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

    var intGeom = new THREE.BoxGeometry(2, 40, 20);
    var botGeom = new THREE.BoxGeometry(5, 15, 5);
    botGeom.translate(0, 7.5, 0);
    var mat = new THREE.MeshBasicMaterial({color: 0x000000});
    this.interruptor = new THREE.Mesh(intGeom, mat);
    this.boton = new THREE.Mesh(botGeom, material);
    this.interruptor.translateY(140);
    this.interruptor.translateX(488);
    this.interruptor.translateZ(140);
    this.boton.translateY(140);
    this.boton.translateX(490);
    this.boton.translateZ(140);
    this.boton.rotateZ(Math.PI/4);
    this.add(this.boton);
    this.add(this.interruptor);
    this.boton.userData = this;
    this.boton.name = "boton";
    this.interruptor.name = "inter";
    this.interruptor.userData = this;
    this.encendido = false;

    this.spotLight = new THREE.PointLight( 0xffffff, 0, 2000 );
    this.spotLight.position.set( 0, 440, 0 );
    this.add (this.spotLight);
    this.spotLight.castShadow = true;

}   
  use(mesh){
    if(this.encendido){
      let origin = this.boton.rotation;
      let destino = this.boton.rotateZ(-2*Math.PI/4);
      this.boton.rotateZ(2*Math.PI/4);
      let movimiento = new TWEEN.Tween(origin).to(destino,100)
      .onUpdate(() =>{
        this.boton.rotateZ(-2*Math.PI/100);
      }).start();
      TWEEN.update();
      this.spotLight.intensity = 0;
      this.encendido = false;
    }else{
      let origin = this.boton.rotation;
      let destino = this.boton.rotateZ(2*Math.PI/4);
      this.boton.rotateZ(-2*Math.PI/4);
      let movimiento = new TWEEN.Tween(origin).to(destino,100)
      .onUpdate(() =>{
        this.boton.rotateZ(2*Math.PI/100);
      }).start();
      TWEEN.update();
      this.spotLight.intensity = 0.4;
      this.encendido = true;
    }
  }
}

export { Ventilador };
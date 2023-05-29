import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'

 
class Carrusel extends THREE.Object3D {
  constructor() {
    super();
    var basG = new THREE.CylinderGeometry(60, 60, 10, 32);
    var mat =  new THREE.MeshPhongMaterial({color: 0x0000ff});
    var mat2 =  new THREE.MeshPhongMaterial({color: 0xffa500});
    var base = new THREE.Mesh(basG, mat2);
    var centroG = new THREE.CylinderGeometry(5, 5, 80, 32);
    this.centro = new THREE.Mesh(centroG, mat2);
    this.centro.position.y = 40;
    
    this.add(base, this.centro);

    var brazoG = new THREE.BoxGeometry(2.5, 2.5, 50);
    var conexG = new THREE.SphereGeometry(2.5, 32);
    var brazoG2 = new THREE.BoxGeometry(2.5, 40 , 2.5);
    brazoG.translate(0, 0, 25);
    conexG.translate(0, 0, 50);
    brazoG2.translate(0, -20, 50);
    this.brazos = [];
    this.conexiones = [];
    this.brazos2 = [];
    this.finales = [];
    for(let i = 0; i < 8; i++){
        
        let brazo = new THREE.Mesh(brazoG, mat);
        brazo.rotateY(i*Math.PI/4);
        brazo.position.y = 80;
        this.brazos.push(brazo);
        this.add(brazo);
        
        let brazo2 = new THREE.Mesh(brazoG2, mat);
        brazo2.rotateY(i*Math.PI/4);
        brazo2.position.y = 80;
        if(i % 2 != 0){
            brazo2.scale.set(1, 1.5, 1);
        }else{
            brazo2.scale.set(1, 0.5, 1);
        }
        this.brazos2.push(brazo2);
        this.add(brazo2);

        let conexion = new THREE.Mesh(conexG, mat2);
        conexion.rotateY(i*Math.PI/4);
        conexion.translateY(80);
        this.conexiones.push(conexion);
        this.add(conexion);

        let final = new THREE.Mesh(conexG, mat2);
        final.rotateY(i*Math.PI/4);
        if(i % 2 == 0){
            final.translateY(60);
        }else{
            final.translateY(20);
        }
        this.finales.push(final);
        this.add(final);
    }
    
    var topeG = new THREE.SphereGeometry(5, 32);
    this.tope = new THREE.Mesh(topeG, mat2);
    this.tope.translateY(80);
    this.add(this.tope);
    this.translateY(115);
    this.translateZ(-380);
}  
  
  
  
    update() {
        this.centro.rotateY(Math.PI/2000);
        this.tope.rotateY(Math.PI/2000);
        for(let i = 0; i < 8; i++){
            this.brazos[i].rotateY(Math.PI/2000);
            this.conexiones[i].rotateY(Math.PI/2000);
            this.brazos2[i].rotateY(Math.PI/2000);
            this.finales[i].rotateY(Math.PI/2000);
        }
        if(this.brazos2[0].rotation.y > 0 && this.brazos2[4].rotation.y < 0){
            for(let i = 0; i < 8; i++){
                if(i % 2 == 0){
                    this.finales[i].translateY(-0.012);
                    this.brazos2[i].scale.y+=0.0003;
                }else{
                    this.finales[i].translateY(0.012);
                    this.brazos2[i].scale.y-=0.0003;
                }
            }
        }else{
            for(let i = 0; i < 8; i++){
                if(i % 2 == 0){
                    this.brazos2[i].scale.y-=0.0003;
                    this.finales[i].translateY(0.012);
                }else{
                    this.brazos2[i].scale.y+=0.0003;
                    this.finales[i].translateY(-0.012);
                }
            }
        }
        

  
    }
}

export { Carrusel };
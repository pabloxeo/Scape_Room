import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'; 
import  *  as TWEEN from '../libs/tween.esm.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { Llave } from './llave.js';
class CajaF extends THREE.Object3D {
  constructor() {
    super();
        var materialP = new THREE.MeshBasicMaterial({color: 0xffa500, emissive: 1, transparent: true, opacity: 0});
        var piezaG = new THREE.CylinderGeometry(5, 5, 20, 20);
        piezaG.translate(-5, 0, 40);
        this.pieza = new THREE.Mesh(piezaG, materialP);
        this.add(this.pieza);


        var cilindroG = new THREE.CylinderGeometry(6, 6, 20, 32);
        cilindroG.rotateZ(Math.PI/2);
        cilindroG.translate(-5,0,14);
    
        var cuboG = new THREE.BoxGeometry(20, 8, 10);
        cuboG.rotateZ(Math.PI/2);
        cuboG.translate(-5,0,20);
        
        var cubo = new THREE.Mesh(cuboG, materialP);
        var cilindro = new THREE.Mesh(cilindroG, materialP);
        var csg = new CSG();
        csg.subtract([cubo, cilindro]);
        this.pieza2 = csg.toMesh();
        this.add(this.pieza2)

        
        var sueloGeom = new THREE.BoxGeometry(60, 10, 60);
        sueloGeom.translate(30, 0, 30);
        var paredGeom = new THREE.BoxGeometry(60, 10, 60);
        
        paredGeom.rotateX(Math.PI/2);
        paredGeom.rotateY(Math.PI/2);
        paredGeom.translate(30, 0, 30);
        var materialP = new THREE.MeshLambertMaterial({color: 0xffffff});
        this.bot = new THREE.Mesh(sueloGeom, materialP);
        this.bot.castShadow = true;
        this.bot.receiveShadow = true;
        var top = new THREE.Mesh(sueloGeom, materialP);
        top.translateY(25);
        this.bot.translateY(-25);
        this.bot.name = "llave";
        this.bot.userData = this;
        this.add(this.bot, top);

        var puerta = new THREE.Mesh(paredGeom, materialP);
        puerta.translateX(-30);
        var back = new THREE.Mesh(paredGeom, materialP);
        back.castShadow = true;
        back.receiveShadow = true;
        back.translateX(30);
        var izq = new THREE.Mesh(paredGeom, materialP);
        izq.castShadow = true;
        izq.receiveShadow = true;
        izq.rotateY(Math.PI/2);
        izq.translateX(-35);
        var dcha = new THREE.Mesh(paredGeom, materialP);
        dcha.receiveShadow = true;
        dcha.castShadow = true;
        dcha.rotateY(Math.PI/2);
        dcha.translateX(-85);
        var puertaCSG = new CSG();
        puertaCSG.subtract([puerta, this.pieza, this.pieza2]);
        this.puertaF = puertaCSG.toMesh();
        this.puertaF.name = "puertaC";
        this.puertaF.userData = this;
        this.add(this.puertaF, back, izq, dcha);
        this.llave = new Llave();
        this.llave;
        this.add(this.llave);
        this.translateY(150);
        this.translateX(400);
        this.translateZ(360);
        this.rotateY(-Math.PI/2);
        this.cerrado=true;
    
    

    }   


  
    update () {
    
    }
    use(mesh){
        if(mesh == this.bot && !this.cerrado){
            this.remove(this.llave);
        }else{
            if(this.cerrado) {
                this.pieza.material.transparent = false;
                this.pieza.material.color = new THREE.Color(0xffa500);
                this.pieza.material.needsUpdate = true;
                this.pieza2.material.transparent = false;
                this.pieza2.material.color = new THREE.Color(0xffa500);
                this.pieza2.material.needsUpdate = true;
                let animar = () => {
                    this.animate();
                }
                setTimeout(animar, 200);
            }
        }
    }
    animate(){
        let origin = this.puertaF.rotation;
        let destino = this.puertaF.rotateY(-Math.PI);
        this.puertaF.rotateY(Math.PI);
        let movimiento = new TWEEN.Tween(origin).to(destino,2000)
            .onUpdate(() =>{
                this.pieza.rotateY(-Math.PI/1000);
                this.pieza2.rotateY(-Math.PI/1000);
                this.puertaF.rotateY(-Math.PI/1000);
            }).start();
        this.cerrado = false;
        TWEEN.update();
    }
}

export { CajaF };
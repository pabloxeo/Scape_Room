import * as THREE from '../libs/three.module.js'
import {MeshPhongMaterial} from '../libs/three.module.js'
import  *  as TWEEN from '../libs/tween.esm.js'
import { CSG } from './libs/CSG-v2.js'; 
import { Mesh } from './libs/three.module.js';

class Simon extends THREE.Object3D{
    constructor(){
        super();
    
        var caja_luz= new THREE.BoxGeometry(20,15,20,);
        var caja_grande= new THREE.BoxGeometry(110,15,40);
        var mat= new THREE.MeshPhongMaterial({color: 0x000000});
        var matP= new THREE.MeshBasicMaterial({color: 0xffa500, emissive: 1});
        caja_grande.rotateY(Math.PI/2);
        caja_grande.translate(-390,75,0);
        var vasoG = new THREE.CylinderGeometry(12, 24, 48, 32);
        vasoG.translate(-440,90,0);
        this.vaso = new THREE.Mesh(vasoG, mat);
        this.vaso.name = "vaso";
        this.vaso.userData = this;
        this.vaso.castShadow = true;
        this.add(this.vaso);
        var cilindroG = new THREE.CylinderGeometry(6, 6, 20, 32);
        cilindroG.translate(0,0,6);
        var cuboG = new THREE.BoxGeometry(20, 5, 8);
        var cubo = new Mesh(cuboG, matP);
        var cilindro = new Mesh(cilindroG, mat);
        var csg = new CSG();
        csg.subtract([cubo, cilindro]);
        this.pieza = csg.toMesh();
        this.pieza.name = "pieza2";
        this.pieza.position.set(-440,75,0)
        this.pieza.userData = this;
        this.pieza.castShadow = true;
        this.add(this.pieza);


        this.luz_roja= new THREE.PointLight(0xFF3333,0.4,1000);
        this.luz_azul= new THREE.PointLight(0x3349FF,0.4,1000);
        this.luz_verde= new THREE.PointLight(0x33FF52,0.4,1000);
        this.luz_amarilla= new THREE.PointLight(0xFFFF33,0.4,1000);
        
 
        this.mat_caja_roja= new THREE.MeshPhysicalMaterial({
            color: 0xFF3333,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.mat_caja_roja.needsUpdate = true;
        var mat_caja_azul = new THREE.MeshPhysicalMaterial({
            color: 0x3349FF,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        mat_caja_azul.needsUpdate = true;
        var mat_caja_verde = new THREE.MeshPhysicalMaterial({
            color: 0x33FF52,      
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        mat_caja_verde.needsUpdate = true;
        var mat_caja_amarillo = new THREE.MeshPhysicalMaterial({
            color: 0xFFFF33,       
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        mat_caja_amarillo.needsUpdate = true;

        this.mesh_caja_roja = new THREE.Mesh(caja_luz,this.mat_caja_roja);
        this.mesh_caja_roja.name = "rojo";
        this.mesh_caja_roja.userData = this;
        this.mesh_caja_roja.castShadow = true;
        this.mesh_caja_roja.receiveShadow = true;
        this.mesh_caja_azul= new THREE.Mesh(caja_luz,mat_caja_azul);
        this.mesh_caja_azul.name = "azul";
        this.mesh_caja_azul.userData = this;
        this.mesh_caja_azul.castShadow = true;
        this.mesh_caja_azul.receiveShadow = true;
        this.mesh_caja_verde= new THREE.Mesh(caja_luz,mat_caja_verde);
        this.mesh_caja_verde.name = "verde";
        this.mesh_caja_verde.userData = this;
        this.mesh_caja_verde.castShadow = true;
        this.mesh_caja_verde.receiveShadow = true;
        this.mesh_caja_amarillo= new THREE.Mesh(caja_luz,mat_caja_amarillo);
        this.mesh_caja_amarillo.name = "amar";
        this.mesh_caja_amarillo.userData = this;
        this.mesh_caja_amarillo.castShadow = true;
        this.mesh_caja_amarillo.receiveShadow = true;
        this.caja_juego= new THREE.Mesh(caja_grande,mat);
        this.caja_juego.name = "cajon";
        this.caja_juego.userData = this;

        this.mesh_caja_roja.translateY(85);
        this.mesh_caja_roja.translateX(-390);
        this.mesh_caja_roja.translateZ(-40);
        this.redLight = new THREE.PointLight( 0xFF3333, 1, 100);
        this.redLight.castShadow = true;
        this.redLight.position.set(-390, 70, -40);

        this.mesh_caja_azul.translateY(85);
        this.mesh_caja_azul.translateX(-390);
        this.mesh_caja_azul.translateZ(-13);
        this.blueLight = new THREE.PointLight( 0x3349FF, 1, 100);
        this.blueLight.castShadow = true;
        this.blueLight.position.set(-390, 70, -13);

        this.mesh_caja_verde.translateY(85);
        this.mesh_caja_verde.translateX(-390);
        this.mesh_caja_verde.translateZ(40);
        this.greenLight = new THREE.PointLight( 0x33FF52, 1, 100);
        this.greenLight.castShadow = true;
        this.greenLight.position.set(-390, 70, -40);

        this.mesh_caja_amarillo.translateY(85);
        this.mesh_caja_amarillo.translateX(-390);
        this.mesh_caja_amarillo.translateZ(13);
        this.yelLight = new THREE.PointLight( 0xFFFF33, 1, 100);
        this.yelLight.castShadow = true;
        this.yelLight.position.set(-390, 70, 13);

        this.add(this.mesh_caja_amarillo);
        this.add(this.mesh_caja_roja);
        this.add(this.mesh_caja_azul);
        this.add(this.mesh_caja_verde);
        this.add(this.caja_juego);   
        this.translateZ(-50);
    }
    encenderLuzR(){
        this.mesh_caja_roja.material = new THREE.MeshPhysicalMaterial({
            color: 0xFF3333,
            emissive:  0xFF3333,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        
        this.add(this.redLight);
    }
    encenderLuzB(){
        this.mesh_caja_azul.material = new THREE.MeshPhysicalMaterial({
            color: 0x3349FF,
            emissive: 0x3349FF,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.add(this.blueLight);
    }
    encenderLuzG(){
        this.mesh_caja_verde.material = new THREE.MeshPhysicalMaterial({
            color: 0x33FF52,      
            emissive: 0x33FF52,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.add(this.greenLight);
    }
    encenderLuzY(){
        this.mesh_caja_amarillo.material = new THREE.MeshPhysicalMaterial({
            color: 0xFFFF33,
            emissive: 0xFFFF33,       
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.add(this.yelLight);
    }
        
    apagarLuzR(){
        this.mesh_caja_roja.material = new THREE.MeshPhysicalMaterial({
            color: 0xFF3333,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.remove(this.redLight);
    }
    apagarLuzB(){
        this.mesh_caja_azul.material = new THREE.MeshPhysicalMaterial({
            color: 0x3349FF,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.remove(this.blueLight);
    }
        
    apagarLuzG(){
        this.mesh_caja_verde.material = new THREE.MeshPhysicalMaterial({
            color: 0x33FF52,      
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        this.remove(this.greenLight);

    }

    apagarLuzY(){
        this.mesh_caja_amarillo.material = new THREE.MeshPhysicalMaterial({
            color: 0xFFFF33,       
            transparent: true,
            opacity: 0.8,
            metalness: 0.5,
            roughness: 0.2, 
        });
        
        
        this.remove(this.yelLight);
    }
    use(mesh){
        if(mesh == this.vaso){
        }else if(mesh == this.pieza){
            this.remove(this.pieza);
        }else{
            if(mesh == this.mesh_caja_roja){
                this.pressLuzR();
            }else if(mesh == this.mesh_caja_azul){
                this.pressLuzB();
            }else if(mesh == this.mesh_caja_verde){
                this.pressLuzG();
            }else if(mesh == this.mesh_caja_amarillo){
                this.pressLuzY();
            }else if(mesh == this.caja_juego){
                this.pista(mesh);
            }
        }
    }

    pressLuzR(){
        this.encenderLuzR();
        let origin = new THREE.Vector3();
        origin = this.mesh_caja_roja.position;
        let destino = new THREE.Vector3(origin.x, origin.y-10, origin.z);
        let movimiento = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_roja.position.y-=0.01;
        }).start();
        origin = this.mesh_caja_roja.position;
        destino = new THREE.Vector3(origin.x, origin.y, origin.z);
        let movimiento2 = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_roja.position.y+=0.01;
        })
        .onComplete(() => {
            this.apagarLuzR();
        });
        movimiento.chain(movimiento2);
        TWEEN.update();
    }
    pressLuzB(){
        this.encenderLuzB();
        let origin = new THREE.Vector3();
        origin = this.mesh_caja_azul.position;
        let destino = new THREE.Vector3(origin.x, origin.y-10, origin.z);
        let movimiento = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_azul.position.y-=0.01;
        }).start();
        origin = this.mesh_caja_azul.position;
        destino = new THREE.Vector3(origin.x, origin.y, origin.z);
        let movimiento2 = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_azul.position.y+=0.01;
        })
        .onComplete(() => {
            this.apagarLuzB();
        });
        movimiento.chain(movimiento2);
        TWEEN.update();
    }
    pressLuzG(){
        this.encenderLuzG();
        let origin = new THREE.Vector3();
        origin = this.mesh_caja_verde.position;
        let destino = new THREE.Vector3(origin.x, origin.y-10, origin.z);
        let movimiento = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_verde.position.y-=0.01;
        }).start();
        origin = this.mesh_caja_verde.position;
        destino = new THREE.Vector3(origin.x, origin.y, origin.z);
        let movimiento2 = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_verde.position.y+=0.01;
        })
        .onComplete(() => {
            this.apagarLuzG();
        });
        movimiento.chain(movimiento2);
        TWEEN.update();
    }
    pressLuzY(){
        this.encenderLuzY();
        let origin = new THREE.Vector3();
        origin = this.mesh_caja_amarillo.position;
        let destino = new THREE.Vector3(origin.x, origin.y-10, origin.z);
        let movimiento = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_amarillo.position.y-=0.01;
        }).start();
        origin = this.mesh_caja_amarillo.position;
        destino = new THREE.Vector3(origin.x, origin.y, origin.z);
        let movimiento2 = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.mesh_caja_amarillo.position.y+=0.01;
        })
        .onComplete(() => {
            this.apagarLuzY();
        });
        movimiento.chain(movimiento2);
        TWEEN.update();
        
    }
    pista(mesh){
        this.pressLuzR();
        let pressY = () => {
            this.pressLuzY();
        }
        let pressG = () => {
            this.pressLuzG();
        }
        let pressB = () => {
            this.pressLuzB();
        }
        setTimeout(pressY, 600);
        setTimeout(pressB, 1200);
        setTimeout(pressG, 1800);
        
    }
    error(){
        this.pressLuzB();
        this.pressLuzG();
        this.pressLuzR();
        this.pressLuzY();
    }
    complete(){
        this.pressLuzG();
        let pressY = () => {
            this.pressLuzY();
        }
        let pressB = () => {
            this.pressLuzB();
        }
        let pressR = () => {
            this.pressLuzR();
        }
        setTimeout(pressY, 300);
        setTimeout(pressB, 600);
        setTimeout(pressR, 900);
        this.destapar();
    }
    destapar(){
        let origin = this.vaso.position;
        let destino = new THREE.Vector3(origin.x, origin.y+50, origin.z);
        let movimiento = new TWEEN.Tween(origin).to(destino,300)
        .onUpdate(() =>{
            this.vaso.position.y+=0.01;
        }).start();
        TWEEN.update();
    }
        
        
}


export {Simon};
import * as THREE from '../libs/three.module.js'
import {MeshPhongMaterial} from '../libs/three.module.js'

class Simon extends THREE.Object3D{
    constructor(){
        super();
    
        var caja_luz= new THREE.BoxGeometry(20,10,20);
        var caja_grande= new THREE.BoxGeometry(110,15,40);
        caja_grande.rotateY(Math.PI/2);
        caja_grande.translate(-390,75,0);
        

        this.luz_roja= new THREE.PointLight(0xFF3333,0.4,1000);
        this.luz_azul= new THREE.PointLight(0x3349FF,0.4,1000);
        this.luz_verde= new THREE.PointLight(0x33FF52,0.4,1000);
        this.luz_amarilla= new THREE.PointLight(0xFFFF33,0.4,1000);
        var mat= new THREE.MeshPhongMaterial({color: 0x000000});
 
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
        this.mesh_caja_roja.castShadow = true;
        this.mesh_caja_roja.receiveShadow = true;
        this.mesh_caja_azul= new THREE.Mesh(caja_luz,mat_caja_azul);
        this.mesh_caja_azul.castShadow = true;
        this.mesh_caja_azul.receiveShadow = true;
        this.mesh_caja_verde= new THREE.Mesh(caja_luz,mat_caja_verde);
        this.mesh_caja_verde.castShadow = true;
        this.mesh_caja_verde.receiveShadow = true;
        this.mesh_caja_amarillo= new THREE.Mesh(caja_luz,mat_caja_amarillo);
        this.mesh_caja_amarillo.castShadow = true;
        this.mesh_caja_amarillo.receiveShadow = true;
        var caja_juego= new THREE.Mesh(caja_grande,mat);

        this.mesh_caja_roja.translateY(85);
        this.mesh_caja_roja.translateX(-390);
        this.mesh_caja_roja.translateZ(-40);
        this.redLight = new THREE.PointLight( 0xFF3333, 1, 100);
        this.redLight.castShadow = true;
        this.redLight.position.set(-390, 75, -40);

        this.mesh_caja_azul.translateY(85);
        this.mesh_caja_azul.translateX(-390);
        this.mesh_caja_azul.translateZ(-13);
        this.blueLight = new THREE.PointLight( 0x3349FF, 1, 100);
        this.blueLight.castShadow = true;
        this.blueLight.position.set(-390, 75, -13);

        this.mesh_caja_verde.translateY(85);
        this.mesh_caja_verde.translateX(-390);
        this.mesh_caja_verde.translateZ(40);
        this.greenLight = new THREE.PointLight( 0x33FF52, 1, 100);
        this.greenLight.castShadow = true;
        this.greenLight.position.set(-390, 75, -40);

        this.mesh_caja_amarillo.translateY(85);
        this.mesh_caja_amarillo.translateX(-390);
        this.mesh_caja_amarillo.translateZ(13);
        this.yelLight = new THREE.PointLight( 0xFFFF33, 1, 100);
        this.yelLight.castShadow = true;
        this.yelLight.position.set(-390, 75, 13);

        this.add(this.mesh_caja_amarillo);
        this.add(this.mesh_caja_roja);
        this.add(this.mesh_caja_azul);
        this.add(this.mesh_caja_verde);
        this.add(caja_juego);   
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
        
        
}


export {Simon};
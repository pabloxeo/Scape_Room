import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Mesa extends THREE.Object3D{
    constructor(){
        super();

        var pata= new THREE.CylinderGeometry(7,7,100,100,100);
        var tabla= new THREE.BoxGeometry(200,6,320);
        pata.translate(0, 50, 0);
        tabla.translate(0, 100, 0);

        var tabMat = new THREE.MeshPhongMaterial({color: 0xffffff});
        var mat= new THREE.MeshPhongMaterial({color: 0xffffff});
        
        

        var mesa_tab= new THREE.Mesh(tabla,tabMat);
        mesa_tab.castShadow = true;
        mesa_tab.receiveShadow = true;
        var pata1= new THREE.Mesh(pata,mat);
        pata1.castShadow = true;
        pata1.receiveShadow = true;
        pata1.translateX(75);
        pata1.translateZ(120);
        var pata2= new THREE.Mesh(pata,mat);
        pata2.castShadow = true;
        pata2.receiveShadow = true;
        pata2.translateX(75);
        pata2.translateZ(-120);
        var pata3= new THREE.Mesh(pata,mat);
        pata3.castShadow = true;
        pata3.receiveShadow = true;
        pata3.translateX(-75);
        pata3.translateZ(120);
        var pata4= new THREE.Mesh(pata,mat);
        pata4.castShadow = true;
        pata4.receiveShadow = true;
        pata4.translateX(-75);
        pata4.translateZ(-120);
        
        this.add(mesa_tab);
        this.add(pata1);
        this.add(pata2);
        this.add(pata3);
        this.add(pata4);

        this.rotateY(Math.PI/2);
        this.translateX(390);

    }
}
export{Mesa};
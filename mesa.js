import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Mesa extends THREE.Object3D{
    constructor(){
        super();

        var pata= new THREE.CylinderGeometry(7,7,100,100,100);
        var tabla= new THREE.BoxGeometry(200,6,320);
        pata.translate(0, 50, 0);
        tabla.translate(0, 100, 0);

        var mat= new THREE.MeshNormalMaterial();

        var mesa_tab= new THREE.Mesh(tabla,mat);
        var pata1= new THREE.Mesh(pata,mat);
        pata1.translateX(75);
        pata1.translateZ(120);
        var pata2= new THREE.Mesh(pata,mat);
        pata2.translateX(75);
        pata2.translateZ(-120);
        var pata3= new THREE.Mesh(pata,mat);
        pata3.translateX(-75);
        pata3.translateZ(120);
        var pata4= new THREE.Mesh(pata,mat);
        pata4.translateX(-75);
        pata4.translateZ(-120);
        
        var csg = new CSG();
        csg.union([mesa_tab, pata1, pata2, pata3, pata4]);
        var mesh = csg.toMesh();
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotateY(Math.PI/2);
        mesh.translateX(380);
        this.add(mesh);
    }
}
export{Mesa};
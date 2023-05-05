import { MeshNormalMaterial } from 'three';
import * as THREE from './libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

 
class Estructura extends THREE.Object3D {
  constructor() {
    super();

    var muroGeometry = new THREE.BoxGeometry( 1000, 300, 20);
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var muroMaterial = new THREE.MeshPhongMaterial ({map: texture});
    var muro1 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro1.translateY(150);
    muro1.translateZ(500);
    var muro2 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro2.translateY(150);
    muro2.translateZ(-500);
    var muro3 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro3.translateY(150);
    muro3.translateX(-500);
    muro3.rotateY(Math.PI/2);
    var muro4 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro4.translateY(150);
    muro4.translateX(500);
    muro4.rotateY(Math.PI/2);
    var techoGeometry = new THREE.BoxGeometry( 1000, 1000, 20);
    var techo = new THREE.Mesh( techoGeometry, muroMaterial);
    techo.translateY(310);
    techo.rotateX(Math.PI/2);
    var csg = new CSG();
    csg.union([muro1, muro2, muro3, muro4, techo]);

    var ventanaGeometry = new THREE.BoxGeometry( 400, 100, 20);
    var ventana = new THREE.Mesh( ventanaGeometry, muroMaterial);
    ventana.translateY(150);
    ventana.translateZ(-500);
    var puertaGeometry = new THREE.BoxGeometry( 100, 200, 20);
    var puerta = new THREE.Mesh( puertaGeometry, muroMaterial);
    puerta.translateY(100);
    puerta.translateX(500);
    puerta.rotateY(Math.PI/2);
    csg.subtract([ventana, puerta]);


    var ventAux2Geometry = new THREE.BoxGeometry( 10, 100, 10);
    var ventAux2 = new THREE.Mesh( ventAux2Geometry, muroMaterial);
    ventAux2.translateY(150);
    ventAux2.translateZ(-500);

    

    csg.union([ventAux2]);
    var mesh = csg.toMesh();
    this.add(mesh);

    var glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      transmission: 1,
      thickness: 0.5,
    });

    var glassGeometry = new THREE.BoxGeometry( 400, 100, 10);
    var glass = new THREE.Mesh( glassGeometry, glassMaterial);
    glass.translateY(150);
    glass.translateZ(-500);
    this.add(glass);

    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../models/porsche911/911.mtl',
    (materials)=>{
      objectLoader.setMaterials(materials);
      objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
      (object)=>{
        object.scale.set(300, 300, 300);
        object.translateZ(-1200);
        object.rotateY(Math.PI/2+10);
       this.add(object);
      },null,null);
    } ) ;



  }
  
  update () {
  
  }
}

export { Estructura };

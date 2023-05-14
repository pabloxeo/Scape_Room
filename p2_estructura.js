import * as THREE from './libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'

 
class Estructura extends THREE.Object3D {
  constructor() {
    super();


    //creación de las 4 paredes principales
    var muroGeometry = new THREE.BoxGeometry( 1000, 500, 20);
    var textureWall = new THREE.TextureLoader().load('../imgs/wall.jpg');
    var textureTecho = new THREE.TextureLoader().load('../imgs/techo.png');
    var muroMaterial = new THREE.MeshPhongMaterial ({map: textureWall});
    var techoMaterial = new THREE.MeshPhongMaterial ({map: textureTecho});
    var muro1 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro1.translateY(250);
    muro1.translateZ(500);
    var muro2 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro2.translateY(250);
    muro2.translateZ(-500);
    var muro3 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro3.translateY(250);
    muro3.translateX(-500);
    muro3.rotateY(Math.PI/2);
    var muro4 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro4.translateY(250);
    muro4.translateX(500);
    muro4.rotateY(Math.PI/2);
    var techoGeometry = new THREE.BoxGeometry( 1000, 1000, 20);
    var techo = new THREE.Mesh( techoGeometry, techoMaterial);
    techo.translateY(510);
    techo.rotateX(Math.PI/2);
    this.add(techo);
    var csg = new CSG();
    csg.union([muro1, muro2, muro3, muro4]);


    //Ventanas y puerta

    var ventanaGeometry = new THREE.BoxGeometry( 400, 200, 20);
    var ventana = new THREE.Mesh( ventanaGeometry, muroMaterial);
    ventana.translateY(250);
    ventana.translateZ(-500);
    var puertaGeometry = new THREE.BoxGeometry( 200, 400, 20);
    var puerta = new THREE.Mesh( puertaGeometry, muroMaterial);
    puerta.translateY(100);
    puerta.translateX(500);
    puerta.rotateY(Math.PI/2);
    csg.subtract([ventana, puerta]);


    var ventAux2Geometry = new THREE.BoxGeometry( 10, 200, 10);
    var ventAux2 = new THREE.Mesh( ventAux2Geometry, muroMaterial);
    ventAux2.translateY(250);
    ventAux2.translateZ(-500);

    csg.union([ventAux2]);
    var mesh = csg.toMesh();
    mesh.receiveShadow = true;
    this.add(mesh);

    //Muros exterior
    var exteriorGeometry = new THREE.BoxGeometry( 20, 960, 800);
    var textureExterior = new THREE.TextureLoader().load('../imgs/ventana.jpg');
    var exteriorMat = new THREE.MeshPhongMaterial ({map: textureExterior,
    emissive: 0xffffff,
    emissiveIntensity: 0.2});
    var exWall2 = new THREE.Mesh( exteriorGeometry, exteriorMat);
    exWall2.rotateY(Math.PI/2);
    exWall2.translateX(600);
    exWall2.translateY(200);
    
    this.add(exWall2);
    
  }
  
  update () {
  
  }
}

export { Estructura };

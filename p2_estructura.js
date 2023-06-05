import * as THREE from './libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'
import  *  as TWEEN from '../libs/tween.esm.js'
 
class Estructura extends THREE.Object3D {
  constructor() {
    super();


    //creación de las 4 paredes principales
    var muroGeometry = new THREE.BoxGeometry( 1000, 500, 20);
    
    var textureWall = new THREE.TextureLoader().load('../imgs/wall.jpg');
    var texture2Wall = new THREE.TextureLoader().load('../imgs/wall-modified.jpg');
    var textureTecho = new THREE.TextureLoader().load('../imgs/techo.png');
    var muroMaterial = new THREE.MeshPhongMaterial ({map: textureWall, bumpMap: texture2Wall, bumpScale: 10});
    var techoMaterial = new THREE.MeshPhongMaterial ({map: textureTecho});
    var muro1 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro1.name = "muro1";
    muro1.translateY(250);
    muro1.translateZ(500);
    muro1.geometry.computeBoundingBox();
    var muro2 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro2.translateY(250);
    muro2.translateZ(-500);
    muro2.geometry.computeBoundingBox();
    var muro3 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro3.name = "muro3";
    muro3.translateY(250);
    muro3.translateX(-500);
    muro3.rotateY(Math.PI/2);
    muro3.geometry.computeBoundingBox();
    var muro4 = new THREE.Mesh( muroGeometry, muroMaterial);
    muro4.translateY(250);
    muro4.translateX(500);
    muro4.rotateY(Math.PI/2);
    muro4.geometry.computeBoundingBox();
    var techoGeometry = new THREE.BoxGeometry( 1000, 1000, 20);
    var techo = new THREE.Mesh( techoGeometry, techoMaterial);
    techo.translateY(510);
    techo.rotateX(Math.PI/2);
    this.add(techo, muro1, muro3);
    var muro2c = new CSG();
    var muro4c = new CSG();


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
    muro4c.subtract([muro4,puerta]);
    muro2c.subtract([muro2,ventana]);
    var muro4m = muro4c.toMesh();
    muro4m.name = "muro4";
    this.add(muro4m);

    var ventAux2Geometry = new THREE.BoxGeometry( 10, 200, 10);
    var ventAux2 = new THREE.Mesh( ventAux2Geometry, muroMaterial);
    ventAux2.translateY(250);
    ventAux2.translateZ(-500);

    muro2c.union([ventAux2]);
    var muro2m = muro2c.toMesh();
    muro2m.receiveShadow = true;
    muro2m.name = "muro2";
    this.add(muro2m);

    //Muros exterior

    this.video = document.createElement('video');
    this.video.crossOrigin='anonymous';
    this.video.preload='';
    this.video.loop='true';
    this.video.src='../imgs/texturaVideo.mp4';
    this.video.load();
    var texture = new THREE.VideoTexture(this.video);
    texture.generateMipmaps=false;//sielvídeonoescuadrado
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    var exteriorMat = new THREE.MeshPhongMaterial ({map: texture});

    var exteriorGeometry = new THREE.BoxGeometry( 200, 400, 10);
    exteriorGeometry.translate(-120 ,100, 0);
    exteriorGeometry.rotateY(Math.PI/2);
    var exWall2 = new THREE.Mesh( exteriorGeometry, exteriorMat);
    exWall2.translateX(500);
    exWall2.translateZ(-120);
    
    //exWall2.translateZ(-380);
    this.add(exWall2);
    
    var puertaGeometry = new THREE.BoxGeometry( 200, 400, 10);
    puertaGeometry.translate(-120 ,100, 0);
    puertaGeometry.rotateY(Math.PI/2);
    

    var texturePuerta = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var puertaMat = new THREE.MeshPhongMaterial({map: texturePuerta});
    var mat= new THREE.MeshPhongMaterial({color: 0xffffff});
    this.puerta = new THREE.Mesh( puertaGeometry, puertaMat);
    this.puerta.geometry.computeBoundingBox();
    this.puerta.name = "puerta";
    this.puerta.translateX(500);
    this.puerta.translateZ(-120);
  
    var bolaGeom = new THREE.SphereGeometry(10, 32, 32);
    var botGeom = new THREE.BoxGeometry(5, 10, 5);
      
    botGeom.rotateZ(Math.PI/2);
    botGeom.translate(-8, 130, 200);
    bolaGeom.translate(-20, 130, 200);


    this.boton = new THREE.Mesh(botGeom, mat);
    this.boton.name = "pomo1";
    this.boton.userData = this;
    this.bola = new THREE.Mesh(bolaGeom, mat);
    this.bola.name = "pomo2";
    this.bola.userData = this;
    this.bola.translateX(500);  
    this.bola.translateZ(-120);
    this.boton.translateX(500);
    this.boton.translateZ(-120);
    this.add(this.boton, this.bola);
    this.add(this.puerta);
    this.cerrada = true;
  }
  
  use(mesh){
    if(this.cerrada){
      let origin = this.puerta.rotation;
      let destino = this.puerta.rotateY(-Math.PI);
      this.puerta.rotateY(Math.PI);
      let movimiento = new TWEEN.Tween(origin).to(destino,2000)
          .onUpdate(() =>{
              this.puerta.rotateY(-Math.PI/1000);
              this.boton.rotateY(-Math.PI/1000);
              this.bola.rotateY(-Math.PI/1000);
          }).start();
      this.cerrada = false;
      this.video.play();
      TWEEN.update();
      }
  }
  

  update () {
  
  }
}

export { Estructura };

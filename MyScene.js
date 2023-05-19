
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'

// Clases de mi proyecto

import { Estructura } from './p2_estructura.js'
import { Cama } from './cama.js'
import { Ventilador } from './ventilador.js'
import { Ventana } from './ventana.js'
import { Train } from './train.js'
import { Aspas } from './aspas.js'
import { Armario } from './armario.js'
import { Mesa } from './mesa.js'
import { Simon } from './simon_dice.js'
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    this.pieza1 = false;
    this.pieza2 = false;

    this.compSimon = false;
    this.pickable = [];
    this.candidates = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.pRojo = false;
    this.pAmar = false;
    this.pAzul = false;
    this.pVerde = false;
  
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    
    this.initStats();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
     
    this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas

    this.axis = new THREE.AxesHelper(5);
    this.add (this.axis);
    
    this.muro = new Estructura();
    var boxWall1 = new THREE.Box3();
    boxWall1.setFromObject(this.muro.getObjectByName("muro1"));
    var boxWall2 = new THREE.Box3();
    boxWall2.setFromObject(this.muro.getObjectByName("muro2"));
    var boxWall3 = new THREE.Box3();
    boxWall3.setFromObject(this.muro.getObjectByName("muro3"));
    var boxWall4 = new THREE.Box3();
    boxWall4.setFromObject(this.muro.getObjectByName("muro4"));
    this.candidates.push(boxWall1, boxWall2, boxWall3, boxWall4);
    this.add(this.muro);

    this.ventana = new Ventana();
    this.add(this.ventana);

    this.loadCama();
    

    this.ventilador = new Ventilador();
    this.pickable.push(this.ventilador.getObjectByName("boton"));
    this.pickable.push(this.ventilador.getObjectByName("inter"));
    this.add(this.ventilador);

    this.aspas = new Aspas();
    this.add(this.aspas);

    this.train = new Train();
    this.animar_tren = true;
    this.pickable.push(this.train.getObjectByName("pieza1"));
    this.pickable.push(this.train.getObjectByName("boton"));
    this.pickable.push(this.train.getObjectByName("bola"));
    this.pickable.push(this.train.getObjectByName("inter"));
    this.add(this.train);
    
    this.mesa = new Mesa();
    var boxMesa = new THREE.Box3();
    boxMesa.setFromObject(this.mesa);
    this.candidates.push(boxMesa);
    this.add(this.mesa);


    this.mesaN = new Mesa();
    this.mesaN.scale.set(0.65, 0.65, 0.65);
    this.mesaN.rotateY(Math.PI/2);
    this.mesaN.translateX(425);
    this.mesaN.position.set(-425, 0, -50);

    var boxMesaN = new THREE.Box3();
    boxMesaN.setFromObject(this.mesaN);
    this.candidates.push(boxMesaN);
    this.add(this.mesaN);

    this.armario = new Armario();
    var boxArm = new THREE.Box3();
    boxArm.setFromObject(this.armario);
    this.candidates.push(boxArm);
    this.add(this.armario);

    this.simon = new Simon();
    this.pickable.push(this.simon.getObjectByName("rojo"));
    this.pickable.push(this.simon.getObjectByName("azul"));
    this.pickable.push(this.simon.getObjectByName("verde"));
    this.pickable.push(this.simon.getObjectByName("amar"));
    this.pickable.push(this.simon.getObjectByName("cajon"));
    this.pickable.push(this.simon.getObjectByName("pieza2"));
    this.pickable.push(this.simon.getObjectByName("vaso"));
    this.add(this.simon);

    let boxGeometry = new THREE.BoxGeometry(50, 180, 50);
    let boxMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0});
    this.body = new THREE.Mesh(boxGeometry, boxMaterial);
    this.add(this.body);

    let sphereGeom = new THREE.SphereGeometry(0.015);
    let sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.4,
      transparent: true});
    this.mira = new THREE.Mesh(sphereGeom, sphereMaterial);
    this.mira.position.set(1, 0, 0);
    this.add(this.mira);
    

  }
  
  loadCama(){
    this.cama = new Cama();
    this.add(this.cama);

    let addCama = () => {
      var boxCama = new THREE.Box3();
      boxCama.copy(this.cama.box);
      this.candidates.push(boxCama);
    }
    let checkear = () => {
      if (this.cama.box.max.x == -Infinity) {
        setTimeout(checkear, 2);
      } else {
        addCama();
      }
    }

    checkear();
  }
  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 180, 0);
    this.camera.fov = 90;
    this.camera.updateProjectionMatrix();
    // Y hacia dónde mira
    var look = new THREE.Vector3 (10,180,0);
    this.camera.lookAt(look);

    this.add(this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    // Debe orbitar con respecto al punto de mira de la cámara
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (1020,0.2,1020);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/suelo.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    ground.receiveShadow = true;
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  
  
  createLights () {

    var ambientLight = new THREE.AmbientLight(0xccddee, 0.3);
    this.add (ambientLight);
    
  }
  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }

  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }


  update () {
    
    if (this.stats) this.stats.update();
    
    if((this.fd || this.bw || this.rt || this.lf) && !this.pause ){
        if(this.fd){
          this.cameraControl.moveForward(25);
          if(this.colision())
            this.cameraControl.moveForward(-25);
          else
            this.cameraControl.moveForward(-24);
        }
        if(this.bw){
          this.cameraControl.moveForward(-25);
          if(this.colision())
            this.cameraControl.moveForward(25);
          else
            this.cameraControl.moveForward(24);
        }
        if(this.rt){
          this.cameraControl.moveRight(25);
          if(this.colision())
            this.cameraControl.moveRight(-25);
          else
            this.cameraControl.moveRight(-24);
        }
        if(this.lf){
          this.cameraControl.moveRight(-25);
          if(this.colision())
            this.cameraControl.moveRight(25);
          else
            this.cameraControl.moveRight(24);
        }
      
    }
    
    this.body.position.set(this.camera.position.x, this.camera.position.y/2, this.camera.position.z);
    this.aspas.update();
    this.train.update();
    if(this.animar_tren)
      this.train.repeat();
      
      this.updatePositionForCamera();
     //Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  updatePositionForCamera() {
    // fixed distance from camera to the object
    var dist = 1;
    var cwd = new THREE.Vector3();
    
    this.camera.getWorldDirection(cwd);
    
    cwd.multiplyScalar(dist);
    cwd.add(this.camera.position);
    
    this.mira.position.set(cwd.x, cwd.y, cwd.z);
    this.mira.setRotationFromQuaternion(this.camera.quaternion);
}

  onKeyDown(event){
    switch(event.key){
      case 'w':
        this.fd = true;
        break;
      case 'a':
        this.lf = true;
        break;
      case 's':
        this.bw = true;
        break;
      case 'd':
        this.rt = true;
        break;
      case 'p':
        if(this.cameraControl.isLocked == true){
          this.cameraControl.unlock();
          this.pause = true;
        }else{
          this.pause = false;
          this.cameraControl.lock();
        }
        break;
      default:
        break;
    }
  }
  onKeyUp(event){
    switch(event.key){
      case 'w':
        this.fd = false;
        break;
      case 'a':
        this.lf = false;
        break;
      case 's':
        this.bw = false;
        break;
      case 'd':
        this.rt = false;
        break;
      default:
        break;
    }
  }
  onClick(event){
    this.mouse.x  = window.innerWidth/2;
    this.mouse.y = window.innerHeight/2
    this.mouse.x = (this.mouse.x / window.innerWidth) * 2 - 1;
    this.mouse.y = 1 - 2 * (this.mouse.y / window.innerHeight) ;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var pickedObjects = this.raycaster.intersectObjects(this.pickable, true);

    if(pickedObjects.length > 0 ){
      if(pickedObjects[0].distance < 200){
        var clickedObject = pickedObjects[0].object;
        if(clickedObject.userData == this.train){
          this.pieza1 = true;
        }
        if(clickedObject.userData == this.simon){
          this.pieza2 = true;
        }
        if(clickedObject.userData == this.simon && !this.compSimon){
          this.comprobarSimon(clickedObject);
        }
        if(clickedObject == this.train.getObjectByName("boton") || clickedObject == this.train.getObjectByName("inter")
          || clickedObject == this.train.getObjectByName("bola")){
            if(this.animar_tren){
              this.animar_tren = false;
            }else {
              this.animar_tren = true;
            }
        }
        if(clickedObject.userData){
          clickedObject.userData.use(clickedObject);
        }
      }
    }
  }

  comprobarSimon(boton){
    if(boton == this.simon.getObjectByName("rojo") && !this.pRojo && !this.pAzul && !this.pAmar && !this.pVerde){
      this.pRojo = true;
    }else if(boton == this.simon.getObjectByName("rojo")){
      this.pRojo = this.pVerde = this.pAmar = this.pVerde = false;
      boton.userData.error();
    }
    if(boton == this.simon.getObjectByName("amar") && this.pRojo && !this.pVerde && !this.pAzul && !this.pAmar){
      this.pAmar = true;
    }else if(boton == this.simon.getObjectByName("amar")){
      this.pRojo = this.pVerde = this.pAmar = this.pVerde = false;
      boton.userData.error();
    }
    if(boton == this.simon.getObjectByName("azul") && this.pAmar && !this.pAzul && !this.pVerde){
      this.pAzul = true;
    }else if(boton == this.simon.getObjectByName("azul")){
      this.pRojo = this.pVerde = this.pAmar = this.pVerde = false;
      boton.userData.error();
    }
    if(boton == this.simon.getObjectByName("verde") && this.pAzul){
      this.pVerde = true;
      this.compSimon = true;
      boton.userData.complete();
    }else if(boton == this.simon.getObjectByName("verde")){
      this.pRojo = this.pVerde = this.pAmar = this.pVerde = false;
      boton.userData.error();
    }


  }

  colision() {
    this.body.position.set(this.camera.position.x, this.camera.position.y/2, this.camera.position.z);
    let boxPr = new THREE.Box3().setFromObject(this.body);
    for(let candidate of this.candidates){
      if(boxPr.intersectsBox(candidate)){
        return true;
      }
    }
    return false;

  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
  window.addEventListener ("keyup", (event) => scene.onKeyUp(event));
  window.addEventListener("click", (event) => scene.onClick(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

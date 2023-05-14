import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Armario extends THREE.Object3D {
  constructor() {
    super();

    var armTexture = new THREE.TextureLoader().load("../imgs/wood.jpg");
    var mat= new THREE.MeshPhongMaterial({map: armTexture});

    var caja_grande= new THREE.BoxGeometry(100*2,150*2,75*2,30*2);
    caja_grande.translate(200*2,75*2,2*212.5);
    

    var huecp_geom= new THREE.BoxGeometry(85*2,35*2,55*2,50*2);
    huecp_geom.translate(200*2,2*120,192.5*2);

    var huecp_geom1= new THREE.BoxGeometry(85*2,35*2,55*2,50*2);
    huecp_geom1.translate(200*2,75*2,192.5*2);

    var huecp_geom2= new THREE.BoxGeometry(85*2,35*2,55*2,50*2);
    huecp_geom2.translate(200*2,30*2,192.5*2);

     var hueco1= new THREE.Mesh(huecp_geom,mat);
     var hueco2= new THREE.Mesh(huecp_geom1,mat);
     var hueco3= new THREE.Mesh(huecp_geom2,mat);
    
    // this.add(hueco1);
    
    var caja= new THREE.Mesh(caja_grande,mat);
    
   
  //  this.add(this.caja);

    var armario= new CSG();
    armario.union([caja]);
    armario.subtract([hueco1]);
    armario.subtract([hueco2]);
    armario.subtract([hueco3]);
    var fin = armario.toMesh();
    fin.translateX(-10);
    fin.castShadows = true;
    fin.recieveShadows = true;

    this.add(fin);


    

   
    
  }
  
  update () {
  
  }
}

export { Armario };

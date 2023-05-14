import * as THREE from '../libs/three.module.js'
import { CSG } from './libs/CSG-v2.js'; 
import  *  as TWEEN from '../libs/tween.esm.js'
import { CatmullRomCurve3 } from './libs/three.module.js';
class Train extends THREE.Object3D {
    
    constructor() {
        super();
        var boxGeometry = new THREE.BoxGeometry(15, 15, 40, 1, 1, 1);

        var material = new THREE.MeshPhongMaterial({color: 0xffa500});
        var materialv = new THREE.MeshPhongMaterial({color: 0x00ff00});
        var materialb = new THREE.MeshPhongMaterial({color: 0x0000ff});
        var boxMesh = new THREE.Mesh(boxGeometry, material);
        boxMesh.position.y = 10;

        var headGeometry = new THREE.BoxGeometry(15, 20, 18, 1, 1, 1);
        var headMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
        });
        var headMesh = new THREE.Mesh(headGeometry, headMaterial);
        headMesh.position.y = 15;
        headMesh.position.z = 11;

        var wheelGeometry = new THREE.CylinderGeometry(5, 5, 5, 12);
        var wheelMesh1 = new THREE.Mesh(wheelGeometry, materialv);
        wheelMesh1.position.x = 6;
        wheelMesh1.position.y = 5;
        wheelMesh1.position.z = 8;
        wheelMesh1.rotation.z = Math.PI / 2;

        var wheelMesh2 = new THREE.Mesh(wheelGeometry, materialb);
        wheelMesh2.position.x = -6;
        wheelMesh2.position.y = 5;
        wheelMesh2.position.z = 8;
        wheelMesh2.rotation.z = Math.PI / 2;

        var wheelMesh3 = new THREE.Mesh(wheelGeometry, material);
        wheelMesh3.position.x = -6;
        wheelMesh3.position.y = 5;
        wheelMesh3.position.z = -8;
        wheelMesh3.rotation.z = Math.PI / 2;

        var wheelMesh4 = new THREE.Mesh(wheelGeometry, material);
        wheelMesh4.position.x = 6;
        wheelMesh4.position.y = 5;
        wheelMesh4.position.z = -8;
        wheelMesh4.rotation.z = Math.PI / 2;

        var auxBoxGeom = new THREE.BoxGeometry(13, 11, 38, 1, 1, 1);
        var auxBox = new THREE.Mesh(auxBoxGeom, material);
        auxBox.position.y = 12;
        // combine all the meshes into one geometry
        var csg = new CSG();
        var csg2 = new CSG();
        var csg3 = new CSG();
        var csg4 = new CSG();
        csg.union([headMesh]);
        csg.union([boxMesh, wheelMesh1, wheelMesh2, wheelMesh3, wheelMesh4]);
        csg2.union([boxMesh, wheelMesh1, wheelMesh2, wheelMesh3, wheelMesh4]);
        csg3.union([wheelMesh1, boxMesh, wheelMesh2, wheelMesh3, wheelMesh4]);
        csg4.union([wheelMesh2, boxMesh, wheelMesh1, wheelMesh3, wheelMesh4]);
        csg.subtract([auxBox]);
        csg2.subtract([auxBox]);
        csg3.subtract([auxBox]);
        csg4.subtract([auxBox]);
        
        var hMesh = csg.toMesh();
        var v1Mesh = csg2.toMesh();
        var v2Mesh = csg3.toMesh();
        var v3Mesh = csg4.toMesh();
        hMesh.castShadow = true;
        v1Mesh.castShadow = true;
        v2Mesh.castShadow = true;
        v3Mesh.castShadow = true;
        this.add(hMesh);
        this.add(v1Mesh);
        this.add(v2Mesh);
        this.add(v3Mesh);


        var origen = {t:0};
        var destino = {t:1};

        var spline = new THREE.CatmullRomCurve3([new THREE.Vector3(80, 0, 450),
                                                 new THREE.Vector3(60, 10, 450),
                                                 new THREE.Vector3(0, 160, 450),
                                                 new THREE.Vector3(-460, 340, 450),
                                                 new THREE.Vector3(-460, 340, 300),
                                                 new THREE.Vector3(-460, 340, 200),
                                                 new THREE.Vector3(-460, 340, -200),
                                                 new THREE.Vector3(-460, 340, -300),
                                                 new THREE.Vector3(-460, 340, -450),
                                                 new THREE.Vector3(-10, 340, -450),
                                                 new THREE.Vector3(440, 340, -450),
                                                 new THREE.Vector3(440, 340, -280),
                                                 new THREE.Vector3(440, 340, -100),
                                                 new THREE.Vector3(440, 340, -100),
                                                 new THREE.Vector3(440, 340, -40),
                                                 new THREE.Vector3(440, 340, -10),
                                                 new THREE.Vector3(440, 340, 450),
                                                 new THREE.Vector3(300, 320, 450),
                                                 new THREE.Vector3(250, 10, 450),
                                                 new THREE.Vector3(200, 0, 450),
                                                 new THREE.Vector3(100, 0, 450),
                                                 new THREE.Vector3(80, 0, 450),]);

        var spline2 = new THREE.CatmullRomCurve3([new THREE.Vector3(125, 0, 450),
                                                    new THREE.Vector3(60, 10, 450),
                                                    new THREE.Vector3(0, 160, 450),
                                                    new THREE.Vector3(-460, 340, 450),
                                                    new THREE.Vector3(-460, 340, 300),
                                                    new THREE.Vector3(-460, 340, 200),
                                                    new THREE.Vector3(-460, 340, -200),
                                                    new THREE.Vector3(-460, 340, -300),
                                                    new THREE.Vector3(-460, 340, -450),
                                                    new THREE.Vector3(-10, 340, -450),
                                                    new THREE.Vector3(440, 340, -450),
                                                    new THREE.Vector3(440, 340, -280),
                                                    new THREE.Vector3(440, 340, -100),
                                                    new THREE.Vector3(440, 340, -100),
                                                    new THREE.Vector3(440, 340, -40),
                                                    new THREE.Vector3(440, 340, -10),
                                                    new THREE.Vector3(440, 340, 450),
                                                    new THREE.Vector3(300, 320, 450),
                                                    new THREE.Vector3(250, 10, 450),
                                                    new THREE.Vector3(200, 0, 450),
                                                    new THREE.Vector3(125, 0, 450),]);
                                                    
    
        var spline3 = new THREE.CatmullRomCurve3([new THREE.Vector3(170, 0, 450),
                                                new THREE.Vector3(60, 10, 450),
                                                new THREE.Vector3(0, 160, 450),
                                                new THREE.Vector3(-460, 340, 450),
                                                new THREE.Vector3(-460, 340, 300),
                                                new THREE.Vector3(-460, 340, 200),
                                                new THREE.Vector3(-460, 340, -200),
                                                new THREE.Vector3(-460, 340, -300),
                                                new THREE.Vector3(-460, 340, -450),
                                                new THREE.Vector3(-10, 340, -450),
                                                new THREE.Vector3(440, 340, -450),
                                                new THREE.Vector3(440, 340, -280),
                                                new THREE.Vector3(440, 340, -100),
                                                new THREE.Vector3(440, 340, -100),
                                                new THREE.Vector3(440, 340, -40),
                                                new THREE.Vector3(440, 340, -10),
                                                new THREE.Vector3(440, 340, 450),
                                                new THREE.Vector3(300, 320, 450),
                                                new THREE.Vector3(250, 10, 450),
                                                new THREE.Vector3(200, 0, 450),
                                                new THREE.Vector3(170, 0, 450),]);
        var spline4 = new THREE.CatmullRomCurve3([new THREE.Vector3(215, 0, 450),
                                                new THREE.Vector3(170, 0, 450),
                                                new THREE.Vector3(60, 10, 450),
                                                new THREE.Vector3(0, 160, 450),
                                                new THREE.Vector3(-460, 340, 450),
                                                new THREE.Vector3(-460, 340, 300),
                                                new THREE.Vector3(-460, 340, 200),
                                                new THREE.Vector3(-460, 340, -200),
                                                new THREE.Vector3(-460, 340, -300),
                                                new THREE.Vector3(-460, 340, -450),
                                                new THREE.Vector3(-10, 340, -450),
                                                new THREE.Vector3(440, 340, -450),
                                                new THREE.Vector3(440, 340, -280),
                                                new THREE.Vector3(440, 340, -100),
                                                new THREE.Vector3(440, 340, -100),
                                                new THREE.Vector3(440, 340, -40),
                                                new THREE.Vector3(440, 340, -10),
                                                new THREE.Vector3(440, 340, 450),
                                                new THREE.Vector3(300, 320, 450),
                                                new THREE.Vector3(250, 10, 450),
                                                new THREE.Vector3(225, 0, 450),
                                                new THREE.Vector3(215, 0, 450),]);
                                                           


                                        

        //Se crea una geometría
        var geometryLine = new THREE.BufferGeometry();

        geometryLine.setFromPoints(spline.getPoints(100));

        var material = new THREE.LineBasicMaterial({color:0xff0000,linewidth:2});
        var visibleSpline = new THREE.Line(geometryLine,material);
        
        this.add(visibleSpline);
        
        var movimiento = new TWEEN.Tween(origen).to(destino,6000)
        .onUpdate(() =>{
            var posicion = spline2.getPointAt(origen.t);
            v1Mesh.position.copy(posicion);
            var tangente = spline2.getTangentAt(origen.t);
            posicion.add(tangente);
            v1Mesh.lookAt(posicion);
        }).start();

        var movimiento2 = new TWEEN.Tween(origen).to(destino,6000)
        .onUpdate(() =>{
            var posicion = spline3.getPointAt(origen.t);
            v2Mesh.position.copy(posicion);
            var tangente = spline3.getTangentAt(origen.t);
            posicion.add(tangente);
            v2Mesh.lookAt(posicion);
        }).start();
        var movimiento3 = new TWEEN.Tween(origen).to(destino,6000)
        .onUpdate(() =>{
            var posicion = spline4.getPointAt(origen.t);
            v3Mesh.position.copy(posicion);
            var tangente = spline4.getTangentAt(origen.t);
            posicion.add(tangente);
            v3Mesh.lookAt(posicion);
        }).start();

        var movimiento4 = new TWEEN.Tween(origen).to(destino,6000)
        .onUpdate(() =>{
            var posicion = spline.getPointAt(origen.t);
            hMesh.position.copy(posicion);
            var tangente = spline.getTangentAt(origen.t);
            posicion.add(tangente);
            hMesh.lookAt(posicion);
        }).start();

        }
        update(){
            TWEEN.update();
        }
    }
    export { Train };
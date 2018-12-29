
 var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    gobalLight, shadowLight, backLight,
    renderer,
    container,
    controls, 
    clock;
   
   var GuineaPig;
   
   var stats;

   var cameraPosGame = 160;
   
   var speed = 6;

   var malusClearColor = 0xb44b39;
   var malusClearAlpha = 0;

   var raycaster = new THREE.Raycaster();
   var mouse = new THREE.Vector2(), INTERSECTED;


  //Materials
    var blackMat = new THREE.MeshPhongMaterial({
        color: 0x100707,
        shading:THREE.FlatShading,
      });

    var brownMat = new THREE.MeshPhongMaterial({
        color: 0xCCC09D,
        shininess:0,
        shading:THREE.FlatShading,
      });

    var earMat = new THREE.MeshPhongMaterial({
        color: 0x3B2811,
        shininess:0,
        shading:THREE.FlatShading,
    });

    var whiteMat = new THREE.MeshPhongMaterial({
        color: 0xa49789, 
        shading:THREE.FlatShading,
      });



//Camera&Scene
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xd6eae6, 160,350);
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 30;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.z = cameraPosGame;
  camera.position.y = 30;
  camera.lookAt(new THREE.Vector3(10, 10, 0));

//render
  renderer = new THREE.WebGLRenderer({
       alpha: true,
       antialias: true
    });
  renderer.setPixelRatio(window.devicePixelRatio); 
  renderer.shadowMap.enabled = true;
  renderer.setClearColor('rgb(252,201,223)');
  
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  document.getElementById('webgl').appendChild(renderer.domElement);
    
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  clock = new THREE.Clock();

//  stats = new Stats();
//  document.getElementById('webgl').appendChild(stats.dom);

function createLights() {
  globalLight = new THREE.AmbientLight(0xffffff, .9);

  shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  shadowLight.position.set(-30, 40, 20);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 2000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

  scene.add(globalLight);
  scene.add(shadowLight);
  
}
    
guineaPig = function() {
  this.mesh = new THREE.Group();
  this.body = new THREE.Group();
  this.mesh.add(this.body);
  
  var torsoGeom = new THREE.CubeGeometry(10, 8, 13, 1);
  
  this.torso = new THREE.Mesh(torsoGeom, brownMat);
  this.torso.position.z = 0;
  this.torso.position.y = 7;
  this.torso.castShadow = true;
  this.body.add(this.torso);
  
  var pantsGeom = new THREE.CubeGeometry(9, 9, 5, 1);
  this.pants = new THREE.Mesh(pantsGeom, whiteMat);
  this.pants.position.z = -3;
  this.pants.position.y = 0;
  this.pants.castShadow = true;
  this.torso.add(this.pants);
  
  
  this.torso.rotation.x = -Math.PI/8;
  
  var headGeom = new THREE.CubeGeometry(6, 6, 8, 1);
  
  headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,7.5));
  this.head = new THREE.Mesh(headGeom, brownMat);
  this.head.position.z = 2;
  this.head.position.y = 11;
  this.head.castShadow = true;
  this.body.add(this.head);
  
  
  var pawFGeom = new THREE.CubeGeometry(2,5,2, 1);
  this.pawFR = new THREE.Mesh(pawFGeom, earMat);
  this.pawFR.position.x = -2;
  this.pawFR.position.z = 6;
  this.pawFR.position.y = 3;
  this.pawFR.castShadow = true;
  this.body.add(this.pawFR);
  
  this.pawFL = this.pawFR.clone();
  this.pawFL.position.x = - this.pawFR.position.x;
  this.pawFL.castShadow = true;
  this.body.add(this.pawFL);
  
  //var pawBGeom = new THREE.CubeGeometry(3,3,6, 1);
  this.pawBL = this.pawFL.clone();
  this.pawBL.position.y = 2;
  this.pawBL.position.z = -5;
  this.pawBL.position.x = 5;
  this.pawBL.castShadow = true;
  this.body.add(this.pawBL);
  
  this.pawBR = this.pawBL.clone();
  this.pawBR.position.x = - this.pawBL.position.x;
  this.pawBR.castShadow = true;
  this.body.add(this.pawBR);
  
  var earGeom = new THREE.CubeGeometry(1, 2, 2, 1);

  
  earGeom.vertices[4].z-=1;
  earGeom.vertices[4].y-=1;
  earGeom.vertices[1].z-=1;
  earGeom.vertices[1].y-=1;
  earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,9,0));
  
  this.earL = new THREE.Mesh(earGeom, earMat);
  this.earL.position.x = 3;
  this.earL.position.z = 4.5;
  this.earL.position.y = -7;
  this.earL.castShadow = true;
  this.head.add(this.earL);
  
  this.earR = this.earL.clone();
  this.earR.position.x = -this.earL.position.x;
  this.earR.rotation.z = -this.earL.rotation.z;
  this.earR.castShadow = true;
  this.head.add(this.earR);
  
  var eyeGeom = new THREE.CubeGeometry(1,3,3);
  
  this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
  this.eyeL.position.x = 4;
  this.eyeL.position.z = 9;
  this.eyeL.position.y = 1.5;
  this.eyeL.castShadow = true;
  this.head.add(this.eyeL);
  
  var irisGeom = new THREE.CubeGeometry(.6,1,1);
  
  this.iris = new THREE.Mesh(irisGeom, blackMat);
  this.iris.position.x = 0.8;
  this.iris.position.y = 0.5;
  this.iris.position.z = 0.5;
  this.eyeL.add(this.iris);
  
  this.eyeR = this.eyeL.clone();
  this.eyeR.children[0].position.x = -this.iris.position.x;
   
  this.eyeR.position.x = -this.eyeL.position.x;
  this.head.add(this.eyeR);

  this.body.traverse(function(object) {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
}

guineaPig.prototype.chill = function(){
  var _this = this;
  var sp = .5 + Math.random();
  var sp= 3;
  
  // HEAD
  var tHeadRotY = -Math.PI/10 + Math.random()* Math.PI/5;
  TweenMax.to(this.head.rotation, sp, {y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.chill()}});
    
  //PawBackLeft
  var tPawBLRot = Math.random()*Math.PI/4;
  var tPawBLY = Math.random()*5;
  TweenMax.to(this.pawBL.rotation, sp/2, {x:tPawBLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});

  // PAWS BACK RIGHT
  
  var tPawBRRot = Math.random()*Math.PI/4;
  var tPawBRY = Math.random()*3;
  TweenMax.to(this.pawBR.rotation, sp/2, {x:tPawBRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
    
  //PAWS FRONt LEFT
   var tPawFLRot = Math.random()*Math.PI/8;
   var tPawFLY = Math.random()/5;
   TweenMax.to(this.pawFL.rotation, sp/2.5, {x:tPawFLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
   TweenMax.to(this.pawFL.position, sp/2.5, {y:this.pawFL.position.y-tPawFLY, ease:Power1.easeInOut, yoyo:true, repeat:2});
  
  //PAWS FRONt RIGHT
   var tPawFRRot = -Math.random()*Math.PI/6;
   var tPawFRY = Math.random()/5;
   TweenMax.to(this.pawFR.rotation, sp/2.5, {x:tPawFRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
   TweenMax.to(this.pawFR.position, sp/2.5, {y:this.pawFR.position.y-tPawFRY, ease:Power1.easeInOut, yoyo:true, repeat:2});
  
  //WHOLE BODY
  var bodyY = Math.random()*6;
  TweenMax.to(this.mesh.position,sp/2.5,{y:-10+bodyY, ease:Power3.easeInOut, yoyo:true, repeat:2});

}
  

function createGuineaPig() {
  GuineaPig = new guineaPig();
  GuineaPig.mesh.rotation.y = Math.PI/3;
  scene.add(GuineaPig.mesh);
  GuineaPig.chill();
}

function render(){
  clock = new THREE.Clock();
  renderer.render(scene, camera);  
}

function animate(){
    delta = clock.getDelta();
    //GuineaPig.chill();
    render();
    requestAnimationFrame(animate);
    //stats.update();
    
}



function init(){
 // initScreenAnd3D();
  createLights();
  createGuineaPig(); 
  animate();
  //setInterval(hero.blink.bind(hero), 3000);
  
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function nextPage(){
    console.log("clicked!");
    location.href = "index.html"
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.body.addEventListener('click', nextPage, true); 
//window.requestAnimationFrame(render);
init();

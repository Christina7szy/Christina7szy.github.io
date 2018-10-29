function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	var enableFog = false;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}
	
    var Colors = {
   red:0xf25346,  
   white:0xd8d0d1,  
   brown:0x59332e,  
   pink:0xF5986E,
   brownDark:0x23190f,  
   blue:0x68c3c0
    };



	var plane = getPlane(30);
	var Light = getHemisphereLight(Colors.blue,Colors.red,1);
    var Light2 = getShadowLight(0xffffff, 0.9);
	var sphere = getSphere(0.46);
	var box1 = getBox(0.2, 1.5, 0.2);
    var box2 = getBox(0.2, 1.5, 0.2);
    var box3 = getBox(0.2, 1.5, 0.2);
    var box4 = getBox(0.2, 1.5, 0.2);

	plane.name = 'plane-1';

	plane.rotation.x = Math.PI/2;
	Light.position.y = 4;
	Light.intensity = 2;
    
    box1.position.y = 0.75;
    box2.position.x = -1.3;
    box2.position.y = 0.75;
    box3.position.x = -0.65;
    box3.position.y = 1.5;
    box3.rotation.z = Math.PI/2;
    box4.position.x = -0.65;
    box4.rotation.z = Math.PI/2;
    sphere.position.x = -0.65;
    sphere.position.y = 0.75;
    plane.position.y = -0.1;
    
    var group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(sphere);
  
	scene.add(plane);
    scene.add(group);
    
    //scene.add(group);
    
   // scene.add(group);
	//spotLight.add(sphere);
	scene.add(Light);
    scene.add(Light2);
	//scene.add(boxGrid);

	gui.add(group.position, 'x', 0, 50);
	gui.add(Light2.position, 'x', 0, 400);
	gui.add(Light2.position, 'y', 0, 400);
	gui.add(Light2.position, 'z', 0, 400);
	//gui.add(Light, 'penumbra', 0, 1);
    $( "div" ).mousemove(function( event ) {
    var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
    var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
    sphere.rotation.x = event.pageX/100;
    sphere.rotation.y = event.pageY/100;
    Light2.position.x = event.pageX;    
    console.log(event.pageX/10);
   });

	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);

	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(Colors.brownDark);
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}

function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.castShadow = true;

	return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 1, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}

function getHemisphereLight(color,intensity) {
	var light = new THREE.HemisphereLight(color, intensity);
//	light.castShadow = true;

	return light;
}

function getShadowLight(color,intensity) {
	var shadowLight = new THREE.SpotLight(color, intensity);
	shadowLight.castShadow = true;
    shadowLight.position.set(300, 359, 389);

       // 开启光源投影
      shadowLight.castShadow = true;

      // 定义可见域的投射阴影
      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;

      // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;

	return shadowLight;
}

function update(renderer, scene, camera, controls) {
	renderer.render(
		scene,
		camera
	);

	controls.update();

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	})
}


var scene = init();
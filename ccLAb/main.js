
			var container, stats, controls;
			var camera, scene, renderer, light;
			var clock = new THREE.Clock();
			var mixers = [];
			init();
			function init() {
             var loader = new THREE.JSONLoader();
            loader.load( 'models/h.json', function ( geometry ) {
             var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );

                        mesh.position.x =500;
                        mesh.position.y =100;
                        mesh.position.z =500;
            scene.add( mesh );

        }); 
}
                
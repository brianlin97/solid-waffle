var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var markerRoot1;
var material1, mesh1;
initialize();
animate();
function initialize()
{
	scene = new THREE.Scene();

	camera = new THREE.Camera();
	scene.add(camera);
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 640, 480 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );
	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////
	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});
	function onResize()
	{
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
		}
	}
	arToolkitSource.init(function onReady(){
		onResize()
	});

	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});

	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////
	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});

	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});
	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////
	// build markerControls
	markerRoot1 = new THREE.Group();
	scene.add(markerRoot1);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type: 'pattern', patternUrl: "assets/pattern-bounce-white.patt",
	})
	////////////////////////////////////////////////////////////
	// setup scene
	////////////////////////////////////////////////////////////

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	let loader = new THREE.TextureLoader();

	let sceneGroup = new THREE.Group();
	markerRoot1.add(sceneGroup);

	let floorGeometry = new THREE.PlaneGeometry( 20,20 );
	let floorMaterial = new THREE.ShadowMaterial();
	floorMaterial.opacity = 0.3;
	let floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
	floorMesh.rotation.x = -Math.PI/2;
	floorMesh.receiveShadow = true;
	sceneGroup.add( floorMesh );


	ballMeshArray = [];
	let ballTexture = loader.load("assets/leather.jpg");
	let ballColors = [ 0xff0000, 0x009900, 0xff8800, 0x0000ff ];
	let p = 1;
	let ballPositions = [ new THREE.Vector3(p,1,p), new THREE.Vector3(-p,1,p),
	                      new THREE.Vector3(-p,1,-p), new THREE.Vector3(p,1,-p) ];
	for (let n = 0; n < 4; n++)
	{
		let ballMesh = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 32, 32),
			new THREE.MeshLambertMaterial({
				map: ballTexture,
				color: ballColors[n]
			})
		);
		ballMesh.position.copy(ballPositions[n]);
		ballMesh.castShadow = true;
		sceneGroup.add( ballMesh );
		ballMeshArray[n] = ballMesh;
	}

	let light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 0,4,0 ); // default; light shining from top
	light.castShadow = true;
	sceneGroup.add( light );

	let lightSphere = new THREE.Mesh(
		new THREE.SphereGeometry(0.1),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.8
		})
	);
	lightSphere.position.copy( light.position );
	sceneGroup.add( lightSphere );

	let ambientLight = new THREE.AmbientLight( 0x666666 );
	sceneGroup.add( ambientLight );
	// let helper = new THREE.CameraHelper( light.shadow.camera );
	// sceneGroup.add( helper );

}
function update()
{
	// update artoolkit on every frame
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );

	ballMeshArray[0].position.y = 1.2 * (Math.abs(Math.sin(2.00 * totalTime + 0.10)) + 0.5);
	ballMeshArray[1].position.y = 1.1 * (Math.abs(Math.sin(2.33 * totalTime + 0.37)) + 0.5);
	ballMeshArray[2].position.y = 1.3 * (Math.abs(Math.sin(2.71 * totalTime + 0.53)) + 0.5);
	ballMeshArray[3].position.y = 0.9 * (Math.abs(Math.sin(3.02 * totalTime + 0.77)) + 0.5);
}
function render()
{
	renderer.render( scene, camera );
}
function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

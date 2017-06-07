/* Cloth Simulation */

var mouse = new THREE.Vector2(0, 0);
var raw = new THREE.Vector2(0, 0);

var pinsFormation = [];
var pins = [];

var controls;
var centerParticleOrigin;

generatePins(10, true, true);

function generatePins (num, top, bottom) {

	pins = [];

	if(top === true) {
			for(var i = 0; i < num; i++) {
				pins.push(Math.round(lerp(0, cloth.w, (i/num))));
			}
	}

	if(bottom === true) {
			for(var i = 0; i < num; i++) {
				pins.push(Math.round(lerp(((cloth.w * cloth.h)-cloth.w), (cloth.w * cloth.h), (i/num))));
			}
	}

	// console.log(pins);
	pinsFormation.push (pins);

}

function lerp (a, b, f) {
	return a + f * (b-a);
}


function togglePins() {

	pins = pinsFormation[ ~~ ( Math.random() * pinsFormation.length ) ];

}

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// var container, stats;
var container;
var camera, scene, renderer;

var clothGeometry;
var sphere;
var object;

init();
animate();

function init() {

	// Initialize Gradient script
	GR.Init();

	// Initialize TextEffects
	TFX.Init();
	TFX.FadeIn();

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// scene

	scene = new THREE.Scene();
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

	// camera

	camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.x = -300;
	camera.position.y = 250;
	camera.position.z = 500;
	scene.add( camera );

	// cloth material

	var loader = new THREE.TextureLoader();

	// afauch: custom cloth material
	var clothMaterial = new THREE.MeshBasicMaterial();
	clothMaterial.wireframe = true;

	// cloth geometry
	clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
	clothGeometry.dynamic = true;

	var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

	// cloth mesh

	object = new THREE.Mesh( clothGeometry, clothMaterial );
	object.position.set( 0, 0, 0 );
	object.castShadow = false;
	scene.add( object );



	// sphere

	var ballGeo = new THREE.SphereGeometry( ballSize, 20, 20 );
	// var ballMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );
	var ballMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0.0});

	sphere = new THREE.Mesh( ballGeo, ballMaterial );
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	scene.add( sphere );

	// poles

	// renderer

	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 0 );

	container.appendChild( renderer.domElement );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMap.enabled = true;

	// orbit controls

	// find the center position
	// ... this seems to be working but OrbitControls can't access it
	centerParticleOrigin = new THREE.Vector3(
		cloth.particles[(cloth.w * cloth.h)/2].position.x,
		cloth.particles[(cloth.w * cloth.h)/2].position.y,
		cloth.particles[(cloth.w * cloth.h)/2].position.z
		);

	// controls = new THREE.OrbitControls(camera, renderer.domElement );	
	// controls.target = centerParticleOrigin;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	// controls.enableDamping = true;
	// controls.update();


	// performance monitor

	// stats = new Stats();
	// container.appendChild( stats.dom );

	window.addEventListener( 'resize', onWindowResize, false );

	// show / hide ball
	sphere.visible = true;

}

// Track the mouse position
// var mouse = new THREE.Vector2(0, 0);

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {
	raw.x = event.clientX;
	raw.y = event.clientY;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	GR.AdjustGradient(mouse.x, mouse.y);

	// console.log("MOVED TO " + mouse.x + " " + mouse.y);				
}


//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	var time = Date.now();

	// original values
	windStrength = Math.cos( time / 7000 ) * 20 + 40;
	windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );
	// console.log(windForce);

	// console.log(windStrength + " " + windForce);

	// TODO : Figure out how to normalize mouse values to effect wind
	// OR, just make a nice orbit with mouse
	// OR, maybe change pin position with mouse


	simulate( time );
	render();
	// stats.update();

}

function render() {


	// update vertices
	var p = cloth.particles;

	for ( var i = 0, il = p.length; i < il; i ++ ) {

		clothGeometry.vertices[ i ].copy( p[ i ].position );

	}

	clothGeometry.computeFaceNormals();
	clothGeometry.computeVertexNormals();

	clothGeometry.normalsNeedUpdate = true;
	clothGeometry.verticesNeedUpdate = true;

	// mouse 3D position
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

	// ball position
	ballPosition.x = pos.x;
	ballPosition.y = pos.y;
	ballPosition.z = pos.z;

	sphere.position.copy( ballPosition );

	// Particle demo-style camera rotation
	// Just tweak this to make it work
	// console.log(mouse.x);
	// console.log(mouse.y);

	// camera.position.x += ( raw.x - camera.position.x ) * .01;
	// camera.position.y += ( - raw.y - camera.position.y ) * .01;
	camera.lookAt( centerParticleOrigin );
	camera.rotation.z += 1;
	camera.rotation.x += 0;
	camera.rotation.y += .1;

	// controls.update();		

	renderer.render( scene, camera );

}

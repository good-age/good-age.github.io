var scalingFactor = .1;
var thickness = 1;
var mobileCoefficient = 3;

var renderer = new THREE.WebGLRenderer({alpha: true});

var isMobile = detectmob();

// hold resolution variables
var resWidth;
var resHeight;

getRes();
renderer.setSize(resWidth, resHeight);

renderer.setClearColor( 0x000000, 0 ); // the default
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

// Create a LineBasicMaterial
var material = new THREE.LineBasicMaterial({color: 0xFAEFD4, linewidth: thickness });

// Create line1 geometry
var line1Geometry = new THREE.Geometry();
line1Geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
line1Geometry.vertices.push(new THREE.Vector3(0, 10, 0));
line1Geometry.vertices.push(new THREE.Vector3(10, 0, 0));
line1Geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
var line1 = new THREE.Line(line1Geometry, material);

// Create line2 geometry
var line2Geometry = new THREE.Geometry();
line2Geometry.vertices.push(new THREE.Vector3(10, 0, 0));
line2Geometry.vertices.push(new THREE.Vector3(0, -10, 0));
line2Geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
line2Geometry.vertices.push(new THREE.Vector3(10, 0, 0));
var line2 = new THREE.Line(line2Geometry, material);

// This is the part I always forget
// think of it as "instantiating"
scene.add(line1);
scene.add(line2);

// Track the mouse position
var mouse = new THREE.Vector2();
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener('deviceorientation', onDeviceOrientation);

function onDocumentMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDeviceOrientation( event ) {

	var gammaRotation = event.gamma ? event.gamma * (Math.PI / 600) : 0;
	mouse.y = gammaRotation * mobileCoefficient;
	mouse.x = gammaRotation * mobileCoefficient;

}


// Check for window resizing
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	renderer.setSize(resWidth, resHeight);
}


// This is like the Update() function
// in Unity
function render() {

	// rotate line1
	line1.rotation.z += mouse.x * scalingFactor;
	line1.rotation.y += (mouse.y * .7) * scalingFactor;

	// rotate line2
	line2.rotation.z += (mouse.x * .7) * scalingFactor;
	line2.rotation.y += (mouse.y) * scalingFactor;

	requestAnimationFrame(render);
	renderer.render (scene, camera);
}

function getRes() {

	// set resolution
	if(isMobile === true) {
		resWidth = window.innerWidth;
		resHeight = window.innerHeight;
	} else {
		resWidth = window.innerWidth * 2;
		resHeight = window.innerHeight * 2;
	}

}

// Detect mobile
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

render();
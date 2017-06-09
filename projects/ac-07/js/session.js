var SS = {
	
	isChrome: null, 
	isSafari: null, 
	isOpera: null, 

	// Deprecated
	isWindowWidth: null,
	isWindowHeight: null,
	wasWindowWidth: null,
	wasWindowHeight: null,

	// Deprecated
	Init: function() {

		// Check Browser
		SS.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		SS.isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		SS.isOpera = /Opera/.test(navigator.userAgent);

		// Assign windowWidth
		// Assign windowHeight
		SS.isWindowWidth = window.innerWidth;
		SS.isWindowHeight = window.innerHeight;

		SS.wasWindowWidth = SS.isWindowWidth;
		SS.wasWindowHeight = SS.isWindowHeight;

	},


	// Deprecated
	UpdateAspect: function(cam, rend) {

		// Get the current ratios from browser
		SS.isWindowWidth = window.innerWidth;
		SS.isWindowHeight = window.innerHeight;	
		

		if((SS.isWindowWidth !== SS.wasWindowWidth) || (SS.isWindowHeight !== SS.wasWindowHeight)) {

			console.log("RESIZED");

			cam.aspect = SS.isWindowWidth / SS.isWindowHeight;
			cam.updateProjectionMatrix();

			rend.setSize( SS.isWindowWidth, SS.isWindowHeight );

		}

		SS.wasWindowWidth = SS.isWindowWidth;
		SS.wasWindowHeight = SS.isWindowHeight;

	}

}
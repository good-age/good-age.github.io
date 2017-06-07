// console.log("Gradient.js loaded");

var GR = {

	mouseOffset: 1, // mouse transformation

	m: null, // body element
	s: null, // m's style

	prefix: null, // browser prefix

	defaultAngle: 144, // starting angle
	default0Color: [0,174,239],
	default0Percent: 5,
	default1Color: [8,34,98],
	default1Percent: 99,

	currentAngle: null, // current angle of the gradient
	current0Color: null, // starting rgb color
	current0Percent: null,
	current1Color: null, // ending rgb color
	current1Percent: null,



	Init: function() {

		// Check Browser
		var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		var isOpera = /Opera/.test(navigator.userAgent);
		if(isChrome || isSafari) {
			GR.prefix = "-webkit-";
		}
		if(isOpera) {
			GR.prefix = "-o-";
		}


		GR.m = document.getElementById("body");
		GR.s = GR.m.style;

		GR.currentAngle = GR.defaultAngle;
		GR.current0Color = GR.default0Color;
		GR.current0Percent = GR.default0Percent;
		GR.current1Color = GR.default1Color;
		GR.current1Percent = GR.default1Percent;

	},

	AdjustGradient: function(mouseX, mouseY) {

		// Change current values
		GR.currentAngle = Math.round(lerp(124, 154, mouse.x * GR.mouseOffset));

		// Compile String
		var gradientString = 
			GR.prefix + 
			"linear-gradient(" + 
			GR.currentAngle + 
			"deg, rgb(" +
			GR.current0Color[0] + 
			"," + 
			GR.current0Color[1] + 
			"," + 
			GR.current0Color[2] + 
			") " +
			GR.current0Percent + 
			"%, rgb(" +
			GR.current1Color[0] + 
			"," + 
			GR.current1Color[1] + 
			"," + 
			GR.current1Color[2] + 
			") " +
			GR.current1Percent + 
			"%)";

		// console.log(gradientString);

		// Assign to document element
		GR.s.backgroundImage = gradientString;

		// var m = document.getElementById("myelement"), c = m.style;

	}

}

// console.log("After var GR loaded");
// console.log("Gradient.js loaded");

var GR = {

	mouseOffset: .4, // mouse transformation
	hasMoved: false, // is this the first time the mouse has moved
	isTweening: false, // are we currently tweening

	m: null, // body element
	p: null, // gradient placeholder
	s: null, // m's style

	prefix: "", // browser prefix

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

		if(SS.isChrome || SS.isSafari) {
			GR.prefix = "-webkit-";
		}
		if(SS.isOpera) {
			GR.prefix = "-o-";
		}


		GR.m = document.getElementById("body");
		GR.p = document.getElementById("gradient-placeholder");
		GR.s = GR.m.style;

		GR.currentAngle = GR.defaultAngle;
		GR.current0Color = GR.default0Color;
		GR.current0Percent = GR.default0Percent;
		GR.current1Color = GR.default1Color;
		GR.current1Percent = GR.default1Percent;


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

		GR.p.style.backgroundImage = gradientString;			

	},

	AdjustGradient: function(mouseX, mouseY) {

		// Is this the first mouse move
		if(GR.hasMoved === false) {

			if(GR.isTweening === false) {
				GR.FadePlaceHolder();
			} else {
				return;
			}

		} else {

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
			//GR.s.webkitTransition = transitionString;

			// var m = document.getElementById("myelement"), c = m.style;

		}

	},

	FadePlaceHolder: function() {

		GR.isTweening = true;

		var targetAngle = Math.round(lerp(124, 154, mouse.x * GR.mouseOffset));

		// what's the difference between default gradient and the target
		$(GR.p).fadeOut(200);
	
		console.log("tween to gradient");

		GR.isTweening = false;
		GR.hasMoved = true;

	}

}

// console.log("After var GR loaded");
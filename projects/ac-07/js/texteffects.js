console.log("Texteffects.js loaded");

var TFX = {

	elements: [],
	sequenceSpeed: 400,
	fadeSpeed: 1000,

	Init: function() {


		$('.text').children().each(function () {
    		// alert(this); // "this" is the current element in the loop
    		TFX.elements.push(this);
		});

	},

	FadeIn: function() {

		var d = 0;
		$('.text').children().each(function() {
		    $(this).delay(d).fadeIn(TFX.fadeSpeed);
		    d += TFX.sequenceSpeed;
		});

	}

}
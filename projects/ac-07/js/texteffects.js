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

			if($(this).attr('id') == 'logo') {

				// fade logo to 22% opacity
				$("img#logo").delay(d).fadeTo(TFX.fadeSpeed, .22);
			    d += TFX.sequenceSpeed;

			} else {

			    $(this).delay(d).fadeIn(TFX.fadeSpeed);
			    d += TFX.sequenceSpeed;

			}


		});

	}

}
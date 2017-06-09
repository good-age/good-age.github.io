var SS = {
	
	isChrome: null, 
	isSafari: null, 
	isOpera: null, 

	Init: function(){

		// Check Browser
		SS.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		SS.isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		SS.isOpera = /Opera/.test(navigator.userAgent);

	}

}
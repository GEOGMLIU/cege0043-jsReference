function trackAndCircle(){
	//trackLocation();
	addPointLinePoly();
	//getEarthquakes();
	//popupClickLocation();
	getPort();
	loadW3HTML();	
}

function startup(){
	document.addEventListener('DOMContentLoaded', function(){
		trackAndCircle();
	}, false);
}

function loadW3HTML() {
	w3.includeHTML();
}

function quizStartup(){
	
}

function questionStartup(){
}

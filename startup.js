/*
function trackAndCircle(){
	
	//addPointLinePoly();
	//getEarthquakes();
	
	getPort();
	loadW3HTML();	
}

function startup(){
	document.addEventListener('DOMContentLoaded', function(){
		trackAndCircle();
	}, false);
}
*/
function loadW3HTML() {
	w3.includeHTML();
}

function quizStartup(){
	//alert("quizStartup!");
	getPort();
	trackLocation();
	loadQuizPoint();
}


//startup functions for question App
function questionStartup(){
	document.addEventListener('DOMContentLoaded', function(){
		getPort();
		loadW3HTML();	
		popupClickLocation();
	}, false);
}

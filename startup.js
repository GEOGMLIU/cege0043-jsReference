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

function loadW3HTML() {
	w3.includeHTML();
}

function quizStartup(){
	//alert("quizStartup!");
	trackLocation();
	loadQuizPoint();
}

function questionStartup(){
	popupClickLocation();
}

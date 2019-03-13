function trackAndCircle()
{
	trackLocation();
	addPointLinePoly();
	//getEarthquakes();
	popupClickLocation();
}

function startup()
{
	document.addEventListener('DOMContentLoaded', function(){
		trackAndCircle();
	}, false);
	getPort();
	loadW3HTML();
}

function loadW3HTML() {
	w3.includeHTML();
}
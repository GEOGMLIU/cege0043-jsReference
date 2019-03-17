var QuizPointLayer;
var xhrFormData;



//automatically change latlng when the user clicked on map
function changeLatlng(){
	alert("getting latlng!");
	//enter latlng and format numbers to show 6 decimal places 
	document.getElementById("latitude").value=clickinglat.toFixed(6);
	document.getElementById("longitude").value=clickinglng.toFixed(6);
}

function loadQuizPoint() 
{
	alert("Quiz Points data will be loaded");
	startFormDataLoad();
}

function removeQuizPoint() 
{
	alert("Quiz Points data will be removed");
	mymap.removeLayer(QuizPointLayer);
}	
	
function startFormDataLoad() {
	getPort();
	xhrFormData = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
	url = url + "/getQuizPoints/"+httpPortNumber;
	//url = url + "/getGeoJSON/formdata/geom/"+httpPortNumber;
	//url = url + "/getGeoJSON/london_poi/geom";
	alert(url);
	xhrFormData.open("GET", url, true);
	xhrFormData.onreadystatechange = formDataResponse;
	xhrFormData.send();

}

function formDataResponse(){
	if (xhrFormData.readyState == 4) {
	// once the data is ready, process the data
		var formData = xhrFormData.responseText;
		loadFormData(formData);
		//document.getElementById("divForm").innerHTML = formData;
	}
}
/*
function loadForm(formData){
	//alert("formDataResponsed");
	var formJSON = JSON.parse(formData);
	QuizPointLayer = L.geoJson(formJSON).addTo(mymap);
	mymap.fitBounds(QuizPointLayer.getBounds());
}
*/
// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert
function loadFormData(formData) {
	// convert the text received from the server to JSON
	var formJSON = JSON.parse(formData);
	// load the geoJSON layer
	QuizPointLayer = L.geoJson(formJSON,
	{
		// use point to layer to create the points
		pointToLayer: function (feature, latlng)
			{
				// in this case, we build an HTML DIV string
				// using the values in the data
				var htmlString = "<DIV id='popup'"+ feature.properties.question_title + "><h2>" + feature.properties.question_title + "</h2><br>";
				htmlString = htmlString + "<h3>"+feature.properties.question_text +"</h3><br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.answer_1+"_1'/>"+feature.properties.answer_1+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.answer_2+"_2'/>"+feature.properties.answer_2+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.answer_3+"_3'/>"+feature.properties.answer_3+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.answer_4+"_4'/>"+feature.properties.answer_4+"<br>";
				htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
				// now include a hidden element with the answer
				// in this case the answer is alwasy the first choice
				// for the assignment this will of course vary - you can use feature.properties.correct_answer
				htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>";
				htmlString = htmlString + "</div>";
				return L.marker(latlng).bindPopup(htmlString);
			},
	}).addTo(mymap);
	mymap.fitBounds(QuizPointLayer.getBounds());
}





















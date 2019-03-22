var QuizPointLayer;
var xhrFormData;
var ptMarkerBlue=L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'blue'});



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
				htmlString = htmlString + "<input type='radio' name='answer' id ='answer_1'/>"+feature.properties.answer_1+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='answer_2'/>"+feature.properties.answer_2+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='answer_3'/>"+feature.properties.answer_3+"<br>";
				htmlString = htmlString + "<input type='radio' name='answer' id ='answer_4'/>"+feature.properties.answer_4+"<br>";
				htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>"; 

              	// now include a hidden element with the answer               
              	// in this case the answer is alwasy the first choice               
             	// for the assignment this will of course vary - you can use feature.properties.correct_answer               
             	htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer+ "</div>";
             	htmlString = htmlString + "</div>";
				//return L.marker(latlng);
				/*
				L.marker(latlng).addTo(mymap).on('click', function(e){
					document.getElementById("questionDiv").innerHTML = htmlString;
				});
				*/
				return L.marker(latlng, {icon:ptMarkerBlue}).bindPopup(htmlString);
			},
		}).addTo(mymap);
	mymap.fitBounds(QuizPointLayer.getBounds());
	closestFormPoint();
}

function closestFormPoint() {  
	// take the leaflet formdata layer  
	// go through each point one by one  
	// and measure the distance to Warren Street  
	// for the closest point show the pop up of that point  
	var minDistance = 100000000000;  
	var closestFormPoint = 0; 
	QuizPointLayer.eachLayer(function(layer) 
	{   
		//alert(userlat,userlng);
		var distance = calculateDistance(userlat, 
			userlng,layer.getLatLng().lat, layer.getLatLng().lng,  'K');
		//alert(distance);
		if (distance < minDistance){    
			minDistance = distance;    
			closestFormPoint = layer.feature.properties.id; 
			//alert(closestFormPoint);
		} 
		
	});  
 	// for this to be a proximity alert, the minDistance must be   
 	// closer than a given distance - you can check that here  
 	// using an if statement 

	// show the popup for the closest point  
	QuizPointLayer.eachLayer(function(layer) {   
		//alert(layer.feature.properties.id);
		if (layer.feature.properties.id == closestFormPoint){    
			//alert("hey3");
			layer.openPopup();   
		}  
	}); 
	
} 





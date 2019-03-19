var client;
var earthquakes;
var earthquakelayer;
var busstoplayer;
var clickinglat;
var clickinglng;

function addPointLinePoly()
{
	// add a point
	L.marker([51.5, -0.09]).addTo(mymap)
	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
	// add a circle
	L.circle([51.508, -0.11], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");
	// add a polygon with 3 end points (i.e. a triangle)
	var myPolygon = L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51, -0.047]
		],{
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a polygon.");
}

	function loadEarthquakeData() 
	{
		// call the getEarthquakes code
		// keep the alert message so that we know something is happening
		alert("Loading Earthquakes");
		getData("earthquakes");
	}

	function removeEarthquakeData() 
	{
		alert("Earthquake data will be removed");
		mymap.removeLayer( earthquakelayer );
	}

	function loadBusstops() 
	{
		alert("Busstops data will be loaded");
		getData("busstops")
	}

	function removeBusstops() 
	{
		alert("Busstops data will be removed");
		mymap.removeLayer( busstoplayer );
	}	

	// create the code to get the data using an XMLHttpRequest
	function getData(layername) 
	{
		client = new XMLHttpRequest();
		// depending on the layername we get different URLs
		var url;
		if (layername =="earthquakes") 
		{
			url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
		}
		if (layername == "busstops") 
		{
			url = "https://developer.cege.ucl.ac.uk:31089/CEGE0043-materialdesignlite/uczlm97/www/busstops.geojson"
		}
		client.open('GET',url);
		client.onreadystatechange = dataResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function dataResponse() 
	{
		// this function listens out for the server to say that the data is ready - i.e. has state 4
		if (client.readyState == 4) 
		{
			// once the data is ready, process the data
			var geoJSONData = client.responseText;
			loadLayer(geoJSONData);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadLayer(geoJSONData) 
	{
		// which layer did we actually load?
		if (geoJSONData.indexOf("earthquake") > 0) 
		{
			var loadingEarthquakes = true;
		}
		if (geoJSONData.indexOf("IIT_METHOD") > 0) 
		{
			var loadingBusstops = true;
		}
		// convert the text to JSON
		var json = JSON.parse(geoJSONData);
		// add the JSON layer onto the map - it will appear using the default icons
		if (loadingEarthquakes === true)
		{
			earthquakelayer = L.geoJson(json).addTo(mymap);
			mymap.fitBounds(earthquakelayer.getBounds());
		}
		if (loadingBusstops === true)
		{
			busstoplayer = L.geoJson(json).addTo(mymap);
			mymap.fitBounds(busstoplayer.getBounds());
		}
	}

function popupClickLocation()
{
	// create a custom popup
	var popup = L.popup();
	// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
	// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
	function onMapClick(e) {
		popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
		clickinglat=e.latlng.lat;
		clickinglng=e.latlng.lng;
		changeLatlng();
	}
	// now add the click event detector to the map
	mymap.on('click', onMapClick);
	//

}




















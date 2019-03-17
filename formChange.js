var poiLayer;
var xhrFormData;



//automatically change latlng when the user clicked on map
function changeLatlng(){
	alert("getting latlng!");
	//enter latlng and format numbers to show 6 decimal places 
	document.getElementById("latitude").value=clickinglat.toFixed(6);
	document.getElementById("longitude").value=clickinglng.toFixed(6);
}

function startFormDataLoad() {
	//alert("loading...1");
	getPort();
	xhrFormData = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
	//url = url + "/getFormData/"+httpPortNumber;
	//url = url + "/getGeoJSON/formdata/geom/"+httpPortNumber;
	url = url + "/getGeoJSON/london_poi/geom";
	alert(url);
	xhrFormData.open("GET", url, true);
	xhrFormData.onreadystatechange = formDataResponse;
	xhrFormData.send();

}

function formDataResponse(){
	if (xhrFormData.readyState == 4) {
	// once the data is ready, process the data
		var formData = xhrFormData.responseText;
		loadForm(formData);
		//document.getElementById("divForm").innerHTML = formData;
	}
}

function loadForm(formData){
	//alert("formDataResponsed");
	var json = JSON.parse(formData);
	poiLayer = L.geoJson(json).addTo(mymap);
	mymap.fitBounds(poiLayer.getBounds());
}
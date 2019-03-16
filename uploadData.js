var client; // the global variable that holds the request
function startDataUpload() {
	getPort();
	alert ("start data upload");
	var question_title = document.getElementById("question_title").value;
	var question_text = document.getElementById("question_text").value;
	var answer_1 = document.getElementById("answer_1").value;
	var answer_2 = document.getElementById("answer_2").value;
	var answer_3 = document.getElementById("answer_3").value;
	var answer_4 = document.getElementById("answer_4").value;
	var correct_answer = document.getElementById("correct_answer").value;
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	
	
	var postString = "question_title="+ question_title +"&question_text="+question_text+"&answer_1="+answer_1
	+"&answer_2="+answer_2+"&answer_3="+answer_3+"&answer_4="+answer_4+"&correct_answer="+correct_answer+"&latitude="+ latitude+"&longitude="+longitude;
	alert (postString);
	processData(postString);
}


function processData(postString) {
	alert("processData1");
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadQuestion";
	alert(url);
	client.open('POST',url,true);
	//client.open('POST','http://developer.cege.ucl.ac.uk:30289/reflectData',true);
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
	// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// change the DIV to show the response
		alert(client.responseText);
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
	}
}
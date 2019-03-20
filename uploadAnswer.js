var quizclient;

/*
function startAnswerUpload(questionID){
	alert ("start answer upload");
	var question_id = questionID;
	var correct_answer = document.getElementById("answer"+questionID).innerHTML;
	// now get the checkbox values - separate them with a | so that they can be
	// split later on if necessary
	var checkString = "";
	for (var i = 1;i< 5;i++){
		if (document.getElementById("answer_"+i).checked === true) {
			checkString = checkString + document.getElementById("answer_"+i).value + "||"
			}
	}
	
	// now get the radio button values
	var answer_selected;
	
	for (var i = 1;i< 5;i++){
		if (document.getElementById("answer_"+i).checked) {
			answer_selected= document.getElementById("answer_"+i).value;
			console.log(answer_selected);
		}
	}
	var postString = "question_id="+ question_id +"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
	alert (postString);
	//processAnswer(postString);
}
*/

function processAnswer(postString) {
	//alert("processAnswer1");
	quizclient = new XMLHttpRequest();
	postString = "port_id=" + httpPortNumber + postString;
	console.log(postString);
	var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadAnswer";
	//alert(url);
	quizclient.open('POST',url,true);
	quizclient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	quizclient.onreadystatechange = userAnswerUploaded;
	quizclient.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function userAnswerUploaded() {
	// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (quizclient.readyState == 4) {
		// change the DIV to show the response
		//alert(quizclient.responseText);
		document.getElementById("uploadAnswerDiv").innerHTML = quizclient.responseText;
	}
}
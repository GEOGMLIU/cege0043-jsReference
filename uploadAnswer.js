var quizclient;
var xhrCorrectNum;
var xhrUserRanking;
var wrongMarker=L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'red'});
var correctMarker=L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'green'});


function processAnswer(postString) {
	quizclient = new XMLHttpRequest();
	postString = "port_id=" + httpPortNumber + postString;
	console.log(postString);
	var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadAnswer";
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
		//showCorrectNum();
		document.getElementById("uploadAnswerDiv").innerHTML = quizclient.responseText;
	}
}

function checkAnswer(questionID) {  
	// get the correct answer from the hidden div  
	// NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed  
	var answer = document.getElementById("answer"+questionID).innerHTML; 
 	// now check the question radio buttons 
 	var correctAnswer = false;  
 	var answerSelected = 0;  
 	for (var i=1; i < 5; i++) {   
 		if (document.getElementById("answer_"+i).checked){    
 			answerSelected = i;   
 		}   
 		if ((document.getElementById("answer_"+i).checked) && (i == answer)) { 
 			alert ("Well done");
 			showCorrectNum();      
 			correctAnswer = true;   
 		}  
 	}  
 	if (correctAnswer === false) {   
 		// they didn't get it right   
 		showCorrectNum();
 		alert("Better luck next time");  
 	} 

 	// now close the popup   
 	mymap.closePopup();  

 	// the code to upload the answer to the server would go here  
 	// call an AJAX routine using the data  
 	// the answerSelected variable holds the number of the answer     
 	//that the user picked 
 	var question_id = questionID;
 	var correct_answer = answer;
	// now get the radio button values
	var answer_selected=answerSelected;
	var postString = "&question_id="+ question_id +"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
	//alert (postString);

	//the code to change matching icon colours
	//the colour depending on whether answer was right or wrong
	QuizPointLayer.eachLayer(function(layer) {   
		console.log(layer.feature.properties.id);
		if (layer.feature.properties.id == question_id){
			if (correctAnswer===true) {
				layer.setIcon(layer.options.icon=correctMarker);  
			}    
			else{
				layer.setIcon(layer.options.icon=wrongMarker);  
			}
		}  
	}); 
	processAnswer(postString);
	//showCorrectNum();
}

function showCorrectNum(){
	xhrCorrectNum = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
	url = url + "/getCorrectAnsNum/"+httpPortNumber;
	//alert(url);
	xhrCorrectNum.open("GET", url, true);
	xhrCorrectNum.onreadystatechange = ansNumResponse;
	xhrCorrectNum.send();
}

function ansNumResponse(){
	console.log("ansNumResponse");
	if (xhrCorrectNum.readyState == 4) {
		// once the data is ready, process the data
		var correctNumString = xhrCorrectNum.responseText;

		//the code is to convert string into JSON format array
		//in order to get the num_questions
		var correctNumData="";
		for (var i = 1; i <correctNumString.length-1; i++) {
			correctNumData=correctNumData+correctNumString[i];
		}
		//console.log(correctNumString);
		var ansNumJSON = JSON.parse(correctNumData);
		alert("You have answered "+ ansNumJSON.array_to_json[0].num_questions + " questions correctly.");
	}
}

function showRanking(){
	xhrUserRanking = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
	url = url + "/getRanking/"+httpPortNumber;
	//alert(url);
	xhrUserRanking.open("GET", url, true);
	xhrUserRanking.onreadystatechange = rankingResponse;
	xhrUserRanking.send();
}

function rankingResponse(){
	console.log("ansNumResponse");
	if (xhrUserRanking.readyState == 4) {
		// once the data is ready, process the data
		var rankingString = xhrUserRanking.responseText;

		//the code is to convert string into JSON format array
		//in order to get the rank
		var rankingData="";
		for (var i = 1; i <rankingString.length-1; i++) {
			rankingData=rankingData+rankingString[i];
		}
		var rankingJSON = JSON.parse(rankingData);
		alert("You ranking is: "+ rankingJSON.array_to_json[0].rank + ".");
	}
}

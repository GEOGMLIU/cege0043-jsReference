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
 			correctAnswer = true;   
 		}  
 	}  
 	if (correctAnswer === false) {   
 		// they didn't get it right   
 		alert("Better luck next time");  
 } 

 // now close the popup   mymap.closePopup();  
 
 // the code to upload the answer to the server would go here  // call an AJAX routine using the data  // the answerSelected variable holds the number of the answer     //that the user picked 
 
}
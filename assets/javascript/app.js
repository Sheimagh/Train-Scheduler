  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCzzXhw_OVSiJ9kW1xeytUoQkxxCddHiJg",
    authDomain: "train-scheduler-f4836.firebaseapp.com",
    databaseURL: "https://train-scheduler-f4836.firebaseio.com",
    projectId: "train-scheduler-f4836",
    storageBucket: "train-scheduler-f4836.appspot.com",
    messagingSenderId: "1066569705932"
  };
 
	
		firebase.initializeApp(config);
		var dataRef = firebase.database();

		// Button Click
		$("#submit").on("click", function(event) {
		  event.preventDefault();
		  // most recent user.
		  // Dont forget to provide initial data to your Firebase database.
		  trainName = $("#train-name-input").val().trim();
		  destination = $("#destination-input").val().trim();
			firstTrainTime = $("#train-time-input").val().trim();
			frequency = $("#frequency-input").val().trim();
			
			// Code for the push
		  dataRef.ref().push({
			name: trainName,
			destination: trainDestination,
			time: firstTrainTime,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		  });
		});
		
		// Firebase watcher + initial loader HINT: .on("value")
		dataRef.ref().on("child_added", function(snapshot) {
		  // Log everything that's coming out of snapshot
		  console.log(snapshot.val());
		  console.log(snapshot.val().name);
		  console.log(snapshot.val().destination);
		  console.log(snapshot.val().time);
		  console.log(snapshot.val().frequency);
		  // Change the HTML to reflect
		  $("#train-name-input").text(snapshot.val().name);
		  $("#destination-input").text(snapshot.val().destination);
		  $("#train-time-input").text(snapshot.val().time);
		  $("#frequency-input").text(snapshot.val().frequency);
	
		  // Handle the errors
		}, function(errorObject) {
		  console.log("Errors handled: " + errorObject.code);
		});
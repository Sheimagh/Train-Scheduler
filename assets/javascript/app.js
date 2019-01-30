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
$("#submit").on("click", function (event) {
	event.preventDefault();


	
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrainTime = $("#train-time-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	// console.log(trainName);
	// console.log(destination);
	// console.log(firstTrainTime);
	// console.log(frequency);

	// Code for the push
	dataRef.ref().push({
		name: trainName,
		destination: destination,
		time: firstTrainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Firebase watcher + initial loader 
dataRef.ref().on("child_added", function (snapshot) {
	// Log everything that's coming out of snapshot
	// console.log(snapshot.val());
	// console.log(snapshot.val().name);
	// console.log(snapshot.val().destination);
	// console.log(snapshot.val().time);
	// console.log(snapshot.val().frequency);
	// Change the HTML to reflect
	var trainName = snapshot.val().name;
	var destination = snapshot.val().destination;
	var time = snapshot.val().time;
	var frequency = snapshot.val().frequency;
	var minutesAway = 0;
	var nextArrival = "";


	// $("#train-name-input").text(snapshot.val().name);
	// $("#destination-input").text(snapshot.val().destination);
	// $("#train-time-input").text(snapshot.val().time);
	// $("#frequency-input").text(snapshot.val().frequency);

	console.log(trainName);
	console.log(destination);
	console.log(time);
	console.log(frequency);
	console.log(minutesAway);
	console.log(nextArrival);

	// moment.js

	var trainConverted = moment.unix(time).format("hh:mm");
	//calculate difference between times
	var difference = moment().diff(moment(trainConverted), "minutes");

	//time apart(remainder)
	var trainRemain = difference % frequency;

	//minutes until arrival
	var minUntil = frequency - trainRemain;

	//next arrival time
	var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

	var tableRow = $("<tr>");

	// Creating a paragraph tag with the result item's rating
	var td = $("<td>").text(trainName);
	tableRow.append(td);
	$("#table-row").append(tableRow);

	var td = $("<td>").text(destination);
	tableRow.append(td);
	$("#table-row").append(tableRow);

	var td = $("<td>").text(frequency);
	tableRow.append(td);
	$("#table-row").append(tableRow);

	var td = $("<td>").text(nextArrival);
	tableRow.append(td);
	$("#table-row").append(tableRow);

	var td = $("<td>").text(minutesAway);
	tableRow.append(td);
	$("#table-row").append(tableRow);

}, function (errorObject) {
	console.log("Errors handled: " + errorObject.code);
});


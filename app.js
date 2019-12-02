// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD72jGeZTd4oD6uNkgXYWv-6uzaForMAt8",
  authDomain: "trainscheduler-c63bd.firebaseapp.com",
  databaseURL: "https://trainscheduler-c63bd.firebaseio.com",
  projectId: "trainscheduler-c63bd",
  storageBucket: "",
  messagingSenderId: "982892983848",
  appId: "1:982892983848:web:abfdc029caa6b04d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// var database = firebase.database();
var database = firebase.database();

$("#submit").on("click", function () {

  //saves input values to variables
  var trainInput = $("#train").val().trim();
  var destinationInput = $("#destination").val().trim();
  var firstTrainInput = $("#firstTrain").val().trim();
  var frequencyInput = $("#frequency").val().trim();

  // values collected from input are stored to database
  database.ref().push({
    train: trainInput,
    destination: destinationInput,
    frequency: frequencyInput,
    firstTrain: firstTrainInput
  })

})

//display data from initial load
database.ref().on("child_added", function (snapshot) {
  var train = snapshot.val().train;
  console.log("TRAIN NAME: " + train);

  var destination = snapshot.val().destination;
  console.log("DESTINATION: " + destination);

  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;

  // Assumptions
  var tFrequency = frequency;
  console.log("FREQUENCY: " + frequency);

  // // Time is 3:30 AM
  var firstTime = firstTrain;
  console.log("FIRST TRAIN: " + firstTrain);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm");

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log("TIME APART: " + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var nextTrainRev = moment(nextTrain).format("hh:mm A");
  console.log("ARRIVAL TIME (REV FORMAT): " + nextTrainRev);
  console.log("===============================================");

  console.log("DIFF TIME: " + diffTime)

  if (diffTime < 0) {
    nextTrainRev = moment(firstTrain, "HH:mm").format("hh:mm a")
    tMinutesTillTrain = moment().diff(moment(firstTrain, "HH:mm"), "minutes") * -1;
  }
  var tr = $("<tr>");

  var td1 = $("<td>")
  td1.text(train)
  tr.append(td1)

  var td2 = $("<td>")
  td2.text(destination)
  tr.append(td2)

  var td3 = $("<td>")
  td3.text(frequency)
  tr.append(td3)

  var td4 = $("<td>")
  td4.text(nextTrainRev)
  tr.append(td4)

  var td5 = $("<td>")
  td5.text(tMinutesTillTrain)
  tr.append(td5)

  $("tbody").append(tr);

})

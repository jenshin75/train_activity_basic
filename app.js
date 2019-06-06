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

var database = firebase.database();

$("#submit").on("click", function(){

  //saves input values to variables
  var trainInput = $("#train").val().trim();
  var destinationInput = $("#destination").val().trim();
  var firstTrainInput = $("#firstTrain").val().trim();
  var frequencyInput = $("#frequency").val().trim();

  // values collected from input are stored to database
  database.ref().push({
    train: trainInput,
    destination: destinationInput,
    firstTrain: firstTrainInput,
    frequency: frequencyInput
  })

})

//display data from initial load
database.ref().on("child_added",function(snapshot){

 var train=snapshot.val().train;
 var destination=snapshot.val().destination;
 var firstTrain=snapshot.val().firstTrain;
 var frequency=snapshot.val().frequency;

//  var months=10;
//  var totalBill= months * monthlyRate;

 // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = $("frequencyInput");

    // Time is 3:30 AM
    // var firstTime = "03:30";
    var firstTime = $("firstTrainInput");

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);














    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var tr=$("<tr>");
   
var td1=$("<td>")
td1.text(train)
tr.append(td1)

var td2=$("<td>")
td2.text(destination)
tr.append(td2)

var td3=$("<td>")
td3.text(firstTrain)
tr.append(td3)

var td4=$("<td>")
td4.text(frequency)
tr.append(td4)
     
$("tbody").append(tr);

})
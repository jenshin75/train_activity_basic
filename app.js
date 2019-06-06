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

$(".submit").on("click", function(){
   
  var trainInput = $("#train").val().trim();
  var destinationInput = $("#destination").val().trim();
  var firstTrainInput = $("#firstTrain").val().trim();
  var frequencyInput = $("#frequency").val().trim();

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

// var td5=$("<td>")
// td5.text(monthlyRate)
// tr.append(td5)

// var td6=$("<td>")
// td6.text(totalBill)
// tr.append(td6)
     
$("tbody").append(tr);

})
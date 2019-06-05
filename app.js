  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyByCpqAHYieLqpUG7xMU8gfI2R2SYv8e-U",
    authDomain: "users-f4eaf.firebaseapp.com",
    databaseURL: "https://users-f4eaf.firebaseio.com",
    projectId: "users-f4eaf",
    storageBucket: "users-f4eaf.appspot.com",
    messagingSenderId: "619428155275",
    appId: "1:619428155275:web:3d4ed991e2a8ef73"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

database.ref().on("child-added", function(snapshot){
var name = snapshot.val().name;
var role = snapshot.val().role;
var startDate = snapshot.val().startDate;
var monthlyRate = snapshot.val().monthlyRate;
var months = 10;
var totalBill = months *  monthlyRate;

var tr = $("<tr>")
// var td1 = $("<td>")

var td1=$("<td>")
td1.text(name)
tr.append(td1)

var td2=$("<td>")
td2.text(role)
tr.append(td2)

var td3=$("<td>")
td3.text(startDate)
tr.append(td3)

var td4=$("<td>")
td4.text(monthlyRate)
tr.append(td4)

var td5=$("<td>")
td5.text(months)
tr.append(td5)

var td6=$("<td>")
td6.text(totalBill)
tr.append(td6)




$("tbody").append();

})
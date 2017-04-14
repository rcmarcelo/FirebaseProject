//get the data from the form
var uname = document.getElementById("uname");
var umail = document.getElementById("umail");
var uphone = document.getElementById("uphone");

//create reference to firebase database, using "Users" as root
var firebaseRef = firebase.database().ref().child("Users");
var userKey; //sotres userkey: unique key generated from the push method

$(document).ready(showData()); //show stored data when the page's loaded

//show all childs from "Users" (list)
function showData() {
	$("tr").remove("#userList"); //clean up table 
	
	firebaseRef.on("child_added", snap => {
		//get the values from each child and stores userKey
		var name = snap.child("Nome").val(); 
		var email = snap.child("Email").val();
		var phone = snap.child("Telefone").val();
		userKey =  "Users/"+snap.key;
		//append data on the table
		$("#table_body").append("<tr id='userList'><td>"+name+"</td><td>"+email+"</td><td>"+phone+
			"</td><td><button onClick=\"deleteUser('"+snap.key+"')\">Remove</button></td></tr>");
	})
}

//call function insertUser ("Add" button) 
function submitClick() {
	insertUser(uname.value, umail.value, uphone.value);
	uname.value=""; umail.value=""; uphone.value="";
}

//add a child to "Users" via push method and update the list
function insertUser(name, mail, phone) {
	firebaseRef.push({
		//name and value
		Nome: name,
		Email: mail,
		Telefone: phone
	});
	showData();
}

//delete a child from "Users" through it's unique name and update the list
function deleteUser(userKey) {
	//
	var firebaseRemoveRef = firebase.database().ref("Users/"+userKey);
	firebaseRemoveRef.remove().then(function(){
		console.log("ok");
	}).catch(function(error){
		console.log("Falha: "+error.message)
	});
	showData();
}
var userId = 1;
var createdAt;
var userArray = [];
var user;
var userArrayString;
var dataKey = 'userDetail';

// check for the existing data
function checkLocalStorage(){
	let arr = [];
	if(localStorage.getItem(dataKey)){
		arr = JSON.parse(localStorage.getItem(dataKey));
	}
	return arr;
}

// when user enter the data validate it and then append the data if there is already some data in localstorage  otherwise simpley add it
// when data add sucessfully display the data in table forment

function addDataToStorage() {
	createdAt = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
	var checkUserName = false;

	let firstName = document.getElementById('firstNameId').value;
	let lastName = document.getElementById('lastNameId').value;
	let userName = document.getElementById('userNameId').value;
	let age = document.getElementById('ageId').value;

	userArray = checkLocalStorage();

	if(userArray.length){
		userId = parseInt(userArray[userArray.length -1].userId) + 1;  
	}

	for(let i=0; i<userArray.length; i++){
		checkUserName = userArray[i].userName == userName;
	}

	if(!firstName) {
		alert('Please Enter FirstName');
	} 
	else if(!lastName) {
		alert('Please Enter LastName')
	} 
	else if(!userName) {
		alert('Please Enter UserName')
	}
	else if(!age) {
		alert('Please Enter Age')
	}
	else if(checkUserName){
		alert('UserName is already exist')
	}
	else {
		user = {userId, firstName, lastName, userName, age, createdAt};

		userArray.push(user);
		userArrayString = JSON.stringify(userArray);
		localStorage.setItem(dataKey, userArrayString);
		
	}

	let userDetailTable = "<table width=100%>" ;
			
	userDetailTable += "<caption> User Detail </caption>";

	userDetailTable += "<tr>";
	userDetailTable += "<th> No. </th>";
	userDetailTable += "<th> First Name </th>";
	userDetailTable += "<th> Last Name </th>";
	userDetailTable += "<th> User-Name </th>";
	userDetailTable += "<th> Age </th>";
	userDetailTable += "<th>Created At</th>";
	userDetailTable += "</tr>";
	
	for(let i=0; i < userArray.length; i++){
		userDetailTable += "<tr>" ;
		userDetailTable += "<td>" + userArray[i].userId + "</td>";
		userDetailTable += "<td>" + userArray[i].firstName + "</td>";
		userDetailTable += "<td>" + userArray[i].lastName + "</td>";
		userDetailTable += "<td>" + userArray[i].userName + "</td>";
		userDetailTable += "<td>" + userArray[i].age + "</td>";
 		userDetailTable += "<td>" + userArray[i].createdAt + "</td>";
		userDetailTable += "</tr>" ;
	}

	userDetailTable += "</table>"

	document.getElementById('userData').innerHTML = userDetailTable;

	document.getElementById('firstName').value = '';
	document.getElementById('lastName').value = '';
	document.getElementById('userName').value = '';
	document.getElementById('age').value = ''; 
}
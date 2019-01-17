var userId = 1;
var firstName, lastName, userName, age;
var createdAt;
var user;
var userArray = [];
var userDetailArray = [];
var userArrayString;
var dataKey = 'userDetail';

window.onload = display_data_in_table;

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

	firstName = document.getElementById('firstNameId').value;
	lastName = document.getElementById('lastNameId').value;
	userName = document.getElementById('userNameId').value;
	age = document.getElementById('ageId').value;

	userArray = checkLocalStorage();

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
	else {
		for(let i=0; i<userArray.length; i++){
			checkUserName = userArray[i].userName == userName;
			if(checkUserName){
				break;
			}
		}

		if(checkUserName){
			alert('UserName is already exist')
			return;
		}
		if(userArray.length){
				userId = parseInt(userArray[userArray.length -1].userId) + 1;  
		}

		user = {userId, firstName, lastName, userName, age, createdAt};

		userArray.push(user);
		userArrayString = JSON.stringify(userArray);
		localStorage.setItem(dataKey, userArrayString);
		
		display_data_in_table();

		document.getElementById('firstNameId').value = '';
		document.getElementById('lastNameId').value = '';
		document.getElementById('userNameId').value = '';
		document.getElementById('ageId').value = '';
	}
}

function display_data_in_table(){
	userDetailArray = checkLocalStorage();

	if(userDetailArray.length > 0){
		let userDetailTable = `<table width=100%>
							   <caption> User Detail </caption>
							   <tr>
							   <th> No. </th>
							   <th> First Name </th>
							   <th> Last Name </th>
							   <th> User-Name </th>
							   <th> Age </th>
							   <th>Created At</th>
							   </tr>`;
		
		for(let i=0; i < userDetailArray.length; i++){
			var userData ;
			userData += `<tr>
						<td>${userDetailArray[i].userId}</td>
						<td>${userDetailArray[i].firstName}</td>
						<td>${userDetailArray[i].lastName}</td>
						<td>${userDetailArray[i].userName}</td>
						<td>${userDetailArray[i].age}</td>
						<td>${userDetailArray[i].createdAt}</td>
						</tr>`;
		}

		userDetailTable += userData;
		userDetailTable += "</table>";
		document.getElementById('userData').innerHTML = userDetailTable;
	}
	else{
		alert('There is no data to display');
	}
}
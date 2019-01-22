var userId = 1;
var firstName, lastName, userName, age;
var createdAt;
var user;
var userArray = [];
var userDetailArray = [];
var userArrayString;
var dataKey = 'userDetail';
var userData = '';
var checkUserName = true;

window.onload = display_data_in_table;

function onKeyDown(event){
	if(event.code == 'Enter'){
		addDataToStorage();
	}
}

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
	checkUserName = false;

	firstName = document.getElementById('firstNameId').value;
	lastName = document.getElementById('lastNameId').value;
	userName = document.getElementById('userNameId').value;
	age = document.getElementById('ageId').value;
	userArray = checkLocalStorage();

	var id = document.getElementById('add_data_buton_Id').value;
	
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
		var currentUserIndex = userArray.findIndex((elem)=>{
			return elem.userId == id;
		});
		if(currentUserIndex>-1){
			var oldUserName= userArray[currentUserIndex].userName;
			if(userName != oldUserName && userNameValidator()){
				return;
			} 

			userArray[currentUserIndex].firstName = document.getElementById('firstNameId').value;
			userArray[currentUserIndex].lastName = document.getElementById('lastNameId').value;
			userArray[currentUserIndex].userName = document.getElementById('userNameId').value;
			userArray[currentUserIndex].age = document.getElementById('ageId').value;
		}else{
			if(userNameValidator()){
				return;
			}
			if(userArray.length){
				userId = parseInt(userArray[userArray.length -1].userId) + 1;  
			}
			user = {userId, firstName, lastName, userName, age, createdAt};
			userArray.push(user);	
		}			
		userArrayString = JSON.stringify(userArray);
		localStorage.setItem(dataKey, userArrayString);
		
		display_data_in_table();
		resetValue();
	}
}

function display_data_in_table(){
	var div_displaydata = document.getElementById('userData');
	div_displaydata.innerHTML = '';
	userDetailArray = checkLocalStorage();

	if(userDetailArray.length > 0){
		var tbl = document.createElement('table');
		tbl.id = 'user_data_table';
		tbl.style.width = '100%';
		let caption = tbl.createCaption();
		caption.innerHTML = 'User Detail';

		let header = tbl.createTHead();
		let row = header.insertRow(0);
		row.style.textAlign ='center';
		row.style.fontWeight = 'bold';

		let cell1 = row.insertCell(0);
		cell1.innerHTML = 'User Id';
		let cell2 = row.insertCell(1);
		cell2.innerHTML = 'First Name';
		let cell3 = row.insertCell(2);
		cell3.innerHTML = 'Last Name';
		let cell4 = row.insertCell(3);
		cell4.innerHTML = 'User-Name';
		let cell5 = row.insertCell(4);
		cell5.innerHTML = 'Age';
		let cell6 = row.insertCell(5);
		cell6.innerHTML = 'Created At';
		let cell7 = row.insertCell(6);
		cell7.innerHTML = 'Action';
		cell7.setAttribute('colspan', '2');

		var body = document.createElement("tbody");

		for(var i=0; i<userDetailArray.length; i++){
			let tr = body.insertRow(i);

			let cell1 = tr.insertCell(0);
			cell1.innerHTML = userDetailArray[i].userId;
			let cell2 = tr.insertCell(1);
			cell2.innerHTML = userDetailArray[i].firstName;
			let cell3 = tr.insertCell(2);
			cell3.innerHTML = userDetailArray[i].lastName;
			let cell4 = tr.insertCell(3);
			cell4.innerHTML = userDetailArray[i].userName;
			let cell5 = tr.insertCell(4);
			cell5.innerHTML = userDetailArray[i].age;
			let cell6 = tr.insertCell(5);
			cell6.innerHTML = userDetailArray[i].createdAt;
			let cell7 = tr.insertCell(6);
			cell7.innerHTML = `<button onclick="updateDatainStorage(${userDetailArray[i].userId})">update</button>`;
			let cell8 = tr.insertCell(7);
			cell8.innerHTML = `<button onclick="removeDataFromStorage(${userDetailArray[i].userId})">remove</button></td>`;
		}
		tbl.appendChild(body);
		document.getElementById('userData').appendChild(tbl);
	}
	else{
		alert('There is no data to display');
	}
}

// add update & remove button at end of the row
// when press update :
// change the name of add data to update button 
// get the userid of the row and pass it to update function 
// at update function, get the data-object using userid and set the data into the input_element 
// when user press the update button send data to the adddata function and update the data at the received id and display change in table
function updateDatainStorage(id_of_user){
	var usr_id = id_of_user; 	
	var array = checkLocalStorage();
	document.getElementById('add_data_buton_Id').innerHTML = 'Update Data';

	for (let i = 0; i < array.length; i++){
		if(array[i].userId == usr_id){
			document.getElementById('firstNameId').value = array[i].firstName;
			document.getElementById('lastNameId').value = array[i].lastName;
			document.getElementById('userNameId').value = array[i].userName;
			document.getElementById('ageId').value = array[i].age;
		}
	}
	document.getElementById('add_data_buton_Id').value = usr_id;
}

//when press remove : get the id and remove the object from the array and the change should be displayed in table
function removeDataFromStorage(id_of_user){
	resetValue();

	var user_id_update = id_of_user;
	var array_update = checkLocalStorage();

	var currentUserIndex = array_update.findIndex((elem)=>{
			return elem.userId == user_id_update;
		});
	var msg_confirmbox = 'Are you really want to Remove : ' + array_update[currentUserIndex].firstName;
	var confirm_remove_user = confirm(msg_confirmbox);

	if(confirm_remove_user){
		var updated_array = array_update.filter(
			function(user){
				return user.userId != user_id_update;
			}
		)
		localStorage.setItem(dataKey, JSON.stringify(updated_array));
	}
	display_data_in_table();
}

function resetValue(){
	document.getElementById('add_data_buton_Id').innerHTML = 'Add Data';
	document.getElementById('add_data_buton_Id').value = 0;
	document.getElementById('firstNameId').value = '';
	document.getElementById('lastNameId').value = '';
	document.getElementById('userNameId').value = '';
	document.getElementById('ageId').value = '';
}

function userNameValidator(){
	for(let i=0; i<userArray.length; i++){
		checkUserName = userArray[i].userName == userName;
		if(checkUserName){
			break;
		}
	}		
	if(checkUserName){
		alert('UserName is already exist')
		return true;
	}
}
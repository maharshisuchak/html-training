var userId = 1;
var createdAt;
var user, userJsonstr;
var dataKey = 'person';
var userArr = [];
var averageOfAge = [];
// var age = document.getElementById('personAgeId');

function onKeyDown(event){
	if(event.code == 'Enter'){
		addPersonData();
	}
	console.log(event);
}


function addPersonData(){
	createdAt = new Date();
	checkUserName = false;

	var firstName = document.getElementById('personFirstNameId').value;
	var lastName = document.getElementById('personLastNameId').value;
	var	userName = document.getElementById('personUserNameId').value;
	var age =  document.getElementById('personAgeId').value;
	

	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
	}else{
		userArr  =[];
	}

	if(userArr.length){
		userId = parseInt(userArr[userArr.length -1].userId) + 1;
	}

	for (var i = 0; i < userArr.length; i++){

		if(userArr[i].userName == userName){
			checkUserName = true;
		}
	}

	if(firstName == ''){
		alert('Enter FirstName.')
	}
	else if(lastName == ''){
		alert('Enter LastName.')
	}
	else if(userName ==''){
		alert('Enter UserName.')
	}
	else if(age == '' || age == '0'){
		alert('Enter age.')
	}
	else if(checkUserName == true){
		alert('username is already occupied.')
		document.getElementById('personUserNameId').value = '';
	}
	else{
		user = {userId,firstName,lastName,userName,age,createdAt};
			
		userArr.push(user);
		userJsonstr = JSON.stringify(userArr);
		localStorage.setItem(dataKey,userJsonstr);

		document.getElementById('personFirstNameId').value = '';
		document.getElementById('personLastNameId').value = '';
		document.getElementById('personUserNameId').value = '';
		document.getElementById('personAgeId').value = '';
	}
	debugger;
	console.log(age);
}

function displayPersonData() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('displayData').innerHTML += userArr.map(fullDetail);
	}else{
		alert('There is no data in the localStorage.');
	}	
}

function fullDetail(item, index) {
	var fullDetail = [item.firstName, item.lastName, item.userName, item.age] +"<br>";
	return fullDetail	;
}

/*function displayName() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('displayName').innerHTML += userArr.map(nameOnly);
	}else{
		alert('There is no data in the localStorage.');
	}	
}

function nameOnly(item, index){
	var nameOnly = [item.firstName].join(',') ;
	return nameOnly;
}*/

function age25() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('display25year').innerHTML += userArr.map(userAbove25);
	}else{
		alert('There is no data in the localStorage.');
	}
}

function userAbove25(item, index) {
	if(item.age = 25){
		var userAbove25 = [item.firstName, item.lastName, item.userName, item.age] + "<br>";
		return userAbove25;
	}
}

function above35() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('displayAbove35year').innerHTML += userArr.map(userAbove35);
	}else{
		alert('There is no data in the localStorage.');
	}
}

function userAbove35(item, index) {
	if(item.age > 35){
		var userAbove35 = [item.firstName, item.lastName, item.userName, item.age] + "<br>";
		return userAbove35;
	}
}

function above25to35() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('displaybetween25to35year').innerHTML += userArr.map(user25to35);
	}else{
		alert('There is no data in the localStorage.');
	}
}

function user25to35(item, index) {
	if(item.age >= 25 && item.age < 35){
		var user25to35 = [item.firstName, item.lastName, item.userName, item.age] + "<br>";
		return user25to35;
	}
}

function averageAge() {
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById('displayAverageAge').innerHTML = userArr.map(ageAverage).reduceRight(getSum) / userArr.length;
	}else{
		alert('There is no data in the localStorage.');
	}
}

function ageAverage(item, index) {
	return parseInt(item.age);
}

function getSum(total, num) {
	return total + num;
}

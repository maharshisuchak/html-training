var userId = 1;
var createdAt;
var user, userFirstName, userLastName, userAge, createdAt;
var userJsonstr, userJson, userStr;
var dataKey = 'person';
var userArr = [];

function addPersonData(){
	createdAt = new Date();

	var firstName = document.getElementById('personFirstNameId').value;
	var lastName = document.getElementById('personLastNameId').value;
	var age =  document.getElementById('personAgeId').value;

	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
	}else{
		userArr  =[];
	}

	if(userArr.length){
		userId = parseInt(userArr[userArr.length -1].userId) + 1;
	}
/*
	user = {
		userId : userId,
		firstName : firstName,
		lastName : lastName,
		age	: age,
		createdAt : createdAt
	};*/

	user = {userId,firstName,lastName,age,createdAt};
			
	userArr.push(user);
	userJsonstr = JSON.stringify(userArr);
	localStorage.setItem(dataKey,userJsonstr);
}

function displayPersonData() {
	userArr = JSON.parse(localStorage.getItem(dataKey));

	for (var i = 0; i < userArr.length; i++) {
		document.getElementById('displayData').innerHTML += JSON.stringify(userArr[i]) +"<br>";
	}
}

function displayName() {
	userArr = JSON.parse(localStorage.getItem(dataKey));

	for (var i = 0; i < userArr.length; i++) {
		document.getElementById('displayName').innerHTML += JSON.stringify(userArr[i].firstName) +"<br>";
	}
}

function age25() {
	userArr = JSON.parse(localStorage.getItem(dataKey));
			
	for (var i = 0; i < userArr.length; i++) {
				
		console.log(userArr[i].age);
				
		if(userArr[i].age == 25){
			document.getElementById('display25year').innerHTML += JSON.stringify(userArr[i].firstName) +"<br>";
		}
	}
}

function above35() {
	userArr = JSON.parse(localStorage.getItem(dataKey));
			
	for (var i = 0; i < userArr.length; i++) {
				
		console.log(userArr[i].age);
				
		if(userArr[i].age > 35){
			document.getElementById('displayAbove35year').innerHTML += JSON.stringify(userArr[i].firstName) +"<br>";
		}
	}
}

function above25to35() {
	userArr = JSON.parse(localStorage.getItem(dataKey));
			
	for (var i = 0; i < userArr.length; i++) {
				
		console.log(userArr[i].age);
				
		if(userArr[i].age >= 25 && userArr[i].age < 35){
			document.getElementById('displaybetween25to35year').innerHTML += JSON.stringify(userArr[i].firstName) +"<br>";
		}
	}
}

function averageAge() {
	userArr = JSON.parse(localStorage.getItem(dataKey));
	var sum = 0;
	for (var i = 0; i < userArr.length; i++) {
		sum += parseInt(userArr[i].age); 	
	}
			
	document.getElementById('displayAverageAge').innerHTML = sum/userArr.length;
}
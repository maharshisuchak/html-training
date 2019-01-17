var userId = 1;
var createdAt;
var user, userJsonstr;
var dataKey = 'person';
var userArr = [];
var averageOfAge = [];
var msg = 'There is no data in the localStorage.';

var personFirstNameId = 'personFirstNameId';
var personLastNameId = 'personLastNameId';
var personUserNameId = 'personUserNameId';
var personAgeId = 'personAgeId';
var displayData = 'displayData';
var display25year = 'display25year';
var totaluser = 'totaluser';
var dataWithFullName = 'dataWithFullName';
var array_after_replacing_character = 'array_after_replacing_character';
var displayAbove35year = 'displayAbove35year';
var displaybetween25to35year = 'displaybetween25to35year';
var displayAverageAge = 'displayAverageAge'; 
var display_Name_Starting_with_A = 'display_Name_Starting_with_A';
var display_Name_Which_contain_ur = 'display_Name_Which_contain_ur';
var arrayof_name_with_fixedcharacter = 'arrayof_name_with_fixedcharacter';

function checkLocalStorage(){
	let arr1 = [];
	if(localStorage.getItem(dataKey)){
		arr1 = JSON.parse(localStorage.getItem(dataKey));
		console.log(arr1);
	}
	return arr1;
}

function onKeyDown(event){
	if(event.code == 'Enter'){
		addPersonData();
	}
	console.log(event);
}

function addPersonData(){
	createdAt = new Date();
	checkUserName = false;

	var firstName = document.getElementById(personFirstNameId).value;
	var lastName = document.getElementById(personLastNameId).value;
	var	userName = document.getElementById(personUserNameId).value;
	var age =  document.getElementById(personAgeId).value;
	
	userArr= checkLocalStorage();

	if(userArr.length){
		userId = parseInt(userArr[userArr.length -1].userId) + 1;
	}

	for (var i = 0; i < userArr.length; i++){
		checkUserName = userArr[i].userName == userName;
	}

	if(!firstName){
		alert('Enter FirstName.')
	}
	else if(!lastName){
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
	}
	else{
		user = {userId,firstName,lastName,userName,age,createdAt};
			
		userArr.push(user);
		userJsonstr = JSON.stringify(userArr);
		localStorage.setItem(dataKey,userJsonstr);

		document.getElementById(personFirstNameId).value = '';
		document.getElementById(personLastNameId).value = '';
		document.getElementById(personUserNameId).value = '';
		document.getElementById(personAgeId).value = '';
	}
}

function displayPersonData() {
	document.getElementById(displayData).innerHTML = '';
	let arr = checkLocalStorage();

	if(arr.length > 0 ){
		document.getElementById(displayData).innerHTML = JSON.stringify(arr);
		//+= JSON.stringify(userArr.map(fullDetail)) 	
	}else{
		alert(msg);
	}
}

function fullDetail(item) {
	return item;
}

function age25() {
	document.getElementById(display25year).innerHTML = '';
			var age25_= userArr.filter(
			function(user){
				return user.age == 25
			}
		)
	checkLocalStorage() ? document.getElementById(display25year).innerHTML += JSON.stringify(age25_) : alert(msg);
	
}

function above35() {
	document.getElementById(displayAbove35year).innerHTML = '';
	// user flter method here as above 25 age function 

		var ageGreaterThan35 = userArr.filter(
			function(user){
				return user.age > 35
			}
		)
	checkLocalStorage() ? document.getElementById(displayAbove35year).innerHTML += JSON.stringify(ageGreaterThan35) : alert(msg);
}

// same as above rempve un-neccesary code
function above25to35() {
	document.getElementById(displaybetween25to35year).innerHTML = '';
	checkLocalStorage();
	// userArr.map(user25to35);

	var ageFrom25to34 = userArr.filter(
		function(user){
			return user.age >= 25 && user.age <= 35;
		}
	)
	checkLocalStorage() ? document.getElementById(displaybetween25to35year).innerHTML += JSON.stringify(ageFrom25to34) : alert(msg);
}

// arrayreduce function use
function averageAge() {
	document.getElementById(displayAverageAge).innerHTML = '';
	// reduce 
		var total = userArr.reduceRight(function(total, user){
			return total + Number(user.age);
		},0);
	checkLocalStorage() ? document.getElementById(displayAverageAge).innerHTML = total / userArr.length : alert(msg);
}

// filter
function nameStartig_A(){
	document.getElementById(display_Name_Starting_with_A).innerHTML = '';
	// userArr.map(nameStartingFromA);

	var userNameStartingWithA = userArr.filter(
		function(user){
			return user.firstName.indexOf('a') == 0;
		}
	)
	console.log(userNameStartingWithA);
	checkLocalStorage() ? document.getElementById(display_Name_Starting_with_A).innerHTML += JSON.stringify(userNameStartingWithA) : alert(msg);
}
// using filter and indexof
function nameContaining_ur(){
	document.getElementById(display_Name_Which_contain_ur).innerHTML = '';
		var userFirstNameContaining_ur = userArr.filter(
			function(user){
				return user.firstName.indexOf('ur') >= 0;
			}
		)
	checkLocalStorage() ? document.getElementById(display_Name_Which_contain_ur).innerHTML += JSON.stringify(userFirstNameContaining_ur) : alert(msg);
}

function namewithFixedCharacter(){
	document.getElementById(arrayof_name_with_fixedcharacter).innerHTML = '';
	checkLocalStorage() ? document.getElementById(arrayof_name_with_fixedcharacter).innerHTML += JSON.stringify(userArr.map(dataWithChangerName)) : alert(msg);
}

function dataWithChangerName(item){
	console.log(item.firstName.slice(1,4));
	item.firstName = item.firstName.slice(1,4);
	return item;
}

function nameReplaceWithanotherCharacter(){
	document.getElementById(array_after_replacing_character).innerHTML = '';
	checkLocalStorage() ? document.getElementById(array_after_replacing_character).innerHTML += JSON.stringify(userArr.map(dataWithReplacedChar)) : alert(msg);
}

function dataWithReplacedChar(item){
	item.firstName = item.firstName.replace(/[a,A]/g, 'o');
	return item;
}

function displayDataWithFullName(){
	document.getElementById(dataWithFullName).innerHTML = '';
	checkLocalStorage() ? document.getElementById(dataWithFullName).innerHTML += JSON.stringify(userArr.map(dataFullName)) : alert(msg);
}

function dataFullName(item){
	item.fullName = item.firstName.concat(' ',item.lastName);
	return item;
}

function countUser(){
	document.getElementById(totaluser).innerHTML = '';
	checkLocalStorage() ?document.getElementById(totaluser).innerHTML = userArr.length : alert(msg);
}
var userId = 1;
var createdAt;
var user, userJsonstr;
var dataKey = 'person';
var userArr = [];
var averageOfAge = [];
var msg = 'There is no data in the localStorage.';
var arr;

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
	}
	return arr1;
}

function bindHTML(elementId, functionName){
	if(arr.length > 0 ){
		document.getElementById(elementId).innerHTML += JSON.stringify(functionName) 	
	}else{
		alert(msg);
	}
}

function bindHTMLwithMap(elementId, functionName){
	if(arr.length > 0 ){
		document.getElementById(elementId).innerHTML += JSON.stringify(arr.map(functionName))
	}else{
		alert(msg);
	}
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
	
	userArr = checkLocalStorage();

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
	arr = checkLocalStorage();
	bindHTML(displayData, arr);
}

function fullDetail(item) {
	return item;
}

function age25() {
	document.getElementById(display25year).innerHTML = '';
	arr = checkLocalStorage();
	var age25_= arr.filter(
		function(user){
			return user.age == 25
		}
	)
	bindHTML(display25year,age25_);
}

function above35() {
	document.getElementById(displayAbove35year).innerHTML = '';
	// user flter method here as above 25 age function 
	arr = checkLocalStorage();
	var ageGreaterThan35 = arr.filter(
		function(user){
			return user.age > 35
		}
	)
	bindHTML(displayAbove35year,ageGreaterThan35);
}
// same as above rempve un-neccesary code
function above25to35() {
	document.getElementById(displaybetween25to35year).innerHTML = '';
	arr = checkLocalStorage();
	// userArr.map(user25to35);

	var ageFrom25to34 = arr.filter(
		function(user){
			return user.age >= 25 && user.age <= 35;
		}
	)
	bindHTML(displaybetween25to35year,ageFrom25to34);
}
// arrayreduce function use
function averageAge() {
	document.getElementById(displayAverageAge).innerHTML = '';
	arr = checkLocalStorage();
	// reduce 
		var total = arr.reduceRight(function(total, user){
			return total + Number(user.age);
		},0);
	if(arr.length > 0 ){
		document.getElementById(displayAverageAge).innerHTML = total / arr.length
	}else{
		alert(msg);
	}
}
// filter
function nameStartig_A(){
	document.getElementById(display_Name_Starting_with_A).innerHTML = '';
	arr = checkLocalStorage();
	var userNameStartingWithA = arr.filter(
		function(user){
			return user.firstName.toLowerCase().indexOf('a') == 0;
		}
	)
	bindHTML(display_Name_Starting_with_A,userNameStartingWithA);
}
// using filter and indexof
function nameContaining_ur(){
	document.getElementById(display_Name_Which_contain_ur).innerHTML = '';
	arr = checkLocalStorage();
		var userFirstNameContaining_ur = arr.filter(
			function(user){
				return user.firstName.indexOf('ur') >= 0;
			}
	)
	bindHTML(display_Name_Which_contain_ur,userFirstNameContaining_ur);
}

function namewithFixedCharacter(){
	document.getElementById(arrayof_name_with_fixedcharacter).innerHTML = '';
	arr = checkLocalStorage();
	bindHTMLwithMap(arrayof_name_with_fixedcharacter, dataWithChangerName);
}

function dataWithChangerName(item){
	item.firstName = item.firstName.slice(1,4);
	return item;
}

function nameReplaceWithanotherCharacter(){
	document.getElementById(array_after_replacing_character).innerHTML = '';
	arr = checkLocalStorage();
	bindHTMLwithMap(array_after_replacing_character, dataWithReplacedChar);
}

function dataWithReplacedChar(item){
	item.firstName = item.firstName.replace('a', 'o').replace('A','O');
	return item;
}

function displayDataWithFullName(){
	document.getElementById(dataWithFullName).innerHTML = '';
	arr = checkLocalStorage();
	bindHTMLwithMap(dataWithFullName, dataFullName);
}

function dataFullName(item){
	item.fullName = item.firstName.concat(' ',item.lastName);
	return item;
}

function countUser(){
	document.getElementById(totaluser).innerHTML = '';
	arr = checkLocalStorage();
	if(arr.length > 0 ){
		document.getElementById(totaluser).innerHTML += arr.length
	}else{
		alert(msg);
	}
}
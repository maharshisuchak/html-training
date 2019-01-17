var userId = 1;
var createdAt;
var user, userJsonstr;
var dataKey = 'person';
var userArr = [];
var averageOfAge = [];
var revisedArr = [];
var msg = 'There is no data in the localStorage.';
var dataStatus = false;

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

		// if(userArr[i].userName == userName){
		// 	checkUserName = true;
		// }

		checkUserName = userArr[i].userName == userName;

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
		// document.getElementById(personUserNameId).value = '';
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
}

function displayPersonData() {
	document.getElementById('displayData').innerHTML = '';
	checkForData();
	
	if(dataStatus) document.getElementById(displayData).innerHTML += JSON.stringify(userArr.map(fullDetail));
		
}

function fullDetail(item) {
	return item;
}

function age25() {
	document.getElementById('display25year').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		// userArr.map(userAbove25);
		var age25_= userArr.filter(
			function(user){
				return user.age == 25
			}
		)
		document.getElementById('display25year').innerHTML += JSON.stringify(age25_);
	}else{
		alert(msg);
	}
}

// function userAbove25(item, index) {
// 	if(item.age == 25){
// 		revisedArr.push(item);
// 	}
// }

function above35() {
	document.getElementById('displayAbove35year').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(userAbove35); // user flter method here as above 25 age function 
		document.getElementById('displayAbove35year').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}
// remove this function 
function userAbove35(item, index) {
	if(item.age > 35){
		revisedArr.push(item);
	}
}


// same as above rempve un-neccesary code
function above25to35() {
	document.getElementById('displaybetween25to35year').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(user25to35);
		document.getElementById('displaybetween25to35year').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function user25to35(item, index) {
	if(item.age >= 25 && item.age < 35){
		revisedArr.push(item);
	}
}


// arrayreduce function use
function averageAge() {
	document.getElementById('displayAverageAge').innerHTML = '';
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		// reduce 
		document.getElementById('displayAverageAge').innerHTML = userArr.map(ageAverage).reduceRight(getSum) / userArr.length;
	}else{
		alert(msg);
	}
}
// rmv
function ageAverage(item, index) {
	return parseInt(item.age);
}

// update this function with user object and try to add user age from user.age
function getSum(total, num) {
	return total + num;
}

// filter
function nameStartig_A(){
	document.getElementById('display_Name_Starting_with_A').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(nameStartingFromA);
		document.getElementById('display_Name_Starting_with_A').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function nameStartingFromA(item, index){
	var nameWithA =  [item.firstName].toString().toLowerCase() ;
	console.log(nameWithA);

// filter method use which will return true if index of 'a' is 0
	// use index of 
	if(nameWithA.charAt(0) == 'a'){
		revisedArr.push(item);
	}
}


// using filter and indexof
function nameContaining_ur(){
	document.getElementById('display_Name_Which_contain_ur').innerHTML = '';
	revisedArr = [];

	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(namecontain_ur);
		document.getElementById('display_Name_Which_contain_ur').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

// remove unnecessary code
function namecontain_ur(item, index){
	var nameContainUr = [item.firstName].toString().toLowerCase();
	var patt = /(ur)/;

	if(nameContainUr.match(patt)){
		revisedArr.push(item);
	}
}


//
function namewithFixedCharacter(){
	document.getElementById('arrayof_name_with_fixedcharacter').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(dataWithChangerName);
		document.getElementById('arrayof_name_with_fixedcharacter').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function dataWithChangerName(item, index){
	
	var nameFirst = [item.firstName].toString();
	console.log(nameFirst.slice(1,4));
	item.firstName = nameFirst.slice(1,4);
	return item;
}

function nameReplaceWithanotherCharacter(){
	document.getElementById('array_after_replacing_character').innerHTML = '';
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(dataWithReplacedChar);
		document.getElementById('array_after_replacing_character').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function dataWithReplacedChar(item, index){

	var nameOld = [item.firstName].toString();	
	item.firstName = nameOld.replace(/[a,A]/g, 'o');
	return(item);
}

function displayDataWithFullName(){
	document.getElementById('dataWithFullName').innerHTML = '';
	revisedArr = [];
	// checkForData();
	
	if(checkForData()){

		userArr.map(dataFullName);
		document.getElementById('dataWithFullName').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
	/*if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		userArr.map(dataFullName);
		document.getElementById('dataWithFullName').innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}*/
}

function dataFullName(item, index){
	var fName = [item.firstName].toString();
	var lName = [item.lastName].toString();

	item.fullName = fName.concat(' ',lName);
	return item;
}

function countUser(){
	document.getElementById(totaluser).innerHTML = '';
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		document.getElementById(totaluser).innerHTML = userArr.length;
	}else{
		alert(msg);
	}
}

function checkForData(){
	if(localStorage.getItem(dataKey)){
		userArr = JSON.parse(localStorage.getItem(dataKey));
		return true;
	}
}
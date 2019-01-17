var userId = 1;
var createdAt;
var user, userJsonstr;
var dataKey = 'person';
var userArr = [];
var averageOfAge = [];
var revisedArr = [];
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
var msg = 'There is no data in the localStorage.';

var checkStorage = localStorage.getItem(dataKey);
var jsonparse = JSON.parse(localStorage.getItem(dataKey));

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
	
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
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
		document.getElementById(personUserNameId).value = '';
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
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		document.getElementById(displayData).innerHTML += JSON.stringify(userArr.map(fullDetail));
	}else{
		alert(msg);
	}	
}

function fullDetail(item, index) {
	return item;
}

function age25() {
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(userAbove25);
		document.getElementById(display25year).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function userAbove25(item, index) {
	if(item.age == 25){
		revisedArr.push(item);
	}
}

function above35() {
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(userAbove35);
		document.getElementById(displayAbove35year).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function userAbove35(item, index) {
	if(item.age > 35){
		revisedArr.push(item);
	}
}

function above25to35() {
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(user25to35);
		document.getElementById(displaybetween25to35year).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function user25to35(item, index) {
	if(item.age >= 25 && item.age < 35){
		revisedArr.push(item);
	}
}

function averageAge() {
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		document.getElementById(displayAverageAge).innerHTML = userArr.map(ageAverage).reduceRight(getSum) / userArr.length;
	}else{
		alert(msg);
	}
}

function ageAverage(item, index) {
	return parseInt(item.age);
}

function getSum(total, num) {
	return total + num;
}

function nameStartig_A(){
	revisedArr = [];

	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(nameStartingFromA);
		document.getElementById(display_Name_Starting_with_A).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function nameStartingFromA(item, index){
	var nameWithA =  [item.firstName].toString().toLowerCase() ;
	console.log(nameWithA);

	if(nameWithA.charAt(0) == 'a'){
		revisedArr.push(item);
	}
}

function nameContaining_ur(){
	revisedArr = [];

	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(namecontain_ur);
		document.getElementById(display_Name_Which_contain_ur).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function namecontain_ur(item, index){
	var nameContainUr = [item.firstName].toString().toLowerCase();
	var patt = /(ur)/;

	if(nameContainUr.match(patt)){
		revisedArr.push(item);
	}
}

function namewithFixedCharacter(){
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(dataWithChangerName);
		document.getElementById(arrayof_name_with_fixedcharacter).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function dataWithChangerName(item, index){
	var nameFirst = [item.firstName].toString();
	console.log(nameFirst.slice(1,4));
	item.firstName = nameFirst.slice(1,4);
	revisedArr.push(item);
}

function nameReplaceWithanotherCharacter(){
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(dataWithReplacedChar);
		document.getElementById(array_after_replacing_character).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function dataWithReplacedChar(item, index){
	var nameOld = [item.firstName].toString();	
	item.firstName = nameOld.replace(/[a,A]/g, 'o');
	revisedArr.push(item);
}

function dataWithFullName(){
	revisedArr = [];
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		userArr.map(dataFullName);
		document.getElementById(dataWithFullName).innerHTML += JSON.stringify(revisedArr);
	}else{
		alert(msg);
	}
}

function dataFullName(item, index){
	var fName = [item.firstName].toString();
	var lName = [item.lastName].toString();

	item.fullName = fName.concat(' ',lName);
	revisedArr.push(item);	
}

function countUser(){
	if(localStorage.getItem(dataKey)){
		userArr = jsonparse;
		document.getElementById(totaluser).innerHTML = userArr.length;
	}else{
		alert(msg);
	}
}
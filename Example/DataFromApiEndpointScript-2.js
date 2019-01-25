const url = 'https://jsonplaceholder.typicode.com/posts/';
var method = 'GET';
var receivedResponse = '';
var responseAfterRemoveData = '';

const xhr = new XMLHttpRequest;

createConnection(method);
loadData();

onKeyDown = (event) => {
	if(event.code == 'Enter'){
		addDataInApi();
	}
}

function cutTheString(stringType, string, from, to){
	if(stringType == 'title'){
		if(string.length > 20){
			return string.slice(from,to) + '...';
		}
		else{
			return string;
		}
	}
	if(stringType == 'body'){
		if(string.length > 50){
			return string.slice(from,to) + '...';
		}
		else{
			return string;
		}
	}
}

function displayData(responseForDisplay){
	var receivedData = '';
	let dataInTableFormet = `<table id='table_dataFrom_api' width=100%>
							 <caption>Data fromom Api-Endpoint</caption>
							 <tr>
							 <th> User Id </th>
							 <th> Id </th>
							 <th> Title </th>
							 <th> Body </th>
							 <th colspan='2'> Action </th>
							 </tr>`;

	for(var i=0; i<responseForDisplay.length; i++){		
		receivedData += `<tr>
						 <td>${responseForDisplay[i].userId}</td>
						 <td>${responseForDisplay[i].id}</td>
						 <td class='title_txt'>${responseForDisplay[i].title}</td>
						 <td class='body_txt'>${responseForDisplay[i].body}</td>
						 <td><button onclick='updateDataInApi(${responseForDisplay[i].id})'>Update</button></td>
						 <td><button onclick='removeDataFromApi(${responseForDisplay[i].id})'>Remove</<button></td>
						 </tr>`;
	}

	dataInTableFormet += receivedData;
	dataInTableFormet += '</table>'
	document.getElementById('div_for_datain_table').innerHTML = dataInTableFormet;
}

function addDataInApi(){
	var newDataObj = {};
	var addDataUrl = '';
	var checkForAddUpdate = document.getElementById('save_update_button').value;

	if(checkForAddUpdate > 0){
		method = 'PUT';
		addDataUrl = url + checkForAddUpdate;
	}
	else{
		method = 'POST';
		addDataUrl = url;
	}

	document.getElementById('save_update_button').innerHTML = 'Save Data'; 
	createConnection(method, addDataUrl);

	xhr.onload = () => {
		var response = JSON.parse(xhr.response);

		console.log(response);
		var userDataForUpdate = receivedResponse.filter((user) => {
			if(user.id == response.id){
				return user;
			}
		});

		var findIndex = receivedResponse.findIndex((user) => {
			return user.id == response.id;
		});


		if(userDataForUpdate.length){
			receivedResponse[findIndex].userId = document.getElementById('newData_userId').value;
			receivedResponse[findIndex].title = document.getElementById('newData_title').value;
			receivedResponse[findIndex].body = document.getElementById('newData_body').value;
		}
		else{

			newDataObj.userId = parseInt(document.getElementById('newData_userId').value);
			newDataObj.id = response.id;
			newDataObj.title = document.getElementById('newData_title').value;
			newDataObj.body = document.getElementById('newData_body').value;

			receivedResponse.push(newDataObj);
		}
		
		document.getElementById('newData_userId').value = '';
		document.getElementById('newData_title').value = '';
		document.getElementById('newData_body').value = '';

		document.getElementById('save_update_button').value = 0;
		displayData(receivedResponse);
	}
	xhr.send();
}

function updateDataInApi(idForUpdate){
	document.getElementById('newData_section').style.display = 'block';
	document.getElementById('addDataButton').innerHTML = 'Hide Block';
	method = 'GET';
	let updateUrl = url
	updateUrl += idForUpdate;

	createConnection(method, updateUrl);
	xhr.onload = () =>{
		var receivedObject = JSON.parse(xhr.response);

		document.getElementById('newData_userId').value = receivedObject.userId;
		document.getElementById('newData_title').value = receivedObject.title;		
		document.getElementById('newData_body').value = receivedObject.body;

		document.getElementById('save_update_button').innerHTML = 'Update Data';
		document.getElementById('save_update_button').value = receivedObject.id;
	}
	xhr.send();
}

function removeDataFromApi(idFroRemove){
	method = 'DELETE';
	let removeUrl = url
	removeUrl += idFroRemove;

	createConnection(method, removeUrl);
	xhr.onload = () => {

		var currentUserIndex = receivedResponse.findIndex((element)=>{
			return element.id == idFroRemove;
		});

		var msg_confirmbox = 'Are you really want to Remove : ' + receivedResponse[currentUserIndex].title;
		var confirm_remove_user = confirm(msg_confirmbox);
		if(confirm_remove_user){
			responseAfterRemoveData = responseAfterRemoveData.filter((user) => {
				if(user.id != idFroRemove){
					return user;
				}
			});
			displayData(responseAfterRemoveData);
		}		
	}
	xhr.send();
}

function createConnection(methodForInteraction, newUrl){
	xhr.open(methodForInteraction, newUrl, true);
}

function loadData(){
	xhr.open('GET', url, true)
	xhr.onload = () => {
		receivedResponse = JSON.parse(xhr.response);
		responseAfterRemoveData = receivedResponse;

		var newResponse = receivedResponse.map((responseFromApi) => {
			responseFromApi.title = cutTheString('title', responseFromApi.title, 0, 20);
			responseFromApi.body = cutTheString('body', responseFromApi.body, 0, 50);
			return responseFromApi;
		});
		displayData(newResponse);
	}
	xhr.send();
}

function toggleInputSection(){
	var displaySection = document.getElementById('newData_section');
	var hideSection = document.getElementById('addDataButton');

	if(displaySection.style.display === 'none'){
		displaySection.style.display = 'block'
		hideSection.innerHTML = 'Hide Block'
	}
	else{
		displaySection.style.display = 'none';
		hideSection.innerHTML = 'Add Data';
	}
}
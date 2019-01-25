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

function createConnection(methodForInteraction, newUrl){
	xhr.open(methodForInteraction, newUrl, true);
}

function loadData(){
	xhr.open('GET', url, true)
	xhr.onload = () => {
		receivedResponse = JSON.parse(xhr.response);
		responseAfterRemoveData = receivedResponse;

		displayData(receivedResponse);
	}
	xhr.send();
}

function displayData(responseForDisplay){
	let receivedData = '';

	let newResponse = responseForDisplay.map((responseFromApi) => {
			responseFromApi.title = cutTheString('title', responseFromApi.title, 0, 20);
			responseFromApi.body = cutTheString('body', responseFromApi.body, 0, 50);
			return responseFromApi;
		});

	let dataInTableFormet = `<table id='table_dataFrom_api' width=100%>
							 <caption>Data fromom Api-Endpoint</caption>
							 <tr>
							 <th> User Id </th>
							 <th> Id </th>
							 <th> Title </th>
							 <th> Body </th>
							 <th colspan='2'> Action </th>
							 </tr>`;

	for(let i=0; i<newResponse.length; i++){		
		receivedData += `<tr>
						 <td>${newResponse[i].userId}</td>
						 <td>${newResponse[i].id}</td>
						 <td class='title_txt'>${newResponse[i].title}</td>
						 <td class='body_txt'>${newResponse[i].body}</td>
						 <td><button onclick='updateDataInApi(${newResponse[i].id})'>Update</button></td>
						 <td><button onclick='removeDataFromApi(${newResponse[i].id})'>Remove</<button></td>
						 </tr>`;
	}

	dataInTableFormet += receivedData;
	dataInTableFormet += '</table>'
	document.getElementById('div_for_datain_table').innerHTML = dataInTableFormet;
}

function addDataInApi(){
	let newDataObj = {};
	let addDataUrl = '';
	let checkForAddUpdate = document.getElementById('save_update_button').value;

	if(checkForAddUpdate > 0){
		method = 'PUT';
		addDataUrl = url + checkForAddUpdate;
	}
	else{
		method = 'POST';
		addDataUrl = url;
	}
 
	createConnection(method, addDataUrl);

	xhr.onload = () => {
		let response = JSON.parse(xhr.response);

		let updatedUserId = document.getElementById('newData_userId').value;
		let updatedTitle = document.getElementById('newData_title').value;
		let updatedBody = document.getElementById('newData_body').value;
		let userDataForUpdate = receivedResponse.filter((user) => {
			if(user.id == response.id){
				return user;
			}
		});

		let findIndex = receivedResponse.findIndex((user) => {
			return user.id == response.id;
		});


		if(!updatedUserId){
			alert('Please Enter userId.')
		}
		else if(!updatedTitle){
			alert('Please Enter title.')
		}
		else if(!updatedBody){
			alert('Please Enter Body.')
		}
		else{
			if(userDataForUpdate.length){
				receivedResponse[findIndex].userId = updatedUserId;
				receivedResponse[findIndex].title = updatedTitle;
				receivedResponse[findIndex].body = updatedBody;
			}
			else{
				newDataObj.userId = parseInt(updatedUserId);
				newDataObj.id = response.id;
				newDataObj.title = updatedTitle;
				newDataObj.body = updatedBody;
			
				receivedResponse.push(newDataObj);
			}
			document.getElementById('newData_userId').value = '';
			document.getElementById('newData_title').value = '';
			document.getElementById('newData_body').value = '';
			document.getElementById('save_update_button').value = 0;
			document.getElementById('save_update_button').innerHTML = 'Save Data';
			displayData(receivedResponse);
		}
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
		let receivedObject = JSON.parse(xhr.response);

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
		let currentUserIndex = receivedResponse.findIndex((element)=>{
			return element.id == idFroRemove;
		});

		let msg_confirmbox = 'Are you really want to Remove : ' + receivedResponse[currentUserIndex].title;
		let confirm_remove_user = confirm(msg_confirmbox);
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

function toggleInputSection(){
	let displaySection = document.getElementById('newData_section');
	let hideSection = document.getElementById('addDataButton');

	if(displaySection.style.display === 'none'){
		displaySection.style.display = 'block'
		hideSection.innerHTML = 'Hide Block'
	}
	else{
		displaySection.style.display = 'none';
		hideSection.innerHTML = 'Add Data';
	}
}
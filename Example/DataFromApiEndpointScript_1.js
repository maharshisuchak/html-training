const xhr = new XMLHttpRequest;
const url = 'https://jsonplaceholder.typicode.com/posts';
var receivedResponse = [];



xhr.open('GET', url, true);
xhr.onload = () => {
	receivedResponse = JSON.parse(xhr.response);
	var receivedData = '';

	var newResponse = receivedResponse.map((responseFromApi) => {
		responseFromApi.title = cutTheString('title', responseFromApi.title, 0, 20);
		responseFromApi.body = cutTheString('body', responseFromApi.body, 0, 50);
		return responseFromApi;
	});

	let dataInTableFormet = `<table id='table_dataFrom_api' width=100%>
							 <caption>Data Frrom Api-Endpoint</caption>
							 <tr>
							 <th> User Id </th>
							 <th> Id </th>
							 <th> Title </th>
							 <th> Body </th>
							 </tr>`;

	for(var i=0; i<newResponse.length; i++){		
		receivedData += `<tr>
						 <td>${newResponse[i].userId}</td>
						 <td>${newResponse[i].id}</td>
						 <td class='title_txt'>${newResponse[i].title}</td>
						 <td class='body_txt'>${newResponse[i].body}</td>
						 </tr>`;
	}

	dataInTableFormet += receivedData;
	dataInTableFormet += '</table>'

	document.getElementById('div_for_datain_table').innerHTML = dataInTableFormet;
}
xhr.send();

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
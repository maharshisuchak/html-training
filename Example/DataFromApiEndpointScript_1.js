const xhr = new XMLHttpRequest;
const url = 'https://jsonplaceholder.typicode.com/posts';
var receivedResponse = [];

xhr.open('GET', url, true);
xhr.onload = () => {
	receivedResponse = JSON.parse(xhr.response);
	var receivedData = '';

	var newResponse = receivedResponse.map((responseFromApi) => {
		if(responseFromApi.title.length > 20){
			responseFromApi.title = responseFromApi.title.slice(0,20) + '...';
		}
		if(responseFromApi.body.length > 30){
			responseFromApi.body = responseFromApi.body.slice(0,30) + '...';
		}
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
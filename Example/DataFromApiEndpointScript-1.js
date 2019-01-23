const xhr = new XMLHttpRequest();
const url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
var receivedResponse = [];

xhr.open('GET', url, true);
xhr.onload = () => {
	receivedResponse = JSON.parse(xhr.response);
	var receivedData = '';

	var newResponse = receivedResponse.map((mapResponse) => {
		if(mapResponse.name.length > 20){
			mapResponse.name = mapResponse.name.slice(0,20) + '...';
		}
		if(mapResponse.body.length > 50){
			mapResponse.body = mapResponse.body.slice(0,50) + '...';
		}
		return mapResponse;
	});

	let dataInTableFormet = `<table id='table_dataFrom_api' width=100%>
							 <caption>Data Frrom Api-Endpoint</caption>
							 <tr>
							 <th> Post Id </th>
							 <th> Id </th>
							 <th> Name </th>
							 <th> Email </th>
							 <th> Body </th>
							 </tr>`;

	for(var i=0; i<newResponse.length; i++){		
		receivedData += `<tr>
						 <td>${newResponse[i].postId}</td>
						 <td>${newResponse[i].id}</td>
						 <td>${newResponse[i].name}</td>
						 <td>${newResponse[i].email}</td>
						 <td class='body_txt'>${newResponse[i].body}</td>
						 </tr>`;
	}

	dataInTableFormet += receivedData;
	dataInTableFormet += '</table>'

	document.getElementById('div_for_datain_table').innerHTML = dataInTableFormet;
};
xhr.send();
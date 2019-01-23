const xhr = new XMLHttpRequest;
const url = 'https://jsonplaceholder.typicode.com/posts';
var receivedResponse = [];

xhr.open('GET', url, true);
xhr.onload = () => {
	receivedResponse = JSON.parse(xhr.response);
	var receivedData = '';

	let dataInTableFormet = `<table id='table_dataFrom_api' width=100%>
							 <caption>Data Frrom Api-Endpoint</caption>
							 <tr>
							 <th> User Id </th>
							 <th> Id </th>
							 <th> Title </th>
							 <th> Body </th>
							 </tr>`;

	for(let i=0; i<receivedResponse.length; i++){
		receivedData += `<tr>
						 <td>${receivedResponse[i].userId}</td>
						 <td>${receivedResponse[i].id}</td>
						 <td>${receivedResponse[i].title}</td>
						 <td>${receivedResponse[i].body}</td>
						 </tr>`;
	}

	dataInTableFormet += receivedData;
	dataInTableFormet += '</table>'

	document.getElementById('div_for_datain_table').innerHTML = dataInTableFormet;
}
xhr.send();
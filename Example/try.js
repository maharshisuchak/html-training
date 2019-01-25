var url = "hhttps://jsonplaceholder.typicode.com/posts/";
var xhr = new XMLHttpRequest();
xhr.open("DELETE", url+'/12', true);
xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	console.log(users);
}

xhr.send();
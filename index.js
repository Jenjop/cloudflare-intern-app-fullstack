addEventListener('fetch', event => {
	let x = event.respondWith(handleRequest(event.request))
	// console.log(x)
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	const url = 'https://cfw-takehome.developers.workers.dev/api/variants'

	let response = fetch(url)

	console.log("Response: " + response)
	return fetchRequest

	console.log(fetchRequest.json())

	fetch(url)
	.then(response => response.json())
	.then(data => console.log(data))

	fetch(url).then(response => console.log(response.status))

	fetch(url).then(
		console.log('pre'),
		response => {
			console.log('pre-in')
			console.log('post-in')
		},
		console.log('post')
	)


	// fetch(url)
	// 	.then((response) => {

	// 		console.log('1 response');
	// 		return response.json();
	// 	},console.log('1'))
	// 	.then((data) => {
	// 		console.log(data);
	// 	}, console.log('2'));

	// fetch(url).then(
	// 	function(response){
	// 		console.log("Fetch Function")
	// 		if (response.status !==200){
	// 			console.log("Problem: " + response.status);
	// 			return;
	// 		}
	// 		response.json().then(function(data){
	// 			console.log("Data")
	// 			console.log(data);
	// 		});
	// 	},
	// 	console.log('Fetch Then')
	// )
	// .catch(function(err) {
	// 	console.log("Fetch Error :-S", err);
	// })

	// console.log("Filter Requests")
	// let response
	// console.log(request)
	// console.log(request.method)
	// if (request.method === 'POST') {
	// 	response = await generate(request)
	// } else {
	// 	response = new Response('Expected POST', {status: 500})
	// }
	// console.log(response)
	// return response


 	return new Response('Hello worker!', {
	    headers: { 'content-type': 'text/plain' },
  	})
}

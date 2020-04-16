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

	// let response = await fetch(url).then(res => {return res})
	// console.log("Response: " + response)
	// console.log("Status: " + response.status)
	// let j = await response.json()
	// console.log('Variants: ' + j['variants'])
	// const variants = j['variants']
	// const variant = variants[Math.floor(Math.random() * variants.length)]
	// return fetch(variant)

	let response = await fetch(url).then(res => res.json())
	const variants = response['variants']
	const ind = Math.floor(Math.random() * variants.length)
	console.log('Random Index: ' + ind)
	let variant = variants[ind]
	return fetch(variant)



 	// return new Response('Hello worker!', {
	 //    headers: { 'content-type': 'text/plain' },
  // 	})
}


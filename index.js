var ind

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
	ind = Math.floor(Math.random() * variants.length)
	console.log('Random Index: ' + ind)
	let variant = variants[ind]
	let variant_response = await fetch(variant)
	return new HTMLRewriter()
	.on('title', new PageTitleHandler())
	.on('h1#title', new MainTitleHandler())
	.on('p#description', new DescriptionHandler())
	.on('a#url', new LinkHandler())
	.transform(variant_response)
	return fetch(variant)



 	// return new Response('Hello worker!', {
	 //    headers: { 'content-type': 'text/plain' },
  // 	})
}


class PageTitleHandler {
	element(element){
		console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('Custom Title!')
	}
}

class MainTitleHandler {
	element(element){
		console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent(`Welcome To The ${ind? 'Green' : 'Blue'} Variant!`)
	}
}

class DescriptionHandler {
	element(element){
		console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('There Is No Description')
	}
}

class LinkHandler {
	element(element){
		console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('Go to my ~GitHub~')
		element.setAttribute('href', 'https://github.com/jenjop')
		element.setAttribute('target', '_blank')
	}
}
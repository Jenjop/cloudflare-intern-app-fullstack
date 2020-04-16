var ind = -1

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

	const cookie = getCookie(request, 'ind')
	if (cookie){
		console.log(cookie)
		ind = cookie
	}
	else {
		ind = Math.floor(Math.random() * variants.length)
		response = new Response(response.body, response)
		response.headers.set('Set-Cookie', `ind=${ind}`)
		console.log('\n\nNEWW\n\n')
		console.log(request.headers.get('Cookie'))
		console.log('New Cookie' + ind)
	}


	// if (ind == -1){
	// 	ind = Math.floor(Math.random() * variants.length)
	// 	document.cookie = `${ind}`
	// }
	// else{
	// 	console.log(document.cookie)
	// 	let cookiearray = document.cookie.split(';')
	// }



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
		element.setInnerContent('There is no description. This is not a plug.')
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

function getCookie(request, name) {
	let result = null
	let cookieString = request.headers.get('Cookie')
	console.log(cookieString)
	if (cookieString){
		let cookies = cookieString.split(';')
		cookies.forEach(cookie => {
			let cookieName = cookie.split('=')[0].trim()
			if (cookieName === name){
				let cookieVal = cookie.split('=')[1]
				result = cookieVal
			}
		})
	}
	return result
}

// function saveCookie(request, name, value)
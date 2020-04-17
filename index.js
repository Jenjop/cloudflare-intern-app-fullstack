// var ind = -1 //To be used for HTMLRewriter
var variant

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	// console.log("~~BEGIN~~")
	const url = 'https://cfw-takehome.developers.workers.dev/api/variants'

	let response = await fetch(url).then(res => res.json()) //Fetch from url
	const variants = response['variants']

	//Use saved variant from cookie if available
	let cook = null
	const cookie = getCookie(request, 'variant')
	if (cookie){
		console.log('Found Cookie: ' + cookie)
		variant = cookie
	}
	else {
		ind = Math.floor(Math.random() * variants.length)
		variant = variants[ind]
		cook = `variant=${variant};Expires=Wed, 22 Apr 2020 00:00:00 GMT; Path='/'`
		console.log('New Cookie: ' + cook)
	}

	//Fetch from the picked variant
	let variant_response = await fetch(variant)

	//Replace/rewrite html fetched
	let r = new HTMLRewriter()
	.on('title', new PageTitleHandler())
	.on('h1#title', new MainTitleHandler())
	.on('p#description', new DescriptionHandler())
	.on('a#url', new LinkHandler())
	.transform(variant_response)

	if (cook){//If cookie was found, save cookie for next time
		r = new Response(r.body, r)
		r.headers.set('Set-Cookie', cook)
	}

	return r
	// return fetch(variant)
}


class PageTitleHandler {
	element(element){
		// console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('Custom Title!')
	}
}

class MainTitleHandler {
	element(element){
		// console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent(`Welcome To The ${variant == 'https://cfw-takehome.developers.workers.dev/variants/1'? 'Blue' : 'Green'} Variant!`)
	}
}

class DescriptionHandler {
	element(element){
		// console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('There is no description. This is not a plug.')
	}
}

class LinkHandler {
	element(element){
		// console.log(`Incoming Element: ${element.tagName}`)
		element.setInnerContent('Go to my ~GitHub~')
		element.setAttribute('href', 'https://github.com/jenjop')
		element.setAttribute('target', '_blank')
	}
}

function getCookie(request, name) {
	// console.log("Get Cookie-S")
	let result = null
	let cookieString = request.headers.get('Cookie')
	if (cookieString){
		let cookies = cookieString.split(';')
		cookies.forEach(cookie => {
			let cookieName = cookie.split('=')[0].trim()
			if (cookieName === name){
				let cookieVal = cookie.split('=')[1]
				result = cookieVal
			}
			// console.log('    ' + cookieName)
		})
	}
	// console.log("Get Cookie-E")
	return result
}
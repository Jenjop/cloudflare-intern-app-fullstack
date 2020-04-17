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
	// console.log("~~BEGIN~~")
	const url = 'https://cfw-takehome.developers.workers.dev/api/variants'

	// let response = await fetch(url).then(res => {return res})
	// console.log("Response: " + response)
	// console.log("Status: " + response.status)
	// let j = await response.json()
	// console.log('Variants: ' + j['variants'])
	// const variants = j['variants']
	// const variant = variants[Math.floor(Math.random() * variants.length)]
	// return fetch(variant)

	// let r = await fetch(request)
	// const cooks = `rand=hello; Expires=Wed, 22 Apr 2020 00:0:00 GMT; Path='Derp'`
	// r = new Response(r.body, r)
	// r.headers.set('Set-Cookie', cooks)

	// return r

	let response = await fetch(url).then(res => res.json()) //Fetch from url
	// let res = await fetch(url)
	// let response = await res.json()
	const variants = response['variants']



	//Use saved variant from cookie if available

	let cook = null
	const cookie = getCookie(request, 'ind')
	if (cookie){
		console.log('Found Cookie: ' + cookie)
		ind = cookie
	}
	else {
		ind = Math.floor(Math.random() * variants.length)
		cook = `ind=${ind};Expires=Wed, 22 Apr 2020 00:00:00 GMT; Path='/'`
		console.log('New Cookie: ' + cook)
	}


	//ind = Math.floor(Math.random() * variants.length)


	//Fetch from the picked variant
	// console.log('Random Index: ' + ind)
	let variant = variants[ind]
	let variant_response = await fetch(variant)

	//Replace/rewrite html fetched
	let r = new HTMLRewriter()
	.on('title', new PageTitleHandler())
	.on('h1#title', new MainTitleHandler())
	.on('p#description', new DescriptionHandler())
	.on('a#url', new LinkHandler())
	.transform(variant_response)

	if (cook){
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
		element.setInnerContent(`Welcome To The ${ind? 'Green' : 'Blue'} Variant!`)
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
// function getCookie(request, name) {
//   let result = null
//   let cookieString = request.headers.get('Cookie')
//   if (cookieString) {
//     let cookies = cookieString.split(';')
//     cookies.forEach(cookie => {
//       let cookieName = cookie.split('=')[0].trim()
//       if (cookieName === name) {
//         let cookieVal = cookie.split('=')[1]
//         result = cookieVal
//       }
//     })
//   }
//   return result
// }

// function saveCookie(request, name, value)
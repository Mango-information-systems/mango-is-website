/******************************************
 * 
 * PullReceipt landing page
 * 
 * * display mailChimp subscription form on click
 * * track selected plans
 * 
 * Display of mailchimp popup on click based on comments in https://gist.github.com/scottmagdalein/259d878ad46ed6f2cdce
 * 
 * ***************************************/

// following may be moved to a separate module, should it be needed in a separate page
let modal = require('@yuanqing/modal')

// setup modal options
let opts = {
	showSelector: '.dummy' // selector to show modal set separately below (in order to process click on 'a' links and have support for fallback in case js is disabled
	, hideSelector: '.js-modal-hide'
	, dialogSelector: '.modal__dialog'
	, fade: {
	  duration: '.2s'
	  , timingFunction: 'ease'
	}
}

// select moal DOM element
let elem = document.querySelector('.modal')

// initialize modal
let m = modal(elem, opts)



// bind modal display to CTA clicks
document.getElementsByClassName('cta')

let ctas = document.getElementsByClassName('cta')

for (let i = 0; i < ctas.length; i++) {
	
	ctas[i].addEventListener('click', function(e){
		
		e.preventDefault()
		e.stopPropagation()
		
		m.show()
		
		return false
	})
	
}


document.getElementById('form-submit').addEventListener('click', function(e){
		
	e.preventDefault()
	e.stopPropagation()
	
	if (document.getElementById('mce-EMAIL').validity.valid) {
	
		document.getElementById('mc-embedded-subscribe-form').submit()
		
		m.hide()
	}
	else {
		document.getElementById('mce-EMAIL').classList.add('has-error')
		document.getElementById('mce-error-response').innerHTML = 'Please enter a valid email address'
		
	}
	
	
	return false
})

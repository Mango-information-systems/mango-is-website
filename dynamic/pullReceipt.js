/******************************************
 * 
 * PullReceipt landing page
 * 
 * * display mailChimp subscription form on click
 * * track selected plans (record a custom pageview)
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

// select modal DOM element
let elem = document.querySelector('.modal')

// initialize modal
let m = modal(elem, opts)


// bind modal display to CTA clicks
let ctas = document.getElementsByClassName('pricing-cta')

for (let i = 0; i < ctas.length; i++) {
	
	ctas[i].addEventListener('click', function(e){

		 // lookup the selected plan
		 var trg = e.target.getAttribute('data-trg') || '/pullReceipt-not-set'
		 
		//~ console.log('cta click target', trg)
		
		// fill up 'plan' field in mailChimp form
		switch(trg) {
			case '/pullReceipt-small':
				document.getElementById('mce-PLAN').value = 'small'
			break
			case '/pullReceipt-medium':
				document.getElementById('mce-PLAN').value = 'medium'
			break
			case '/pullReceipt-large':
				document.getElementById('mce-PLAN').value = 'large'
			break
			default:
				document.getElementById('mce-PLAN').value = 'unknown'
			break
		}
		 
		// record custom pageview
		gaCustom.toGa('pageview', {page: trg})


		m.show()
		
		e.preventDefault()
		e.stopPropagation()
		
		return false
	})
	
}


document.getElementById('form-submit').addEventListener('click', function(e){
		
		 
	// record custom pageview
	gaCustom.toGa('pageview', {page: '/pullReceipt-subscribe-attempt'})
	
	if (document.getElementById('mce-EMAIL').validity.valid) {
	
		document.getElementById('mc-embedded-subscribe-form').submit()
		
		// record custom pageview
		gaCustom.toGa('pageview', {page: '/pullReceipt-subscribe'})
		
		m.hide()
	}
	else {
		//submitted form is invalid
		document.getElementById('mce-EMAIL').classList.add('has-error')
		document.getElementById('mce-error-response').innerHTML = 'Please enter a valid email address'
		
		// record error event
		gaCustom.toGa('exception', {description: 'invalid email typed during pullReceipt form submission'})
		
	}
	
	e.preventDefault()
	e.stopPropagation()
	
	
	return false
})

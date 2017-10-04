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

var modal = require('@yuanqing/modal')


var elem = document.querySelector('.modal')


var opts = {
	showSelector: '.dummy'
	, hideSelector: '.js-modal-hide'
	, dialogSelector: '.modal__dialog'
	, fade: {
	  duration: '.2s'
	  , timingFunction: 'ease'
	}
}


var m = modal(elem, opts)




document.getElementsByClassName('cta')



var ctas = document.getElementsByClassName('cta')

for (var i = 0; i < ctas.length; i++) {
	
	ctas[i].addEventListener('click', function(e){
		
		e.preventDefault()
		e.stopPropagation()
		
		m.show()
		
		return false
	})
	
}

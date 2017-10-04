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

// load mailchimp embed script in the page
// done in javascript in order to have it done asynchronously
// free trial links load contact page whenever this does not work
var chimpPopupLoader = document.createElement('script')
chimpPopupLoader.src = '//downloads.mailchimp.com/js/signup-forms/popup/embed.js'
chimpPopupLoader.setAttribute('data-dojo-config', 'usePlainJson: true, isDebug: false')

document.body.appendChild(chimpPopupLoader)






// display mailChimp popup
function showMailingPopUp() {
	
    require(['mojo/signup-forms/Loader'], function(L) { L.start({'baseUrl':'mc.us16.list-manage.com','uuid':'a27b17b4350acdfeb2df9c9c6','lid':'c59f539df6'}) })
	console.log('popup should be displayed')
	
    document.cookie = 'MCPopupClosed=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;'
}

// listen to clicks on the CTA buttons once the mailchimp script is loaded
document.addEventListener('DOMContentLoaded', function() {
	
	var ctas = document.getElementsByClassName('cta')
	
	for (var i = 0; i < ctas.length; i++) {
		
		ctas[i].addEventListener('click', function(e){
			
			e.preventDefault()
			e.stopPropagation()
			
			showMailingPopUp()
			
			return false
		})
		
	}
})

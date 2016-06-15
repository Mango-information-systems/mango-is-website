window.appDebug = require('debug')

var debug = window.appDebug('contact')
	, formToObj = require('form-to-obj')

/**
* Contact form management
* 
* @param {object} app: the application object
* 
* @constructor
* 
*/
function Contact(app) {
	
	var self = this
	
	this.form = document.getElementById('contact-form')
	
	this.submitButton = document.getElementById('contact-form-submit')
	this.contactFeedback = document.getElementById('contactFeedback')
	
	if (this.form !== null)
		listenToForm()
		
	/**
	* form error
	* 
	* @param {object} : error object returned by server
	* 
	* @private
	* 
	*/		
	function formError(err) {
		
		debug('form submission error', err)
		
		switch(err.status) {
			case 403:
				var msg = '<p>Sorry, but your message was rejected by our anti-spam system.</p><p>Please email us directly at <a href="mailto:contact@mango-is.com">contact@mango-is.com</a></p>'
			break
			case 400:
				var msg = '<p>Sorry, it seems that you have used an invalid email address.</p><p>Please double-check your entry and try again.</p>'
			break
			default:
				var msg = '<p>Sorry, an error has occured and your message was not sent.</p><p>Please email us directly at <a href="mailto:contact@mango-is.com">contact@mango-is.com</a>, or try again later.</p><p><small>We\'ve been alerted about this problem and will look into it.</small></p>'
				
				var exceptionDescription = 'contact form not sent: '
				exceptionDescription += err.status ? err.status + ' - ' : ''
				exceptionDescription += err.message
								
				app.gaCustom.toGa('exception', {description: exceptionDescription, fatal: true})
			break
		}
		
		self.contactFeedback.innerHTML = ('<div class="alert alert-danger">' + msg + '</div>')
		
		self.submitButton.classList.remove('disabled')
		
	}
		
	/**
	* form sent, confirm to user
	* 
	* @private
	* 
	*/		
	function formSent() {
		
		self.submitButton.classList.remove('disabled')
		
		//~ $('#contact-form-submit').removeClass('disabled')
		//~ $('#contactFeedback').empty().html('<div class="alert alert-success">Thanks for your inquiry. We\'ll be back to you very soon.</div>')
		//~ 
		//~ setTimeout(function() {
			//~ $('#contactModal').modal('hide')
		//~ }
		//~ , 4000)
	}
	
	/**
	* form submission listener
	* 
	* @param {HTMLElement} : the form
	* 
	* @private
	* 
	*/		
	function listenToForm() {
		
		self.form.addEventListener('submit', function(e) {
		// user requests to send the contact form
		
			e.preventDefault()

			self.submitButton.classList.add('disabled')
			
			var formData = formToObj(self.form)
			
			debug('submitting form', formData)
			
			// double-check that the connection is active
			if (typeof app.socket === 'undefined')
				app.socket = app.io(window.location.hostname + ':3030')

			app.socket.emit('contact', formData, function(err) {
				if (err) {
					formError(err)
				}
				else {
					debug('form sent successfully')
					formSent()
				}
				
			})
			
			 var trg = formData.trg || 'not-set'
			
			app.gaCustom.toGa('pageview', {page: trg})
		})
	}
	
}

module.exports = Contact
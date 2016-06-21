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
	
	this.middleware = []
	
	this.form = document.getElementById('contact-form')
	
	this.form.style.display = 'block'
	
	this.submitButton = document.getElementById('contact-form-submit')
	this.contactFeedback = document.getElementById('contactFeedback')
	
	if (this.form !== null)
		listenToForm()
	
	/**
	* notify user of form submission error
	* 
	* @param {object} : error object returned by server
	* 
	* @private
	* 
	*/		
	function formError(err) {
		
		debug('form submission error', err)
		
		var exceptionDescription = 'contact form not sent: '
		exceptionDescription += err.status ? err.status + ' - ' : ''
		exceptionDescription += err.message
						
		app.gaCustom.toGa('exception', {description: exceptionDescription, fatal: true})

		// TODO
		//~ inputs[err.inputIndex].classList.add('has-error')
		
		self.contactFeedback.innerHTML = ('<div class="alert alert-danger">' + err.message + '</div>')
		
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
		
		self.contactFeedback.innerHTML = ('<div class="alert alert-success">Thanks for your inquiry. We\'ll get back to you very soon.</div>')
		
		//~ setTimeout(function() {
			//~ $('#contactModal').modal('hide')
		//~ }
		//~ , 4000)
	}
	
	/**
	* invalid form
	* 
	* @private
	* 
	*/		
	function invalidForm() {
		
		self.contactFeedback.innerHTML = ('<div class="alert alert-danger"><p>At least an email address or a phone number is needed.</p><p>Please double-check your entry and try again.</p></div>')
		
	}
	
	/**
	* validate form
	* 
	* Check that at either an email address or a phone number is typed in
	* 
	* @param {object} : form data
	* 
	* @param {function} : callback function
	* 
	* @private
	* 
	*/		
	function isValidForm(form) {
		
		return form.email !== '' || form.phone !== ''
		
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
		
		debug('listening to contact forms submissions')
		
		self.form.addEventListener('submit', function(e) {
		// user requests to send the contact form
		
			e.preventDefault()

			var formData = formToObj(self.form)
			
			if (isValidForm(formData))
				submitForm(formData)
			else
				invalidForm(formData)
			
		})
	}
	
	/**
	* send form to server
	* 
	* @param {object} : form data
	* 
	* @private
	* 
	*/		
	function submitForm(form) {
		
		self.submitButton.classList.add('disabled')

		debug('submitting form', form)

		// double-check that the connection is active
		if (typeof app.socket === 'undefined')
			app.socket = app.io(window.location.hostname + ':3030')

		app.socket.emit('contact', form, function(err) {
			if (err) {
				formError(err)
			}
			else {
				debug('form sent successfully')
				formSent()
			}
			
		})
		
		 var trg = self.form.getAttribute('data-trg') || 'not-set'
		
		app.gaCustom.toGa('pageview', {page: trg})
	}
	
}

module.exports = Contact

var debug = require('debug')('contact')
	, storage = require('node-persist')
	, xssFilters = require('xss-filters')
	, validator = require('validator')

/********************************************************
* Contact form submission processing
* 
* @constructor
* 
*********************************************************/
function Contact() {
	
	var self = this
	
	storage.init()
	
	/****************************************************
	* 
	* Private functions
	* 
	*****************************************************/
	
	/**
	* check that honey-pot is empty
	* 
	* @param {string} honeyPot field
	*
	* @return {boolean} check result
	*
	*/
	function isHoneyPotEmpty(fName) {
		debug('honeyPot filtering request')
		
		return fName === ''
	}
	
	/**
	* email message data
	* 
	* @param {object} contact form data
	*
	*/
	function emailMessage(data) {
		debug('emailing message')
		
	}
	/**
	* sanitize contact form data
	* 
	* @param {object} contact form data
	*
	* @return {object} sanitized data
	*
	*/
	function sanitizeInput(data) {
		debug('sanitizing request')
		
		return {
			company: xssFilters.inHTMLData(data.company)
			, contactType: xssFilters.inHTMLData(data.contactType)
			, email: xssFilters.inHTMLData(data.email)
			, fName: xssFilters.inHTMLData(data.fName)
			, message: xssFilters.inHTMLData(data.message)
			, name: xssFilters.inHTMLData(data.name)
			, phone: xssFilters.inHTMLData(data.phone)
			, trg: xssFilters.inHTMLData(data.trg)
		}
	}
	
	/**
	* save contact message data
	* 
	* @param {string} userID
	* 
	* @param {object} data contact form data
	*
	* @callback {object?} err callback
	*
	*/
	function storeMessage(userId, data, callback) {
		debug('storing message')
		
		var messages = storage.getItem(userId) || []
		
		
		messages.push(data)
		
		storage.setItem(userId, messages)
		
		callback()
		
	}
	
	/**
	* check that the phone number and/or email are valid
	* 
	* @param {object} contact form data
	*
	* @return {object | boolean} validation result
	*     true in case the inputs are valid
	*     the error response object in case an invalid input has been found
	*
	*/
	function validateInput(data) {
		debug('validating user input')
		console.log(data.email, data.phone, data.email === '', data.email === '' && data.phone === '')
		if (data.email === '' && data.phone === ''){
			console.log('here')
			return {
				status: 400
				, message: '<p>At least an email address or a phone number is needed.</p><p>Please double-check your entry and try again.</p>'
			}
		}
		else if (data.email !== '' && !validator.isEmail(data.email))
			return {
				status: 400
				, message: '<p>Sorry, it seems that you have used an invalid email address.</p><p>Please double-check your entry and try again.</p>'
			}
		else if (data.phone !== '' && !validator.matches(data.phone, /[0-9]/))
			return {
				status: 400
				, message: '<p>Sorry, it seems that you have used an invalid phone number address.</p><p>Please double-check your entry and try again.</p><p>Accepted characters are numbers, space characters and "+".</p>'
			}
		
		return true
	}
	
	/****************************************************
	* 
	* Public functions
	* 
	*****************************************************/
	
	
	/**
	* Process a new contact request: email and store a backup
	* 
	* @param {string} userId (socket.io id)
	* 
	* @param {object} data the filled-in contact form
	* 
	* @callback {err} callback function, called as soon as a backup of the message has been stored
	*
	*/
	this.add = function(userId, data, callback)  {
		debug('processing new contact request')

		// xss filter
		var data = sanitizeInput(data)
		
		// honeyPot
		if (isHoneyPotEmpty(data)){
			
			callback({
				status: 401
				, message: '<p>Sorry, but your message was rejected by our anti-spam system.</p><p>Please email us directly at <a href="mailto:contact@mango-is.com">contact@mango-is.com</a></p>'
			})
			return false
		}

		// input validation
		var validationStatus = validateInput(data)

		if (validationStatus !== true) {
			
			callback(validationStatus)
			return false
		}

		data.ts = new Date()

		// store the contact request
		storeMessage(userId, data, callback)
		
		// email contact request
		emailMessage(data)
	}
	
}

module.exports = Contact

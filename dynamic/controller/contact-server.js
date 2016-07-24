var debug = require('debug')('contact')
	, params = require('../params.json')
	, path = require('path')
	, storage = require('node-persist')
	, xssFilters = require('xss-filters')
	, validator = require('validator')
	, nodemailer = require('nodemailer')

/********************************************************
* Contact form submission processing
* 
* @constructor
* 
*********************************************************/
function Contact() {
	
	var self = this
	
	storage.init({
		dir: path.resolve(__dirname + '/../persist')
	})
	
	// requires to activate access for less secure apps here: https://www.google.com/settings/security/lesssecureapps
	var mailer = nodemailer.createTransport('smtps://' + params.mail.user + ':' + params.mail.pass + '@smtp.gmail.com')
	
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
	function emailMessage(userId, data, errCount) {
		debug('emailing message')
		
		var message = ['New message from a visitor on mango-is.com']
		
		message.push('')
		message.push('<strong>' + data.name + '</strong>')
		
		if (data.email) {
			message.push('')
			message.push(data.email)
		}
		
		if (data.phone) {
			message.push('')
			message.push(data.phone)
		}
		
		if (data.company) {
			message.push('')
			message.push('company: ' + data.company)
		}
		
		message.push('')
		message.push(data.message)
		
		var mailContent = {
			from: '"mailing service" <mailing@mango-is.com.com>'
			, to: 'contact@mango-is.com'
			, 'reply-to': data.email
			, subject: data.subject || ((data.name || data.email) + ' - ' + data.contactType + ' on mango-is.com')
			, html: message.join('<br>')
		}
		
		mailer.sendMail(mailContent, function(error, info){
			if(error){
				console.error('error sending email')
				console.error(error)
				
				if (errCount < 5) {
					
					setTimeout(function() {
						emailMessage(userId, data, errCount+1)
					}, 90000 * (errCount+1))
				}
				else if (errCount === 5) {
					// attempt to alert syadmin after a few hours
					setTimeout(function() {
						emailMessage('system', {
							name: 'mango-is-website server'
							, subject: 'Error: mango-is.com contact mails fail!'
							, message: 'Email transmission failed repeatedly - please connect to the server and check what the problem is'
							
						}, 6)
					}, 60000 * 60 * 12)
					
				}
			}
			else {
				debug('email sent,' + info.response)
			}
		})
		
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

		if (data.email === '' && data.phone === ''){
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
		emailMessage(userId, data, 0)
	}
	
}

module.exports = Contact

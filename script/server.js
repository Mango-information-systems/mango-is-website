var io = require('socket.io')()
	, storage = require('node-persist')
	, debug = require('debug')('server')


storage.init()

io.on('connection', function(socket) {
	
	debug('connection event', socket.id)

	/**
	* listener: moderator session (re)start signal
	*
	* @private
	*/
	socket.on('contact', function(formData, callback) {
		
		debug('contact request received', socket.id, formData)
		
		// sanitize data then honeypot check then send to contact controller

		//~ honeyPot(formData, sanitizeInput)

		// then run someth
		//~ sanitizeInput(formData, 
		
		var messages = storage.getItem(socket.id) || []
		
		formData.ts = new Date()
		
		messages.push(formData)
		
		storage.setItem(socket.id, messages)
		
		// sample response
		callback({status:403})
	})

})

io.listen(3030)

var io = require('socket.io')()
	, debug = require('debug')('server')

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
		
		
		callback({status:403})
	})

})

io.listen(3030)

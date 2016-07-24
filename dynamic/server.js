var io = require('socket.io')({ path: '/ws/'})
	, Contact = require('./controller/contact-server')
	, debug = require('debug')('server')


var contact = new Contact()

io.on('connection', function(socket) {
	
	debug('connection event', socket.id)

	/**
	* listener: contact request
	*
	* @private
	*/
	socket.on('contact', function(formData, callback) {
		
		debug('contact request received', socket.id, formData)
		
		contact.add(socket.id, formData, callback)

	})

})

io.listen(3030)

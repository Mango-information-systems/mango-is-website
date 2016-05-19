var server = new require('../../server/index')
	, io = require('socket.io-client')
	
describe('server', function () {
	
	it('should allow incoming connections', function (done) {

		var socket = io('http://localhost:3000')
		
		socket.on('connect', function(){
			done()
		})

	})
	
	it.skip('should be protected against XSS', function (done) {

	})
	
})

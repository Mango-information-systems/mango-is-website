var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

var app = {}

app.io = io

app.gaCustom = new GaCustom()

app.gaCustom.init()

if (window.location.pathname === '/contact/')
	app.contact = new Contact(app)

console.log(pageAccelerator)

pageAccelerator(function(err, res) {
	console.log('page loaded', err, res)
})

var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, pageAccelerator = require('page-accelerator').pageAccelerator
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

var app = {}

app.io = io

app.gaCustom = new GaCustom()

app.gaCustom.init()

if (window.location.pathname === '/contact/')
	app.contact = new Contact(app)

pageAccelerator.pageAccelerator(function(err, res) {
    console.log('page loaded', err, res)
})

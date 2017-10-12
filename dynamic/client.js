var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

window.app = {}

app.io = io

app.gaCustom = new GaCustom()

app.gaCustom.init()

if (window.location.pathname === '/contact/')
	app.contact = new Contact(app)

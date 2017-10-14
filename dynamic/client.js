var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

let app = {}

app.io = io

app.gaCustom = new GaCustom()

app.gaCustom.init()

window.gaCustom = app.gaCustom

if (window.location.pathname === '/contact/')
	app.contact = new Contact(app)

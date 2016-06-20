var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

var app = {}

app.io = io

app.gaCustom = new GaCustom()

app.contact = new Contact(app)


app.gaCustom.init()

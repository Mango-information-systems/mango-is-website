var smoothscroll = require('smoothscroll')
	, io = require('socket.io-client')
	, Contact = require('./controller/contact')
	, GaCustom = require('./controller/gaCustom')

var app = {}

app.io = io
app.gaCustom = new GaCustom()
app.contact = new Contact(app)



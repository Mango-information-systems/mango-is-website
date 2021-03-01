var io = require('socket.io-client')
	, Contact = require('./controller/contact-client')
	, GaCustom = require('./controller/ga-custom')

let app = {}

app.io = io

app.gaCustom = new GaCustom()

app.gaCustom.init()

window.gaCustom = app.gaCustom

if (['/contact/', '/tools/csv-to-json/'].includes(window.location.pathname))
	app.contact = new Contact(app)

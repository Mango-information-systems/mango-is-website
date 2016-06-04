var smoothscroll = require('smoothscroll')
	, contact = require('./controller/contact')
	, CustomGa = new require('./controller/customGa')
	, errorTracking = require('./controller/errorTracking')

// activate custom tracking
customGa = new CustomGa(ga) // assuming ga - google Analytics tracking code is loaded

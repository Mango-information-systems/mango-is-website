var fs = require('fs')

var d3 = require('d3')
	, ejs = require('ejs')
	, AnalyticsApi = require('./controller/analytics-api')
	, StateManager = require('./controller/state-manager')
	, app = {
		controller: {}
		, model: require('./model/ga-realtime')
		, view: {}
	}

// TODO: check how state manager should behave in situations where the ga API does not load
app.controller.stateManager = new StateManager(app)


/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	app.controller.analyticsApi = new AnalyticsApi(gapi)
}

var appContainer = d3.select('#app')

app.view.connectWithGoogle = ejs.compile(fs.readFileSync(__dirname + '/../themes/mango-information-systems/layout/_partial/connect-with-google.ejs', 'utf-8'))



appContainer.html(app.view.connectWithGoogle({
	redirectUri: 'http://localhost:4000/tools/ga-realtime/'
	, scope: 'https://www.googleapis.com/auth/analytics.readonly'
	, clientId: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
}))

//~console.log('loaded', window.location.hash)
// cf. https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html

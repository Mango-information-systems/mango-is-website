var fs = require('fs')

var d3 = require('d3')
	, ejs = require('ejs')
	, AnalyticsApi = require('./controller/analytics-api')
	, Model = require('./model/ga-realtime')
	, app = {
		model: new Model()
		, controller: {}
		, view: {}
	}

var appContainer = d3.select('#app')

app.view.dashboard = ejs.compile(fs.readFileSync(__dirname + '/../themes/mango-information-systems/layout/_partial/ga-realtime/metric.ejs', 'utf-8'))

/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	
	app.controller.analyticsApi = new AnalyticsApi(gapi, {
		container: appContainer
		, template: app.view.dashboard
	})
	
	function start() {

		app.model.getItem('accessToken', function(isConnected) {

			if (typeof isConnected === 'undefined') {
			// user has not connected his Google Analytics account yet
				app.view.connectWithGoogle = ejs.compile(fs.readFileSync(__dirname + '/../themes/mango-information-systems/layout/_partial/connect-with-google.ejs', 'utf-8'))

				appContainer.html(app.view.connectWithGoogle())
				
				d3.select('#login').on('click', function() {
					
					d3.event.preventDefault()
					d3.event.stopPropagation()
					
					accessToken = app.controller.analyticsApi.signIn()
					
					app.model.setItem('accessToken', accessToken)
					
					return false
				})
				
			}
			else {
			// user is already logged-in
			
				app.view.dashboard = ejs.compile(fs.readFileSync(__dirname + '/../themes/mango-information-systems/layout/_partial/ga-realtime/metric.ejs', 'utf-8'))

				//~var data = app.controller.analyticsApi.init()

			}
		})
	}
	
	
}

//~console.log('loaded', window.location.hash)
// cf. https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html

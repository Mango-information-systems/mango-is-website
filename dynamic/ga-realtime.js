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

/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	
	app.controller.analyticsApi = new AnalyticsApi(gapi, start)
	
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

				var data = [
					{
						'viewName': 'view 1'
						, 'propertyName': 'site 1'
						, 'visitorsCount': 155
					}
					, {
						'viewName': 'view 2'
						, 'propertyName': 'site 1'
						, 'visitorsCount': 29
					}
				
				]

				appContainer.html('')

				appContainer.selectAll('.widget')
					.data(data)
					.enter()
					  .append('div')
					  .html(function(d) {
						return app.view.dashboard(d)
					  })

			}
		})
	}
	
	
}

//~console.log('loaded', window.location.hash)
// cf. https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html

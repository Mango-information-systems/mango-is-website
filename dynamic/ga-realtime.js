var fs = require('fs')

window.appDebug = require('debug')

var d3 = require('d3')
	, debug = window.appDebug('ga-realtime')
	, ejs = require('ejs')
	, AnalyticsApi = require('./controller/analytics-api')
	, DonutChart = require('./view/donutChart')
	, app = {
		controller: {}
		, view: {
			signIn: require('./view/sign-in-with-google')
			, dashboard: require('./view/dashboard')
			, donuts: {}
		}
		, data: {}
	}

var appContainer = d3.select('#app')

/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	
	app.controller.analyticsApi = new AnalyticsApi(gapi, start)

	//~console.log('loaded', window.location.hash)
	// cf. https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html

}

/**
* Display login form or data, depending on user's connection status
* 
*/
function start(hasError) {

	if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
	// user has not connected his Google Analytics account yet

		app.view.signIn.render({
			target: appContainer
			, hasError: hasError
			, action: function() {
				app.controller.analyticsApi.signIn(start)
			}
		})

	}
	else {
	// user is already logged-in
	
		showData()

	}
}

/**
* 
* 
*/
function handleSigninResponse(err) {
	if (err)
		start(true)
	else
		showData()
}

/**
* Display login form or data, depending on user's connection status
* 
*/
function showData() {
	
	app.controller.analyticsApi.getViews(function(res) {
		app.data = res.result.items
		
		app.data.forEach(function(account) {
			
			account.webProperties.forEach(function(property) {
				
				app.view.donuts[property.id] = new DonutChart()
			})
		})
		
		//~ console.log('views list', app.data)
		
		app.view.dashboard.render({
			target: appContainer
			, data: app.data
			, donuts: app.view.donuts
		}, function() {
			
			
			app.data.forEach(function(account) {
				
				account.webProperties.forEach(function(property) {
					
					app.view.donuts[property.id].setSelectors()
				})
			})
			
			console.log('done')
		})
		
	})
	
	setTimeout(function() {
		app.view.donuts['UA-19572298-1'].update()
	}, 1500)
	
	
}

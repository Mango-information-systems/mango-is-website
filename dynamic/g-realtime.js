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
			, cookieWarning: require('./view/cookie-warning')
			, donuts: {}
		}
		, data: {}
	}

var appContainer = d3.select('#app')
	
/**
* update charts whenever new data is received from Google Analytics API
* 
*/
app.controller.updateStatsCharts = function (stats){
	
	// update visitorsCount metrics values
	stats.forEach(function(stat) {
		app.viewMap[stat.viewId].value = stat.value
	})
	
	app.data.forEach(function(account) {
		
		// update maxValue for each account
		var maxValue = setMaxvalue(account)
		
		account.webProperties.forEach(function(property, i) {
			
			property.maxValue = maxValue
			
			// update all charts
			setTimeout(function() {
				app.view.donuts[property.id].update(property)
			}, i * 200)
		})
	})
	
}


/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
var cookieCheckTimeout = setTimeout(function() {
	
	if (!/google/.test(document.cookie))
		app.view.cookieWarning.render({target: appContainer })
	
}, 1000)




/**
* initialize analytics API controller once the googgle Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	
	//~ clearTimeout(cookieCheckTimeout)
	
	app.controller.analyticsApi = new AnalyticsApi(gapi, start, app.controller.updateStatsCharts)

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
* Render dashboard and initiate data refresh process
* 
*/
function showData() {
	
	app.controller.analyticsApi.getViews(function(res) {
		
		app.data = res.result.items
		
		// pointer to each view in the hierarchy, by Id
		app.viewMap = {}
		
		app.data.forEach(function(account) {
			
			account.webProperties.forEach(function(property) {
				
				property.profiles.forEach(function(view) {
					app.viewMap[view.id] = view
					view.value = 0
				})
				
				property.maxValue = 0
				
				app.view.donuts[property.id] = new DonutChart()
			})
		})
		
		//~ console.log('views list', app.data)
		
		app.view.dashboard.render({
			target: appContainer
			, data: app.data
			, donuts: app.view.donuts
			, action: function() {
				app.controller.analyticsApi.signOut(start)
			}
		}, function() {
			// dashboard initial rendering is done
			
			// update d3 selectors so that they use DOM nodes (they were initialized in a detached node)
			app.data.forEach(function(account) {
				
				account.webProperties.forEach(function(property) {
					
					app.view.donuts[property.id].setSelectors()
				})
			})
			
		})
	
		// retrieve views metrics
		app.controller.analyticsApi.getStats()
		
		// periodically refresh metrics
		setInterval(function() {
			
			app.controller.analyticsApi.getStats()
				
		}, 25000)
		
	})
	
	
}



/**
* compute and return highest metric value across all properties of a given acount
* 
*/
function setMaxvalue(account) {
	
	var maxValue = 0
				
	account.webProperties.forEach(function(property, i) {
		
		property.profiles.forEach(function(view) {
			
			if (+view.value > +maxValue)
				maxValue = view.value
		})
	})
	
	return maxValue
	
}

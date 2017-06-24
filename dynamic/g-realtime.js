window.appDebug = require('debug')

var d3 = require('d3')
	, debug = window.appDebug('ga-realtime')
	, AnalyticsApi = require('./controller/analytics-api')
	, app = {
		controller: {}
		, view: {
			signIn: require('./view/sign-in-with-google')
			, dashboard: require('./view/dashboard')
			, cookieWarning: require('./view/cookie-warning')
			, donuts: require('./view/donuts')
		}
		, data: {}
	}

var appContainer = d3.select('#app')
	, dashboardBody
	, refreshInterval

/******************************************
 * 
 * Inline controllers
 * 
 * ***************************************/
 
 
/**
* update charts whenever new data is received from Google Analytics API
* 
*/
app.controller.updateStatsCharts = function (stats){
	
	// update visitorsCount metrics values
	stats.forEach(function(stat) {
		app.viewMap[stat.viewId].value = stat.value
	})
	
	var account = app.data[app.data.currentAccountIndex]
		
	// update maxValue for each account
	var maxValue = setMaxvalue(account)
	
	account.webProperties.forEach(function(property, i) {
		
		property.maxValue = maxValue
		
	})
	
	app.view.donuts.update(account.webProperties)
	
}

/**
* Switch monitored account
* 
*/	
app.controller.switchAccount = function(ix) {
	
	debug('switching account', ix)

	app.data.currentAccountIndex = ix
	
	app.view.donuts.render({
		target: dashboardBody
		, properties: app.data[app.data.currentAccountIndex].webProperties
	})
	
	app.controller.analyticsApi.getStats(app.data.viewsByAccount[ix])
	
}


/******************************************
 * 
 * End inline controllers //
 * 
 * ***************************************/
 


/**
* initialize analytics API controller once the google Analytics javascript client library script is loadeed
* 
*/
window.gApiLoaded = function() {
	
	app.controller.analyticsApi = new AnalyticsApi(gapi, start, app.controller.updateStatsCharts)

}

/**
* Display login form or data, depending on user's connection status
* 
*/
function start(err) {

	if (err && err.error == 'idpiframe_initialization_failed') {
	// third-party cookies are disabled (or something)
		// https://github.com/google/google-api-javascript-client/issues/260#issuecomment-278514289
		app.view.cookieWarning.render({target: appContainer })
	}
	else if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
	// user has not connected his Google Analytics account yet

		app.view.signIn.render({
			target: appContainer
			, hasError: typeof err !== 'undefined'
			, action: function() {
				app.controller.analyticsApi.signIn(start)
			}
		})
	}
	else {
	// user is already logged-in
	
		getViews()

	}
}

/**
* Render dashboard and initiate data refresh process
* 
*/
function getViews() {
	
	app.controller.analyticsApi.getViews(function(res) {
		
		app.data = res.result.items
		
		app.data.viewsByAccount = {}
		
		// pointer to each view in the hierarchy, by Id
		app.viewMap = {}
		
		// use the first account by default
		app.data.currentAccountIndex = 0
		
		
		// store the view Ids for metrics queries
		app.data.forEach(function(account, i) {

			app.data.viewsByAccount[i] = []
			
			account.webProperties.forEach(function(property) {
			
				property.profiles.forEach(function(view) {
					
					app.data.viewsByAccount[i].push(view.id)
					
					app.viewMap[view.id] = view
					
					view.value = 0
				})
				
				property.maxValue = 0
				
			})
		})
		
		app.view.dashboard.render({
			target: appContainer
			, data: app.data
			, logOutFn: function() {
				app.controller.analyticsApi.signOut(start)
				clearInterval(refreshInterval)
			}
			, selectFn: function(ix) {
				//~ app.view.donuts[property.id].reset()
				app.controller.switchAccount(ix)
				
			}
		}, function() {
			// dashboard initial rendering is done
			
			dashboardBody = d3.select('#dashboardBody')
			
			app.view.donuts.render({
				target: dashboardBody
				, properties: app.data[app.data.currentAccountIndex].webProperties
			})
			
		})
	
		// retrieve views metrics
		app.controller.analyticsApi.getStats(app.data.viewsByAccount[app.data.currentAccountIndex])
		
		// periodically refresh metrics
		refreshInterval = setInterval(function() {
			
			app.controller.analyticsApi.getStats(app.data.viewsByAccount[app.data.currentAccountIndex])
				
		}, 10000)
		
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

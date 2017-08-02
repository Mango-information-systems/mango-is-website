window.appDebug = require('debug')

var d3 = require('d3')
	, debug = window.appDebug('myTagOverflow')
	, storage = require('localforage')
	, StackExchangeApi = require('./controller/stackExchange-api')
	, Force = require('./view/force')
	, app = {
		controller: {}
		, view: {
			signIn: require('./view/sign-in-with-stackExchange')
			, chart: new Force()
			, userInfo: require('./view/SEUser')
			, warningMessage: require('./view/warning-message')
		}
		, data: {}
	}

var appContainer = d3.select('#app')
	, dashboardBody
	, refreshInterval
	, chartInitialized = false

// temp
window.storage = storage
//~ storage.removeItem('tagsGraph')


start(null)

/**
* Display login form or data, depending on user's connection status
* 
*/
function start(hasError, accessToken) {

	// check whether user info is already available
	storage.getItem('user', function (err, user) {

		if (err)
			throw err
			
		else if (user !== null) {
			
			showUserInfo(user)
		}
			
		// check whether tags graph is already available
		storage.getItem('tagsGraph', function (err, tagsGraph) {
			
			if (err)
				throw err
				
			else if (tagsGraph !== null) {
				
				showChart(tagsGraph)
			}
			
			if (tagsGraph === null || user === null )
				initiateExtraction(hasError, {accessToken: accessToken, user: user, tagsGraph: tagsGraph})
			
		})
	})
}



/**
* Connect to the API if needed and retrieve the missing data
* 
*/			
function initiateExtraction(hasError, opts) {

	if (typeof opts.accessToken !== 'undefined') {
		// access token has just been retrieved from the SE API, store it
		
		debug('saving accessToken', opts.accessToken)
		
		storage.setItem('accessToken', opts.accessToken)
		
		// retrieve data from SE API
		extractUser()
		
		extractStats()
	}
	else {
		debug('checking whether access token is already retrieved')
		
		storage.getItem('accessToken', function (err, accessToken) {
	
			if (err)
				throw err
			else if (accessToken !== null) {
				// user is already logged-in
				console.log('user connected')
				
				// initialize stackExchange API controller
				app.controller.stackExchangeApi = new StackExchangeApi(accessToken)
				
				// retrieve data from SE API
				if (!opts.user)
					extractUser()
					
				if (!opts.tagsGraph)
					extractStats()
				
			}
			else {
				// initialize stackExchange API controller
				app.controller.stackExchangeApi = new StackExchangeApi()
				
				// display login form
				app.view.signIn.render({
					target: appContainer
					, hasError: hasError !== null
					, action: function() {
						
						appContainer.html('<div id="user" class="two columns"></div><div id="chart" class="ten columns"><?xml version="1.0" encoding="utf-8"?><svg width="120px" height="120px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ripple"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g> <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate><circle cx="50" cy="50" r="40" stroke="#565656" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate></circle></g><g><animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate><circle cx="50" cy="50" r="40" stroke="#FF6600" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate></circle></g></svg><br><small>Loading...</small></div>')
						
						app.controller.stackExchangeApi.signIn(start)
					}
				})
			}
		})
	}
}

/**
* Retrieve the user information
* 
*/
function extractUser() {
	
	debug('extract user information')
	
	app.controller.stackExchangeApi.getUser(function(data) {

		storage.setItem('user', data)

		showUserInfo(data)
		
	})
}
/**
* Retrieve the stats
* 
*/
function extractStats() {
	
	debug('extract tags graph')
	
	app.controller.stackExchangeApi.getStats(function(data) {

		storage.setItem('tagsGraph', data)

		showChart(data)

	})
}

/**
* Display the tags chart
* 
*/
function showChart(tagsGraph) {
	
	debug('displaying tag graph', tagsGraph)
	
	if (!chartInitialized) {
		app.view.chart.init()
		chartInitialized = true
	}

	app.view.chart.update(tagsGraph)

	if (tagsGraph.isIncomplete) {
		
		app.view.warningMessage.render({
			target: appContainer
			, append: true
			, title: 'Incomplete data retrieved'
			, message: '<p>The whole tags graph could not be retrieved, most probably due to your ad blocker.</p> \
			<p>For more accurate results, you may disable your ad blocker. There is no ad on this site, anyway.</p> \
			<p>Up to you ;)</p>'
		})
	}
	
}

/**
* Display the user information
* 
*/
function showUserInfo(user) {
	
	debug('displaying user information', user)
	
	app.view.userInfo.render(appContainer.select('#user'), user)
	
}

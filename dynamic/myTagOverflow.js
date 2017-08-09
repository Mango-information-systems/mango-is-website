window.appDebug = require('debug')

var d3 = require('d3')
	, debug = window.appDebug('myTagOverflow')
	, storage = require('localforage')
	, StackExchangeApi = require('./controller/stackExchange-api')
	, Force = require('./view/force')
	, app = {
		controller: {}
		, view: {
			myTagOverflow: require('./view/myTagOverflow')
			, chart: new Force()
			, signIn: require('./view/sign-in-with-stackExchange')
			, userInfo: require('./view/SEUser')
			, warningMessage: require('./view/warning-message')
		}
		, data: {}
	}

var appContainer = d3.select('#app')
	, dashboardBody
	, refreshInterval
	, chartInitialized = false
	, legendLabels
	
storage.getItem('legend', function(err, res) {
	
	if (res === null)
		legendLabels = []
	else 
		legendLabels = res
	
})

app.view.myTagOverflow.render(appContainer)

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
				debug('user is connected')
				
				// initialize stackExchange API controller
				app.controller.stackExchangeApi = new StackExchangeApi(accessToken)
				
				// retrieve data from SE API
				if (!opts.user)
					extractUser()
					
				if (!opts.tagsGraph)
					extractStats()
				
			}
			else {
				
				debug('user is not connected')
				
				// initialize stackExchange API controller
				app.controller.stackExchangeApi = new StackExchangeApi()
				
				// display login form
				app.view.signIn.render({
					target: appContainer
					, hasError: hasError !== null
					, action: function() {
						
						app.view.myTagOverflow.render(appContainer)
						
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
		
		// initialize legend items
		
		d3.range(data.communitiesCount).forEach(function(ix) {
			console.log('legend init', ix)
			
			legendLabels.push('edit me')
			
			storage.setItem('legend', legendLabels)
		})

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
		app.view.chart.init({
			legendLabels: legendLabels
			, updateLegend: updateLegend
		})
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


function updateLegend(ix, value) {
	
	debug('updating legend label', ix, value)
	
	legendLabels[ix] = value
	
	storage.setItem('legend', legendLabels)
}

window.appDebug = require('debug')

var d3 = require('d3')
	, debug = window.appDebug('SE-stats')
	, storage = require('localforage')
	, StackExchangeApi = require('./controller/stackExchange-api')
	, Force = require('./view/force')
	, app = {
		controller: {}
		, view: {
			signIn: require('./view/sign-in-with-stackExchange')
			, chart: new Force()
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
//~ storage.removeItem('chartData')


start(null)

/**
* Display login form or data, depending on user's connection status
* 
*/
function start(hasError, accessToken) {

	storage.getItem('chartData', function (err, chartData) {

		if (err)
			throw err
		else if (chartData !== null) {
			
			showChart(chartData)
			
		}
		else {
		// chart data is not yet retrieved, check user's connection to SE API
		
			if (typeof accessToken !== 'undefined') {
				// access token has just been retrieved from the SE API, store it
				console.log('saving accessToken', accessToken)
				storage.setItem('accessToken', accessToken)
				
				// extract chart data
				app.controller.stackExchangeApi.getStats(function(chartData) {

					console.log('top tags', chartData)

					storage.setItem('chartData', chartData)

					showChart(chartData)

				})
			}
			else {
				
				storage.getItem('accessToken', function (err, accessToken) {
			
					if (err)
						throw err
					else if (accessToken !== null) {
						// user is already logged-in
						console.log('user connected')
						
						// initialize stackExchange API controller
						app.controller.stackExchangeApi = new StackExchangeApi(accessToken)

						
						// extract chart data
						app.controller.stackExchangeApi.getStats(function(chartData) {
							
							console.log('top tags', chartData)

							storage.setItem('chartData', chartData)
							
							showChart(chartData)
							
						})
						
					}
					else {
						// initialize stackExchange API controller
						app.controller.stackExchangeApi = new StackExchangeApi()
						
						// display login form
						app.view.signIn.render({
							target: appContainer
							, hasError: hasError !== null
							, action: function() {
								app.controller.stackExchangeApi.signIn(start)
							}
						})
					}
				})
			}
		}
	})
}

/**
* Display the tags chart
* 
*/
function showChart(chartData) {

	if (!chartInitialized) {
		app.view.chart.init()
		chartInitialized = true
	}

	app.view.chart.update(chartData)
console.log('chartData.isIncomplete', chartData.isIncomplete)

	if (chartData.isIncomplete) {
		
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

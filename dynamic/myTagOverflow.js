window.appDebug = require('debug')

var d3 = Object.assign( {}, require('d3-selection'), require('d3-array'))
	, debug = window.appDebug('myTagOverflow')
	, storage = require('localforage')
	, StackExchangeApi = require('./controller/stackExchange-api')
	, SVGExport = require('./controller/SVGExport')
	, Force = require('./view/force')
	, app = {
		controller: {
			SVGExport: new SVGExport()
		}
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
//~ storage.removeItem('user')
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
				
				showChart(tagsGraph, true)
			}
			
			if (tagsGraph === null || user === null )
				initiateExtraction(hasError, {accessToken: accessToken, user: user, tagsGraph: tagsGraph})
			else {
						
				gaCustom.toGa('event', {
					category: 'mytagoverflow'
					, action: 'user is signed in'
				})
				
			}
			
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
				app.controller.stackExchangeApi = new StackExchangeApi(accessToken, showChart)
				
				// retrieve data from SE API
				if (!opts.user)
					extractUser()
					
				if (!opts.tagsGraph)
					extractStats()
				
			}
			else {
				
				debug('user is not connected')
				
				// initialize stackExchange API controller
				app.controller.stackExchangeApi = new StackExchangeApi(null, showChart)
				
				// display login form
				app.view.signIn.render({
					target: appContainer
					, hasError: hasError !== null
					, action: function() {
						
						app.view.myTagOverflow.render(appContainer)
						
						app.controller.stackExchangeApi.signIn(start)
						
						gaCustom.toGa('event', {
							category: 'mytagoverflow'
							, action: 'sign-in attempt'
						})
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
	
	app.controller.stackExchangeApi.getUser(function(err, data) {

		if (err !== null) {
			debug('error extracting user information', err)
			
			if (err === 'access-token-expired') {
				// display login form
				app.view.signIn.render({
					target: appContainer
					, hasError: true
					, action: function() {
						
						app.view.myTagOverflow.render(appContainer)
						
						app.controller.stackExchangeApi.signIn(start)
						
						gaCustom.toGa('event', {
							category: 'mytagoverflow'
							, action: 'sign-in attempt'
						})
					}
				})
			}
		}
		else {

			storage.setItem('user', data)

			showUserInfo(data)
		}
		
	})
}
/**
* Retrieve the stats
* 
*/
function extractStats() {
	
	debug('extract tags graph')
	
	d3.select('#progressBadge').html('Extraction in progress..')
	
	app.controller.stackExchangeApi.getStats(function(err, data) {

		if (err !== null) {
			debug('error extracting stats', err)
			
			if (err === 'access-token-expired') {
				// display login form
				app.view.signIn.render({
					target: appContainer
					, hasError: true
					, action: function() {
						
						app.view.myTagOverflow.render(appContainer)
						
						app.controller.stackExchangeApi.signIn(start)
						
						gaCustom.toGa('event', {
							category: 'mytagoverflow'
							, action: 'sign-in attempt'
						})
						
					}
				})
			}
		}
		else {

			storage.setItem('tagsGraph', data)
			
			// initialize legend items
			
			d3.range(data.communitiesCount).forEach(function(ix) {
				//~ console.log('legend init', ix)
				
				legendLabels.push('edit me')
				
				storage.setItem('legend', legendLabels)
			})

			showChart(data, true)
		}
	})
}

/**
* Display the tags chart
* 
*/
function showChart(tagsGraph, complete=false) {
	
	debug('displaying tag graph', tagsGraph)
	
	if (!chartInitialized) {
		
		app.view.chart.init({
			legendLabels: legendLabels
			, updateLegend: updateLegend
		})
		chartInitialized = true
	}

	app.view.chart.update(tagsGraph, complete)

	if (tagsGraph.isIncomplete) {
		
		app.view.warningMessage.render({
			target: d3.select('#notifications')
			, append: false
			, title: 'Incomplete data retrieved'
			, message: '<p>The statistics for some tags like \'analytics\' could not be retrieved, most probably because of an ad blocker.</p> \
			<p>For more accurate results, you may disable your ad blocker. There is no ad on this site, anyway.</p> \
			<p>Up to you ;)</p>'
		})
	}
	
	gaCustom.toGa('event', {
		category: 'mytagoverflow'
		, action: 'visualize graph'
	})
	
	
	d3.select('#exportLink').on('click', function() {
		app.controller.SVGExport.export(document.getElementById('chartSVG'), document.getElementById('exportLink'))
		
		gaCustom.toGa('event', {
			category: 'mytagoverflow'
			, action: 'graph SVG export'
		})
	})

	d3.select('#clearDataLink').on('click', function() {
		// clear storage
		storage.clear()
		location.reload()
	})

	
}

/**
* Display the user information
* 
*/
function showUserInfo(user) {
	
	debug('displaying user information', user)
	
	app.view.userInfo.render(appContainer.select('.user'), user)
	
}


function updateLegend(ix, value) {
	
	debug('updating legend label', ix, value)
	
	legendLabels[ix] = value
	
	storage.setItem('legend', legendLabels)
}

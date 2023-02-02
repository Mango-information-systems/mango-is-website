window.appDebug = require('debug')

var debug = window.appDebug('analyticsApi')
	, d3 = require('d3-array')

/**
* wrapper around google Analytics API This controller handles the following logic:
* 
* * Connect and authentify user
* * make API calls
* 
* @param {object} gapi: the google api client library instance
* @param {function} callback: the function to be called once user authentication is done
* @param {function} updateFunction: the function to call whenever some update stats are received
* 
* @constructor
* 
*/
function AnalyticsApi(gapi, callback, updateFunction) {
	
	var self = this
	
	this.updateFunction = updateFunction
	
	// load the API client
	gapi.load('client:auth2', function() {
		
        gapi.auth2.init({
			client_id: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
			, scope: 'https://www.googleapis.com/auth/analytics.readonly'
        }).then(function () {

			gapi.client.load('analytics', 'v3').then(function() {
				
				debug('gapi client initialized, and analytics API loaded', gapi.auth2.getAuthInstance())
				
				callback()
			  
			})
			.then(null, function(err) {
				console.log('error loading analytics API v3', err)
			})
			
		})
		.then(null, function(err) {
			console.log('error initializing auth2', err)
			callback(err)
		})
	})
	
	/******************************************
	 * 
	 * Private functions
	 * 
	 * ***************************************/
	
	/**
	* get realtime visit stats for a given subset of views (up to 10. re. user rate limits)
	* 
	* @param {object} viewIds array of 10 viewIds
	* 
	* @private
	*/	
	function getViewStats(viewIds) {
		
		var batch = gapi.client.newBatch()
		// cf. https://developers.google.com/api-client-library/javascript/features/batch

		viewIds.forEach(function(viewId) {
			batch.add(gapi.client.request({
				path: 'analytics/v3/data/realtime'
				, params: {
					ids: 'ga:' + viewId
					, metrics: 'rt:activeUsers'
				}
			}), {id: viewId})

		})

		batch.then(function(response) {
			
			var res = []
			
			Object.keys(response.result).forEach(function(viewId) {

				if (response.result[viewId].status === 200)
					res.push({
						viewId: viewId
						, value: response.result[viewId].result.totalsForAllResults['rt:activeUsers']
					})
				else
					console.log('error with some of the batch requests', response.result[viewId])
			})
			
			self.updateFunction(res)
			
		})
		.then(null, function(err) {
			console.log('error requesting stats in batch')
			console.log(err)
		})
	}
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/
	
	/**
	* get realtime visit stats for a given views
	* calls self.updateFunction once done
	* 
	*/		
	this.getStats = function(views) {

		debug('getStats', views)

		// split the viewIds in chunks of 10 in order to batch request them without reaching user rate limits
		var chunksCount = Math.ceil(views.length / 10)

		d3.range(chunksCount).forEach(function(i) {

			setTimeout(function() {
				getViewStats(views.slice(i * 10, i * 10+10))
			}, chunksCount * i * 1100)
		})
		
	}

	/**
	* get the hierarchy of Accounts / Properties / Views user has access to
	* 
	* @param {function} callback function
	* 
	*/
	this.getViews = function(callback) {
		
		debug('retrieving list of views')
	
		gapi.client.analytics.management.accountSummaries.list().then(function(res) {
			
			callback(res)
		})
		.then(null, function(err) {

			console.log('error requesting list of views')
			console.log(err)
		})
		
	}

	/**
	* Sign in with Google
	* 
	*/	
	this.signIn = function(callback) {
		
		debug('signing user in')
		
		//~gaCustom.toGa('event', {
			//~category: 'multiga'
			//~, action: 'sign in attempt'
		//~})
		
		gapi.auth2.getAuthInstance().signIn().then( function(res) {
			// TODO handle errors at sign-in
			
			//~gaCustom.toGa('event', {
				//~category: 'multiga'
				//~, action: 'user signed in'
			//~})
			
			callback()
		})
		
	}

	/**
	* Sign out from Google
	* 
	*/	
	this.signOut = function(callback) {
		
		debug('signing user out')

		gapi.auth2.getAuthInstance().signOut().then( function(res) {
			// TODO handle errors at sign-out
			
			//~gaCustom.toGa('event', {
				//~category: 'multiga'
				//~, action: 'user signed out'
			//~})
			
			callback()
		})
		
	}
	
}

module.exports = AnalyticsApi

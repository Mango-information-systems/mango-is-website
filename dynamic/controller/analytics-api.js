window.appDebug = require('debug')

var debug = window.appDebug('analyticsApi')

/**
* wrapper around google Analytics API This controller handles the following logic:
* 
* * Connect and authentify user
* * make API calls
* 
* @param {object} gapi: the google api client library instance
* 
* @constructor
* 
*/
function AnalyticsApi(gapi, callback) {
	
	var self = this
	
	this.data = {
		name: 'ga'
		, children: []
		, max: 0
	}
	// temp alternative structure to hierarchy
	this.viewData = []
	
	this.viewIds = []
	
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
		})
	})
	
	/**
	* get realtime visit stats for a given views
	* 
	* @param {number} accountIndex index of the account to fetch
	* 
	* @param {number} propertyIndex index of the property fetch
	* 
	* @private
	* 
	*/		
	function getRealTimeStats (accountIndex, propertyIndex) {

		//~ var batch = gapi.client.newBatch()
		// cf. https://developers.google.com/api-client-library/javascript/features/batch

		gapi.client.analytics.data.realtime.get({
			'ids': 'ga:' + self.data.children[accountIndex].children[propertyIndex].viewId,
			'metrics': 'rt:activeUsers'
		})
		.then(function(response) {
			
			var view = self.data.children[accountIndex].children[propertyIndex]
			
			view.value = response.result.totalsForAllResults['rt:activeUsers']
			//~ self.data.max = Math.max(self.data.max, response.result.totalsForAllResults['rt:activeUsers'])
			
			self.viewData.push({
				'viewName': view.viewName
				, 'propertyName': view.name
				, 'visitorsCount': view.value
			})
			
			component.container.html('')

			component.container.selectAll('.widget')
				.data(self.viewData)
				.enter()
				  .append('div')
				  .html(function(d) {
					return component.template(d)
				  })
			
			// todo: setup view rendering
			// todo: setup stats update
			
		})
		.then(null, function(err) {
				// Log any errors.
				console.log('error requesting stats', accountIndex, propertyIndex, self.data.children[accountIndex].children[propertyIndex].viewId)
				console.log(err)
		})
		
	}
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/

	/**
	* Sign in with Google
	* 
	*/	
	this.signIn = function(callback) {
		
		debug('signing user in')
		
		gapi.auth2.getAuthInstance().signIn()
		
		// TODO handle errors at sign-in
		callback(null)
		
	}

	/**
	* Sign out from Google
	* 
	*/	
	this.signOut = function(callback) {
		
		debug('signing user out')
		
		// TODO
		
		//~ gapi.auth2.getAuthInstance().signOut()
		
		//~ callback(null)
		
	}

	/**
	* get the hierarchy of Accounts / Properties / Views user has access to
	* 
	*/
	this.getViews = function(callback) {
		
		debug('retrieving list of views')
	
		gapi.client.analytics.management.accountSummaries.list().then(function(res) {
			
			callback(res)
		})
		
	}
	
}

module.exports = AnalyticsApi

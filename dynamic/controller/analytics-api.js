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
	
	console.log('instantiating analyticsApi')
	
	// load the API client
	gapi.load('client:auth2', function() {
		
        gapi.auth2.init({
			client_id: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
			, scope: 'https://www.googleapis.com/auth/analytics.readonly'
        }).then(function () {

			debug('gapi client initialized', gapi.auth2.getAuthInstance())
			
			// Proof-of-concept request
			gapi.client.load('analytics', 'v3').then(function() {

				// Get a list of all Google Analytics accounts for this user
				gapi.client.analytics.management.accounts.list().then(function(data) {
					
						console.log('accounts list', data)
				})
			})
          
			callback()
        
		})
	})
	
	
	/**
	* get all Analytics properties to which the user has access
	* 
	* @return {object} array of property Ids
	* 
	* @private
	* 
	*/		
	function getProperties () {
		
		
	}
	
	/**
	* get all Analytics views to which the user has access, for a given property
	* 
	* @param {string} propertyId
	* 
	* @return {object} array of view Ids
	* 
	* @private
	* 
	*/		
	function getViews (property) {
		
		
	}
	
	/**
	* get the realtime visitors count from certain Google Analytics view
	* 
	* @return {number} the number of visitors
	* 
	* @private
	* 
	*/		
	function getVisitorsCount (viewId) {
		
		
	}
	
	/**
	* listener
	* 
	* @return {} 
	* 
	* @private
	* 
	*/		
	function updateSigninStatus (isSignedIn) {
        
		console.log('updateSigninStatus', isSignedIn)
		
		
	}
		
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/

	/**
	* Sign iin with Google
	* 
	* @return {string} access token
	* 
	*/	
	this.signIn = function() {
		
		debug('signing user in')
		
		gapi.auth2.getAuthInstance().signIn()
		
		//~ console.log('auth2', gapi.auth2)

		return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
		
		
		
	}
	
}

module.exports = AnalyticsApi

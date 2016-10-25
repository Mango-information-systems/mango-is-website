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
function AnalyticsApi(gapi) {
	
	console.log('instantiating analyticsApi')
	
	
	gapi.load('client:auth2', function() {
		
        gapi.auth2.init({
			client_id: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
        }).then(function () {

          auth2 = gapi.auth2.getAuthInstance()
          console.log(auth2)
		
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
		
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/

	/**
	* titi
	* 
	* @param {object} name
	* 
	*/	
	this.titi = function() {}
	
}

module.exports = AnalyticsApi

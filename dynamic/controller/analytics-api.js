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
	
	console.log('instantiating analyticsApi')
	
	this.callback = callback
	
	this.data = {
		name: 'ga'
		, children: []
	}
	
	// load the API client
	gapi.load('client:auth2', function() {
		
        gapi.auth2.init({
			client_id: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
			, scope: 'https://www.googleapis.com/auth/analytics.readonly'
        }).then(function () {

			debug('gapi client initialized', gapi.auth2.getAuthInstance())
			
			getAccounts()
          
			//~ callback()
        
		})
	})
	
	/**
	* get all Analytics accounts to which the user has access
	* 
	* @return {object} array of property Ids
	* 
	* @private
	* 
	*/		
	function getAccounts () {
		
		gapi.client.load('analytics', 'v3').then(function() {

			gapi.client.analytics.management.accounts.list().then(function(res) {
				
					//~ console.log('accounts list', res)
					
					if (res.status !== 200)
						console.log('error receiving accounts list', res)
					else {
						//~ self.accounts = res.result.items
						res.result.items.forEach(function(account) {
							self.data.children.push({
								id: account.id
								, name: account.name
								, children: []
							})
						})
						
						getProperties(0)
					}
			})
			.then(null, function(err) {
				// Log any errors.
				console.log(err)
			})
		})
		
	}
	
	/**
	* get all Analytics properties to which the user has access
	* 
	* @return {object} array of property Ids
	* 
	* @private
	* 
	*/		
	function getProperties (accountIndex) {
		
		if (accountIndex === self.data.children.length) {
			console.log('went through all accounts')
			console.log('views', self.data)
			
			self.callback(self.data)
		}
		else {
			
			var accountId = self.data.children[accountIndex].id
			
			gapi.client.analytics.management.webproperties.list({'accountId': accountId}).then(function(res) {
				
					//~ console.log('properties list', res)
					
					if (res.status !== 200)
						console.log('error receiving properties list', res)
					else {
						
						//~ self.properties = res.result.items

						res.result.items.forEach(function(property) {
							self.data.children[accountIndex].children.push({
								id: property.id
								, name: property.name
								, children: []
							})
						})
						
						getViews(accountIndex, 0)
					}
			})
			.then(null, function(err) {
				// Log any errors.
				console.log(err)
			})

		}
		
	}
	
	/**
	* get the first Analytics view to which the user has access, for a given property
	* 
	* @param {number} accountIndex index of the properties fetching
	* 
	* @param {number} propertyIndex index of the properties fetching
	* 
	* @return {object} array of view Ids
	* 
	* @private
	* 
	*/		
	function getViews (accountIndex, propertyIndex) {
		
		if (propertyIndex === self.data.children[accountIndex].children.length) {
			//~ console.log('went through all properties for account', accountIndex)
			getProperties (++accountIndex)
		}
		else {
		
			var accountId = self.data.children[accountIndex].id
				, propertyId = self.data.children[accountIndex].children[propertyIndex].id
			
			gapi.client.analytics.management.profiles.list({
					'accountId': accountId
					, 'webPropertyId': propertyId
				}).then(function(res) {
				
					//~ console.log('views list', res)
					
					if (res.status !== 200)
						console.log('error receiving views list', res)
					else {

						res.result.items.forEach(function(view) {
							
							self.data.children[accountIndex].children[propertyIndex].children.push({
								id: view.id
								, name: view.name
							})
						})
				
						getViews (accountIndex, ++propertyIndex)
						
					}
			})
			.then(null, function(err) {
				// Log any errors.
				console.log(err)
			})
		}
		
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

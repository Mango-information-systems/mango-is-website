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
		, max: 0
	}
	
	this.viewIds = []
	
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
	* @param {number} accountIndex index of the account to fetch
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
			
			//~ self.callback(self.data)
			
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

		gapi.client.analytics.data.realtime.get({
			'ids': 'ga:' + self.data.children[accountIndex].children[propertyIndex].viewId,
			'metrics': 'rt:activeUsers'
		})
		.then(function(response) {
			
			self.data.children[accountIndex].children[propertyIndex].value = response.result.totalsForAllResults['rt:activeUsers']
			self.data.max = Math.max(self.data.max, response.result.totalsForAllResults['rt:activeUsers'])
			
			// todo: setup view rendering
			// todo: setup stats update
			
		})
		.then(null, function(err) {
				// Log any errors.
				console.log(err)
		})
		
	}
	
	/**
	* get the first Analytics view to which the user has access, for a given property
	* 
	* @param {number} accountIndex index of the account to fetch
	* 
	* @param {number} propertyIndex index of the property fetch
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

						self.data.children[accountIndex].children[propertyIndex].viewId = res.result.items[0].id
						self.data.children[accountIndex].children[propertyIndex].viewName = res.result.items[0].name
						
						self.viewIds.push(res.result.items[0].id)
				
						getRealTimeStats (accountIndex, propertyIndex)
						
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
	function getViewStats (viewId) {
		
		
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

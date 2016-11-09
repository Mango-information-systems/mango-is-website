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
	* get all Analytics accounts to which the user has access
	* 
	* @private
	* 
	*/		
	function getAccounts () {
	

		gapi.client.analytics.management.accountSummaries.list().then(function(res) {

			console.log('account summary', res)
			
			// build hierarchical data structure 
			res.result.items.forEach(function(account, accountIndex) {
				
				self.data.children.push({
					id: account.id
					, name: account.name
					, children: []
				})
				
				account.webProperties.forEach(function(property, propertyIndex) {
					
					self.data.children[accountIndex].children.push({
						id: property.id
						, name: property.name
					})
					
					property.profiles.forEach(function(view, viewIndex) {
						
// temp limit	
if (viewIndex === 0) {
						self.data.children[accountIndex].children[propertyIndex].viewId = view.id
						self.data.children[accountIndex].children[propertyIndex].viewName = view.name
						
						self.viewIds.push(view.id)
						
						getRealTimeStats (accountIndex, propertyIndex)
}
					})
				})
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
			//~ console.log('views', self.data)
			
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
	* get the hierarchy of Accounts / Properties / Views user has access to
	* 
	* @return {string} access token
	* 
	*/
	this.getData = function(callback) {
		
		debug('signing user in')
		
		gapi.auth2.getAuthInstance().signIn()
		
		//~ console.log('auth2', gapi.auth2)

		return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
		
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

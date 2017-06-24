window.appDebug = require('debug')

var debug = window.appDebug('SE-api')
	, request = require('request')
	, params = require('../params-client')

/**
* wrapper around stackExchange API This controller handles the following logic:
* 
* * Connect and authentify user
* * make API calls
* 
* @param {object} SE: the stackExchange api client library instance
* @param {function} callback: the function to be called once user authentication is done
* @param {function} updateFunction: the function to call whenever some update stats are received
* 
* @constructor
* 
*/
function SEApi(accessToken) {
	
	
	var self = this
		, apiUrl = 'https://api.stackexchange.com/2.2/'
		if (typeof accessToken !== 'undefined')
			this.accessToken = accessToken

	SE.init({ 
		clientId: params.stackExchange.clientId, 
		key: params.stackExchange.key
		, channelUrl: window.location.href
		, complete: function(data) { 
			debug('SE init complete', data)
		}
	})
	
	/******************************************
	 * 
	 * Private functions
	 * 
	 * ***************************************/
	
	/**
	* get tag stats for a given user
	* 
	* @param {number} userId
	* @param {function}  callback function
	* 
	* @private
	*/	
	function getTagStats(currentPage, callback) {

		request.get(apiUrl + 'me/tags', {
			qs: {
				key: params.stackExchange.key
				, site: 'stackoverflow'
				, order: 'desc'
				, sort: 'popular'
				, access_token: self.accessToken
				, filter: 'default'
				, pagesize: 100
				, page: currentPage
			}
			, json: true
			, gzip: true
		}, function(err, res, body) {
			if (err) 
				throw err
			//~ console.log('getStats result', err, res.statusCode)
			//~ console.log(body)
			//~ callback(body.items[0].user_id)
			
			self.tagStats = self.tagStats.concat(body.items)
			
			if (body.has_more)
				getTagStats(currentPage+1, callback)
			else
				callback(self.tagStats)
			
		})
	}
	
	/**
	* get stackOverflow userId for the connected user
	* 
	* @param {function} callback function
	* 
	* @private
	*/	
	//~ function getUserId(callback) {
		//~ 
		//~ request.get(apiUrl + 'me', {
			//~ qs: {
				//~ key: params.stackExchange.key
				//~ , site: 'stackoverflow'
				//~ , order: 'desc'
				//~ , sort: 'reputation'
				//~ , access_token: self.accessToken
				//~ , filter: 'default'
			//~ }
			//~ , json: true
			//~ , gzip: true
		//~ }, function(err, res, body) {
			//~ if (err) 
				//~ throw err
			//~ console.log(body)
			//~ callback(body.items[0].user_id)
		//~ })
	//~ }
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/
	
	/**
	* get stackOverflow activity stats
	* 
	*/		
	this.getStats = function(callback) {

		debug('getStats')
		
		self.tagStats = []
		
console.log('callback function', callback)
		
		getTagStats(1, callback)

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
	* Sign in with SE
	* 
	*/	
	this.signIn = function(callback) {
		
		debug('signing user in')
		
		SE.authenticate({
			success: function(data) { 
				console.log('auth response', data)
				
				//~ console.log(
					//~ 'User Authorized with account id = ' + 
					//~ data.networkUsers[0].account_id + ', got access token = ' + 
					//~ data.accessToken
				//~ )
				
				this.accessToken = data.accessToken
				
				callback(null, data.accessToken)
			},
			error: function(data) { 
				console.log('An error occurred:\n' + data.errorName + '\n' + data.errorMessage) 
				throw new Error(data.errorName, data.errorMessage)
			},
			networkUsers: true
		})

		
	}

	//~ /**
	//~ * Sign out from SE
	//~ * 
	//~ */	
	//~ this.signOut = function(callback) {
		//~ 
		//~ debug('signing user out')
//~ 
		//~ 
	//~ }
	
}

module.exports = SEApi

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
	* @param {function} callback function
	* 
	* @private
	*/	
	function getTagStats(callback) {

		request.get(apiUrl + 'me/tags', {
			qs: {
				key: params.stackExchange.key
				, site: 'stackoverflow'
				, order: 'desc'
				, sort: 'popular'
				, access_token: self.accessToken
				, filter: 'default'
				, pagesize: 30
				//~ , pagesize: 4
			}
			, json: true
			, gzip: true
		}, function(err, res, body) {
			if (err) 
				throw err
			//~ console.log('getStats result', err, res.statusCode)
			//~ console.log(body)
			//~ callback(body.items[0].user_id)
			
			getTagGraph(0, 1, body.items, [], callback)
			
		})
	}
	
	/**
	* get tag relationships graph
	* 
	* @param {function} callback function
	* 
	* @private
	*/	
	function getTagGraph(tagIndex, pageIndex, tags, relations, callback) {


		if (tagIndex >= tags.length)
			formatGraph(tags, relations, callback)
		else {
//~ console.log('retrieving related tags for', tags[tagIndex].name)
			request.get(apiUrl + 'tags/' + tags[tagIndex].name + '/related', {
				qs: {
					key: params.stackExchange.key
					, site: 'stackoverflow'
					, access_token: self.accessToken
					, filter: 'default'
					, pagesize: 30
					, page: pageIndex
				}
				, json: true
				, gzip: true
			}, function(err, res, body) {
				if (err) 
					throw err
				//~ console.log('getTagGraph result', err, res.statusCode)
				//~ console.log(body)

				relations.push({tag: tags[tagIndex].name, relations: body.items})
				//~ console.log('relations', relations)
				if (body.has_more)
					// get next page
					getTagGraph(tagIndex, pageIndex + 1, tags, relations, callback)
				else
					// get relations for next tag
					getTagGraph(tagIndex+1, 1, tags, relations, callback)
				
			})
		}
	}
	
	/**
	* format graph dataset
	* 
	* @param {function} callback function
	* 
	* @private
	*/	
	function formatGraph(tags, relations, callback) {
//~ console.log('relations', relations)

		var res = {
				nodes: []
				, links: []
				, maxWeight: 0
				, minWeight: +Infinity
			}
			, linksObj = {}
			, validTags = []
		
		tags.forEach(function(tag) {
			res.nodes.push({
				name: tag.name
				, count: tag.count
			})
			
			validTags.push(tag.name)
		})
		
		// filter and sort relations
		relations.forEach(function(relation) {
			
			var from = relation.tag
			
			relation.relations.forEach(function(to) {
				
				if (validTags.indexOf(to.name) !== -1 && from !== to.name) {
					
					var sortedTagNames = [from, to.name].sort()

					if (!linksObj[sortedTagNames[0]])
						linksObj[sortedTagNames[0]] = {}
//~ console.log('relation', from, to.name)

					// store relation
					linksObj[sortedTagNames[0]][sortedTagNames[1]] = to.count

					// update min/max counts - to be used as edge weight scale's domain
					if (to.count > res.maxWeight)
						res.maxWeight = to.count
					if (to.count < res.minWeight)
						res.minWeight = to.count

				}
			})
		}) 
		
		Object.keys(linksObj).forEach(function(from) {
			
			Object.keys(linksObj[from]).forEach(function(to) {
				
				res.links.push({
					source: validTags.indexOf(from)
					, target: validTags.indexOf(to)
					, weight: linksObj[from][to]
				})
			})
		})
		
		//~ console.log(validTags)
		//~ console.log(linksObj)
		//~ console.log(res)
		
		callback(res)


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
		
		getTagStats(callback)

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

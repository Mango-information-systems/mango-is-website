window.appDebug = require('debug')

var debug = window.appDebug('SE-api')
	, request = require('request')
	, params = require('../params-client')
	, jLouvain = require('jLouvain') // todo move this (and the whole formatGraph function)
	

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
function SEApi(accessToken, showChart) {

	var self = this
		, apiUrl = 'https://api.stackexchange.com/2.2/'
		if (accessToken)
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
	* get tag relationships graph
	* 
	* @param {function} callback function
	* 
	* @private
	*/	
	function getTagGraph(tagIndex, pageIndex, tags, relations, callback) {

		if (tagIndex >= tags.length) {
			let graph = formatGraph(tags, relations)
			callback(null, graph)
		}
		else {
//~ console.log('retrieving related tags for', tags[tagIndex].name)

			request.get(apiUrl + 'tags/' + encodeURIComponent(tags[tagIndex].name) + '/related?'
				+ 'key=' + params.stackExchange.key
				 + '&site=' + 'stackoverflow'
				 + '&access_token=' + self.accessToken
				 + '&filter=' + 'default'
				 + '&pagesize=' + 30
				 + '&page=' + pageIndex
				, {
					json: true
					, gzip: true
				}
			, function(err, res, body) {
				if (err || res.statusCode !== 200) {

					if (res.statusCode === 0 && err.message === '[object ProgressEvent]') {
						// requesting this tag's graph failed because of adblocking addon, skip it
						self.incompleteData = true
						getTagGraph(tagIndex+1, 1, tags, relations, callback)
					}
					else if (body.error_id === 403) {
						debug('access token expired, user needs to initiate sign in again...')
						callback('access-token-expired')
					}
					else {
						console.log('error retrieving tags graph', res.statusCode, res)
						throw err
					}
				}
				else {
					
					//~ console.log('getTagGraph result', err, res.statusCode)
					//~ console.log(body)

					relations.push({tag: tags[tagIndex].name, relations: body.items})
					
					if (tagIndex %10 === 0) {
					// update graph rendering as extraction progresses
						
						// only the nodes for which links have currently been retrieved are sent to the view
						let linkedTags = []
						
						relations.forEach(relation => {linkedTags = linkedTags.concat(relation.relations.map(d => d.name))})
						
						let currentTags = tags.filter(t => linkedTags.includes(t.name))
						//~console.log('currentTags', currentTags)
						
						showChart(formatGraph(currentTags, relations))
					}
					
					//~ console.log('relations', relations)
					if (body.has_more)
						// get next page
						getTagGraph(tagIndex, pageIndex + 1, tags, relations, callback)
					else
						// get relations for next tag
						getTagGraph(tagIndex+1, 1, tags, relations, callback)
				}
				
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
	function formatGraph(tags, relations) {
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
		
		// store edges in an array (to be used by community detection algorithm
		var edgeData = []
		
		Object.keys(linksObj).forEach(function(from) {
			
			Object.keys(linksObj[from]).forEach(function(to) {

				edgeData.push({source: from, target: to, weight: linksObj[from][to]})

				res.links.push({
					source: validTags.indexOf(from)
					, target: validTags.indexOf(to)
					, weight: linksObj[from][to]
				})
			})
		})

		var community = jLouvain().nodes(validTags).edges(edgeData)
			, groups = community()

		// store community info in each node record
		res.nodes.forEach(function(node) {
			node.group = groups[node.name]
		})
		
		var maxCommunityId = 0
		
		Object.keys(groups).forEach(function(key) {
			if (groups[key] > maxCommunityId)
				maxCommunityId = groups[key]
		})
		
		res.communitiesCount = maxCommunityId + 1
		
		if (self.incompleteData)
			res.isIncomplete = true
		
		//~ console.log('community', groups)
		
		//~ console.log(validTags)
		//~ console.log(linksObj)
		//~ console.log(res)
		
		return res


	}
	

	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/
	
	/**
	* get stackOverflow tags graph
	* 
	* @param {function} callback function
	* 
	*/
	this.getStats = function(callback) {

		debug('getStats')
		
		request.get(apiUrl + 'me/tags?'
		//~ request.get(apiUrl + 'users/831180/tags?' // test with a different account: toch
		//~ request.get(apiUrl + 'users/6309/tags?' // test with a different account : VonC
		//~ request.get(apiUrl + 'users/365814/tags?' // test with a different account : mbostock
		//~ request.get(apiUrl + 'users/22656/tags?' // test with a different account: Jon Skeet
				+ 'key=' + params.stackExchange.key
				+ '&site=' + 'stackoverflow'
				+ '&order=' + 'desc'
				+ '&sort=' + 'popular'
				+ '&access_token=' + self.accessToken
				+ '&filter=' + 'default'
				+ '&pagesize=' + 60
			, {
				json: true
				, gzip: true
			}
		, function(err, res, body) {
			
			if (err || res.statusCode !== 200) {
				if (body.error_id === 403) {
					debug('access token expired, user needs to initiate sign in again...')
					
					callback('access-token-expired')
				}
				else {
					console.log('error retrieving tags stats', res.statusCode, body)
					throw err
				}
			}
			else {
				
				//~ console.log('getStats result', err, res.statusCode)
				//~ console.log('tagStats', body)

				// temporary
				// work around a bug in jLouvain.js, crashing whenever a name is 'constructor' (overrides object's native property)
				// todo report / fix the bug
				var tags = body.items.filter(function(tag) {return tag.name !== 'constructor'})
				
				getTagGraph(0, 1, tags, [], callback)
			}
				
		})

	}
	
	/**
	* get stackOverflow user information stats
	* 
	* @param {function} callback function
	* 
	*/		
	this.getUser = function(callback) {

		debug('getUser')
		
		request.get(apiUrl + 'me?'
		//~ request.get(apiUrl + 'users/831180?' // test with a different account: toch
		//~ request.get(apiUrl + 'users/6309?' // test with a different account : VonC
		//~ request.get(apiUrl + 'users/365814?' // test with a different account: mbostock
		//~ request.get(apiUrl + 'users/22656?' // test with a different account: Jon Skeet
				+ 'key=' + params.stackExchange.key
				+ '&site=' + 'stackoverflow'
				+ '&order=' + 'desc'
				+ '&sort=' + 'reputation'
				+ '&access_token=' + self.accessToken
				+ '&filter=' + 'default'
			, {
				json: true
				, gzip: true
			}
		, function(err, res, body) {
			
			if (err || res.statusCode !== 200) {
				if (body.error_id === 403) {
					debug('access token expired, user needs to initiate sign in again...')
					
					callback('access-token-expired')
				}
				else {
					console.log('error retrieving user information', res.statusCode, body)
					throw err
				}
			}
			else {
				
				callback(null, body.items[0])
			}
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
				//~console.log('auth response', data)
				
				//~ console.log(
					//~ 'User Authorized with account id = ' + 
					//~ data.networkUsers[0].account_id + ', got access token = ' + 
					//~ data.accessToken
				//~ )
				
				self.accessToken = data.accessToken
				
				callback(null, data.accessToken)
			}
			, error: function(data) { 
				console.log('An error occurred:\n' + data.errorName + '\n' + data.errorMessage) 
				throw new Error(data.errorName, data.errorMessage)
			}
			, networkUsers: true
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

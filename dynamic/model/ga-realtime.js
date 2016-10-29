var storage = require('localforage')

/********************************************************
* Google Analytics realtime monitor app datastore
* 
* localforage is used as a persistence layer.
* 
* @constructor
* 
*********************************************************/
function Storage() {

	var self = this

	/**
	* 
	* retrieve value for a specific key
	* 
	* @param {string} key the storage key
	* 
	* @return {string} the corresponding storage value
	* 
	*/
	this.getItem = function(key) {
		
		if (['accessToken'].indexOf(key) !== -1) {
			storage.getItem(key, function(err, res) {
				if (err)
					console.error('error retrieving stored record', err)
				else
					return res
			})
		}
		else 
			console.error('invalid key used in getItem function', key)
	}

	/**
	* 
	* set value for a specific key
	* 
	* @param {string} key
	* @param {string} value
	* 
	*/
	this.setItem = function(key, value) {
		
		if (['accessToken'].indexOf(key) !== -1) {
		
			storage.setItem(key, value, function(err, res) {
				if (err)
					console.error('error storing record', key, err)
			})
			
		}
		else 
			console.error('invalid key used in setItem function', key)
	}

	/**
	* 
	* delete a key/value pair
	* 
	* @param {string} key
	* 
	*/
	this.removeItem = function(key) {
		
		if (['accessToken'].indexOf(key) !== -1) {
		
			storage.remove(key, function(err) {
				if (err)
					console.error('error removing record', key, err)
			})
			
		}
		else 
			console.error('invalid key used in removeItem function', key)
	}
	
}

module.exports = Storage

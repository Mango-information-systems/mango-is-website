window.appDebug = require('debug')

var debug = window.appDebug('stateManager')

/**
* manage application state
* 
* * Initialize the app according to whether the user is connected or not
* * switch displays according to state changes
* 
* @param {object} app
* 
* @constructor
* 
*/
function StateManager(app) {
	
	console.log('instantiating stateManager')
	
	/**
	* toto
	* 	* 
	* @param {string} toto
	* 
	* @return {object} 
	* 
	* @private
	* 
	*/		
	function toto () {
	}
	
	/******************************************
	* 
	* Public functions
	* 
	******************************************/
	
	
	/**
	* initialize application
	* 
	* @param {object} name
	* 
	*/	
	this.init = function() {
		
		debug('initializing app')
		
		
	}
	
}

module.exports = StateManager

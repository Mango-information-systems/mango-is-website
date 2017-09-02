/**
* ES5 script to check whether ES6 features used on this site are supported
* 
* @constructor
* 
*/
function Checker() {
	
	

	/**
	* Check whether the following ES6 features are supported:
	*   * class keyaord
	* 
	* based on https://stackoverflow.com/a/29046739
	* 
	* @return {Boolean} test result
	* 
	* @private
	*/
	function check () {
		'use strict'

		//~ if (typeof Symbol == 'undefined') return false
		try {
			eval('class Foo {}')
			//~ eval('var bar = (x) => x+1')
		} catch (e) {
			return false
		}

		return true
	}


	/**
	* Load a script according to 
	* 
	* @param {string} toLoad path of ES6 script to be loaded
	* @param {function} fallback code
	* 
	* based on https://stackoverflow.com/a/29046739
	* 
	* @return {Boolean} test result
	* 
	* @private
	*/
	this.loadIfSupportES6 = function(toLoad, fallback) {
		
		if (check()) {
			// The engine supports ES6 features you want to use
			var s = document.createElement('script')
			s.src = toLoad
			document.body.appendChild(s)
			
		} else {
			// The engine doesn't support those ES6 features
			// Use the boring ES5 :(
			fallback()
		}
	}

}

module.exports = Checker

window.appDebug = require('debug')

var debug = window.appDebug('gaCustom')
	, scrollDepth = require('gascrolldepth')
	, goals = require('../data/conversion-goals')

/**
* Custom Google Analytics tracking
* 
* This module activates the custom Google Analytics setup:
* 
* * custom events
* * custom page views
* * scrollDepth
* 
* @constructor
* 
*/
function GaCustom() {
	
	var self = this
	
	
	/**
	* Activate the custom tracking
	*   * scrollDepth tracking
	*   * errors reporting
	*   * Conversions funnel tracking
	* 
	*/
	this.init = function() {
		
		debug('initializing gaCustom')
		
		if (typeof ga === 'undefined')
			window.ga = function() {void 0}
		
		// initialize scrollDepth measurement
		gascrolldepth.init({
			userTiming: false
			, pixelDepth: false
		})
		
		// client-side error reporting
		window.onerror = function(message, file, line) {
		
			debug('caught client-side error', message, file, line)

			self.toGa('exception', {
				description: file + ':' + line + '-' + message
			})
		}
		
		// CTA clicks tracking
		var ctaParent = document.getElementsByClassName('page-wrapper')[0]
		
		ctaParent.addEventListener('click', function(e) {

			if (e.target.tagName === 'A' && e.target.className.indexOf('cta') !== -1) {
				debug('cta clicked')
				
				e.preventDefault()
				
				var trg = e.target.getAttribute('data-trg')

				self.toGa('pageview', {page: trg})
				
				setTimeout(function() {
					window.location = e.target.getAttribute('href')
				}, 0)
			}
			

		})
		
	}
	
	/**
	* Helper function to track custom page views, exceptions and events tracking
	* 
	* @param {string} type: what should be tracked
	* 
	* @param {object} opts of messages matching the filters
	*
	*/
	this.toGa = function(type, opts)  {
		
		var opts = opts || {}

		debug('Google Analytics custom tracking:', type, opts)
		
		switch(type) {
			case 'exception':

				var exceptionData = {
					exDescription: opts.description
				}
				if (opts.fatal)
					exceptionData.exFatal= opts.fatal
				ga('send', 'exception', exceptionData)
				
				// also record an event in order to benefit from Intelligence events
				ga('send', 'event', 'site', 'exception', opts.description)

			break;
			
			case 'event':
				var eventData = {
					hitType: 'event'
					, eventCategory: opts.category
					, eventAction: opts.action
				}
				if (opts.label)
					eventData.eventLabel = opts.label
				if (opts.value)
					eventData.eventValue = opts.value
				if (opts.nonInteraction)
					eventData.nonInteraction = 1
				ga('send', eventData)
			break;
			
			case 'pageview':
				var pageViewData = {}
				
				if (opts.page)
					pageViewData.page = opts.page
					
				ga('send', 'pageview', pageViewData)
			break;
		}
	}
	
}

module.exports = GaCustom

var d3 = require('d3')
	, ejs = require('ejs')
	, fs = require('fs')
	, DonutChart = require('./donutChart')

/**
* donut charts view
* 
* Builds the array of properties donut charts view
*
* @constructor
* 
*/
function Donuts() {
	
	var self = this
	
	this.donutTemplate = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/ga-realtime/donut.ejs', 'utf-8'))

	this.donutCharts = []

	/**
	 * render the property view: property name and empty donut chart
	 * 
	 * @param {object} opts
	 * 
	 */
	this.render = function(opts, callback) {

		var res = []
		
		self.donutCharts = []
		
		opts.properties.forEach(function(property, i) {
			
			self.donutCharts.push(new DonutChart())
			
			res.push(self.donutTemplate({
				
				property: property
				, donut: self.donutCharts[i].init({data: property})
			}))
			
		})

		opts.target.html(res.join(''))

		// update d3 selectors so that they use DOM nodes (they were initialized in a detached node)
		self.donutCharts.forEach(function(chart) {
			chart.setSelectors()
		})
		
	}
	/**
	 * update the donut chart with new data coming from property view: property name and empty donut chart
	 * 
	 * @param {object} properties updated data
	 * 
	 */
	this.update = function(properties) {	
		
		// update d3 selectors so that they use DOM nodes (they were initialized in a detached node)
		self.donutCharts.forEach(function(chart, i) {
			
			// update all charts
			setTimeout(function() {
				chart.update(properties[i])
			}, i * 200)
			
		})
	}

}

module.exports = new Donuts()

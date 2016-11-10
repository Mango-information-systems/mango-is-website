var d3 = Object.assign({}, require('d3'), require('d3-scale-chromatic'))
window.d3 = d3
/**
* donut chart view
*
* @constructor
* 
* @param {object} opts
*   * {object} data view data
* 
* @return {string} chart SVG
* 
*/
function DonutChart() {

	var self = this
		, tau = 2 * Math.PI

	/****************************************
	 *
	 * Private methods
	 *
	 ****************************************/
	
	/**
	 * Draw or update the donut chart arcs
	 * 
	 * @private
	 * 
	 */
	function drawBars() {

		self.g.selectAll('.bar')
			.data(self.data, function(d) { return d.id })
		  .enter()
		    .append('path')
		    .attr('class', 'bar')
			.style('fill', function(d, i) {

				return self.barColors(d.value / self.maxValue)
			})
		    .attr('d', function(d, i) {
				
				return self.arcs[i](d)
		    })
	}

	/**
	 * Generate the donut chart labels (using view names)
	 * 
	 * @private
	 * 
	 */
	function drawLabels() {
		
		self.svg.selectAll('.label').data(self.data)
		  .enter()
		    .append('text')
		    .text(function(d) {
			  return d.name  
		    })
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return self.yScale.range([20, 130])(i)
		    })
	}
	
	/**
	 * Draw or update the metric values
	 * 
	 * @private
	 * 
	 */
	function drawValues() {
		
		self.svg.selectAll('.value').data(self.data)
		  .enter()
		    .append('text')
		    .attr('class', 'value')
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return self.yScale.range([290, 180])(i)
		    })
		    
		self.svg.selectAll('.value').data(self.data)
		    .text(function(d) {
			  return  Math.floor(d.value)
		    })
	}
	
	/**
	 * Returns a tween for a transition’s "d" attribute, transitioning any selected
	 * arcs from their current angle to the specified new angle.
	 * 
	 * As seen in http://bl.ocks.org/mbostock/5100636
	 *
	 * @param {number} newAngle
	 * 
	 * @return {function} tween function
	 * 
	 * @private
	 * 
	 */
	function arcTween(d, i) {
		
		var interpolate = d3.interpolate({value: d.previous}, d)
		
		return function(t) {
			//~ if (i === 0)
				//~ console.log('updating arc', self.arcs[i](interpolate(t)))
				
			return self.arcs[i](interpolate(t))
		}
	}
	
	/**
	 * Returns a tween for a transition’s "text" attribute, transitioning any selected
	 * text from their current value to the specified new value.
	 * 
	 * @param {number} oldValue
	 * @param {number} newValue
	 * 
	 * @return {function} tween function
	 * 
	 * @private
	 * 
	 */
	function textTween(d, i) {

		// TODO fix this (broken)

		var interpolate = d3.interpolate({value: d.previous}, d)

		return function(t) {
			return Math.floor(interpolate(t))
		}
	}

	//~ /**
	 //~ * Update total tweets counters
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function updateTotalCount() {
		//~ self.totalCount.datum(self.stats.totalCount).transition()
		    //~ .tween('text', textTween(self.stats.previousTotal, self.stats.totalCount))
	//~ }

	/****************************************
	 *
	 * Public methods
	 *
	 ****************************************/

	/**
	 * 
	 *
	 * @param {object} 
	 * 
	 */
	this.render = function (opts) {
		//~ console.log(opts.data.profiles)
	
		// create SVG container (detached)
		self.svg = d3.select(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
		
		self.svg.attr('id', opts.data.id)
		self.svg.attr('width', '100%')
		self.svg.attr('height', '100%')
		self.svg.attr('preserveAspectRatio', 'xMinYMin')
		self.svg.attr('viewBox', '0 0 500 300')
			
		self.g = self.svg.append('g').attr('transform', 'translate(250, 150)')
		
		self.propertyId = opts.data.id
		
		// initialize data structure
		self.data = opts.data.profiles.map(function(view) {
			
			return {
				id: view.id
				, name: view.name
				, value: 0
				, previous: 0
			}
		})
		
		self.yScale = d3.scaleLinear()
		  .domain([0, self.data.length])
		
		
		self.arcs = []
		
		self.barColors = d3[opts.barColorsFn]
		
		self.maxValue = +Infinity

		self.data.forEach(function(view, i) {
			
			// create arc function for this view
			var outerRadius = self.yScale.range([138, 27])(i)
				, arc = d3.arc()
				  .innerRadius(outerRadius - 16)
				  .outerRadius(outerRadius)
				  .startAngle(0)
				  .endAngle(function(d) { return d.value / self.maxValue * tau / 2 })
			  
			self.arcs.push(arc)
			
			//~ self.data[i].endAngle = view.value / self.maxValue * tau / 2
			
		})
		
		var bgArc = d3.arc()
			.innerRadius(40)
			.outerRadius(145)
			.startAngle(0)
			.endAngle(tau / 2)
			
		var bg = self.g.append('path')
			.style('fill', '#eeeeee')
			.attr('d', bgArc)
		
		drawLabels()
		
		drawBars()
		
		return self.svg.nodes()[0].outerHTML

	}

	/**
	 * Update d3 selections once the svg is attached to the DOM
	 * 
	 */
	this.setSelectors = function () {
		
		self.svg = d3.select('#' + self.propertyId)
		self.g = self.svg.select('g')
		
		// bind data
		self.g.selectAll('.bar').data(self.data)
		self.g.selectAll('.value').data(self.data)
		
	}

	/**
	 * Update donut chart
	 *
	 * @param {number} data updated visit stats
	 * 
	 */
	this.update = function (data) {

		// update data, keeping previous value information
		self.data = data.profiles.map(function(view, i) {
			
			return {
				id: view.id
				, name: view.name
				, value: view.value
				, previous: self.data[i].value
			}
		})
		
		self.maxValue = data.maxValue
		
		self.g.selectAll('.bar')
			.data(self.data)
			.transition()
			.duration(600)
			  .ease(d3.easeExpInOut)
			  .attrTween('d', arcTween)	
			  .style('fill', function(d, i) {
				return self.barColors(d.value / self.maxValue)
			  })
		  
		drawValues()
	}

}

module.exports = DonutChart

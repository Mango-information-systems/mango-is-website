var d3 = require('d3')


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

		// TODO color with https://github.com/d3/d3-scale-chromatic#sequential-single-hue
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', '#008000')
		//~ .attr('d', replyArc)
		
		
		self.g.selectAll('.bar').data(self.data)
		  .enter()
		    .append('path')
		    .attr('d', function(d, i) {
				
			  //~ return self.arcs[i]({endAngle : d.value / self.maxValue * tau / 2})
			  
			  // temp mockup data
			  return self.arcs[i]({endAngle : (i + 1) / 4 * tau / 2})
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
		    .text(function(d) {
			  return d.value  
		    })
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return self.yScale.range([210, 320])(i)
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
	function arcTween(newAngle, arc) {

		return function(d) {

			var interpolate = d3.interpolate(d.endAngle, newAngle)

			return function(t) {
				d.endAngle = interpolate(t)
				return arc(d)
			}
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
	function textTween(oldValue, newValue) {

		return function(d) {

			var interpolate = d3.interpolate(oldValue, newValue)

			return function(t) {
				self.totalCount.text(Math.floor(interpolate(t)))
			}
		}
	}

	//~ /**
	 //~ * Update total tweets counters
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function updateTotalCount() {
		//~ 
		//~ self.replyCount.text(self.stats.replyCount)
		//~ self.hashtagCount.text(self.stats.hashtagCount)
		//~ self.linkCount.text(self.stats.linkCount)
		//~ self.mentionCount.text(self.stats.mentionCount)
		//~ self.mediaCount.text(self.stats.mediaCount)
		//~ 
		//~ self.totalCount.datum(self.stats.totalCount).transition()
		    //~ .tween('text', textTween(self.stats.previousTotal, self.stats.totalCount))
	//~ }
	//~ 
	//~ /**
	 //~ * Update mentions counts arc
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function updateArcs() {
		//~ 
		//~ self.replySlice.transition()
		  //~ .duration(600)
		  //~ .ease(d3.easeExpInOut)
		  //~ .attrTween('d', arcTween( 3 / 4 * self.stats.replyCount / self.stats.totalCount * tau - tau / 4, replyArc))
		  //~ 
		//~ self.hashtagSlice.transition()
		  //~ .duration(600)
		  //~ .delay(250)
		  //~ .ease(d3.easeExpInOut)
		  //~ .attrTween('d', arcTween( 3 / 4 * self.stats.hashtagCount / self.stats.totalCount * tau - tau / 4, hashtagArc))
		  //~ 
		//~ self.linkSlice.transition()
		  //~ .duration(600)
		  //~ .delay(500)
		  //~ .ease(d3.easeExpInOut)
		  //~ .attrTween('d', arcTween( 3 / 4 * self.stats.linkCount / self.stats.totalCount * tau - tau / 4, linkArc))
		  //~ 
		//~ self.mentionSlice.transition()
		  //~ .duration(600)
		  //~ .delay(750)
		  //~ .ease(d3.easeExpInOut)
		  //~ .attrTween('d', arcTween( 3 / 4 * self.stats.mentionCount / self.stats.totalCount * tau - tau / 4, mentionArc))
		  //~ 
		//~ self.mediaSlice.transition()
		  //~ .duration(600)
		  //~ .delay(1000)
		  //~ .ease(d3.easeExpInOut)
		  //~ .attrTween('d', arcTween( 3 / 4 * self.stats.mediaCount / self.stats.totalCount * tau - tau / 4, mediaArc))
	//~ }
//~ 
	//~ /****************************************
	 //~ *
	 //~ * Public methods
	 //~ *
	 //~ ****************************************/
//~ 


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
		
		self.svg.attr('width', '100%')
		self.svg.attr('height', '100%')
		self.svg.attr('preserveAspectRatio', 'xMinYMin')
		self.svg.attr('viewBox', '0 0 500 300')
			
		self.g = self.svg.append('g').attr('transform', 'translate(250, 150)')
		
		// initialize data structure
		self.data = opts.data.profiles.map(function(view) {
			return {
				id: view.id
				, name: view.name
				, value: 0
			}
		})
		
		self.yScale = d3.scaleLinear()
		  .domain([0, self.data.length])
		
		
		self.arcs = []
		self.maxValue = 50
		
		opts.data.profiles.forEach(function(view, ix) {
			
			// create arc function for this view
			// TODO fix scales and make sure it's not in reverse order compared to labels
			var outerRadius = self.yScale.range([140, 30])(ix)
				, arc = d3.arc()
				  .innerRadius(outerRadius - 16)
				  .outerRadius(outerRadius)
				  .startAngle(0)
			  
			self.arcs.push(arc)
			
			// update max if applicable
			self.maxValue = view.value > self.maxValue ? view.value : self.maxValue
			
		})
		
		var bgArc = d3.arc()
			.innerRadius(40)
			.outerRadius(145)
			.startAngle(0)
			
		var bg = self.g.append('path')
			.datum({endAngle: tau / 2})
			.style('fill', '#eeeeee')
			.attr('d', bgArc)
		
		drawLabels()
		
		drawBars()
		
		// TODO remove this from render, once update function is created
		drawValues()
		
		//~ console.log('svg', self.svg)
		
		return self.svg.nodes()[0].outerHTML

	}
	//~ /**
	 //~ * Updated counters
	 //~ *
	 //~ * @param {object} newTweets new tweet(s)
	 //~ * 
	 //~ */
	//~ this.addTweets = function (newTweets) {
//~ 
		//~ if (typeof this.stats !== 'undefined') {
			//~ newTweets.forEach(updateStats)
//~ 
			//~ updateTotalCount()
			//~ 
			//~ updateArcs()
//~ 
		//~ }
	//~ }

}

module.exports = DonutChart

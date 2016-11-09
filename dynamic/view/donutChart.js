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
	
	//~ this.g = svg.append('g').attr('transform', 'translate(350, 150)')
	//~ 
	//~ this.totalCount = svg.select('#totalCount')
	//~ this.replyCount = svg.select('#replyCount')
	//~ this.hashtagCount = svg.select('#hashtagCount')
	//~ this.linkCount = svg.select('#linkCount')
	//~ this.mentionCount = svg.select('#mentionCount')
	//~ this.mediaCount = svg.select('#mediaCount')
	//~ 
	//~ var bgArc = d3.arc()
		//~ .innerRadius(40)
		//~ .outerRadius(145)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var replyArc = d3.arc()
		//~ .innerRadius(125)
		//~ .outerRadius(140)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var hashtagArc = d3.arc()
		//~ .innerRadius(105)
		//~ .outerRadius(120)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var linkArc = d3.arc()
		//~ .innerRadius(85)
		//~ .outerRadius(100)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var mentionArc = d3.arc()
		//~ .innerRadius(65)
		//~ .outerRadius(80)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var mediaArc = d3.arc()
		//~ .innerRadius(45)
		//~ .outerRadius(60)
		//~ .startAngle(- tau / 4)
	//~ 
	//~ var background = this.g.append('path')
		//~ .datum({endAngle: 3/4 * tau - tau / 4})
		//~ .style('fill', '#eeeeee')
		//~ .attr('d', bgArc)
	//~ 
	//~ this.replySlice = this.g.append('path')
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', '#008000')
		//~ .attr('d', replyArc)
	//~ 
	//~ this.hashtagSlice = this.g.append('path')
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', 'black')
		//~ .attr('d', hashtagArc)
	//~ 
	//~ this.linkSlice = this.g.append('path')
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', '#FFE936')
		//~ .attr('d', linkArc)
	//~ 
	//~ this.mentionSlice = this.g.append('path')
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', '#FF0F21')
		//~ .attr('d', mentionArc)
	//~ 
	//~ this.mediaSlice = this.g.append('path')
		//~ .datum({endAngle: 0.001 * tau - tau / 4})
		//~ .style('fill', '#00aced')
		//~ .attr('d', mediaArc)
		//~ 
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

		var yScale = d3.scaleLinear()
		  .domain([0, self.data.length])
		  .range([20, 130])
		
		self.svg.selectAll('.label').data(self.data)
		  .enter()
		    .append('text')
		    .text(function(d) {
			  return d.name  
		    })
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return yScale(i)
		    })
	}
	/**
	 * Generate the donut chart labels (using view names)
	 * 
	 * @private
	 * 
	 */
	function drawLabels() {

		var yScale = d3.scaleLinear()
		  .domain([0, self.data.length])
		  .range([20, 130])
		
		self.svg.selectAll('.label').data(self.data)
		  .enter()
		    .append('text')
		    .text(function(d) {
			  return d.name  
		    })
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return yScale(i)
		    })
	}
	
	/**
	 * Draw or update the metric values
	 * 
	 * @private
	 * 
	 */
	function drawValues() {

		var yScale = d3.scaleLinear()
		  .domain([0, self.data.length])
		  .range([210, 320])
		
		self.svg.selectAll('.value').data(self.data)
		  .enter()
		    .append('text')
		    .text(function(d) {
			  return d.value  
		    })
		    .attr('x', 240)
		    .attr('text-anchor', 'end')
		    .attr('y', function(d, i) {
			  return yScale(i)
		    })
	}
	
	//~ /**
	 //~ * Returns a tween for a transition’s "d" attribute, transitioning any selected
	 //~ * arcs from their current angle to the specified new angle.
	 //~ * 
	 //~ * As seen in http://bl.ocks.org/mbostock/5100636
	 //~ *
	 //~ * @param {number} newAngle
	 //~ * 
	 //~ * @return {function} tween function
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function arcTween(newAngle, arc) {
//~ 
		//~ return function(d) {
//~ 
			//~ var interpolate = d3.interpolate(d.endAngle, newAngle)
//~ 
			//~ return function(t) {
				//~ d.endAngle = interpolate(t)
				//~ return arc(d)
			//~ }
		//~ }
	//~ }
	//~ 
	//~ /**
	 //~ * Returns a tween for a transition’s "text" attribute, transitioning any selected
	 //~ * text from their current value to the specified new value.
	 //~ * 
	 //~ * @param {number} oldValue
	 //~ * @param {number} newValue
	 //~ * 
	 //~ * @return {function} tween function
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function textTween(oldValue, newValue) {
//~ 
		//~ return function(d) {
//~ 
			//~ var interpolate = d3.interpolate(oldValue, newValue)
//~ 
			//~ return function(t) {
				//~ self.totalCount.text(Math.floor(interpolate(t)))
			//~ }
		//~ }
	//~ }
	//~ 
	//~ /**
	 //~ * Update statistics with data from one extra tweet
	 //~ *
	 //~ * @param {object} msg new tweet
	 //~ * 
	 //~ * @private
	 //~ * 
	 //~ */
	//~ function updateStats (msg) {
//~ 
		//~ if (msg.is_reply)
			//~ self.stats.replyCount++
			//~ 
		//~ if(msg.has_hashtag)
			//~ self.stats.hashtagCount++
		//~ 
		//~ if(msg.has_link)
			//~ self.stats.linkCount++
		//~ 
		//~ if(msg.has_mention)
			//~ self.stats.mentionCount++
		//~ 
		//~ if(msg.has_media)
			//~ self.stats.mediaCount++
		//~ 
		//~ self.stats.previousTotal = self.stats.totalCount
		//~ 
		//~ self.stats.totalCount++
//~ 
	//~ }
//~ 
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
		
		var bgArc = d3.arc()
			.innerRadius(40)
			.outerRadius(145)
			.startAngle(0)
			
		var bg = self.g.append('path')
			.datum({endAngle: 3/4 * tau - tau / 4})
			.style('fill', '#eeeeee')
			.attr('d', bgArc)
		
		drawLabels()
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

var d3 = require('d3')

/**
* force layout chart view
*
* @constructor
* 
* @return {string} chart SVG
* 
*/
function ForceChart() {

	var self = this
	
	var r = d3.scaleLinear()
		  .range([10, 40])
		, color = d3.scaleOrdinal(d3.schemeCategory10)

	/****************************************
	 *
	 * Private methods
	 *
	 ****************************************/
	
	
	
	/**
	 * update chart on tick event
	 * 
	 * @private
	 * 
	 */
	 function ticked() {
		 
		  self.node.attr('cx', function(d) { return d.x })
			  .attr('cy', function(d) { return d.y })

		  //~ self.link.attr('x1', function(d) { return d.source.x })
			  //~ .attr('y1', function(d) { return d.source.y })
			  //~ .attr('x2', function(d) { return d.target.x })
			  //~ .attr('y2', function(d) { return d.target.y })
	 }

	/**
	 * Draw or update the node dots
	 * 
	 * @private
	 * 
	 */
	function drawNode() {

		//~ self.g.selectAll('.node')
			//~ .data(self.data, function(d) { return d.id })
		  //~ .enter()
		    //~ .append('path')
		    //~ .attr('class', 'bar')
			//~ .style('fill', function(d, i) {
//~ 
				//~ return self.barColors(d.value / self.maxValue)
			//~ })
		    //~ .attr('d', function(d, i) {
				//~ 
				//~ return self.arcs[i](d)
		    //~ })
	}

	/**
	 * Generate the edges
	 * 
	 * @private
	 * 
	 */
	function drawEdges() {
		
		//~ self.svg.selectAll('.label').data(self.data)
		  //~ .enter()
		    //~ .append('text')
		    //~ .text(function(d) {
			  //~ return d.name  
		    //~ })
		    //~ .attr('x', 270)
		    //~ .attr('text-anchor', 'end')
		    //~ .attr('y', function(d, i) {
			  //~ return self.yScale.range([20, 130])(i)
		    //~ })
	}

	/****************************************
	 *
	 * Public methods
	 *
	 ****************************************/

	/**
	 * initialize chart
	 * 
	 */
	this.init = function () {
		
		
		var width = 500
		var height = 300
		
		self.svg = d3.select('#app').html('')
			.append('svg')
			  .attr('width', '100%')
			  .attr('height', '100%')
			  .attr('preserveAspectRatio', 'xMinYMin')
			  .attr('viewBox', '0 0 ' + width + ' ' + height)
			  .append('g')
		
		self.svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
		
		self.link = self.svg.append('g').attr('stroke', '#000').attr('stroke-width', 1.5).selectAll('.link')
		
		self.node = self.svg.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node')
	}

	/**
	 * Update d3 selections once the svg is attached to the DOM
	 * 
	 */
	this.setSelectors = function () {
		
		//~ self.svg = d3.select('#' + self.propertyId)
		//~ self.g = self.svg.select('g')
		//~ 
		//~ // bind data
		//~ self.g.selectAll('.bar').data(self.data)
		//~ self.g.selectAll('.value').data(self.data)
		
	}

	/**
	 * Update chart
	 *
	 * @param {number} data updated graph
	 * 
	 */
	this.update = function (data) {
		
		r.domain([data[data.length-1].count, data[0].count])

		var links = []

		var simulation = d3.forceSimulation(data)
			.force('charge', d3.forceManyBody().strength(-50))
			.force('link', d3.forceLink(links).distance(200))
			.force('x', d3.forceX())
			.force('y', d3.forceY())
			.force('center', d3.forceCenter())
			//~ .alphaTarget(1)
			.on('tick', ticked)

		// Apply the general update pattern to the nodes.
		self.node = self.node.data(data, function(d) { return d.name})

		self.node = self.node.enter().append('circle')
		  .attr('fill', function(d) { return color(d.name) })
		  .call(function(node) { node.transition().attr('r', function(d) { return r(d.count)}) })
		.merge(self.node)

		
		//~ var links = [{source: data[0], target: data[1]}]

		// Apply the general update pattern to the links.
		self.link = self.link.data(links, function(d) { return d.source.name + '-' + d.target.name })
//~ 
		//~ // Keep the exiting links connected to the moving remaining nodes.
		//~ link.exit().transition()
		  //~ .attr('stroke-opacity', 0)
		  //~ .attrTween('x1', function(d) { return function() { return d.source.x } })
		  //~ .attrTween('x2', function(d) { return function() { return d.target.x } })
		  //~ .attrTween('y1', function(d) { return function() { return d.source.y } })
		  //~ .attrTween('y2', function(d) { return function() { return d.target.y } })
		  //~ .remove()
//~ 
		//~ link = link.enter().append('line')
		  //~ .call(function(link) { link.transition().attr('stroke-opacity', 1) })
		//~ .merge(link)

		// Update and restart the simulation.
		//~ simulation.nodes(nodes)
		simulation.nodes(data)
		//~ simulation.force('link').links(links)
		simulation.force('link').links(links)
		simulation.alpha(1).restart()
		
		
		//~ self.svg.selectAll('.tag').data(data)
		  //~ .enter()
		    //~ .append('text')
		    //~ .text(function(d) { console.log('here'); return d.name})
		    //~ .attr('transform', function(d, i) {
				//~ return 'translate(0, ' + i * 7.5 + ')'
			//~ })

	}

}

module.exports = ForceChart

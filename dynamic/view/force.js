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
	
	var textScale = d3.scaleLinear()
		  .range([1, 2.5])
		, color = d3.scaleOrdinal(d3.schemeCategory10)
		, r = d3.scaleLinear()
		  .range([3, 15])

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
		 
		  //~ self.node.attr('cx', function(d) { return d.x })
			  //~ .attr('cy', function(d) { return d.y })
		self.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		  //~ self.node.attr('x', function(d) { return d.x })
			  //~ .attr('y', function(d) { return d.y })

		self.link.attr('x1', function(d) { return d.source.x })
			.attr('y1', function(d) { return d.source.y })
			.attr('x2', function(d) { return d.target.x })
			.attr('y2', function(d) { return d.target.y })
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
		
		
		self.width = 650
		self.height = 500
		
		self.svg = d3.select('#app').html('')
			.append('svg')
			  .attr('width', '100%')
			  .attr('height', '100%')
			  .attr('preserveAspectRatio', 'xMinYMin')
			  .attr('viewBox', '0 0 ' + self.width + ' ' + self.height)
			  .append('g')
		
		//~ self.svg.attr('transform', 'translate(' + self.width / 2 + ',' + self.height / 2 + ')')
		
		self.link = self.svg.append('g').attr('stroke', '#ddd').attr('stroke-width', 1.5).selectAll('.link')
		
		self.node = self.svg.append('g')
			//~ .attr('stroke', '#fff').attr('stroke-width', 1.5)
			.selectAll('.node')
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
		
		textScale.domain([data.nodes[data.nodes.length-1].count, data.nodes[0].count])
		r.domain([data.nodes[data.nodes.length-1].count, data.nodes[0].count])

console.log('graph data', data)

		var linkDistance = d3.scaleLinear()
			.domain([data.maxWeight, data.minWeight])
			.range([50, 200])
			
		var weightScale = d3.scaleLog()
			.domain(d3.extent(data.links, function (d) { return d.weight }))
			.range([.1, 1])
			
		//~ self.simulation = d3.forceSimulation(data.nodes)
			//~ .force('charge', d3.forceManyBody().strength(-50))
			//~ .force('link', d3.forceLink(data.links).distance(function(d) {return linkDistance(d.weight)}))
			//~ .force('x', d3.forceX())
			//~ .force('y', d3.forceY())
			//~ .force('collide', d3.forceCollide(function(d) {return 10 * textScale(d.count)}))
			//~ .force('center', d3.forceCenter())
			//~ .alphaTarget(1)
			//~ .on('tick', ticked)
			
		self.simulation = d3.forceSimulation(data.nodes)
			.force('link', d3.forceLink(data.links).distance(75).strength(function(d) {return weightScale(d.weight)}))
			.force('charge', d3.forceManyBody().strength(-200))
			.force('center', d3.forceCenter(self.width / 2, self.height / 2))
			.force('collide', d3.forceCollide(function(d) {return 2 * (textScale(d.count) + d.name.length) }))
			.on('tick', ticked)

// TODO prevent labels from overlapping.
// cf technique below used in Tribalytics
// or maybe this one https://stackoverflow.com/questions/17425268/d3js-automatic-labels-placement-to-avoid-overlaps-force-repulsion

// trigger relax function on force simulation end... simulation.on('end', relax)

	//~ function relax(textLabels) {
		//~ // relax the position of overlapping labels
		//~ // only vertical position is modified
		//~ // based on https://blog.safaribooksonline.com/2014/03/11/solving-d3-label-placement-constraint-relaxing/
//~ 
		//~ var alpha = 0.5
			//~ , spacing = 12
			//~ , again = false;
//~ 
		//~ textLabels.each(function (d, i) {
			//~ a = this;
			//~ da = d3.select(a);
			//~ y1 = da.attr("y");
			//~ textLabels.each(function (d, j) {
				//~ b = this;
				//~ // a & b are the same element and don't collide.
				//~ if (a == b) return;
				//~ db = d3.select(b);
				//~ // Now let's calculate the distance between
				//~ // these elements. 
				//~ y2 = db.attr("y");
				//~ deltaY = y1 - y2;
				//~ 
				//~ // Our spacing is greater than our specified spacing,
				//~ // so they don't collide.
//~ 
				//~ if (!overlap ( a, b)) return;
				//~ 
				//~ // If the labels collide, we'll push each 
				//~ // of the two labels up and down a little bit.
				//~ again = true;
				//~ sign = deltaY > 0 ? 1 : -1;
				//~ adjust = sign * alpha;
				//~ da.attr("y",+y1 + adjust);
				//~ da.selectAll('tspan').attr("y",+y1 + adjust);
				//~ db.attr("y",+y2 - adjust);
				//~ db.selectAll('tspan').attr("y",+y2 - adjust);
			//~ });
		//~ });
		//~ // Adjust our line leaders here
		//~ // so that they follow the labels. 
		//~ if(again) {
			//~ setTimeout(function() {relax(textLabels)},20)
		//~ }
	//~ }
//~ 
	//~ function overlap (a, b) {
		//~ // Check whether the bounding box of two texts do overlap.
		//~ // inspired by http://www.geeksforgeeks.org/find-two-rectangles-overlap/
//~ 
		//~ var aBbox = a.getBBox()
			//~ , bBbox = b.getBBox()
			//~ , aPoints = {
				//~ l: {
					//~ x: aBbox.x
					//~ , y: aBbox.y
				//~ }
				//~ , r: {
					//~ x: aBbox.x + aBbox.width
					//~ , y: aBbox.y + aBbox.height
				//~ }
			//~ }
			//~ , bPoints = {
				//~ l: {
					//~ x: bBbox.x
					//~ , y: bBbox.y
				//~ }
				//~ , r: {
					//~ x: bBbox.x + bBbox.width
					//~ , y: bBbox.y + bBbox.height
				//~ }
			//~ }
		//~ 
		//~ // Check whether one rectangle is on left side of other
		//~ if (aPoints.l.x > bPoints.r.x || bPoints.l.x > aPoints.r.x)
			//~ return false
		//~ 
		//~ // Check whether one rectangle is on above the other
		//~ if (aPoints.l.y > bPoints.r.y || bPoints.l.y > aPoints.r.y)
			//~ return false
			//~ 
		//~ return true
		//~ 
	//~ }


		// Apply the general update pattern to the nodes.
		self.node = self.node.data(data.nodes, function(d) { return d.name}).enter().append('g')
			  .call(d3.drag()
				  .on("start", dragstarted)
				  .on("drag", dragged)
				  .on("end", dragended))


		//~ self.node.append('circle')
		  //~ .attr('fill', function(d) { return color(d.group) })
		  //~ .attr('r', function(d) { return r(d.count)})
		  
		self.node.append('text')
		  .text(function(d) { return d.name})
		  .attr('fill', function(d) { return color(d.group) })
		  .attr('dy', '2.5')
		  .attr('transform', function(d) { return 'scale(' + textScale(d.count) + ')'})
		  
		  //~ .call(function(node) { node.transition().attr('r', function(d) { return r(d.count)}) })
		//~ .merge(self.node)

		//~ self.node = self.node.enter()
		  //~ .append('text')
		  //~ .attr('transform', function(d) { return 'scale(' + textScale(d.count) + ')'})
		  //~ .text(function(d) { return d.name})
		//~ .merge(self.node)

		
		// Apply the general update pattern to the links.
		self.link = self.link.data(data.links, function(d) { 
//~ if ((d.target.name === 'google-analytics-api') && d.source.name === 'google-analytics')
//~ if (['google-analytics', 'google-analytics-api'].indexOf(d.target.name) !== -1 || ['google-analytics', 'google-analytics-api'].indexOf(d.source.name) !== -1)
	//~ console.log(d.target.name, d.source.name, d.weight)
			return d.source.name + '-' + d.target.name
		})
//~ 
		//~ // Keep the exiting links connected to the moving remaining nodes.
		//~ link.exit().transition()
		  //~ .attr('stroke-opacity', 0)
		  //~ .attrTween('x1', function(d) { return function() { return d.source.x } })
		  //~ .attrTween('x2', function(d) { return function() { return d.target.x } })
		  //~ .attrTween('y1', function(d) { return function() { return d.source.y } })
		  //~ .attrTween('y2', function(d) { return function() { return d.target.y } })
		  //~ .remove()

		self.link = self.link.enter().append('line')
			.attr('stroke-opacity', function(d) { return weightScale(d.weight)})
		  //~ .call(function(link) { link.transition().attr('stroke-opacity', 1) })
		.merge(self.link)

		// Update and restart the simulation.
		//~ self.simulation.nodes(nodes)
		self.simulation.nodes(data.nodes)
		self.simulation.force('link').links(data.links)
		self.simulation.alpha(1).restart()
		
		
		//~ self.svg.selectAll('.tag').data(data.nodes)
		  //~ .enter()
		    //~ .append('text')
		    //~ .text(function(d) { console.log('here'); return d.name})
		    //~ .attr('transform', function(d, i) {
				//~ return 'translate(0, ' + i * 7.5 + ')'
			//~ })

	}


	function dragstarted(d) {
	  if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) self.simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}
}

module.exports = ForceChart

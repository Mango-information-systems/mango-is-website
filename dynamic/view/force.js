var d3 = require('d3')
	, easyedit = require('easyedit')

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
		, nodeMargin = 45
	
	var textScale = d3.scaleLinear()
			.range([1, 3])
		, color = d3.scaleOrdinal(d3.schemeCategory10)
		, linkDistanceScale = d3.scaleLinear()
			.domain([100, 1000])
			.range([50, 120])
		, xForceScale = d3.scaleLinear()
			.domain([100, 1000])
			.range([-.01, -.7])

	/****************************************
	 *
	 * Private methods
	 *
	 ****************************************/
	
	/**
	 * update nodes on tick event
	 * 
	 * @private
	 * 
	 */
	 function ticked() {
		 
		self.node.attr('transform', function(d) {
			
			d.x = Math.max(nodeMargin, Math.min(self.width - nodeMargin, d.x))
				d.y = Math.max(nodeMargin, Math.min(self.height - nodeMargin, d.y))
			
			return 'translate(' + d.x + ',' + d.y + ')'
		})

	 }

	/**
	 * display links when the animation is over
	 * 
	 * @private
	 * 
	 */
	 function ended() {
		
		//~ debug('force simulation ended')
		
		// curved links lines
		// as seen in https://stackoverflow.com/a/13456081
		self.link.attr('d', function(d) {

			var dx = d.target.x - d.source.x
				, dy = d.target.y - d.source.y
				, dr = Math.sqrt(dx * dx + dy * dy)
			return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y
		  })
		  .attr('stroke-opacity', function(d) { return self.weightScale(d.weight)})
		  .attr('stroke',  function(d) { return d.source.group === d.target.group ? color(d.source.group) : '#777'})

		d3.select('#links')
		  .transition()
		    .style('opacity', .3)
		    
		// avoid overlapping labels
		relax(self.node)
		
	 }

	function dragstarted(d) {
		
		if (!d3.event.active) {
			
			self.simulation.alphaTarget(0.3).restart()
		
			d3.select('#links')
				.transition()
				.style('opacity', 0) // hide links when the animation restarts
		}
		d.fx = d.x
		d.fy = d.y
	}

	function dragged(d) {
		d.fx = d3.event.x
		d.fy = d3.event.y
	}

	function dragended(d) {
		if (!d3.event.active)
			self.simulation.alphaTarget(0)
		d.fx = null
		d.fy = null
	}

	/**
	 * relax position of text labels, whenever they are overlapping.
	 * 
	 * @param {object} text Labels d3 selection
	 * 
	 * @private
	 * 
	 */
	function relax(textLabels) {
		// relax the position of overlapping labels
		// only vertical position is modified
		// based on https://blog.safaribooksonline.com/2014/03/11/solving-d3-label-placement-constraint-relaxing/

		var alpha = 0.5
			, spacing = 15
			, again = false

		textLabels.each(function (d, i) {
			a = this
			da = d3.select(a)
			//~ y1 = da.attr('y')
			
			var daTransform = getTransformation(da.attr('transform'))
			
			y1 = daTransform.translateY
			textLabels.each(function (d, j) {
				b = this
				// a & b are the same element and don't collide.
				if (a == b) return
				
				db = d3.select(b)
				// Now let's calculate the distance between
				// these elements. 
				//~ y2 = db.attr('y')
				var dbTransform = getTransformation(db.attr('transform'))
				y2 = dbTransform.translateY
				
				deltaY = y1 - y2
				
				if (Math.abs(deltaY) > spacing)
					// Our spacing is greater than our specified spacing,
					// so they don't collide.
					return

				if (!overlap ( a, b)) return
				
				// If the labels collide, we'll push each 
				// of the two labels up and down a little bit.
				again = true
				sign = deltaY > 0 ? 1 : -1
				adjust = sign * alpha
				
				da.attr('transform', 'translate(' + daTransform.translateX + ',' + (y1 + adjust) + ')')

				db.attr('transform', 'translate(' + dbTransform.translateX + ',' + (y2 - adjust) + ')')
			})
		})
		// Adjust our line leaders here
		// so that they follow the labels. 
		if(again) {
			setTimeout(function() {relax(textLabels)}, 10)
		}
	}

	function overlap (a, b) {
		// Check whether the bounding box of two texts do overlap.
		// inspired by http://www.geeksforgeeks.org/find-two-rectangles-overlap/

		var aBbox = a.getBoundingClientRect()
			, bBbox = b.getBoundingClientRect()
			, aPoints = {
				l: {
					x: aBbox.left
					, y: aBbox.top
				}
				, r: {
					x: aBbox.left + aBbox.width
					, y: aBbox.top + aBbox.height
				}
			}
			, bPoints = {
				l: {
					x: bBbox.left
					, y: bBbox.top
				}
				, r: {
					x: bBbox.left + bBbox.width
					, y: bBbox.top + bBbox.height
				}
			}
		
		// Check whether one rectangle is on left side of other
		if (aPoints.l.x > bPoints.r.x || bPoints.l.x > aPoints.r.x)
			return false
		
		// Check whether one rectangle is on above the other
		if (aPoints.l.y > bPoints.r.y || bPoints.l.y > aPoints.r.y)
			return false
			
		return true
		
	}
	
	// as in http://stackoverflow.com/a/38230545/1006854
	function getTransformation(transform) {
	  // Create a dummy g for calculation purposes only. This will never
	  // be appended to the DOM and will be discarded once this function 
	  // returns.
	  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	  
	  // Set the transform attribute to the provided string value.
	  g.setAttributeNS(null, 'transform', transform);
	  
	  // consolidate the SVGTransformList containing all transformations
	  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
	  // its SVGMatrix. 
	  var matrix = g.transform.baseVal.consolidate().matrix;
	  
	  // Below calculations are taken and adapted from the private function
	  // transform/decompose.js of D3's module d3-interpolate.
	  // var {a, b, c, d, e, f} = matrix;   // ES6, if this doesn't work, use below assignment
	  var a=matrix.a, b=matrix.b, c=matrix.c, d=matrix.d, e=matrix.e, f=matrix.f; // ES5
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * 180 / Math.PI,
		skewX: Math.atan(skewX) * 180 / Math.PI,
		scaleX: scaleX,
		scaleY: scaleY
	  };
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
	this.init = function (opts) {
		
		
		self.updateLegend = opts.updateLegend
		self.legendLabels = opts.legendLabels
		
		self.width = 650
		self.height = 350
		
		self.legend = d3.select('#legend').html('')
			.append('div')
			.selectAll('.group')
		
		self.svg = d3.select('#chart').html('')
			.append('svg')
			  .attr('width', '100%')
			  .attr('height', '80%')
			  .attr('preserveAspectRatio', 'xMinYMin')
			  .attr('viewBox', '0 0 ' + self.width + ' ' + self.height)
			  .append('g')
		
		self.link = self.svg.append('g')
			.attr('id', 'links')
			.attr('stroke', '#ddd')
			.attr('stroke-width', 1.5)
			.style('opacity', 0)
			.selectAll('.link')
		
		self.node = self.svg.append('g')
			.selectAll('.node')
	}

	/**
	 * Update chart
	 *
	 * @param {object} data updated graph
	 * 
	 */
	this.update = function (data) {
		
		//~ console.log('graph data', data)

		textScale.domain([data.nodes[data.nodes.length-1].count, data.nodes[0].count])

		self.weightScale = d3.scaleLog()
			.domain(d3.extent(data.links, function (d) { return d.weight }))
			.range([.1, 1])
			
		self.simulation = d3.forceSimulation(data.nodes)
			.force('link', d3.forceLink(data.links).distance(linkDistanceScale(data.links.length)).strength(function(d) {return self.weightScale(d.weight)}))
			.force('charge', d3.forceManyBody().strength(-200))
			.force('center', d3.forceCenter(self.width / 2, self.height / 2))
			.force('x', d3.forceX().strength(xForceScale(data.links.length)))
			.on('tick', ticked)
			.on('end', ended)

		// Apply the general update pattern to the nodes.
		self.node = self.node.data(data.nodes, function(d) { return d.name}).enter().append('g')
			  .call(d3.drag()
				  .on('start', dragstarted)
				  .on('drag', dragged)
				  .on('end', dragended))

		self.node.append('text')
		  .text(function(d) { return d.name})
		  .attr('fill', function(d) { return color(d.group) })
		  .attr('dy', '2.5')
		  .attr('transform', function(d) { return 'scale(' + textScale(d.count) + ')'})
		
		// Apply the general update pattern to the links.
		self.link = self.link.data(data.links, function(d) { 
			return d.source.name + '-' + d.target.name
		})

		self.link = self.link.enter().append('path')
		
		
		// fill up legend
		self.legend = self.legend.data(d3.range(data.communitiesCount))
			.enter().append('div')
			  .attr('class', 'xs-twelve sm-six lg-twelve columns')
			  .html(function(d, i) { 
				return '<i class="fa fa-circle" aria-hidden="true" style="color:' + color(d) + ';"></i> \
					<span class="legend">' + self.legendLabels[i] + '</span> \
				'
			  })
	
		d3.selectAll('.legend').each(function(data, ix) {
			new easyedit(this, {
				styles: {
					height: 'auto'
					, padding: '.2rem .4rem'
				}
				, onsuccess: function(value) {
					// persist new value
					self.updateLegend(ix, value)
				}
			})
		})
		

		// Update and restart the simulation.
		self.simulation.nodes(data.nodes)
		self.simulation.force('link').links(data.links)
		self.simulation.alpha(1).restart()

	}

}

module.exports = ForceChart

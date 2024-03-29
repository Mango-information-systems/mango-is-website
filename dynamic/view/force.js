var d3 = Object.assign( {}, require('d3-array'), require('d3-force'), require('d3-drag'), require('d3-scale'), require('d3-selection'), require('d3-transition'))
	, d3Selection = require('d3-selection')
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
		, nodeSelection

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
		 
		self.node.selectAll('.node').attr('transform', function(d) {
			
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
		
		 self.node.selectAll('.node').select('text').attr('fill', function(d) { return color(d.group) })
		    
		// avoid overlapping labels
		relax(self.node.selectAll('.node'))
		
	 }

	function dragstarted(d) {
		// hide export button when layout is being computed
		d3.select('#actionLinks').style('display', 'none')
		
		if (!d3Selection.event.active) {
			
			self.simulation.alphaTarget(0.3).restart()
		
			d3.select('#links')
				.transition()
				.style('opacity', 0) // hide links when the animation restarts
		}
		d.fx = d.x
		d.fy = d.y
	}

	function dragged(d) {
		d.fx = d3Selection.event.x
		d.fy = d3Selection.event.y
	}

	function dragended(d) {
		if (!d3Selection.event.active)
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
			
			var daTransform = getTransformation(da.attr('transform'))
			
			y1 = daTransform.translateY
			x1 = daTransform.translateX
			
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
				x2 = dbTransform.translateX
				
				deltaY = y1 - y2
				
				if (Math.abs(deltaY) > spacing)
					// Our spacing is greater than our specified spacing,
					// so they don't collide.
					return

				if (!overlap ( a, b))
					return
				
				// If the labels collide, we'll push each 
				// of the two labels up and down a little bit.
				again = true
				
				signY = deltaY > 0 ? 1 : -1
				adjustY = signY * alpha
				
				deltaX = x1 - x2
				signX = deltaX > 0 ? 1 : -1
				adjustX = signX * alpha / 3
				
				da.attr('transform', 'translate(' + (x1 + adjustX) + ',' + (y1 + adjustY) + ')')

				db.attr('transform', 'translate(' + (x2 - adjustX) + ',' + (y2 - adjustY) + ')')
			})
		})
		// Adjust our line leaders here
		// so that they follow the labels. 
		if(again) {
			setTimeout(function() {relax(textLabels)}, 10)
		}
		else {
			// both force layout and overlap prevention are finished

			// curved links lines
			// as seen in https://stackoverflow.com/a/13456081
			self.link.attr('d', function(d) {

				var dx = d.target.x - d.source.x
					, dy = d.target.y - d.source.y
					, dr = Math.sqrt(dx * dx + dy * dy)
				return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y
			  })
			  .attr('stroke-width', function(d) { return .5 + 3 * self.weightScale(d.weight)})
			  .attr('stroke',  function(d) { return color(d.source.group)})

			d3.select('#links')
			  .transition()
				.style('opacity', .9)
			
			// display export button
			d3.select('#actionLinks').style('display', 'block')
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
		
		self.legend = d3.select('#legendWrapper').html('')
			.selectAll('.group')
		
		self.svg = d3.select('#chart').html('')
			.append('svg')
			  .attr('id', 'chartSVG')
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
			.attr('id', 'nodes')
			
		
		self.simulation = d3.forceSimulation([])
			.force('charge', d3.forceManyBody().strength(-200))
			.force('center', d3.forceCenter(self.width / 2, self.height / 2))
			.on('tick', ticked)
			
	}

	/**
	 * Update chart
	 *
	 * @param {object} data updated graph
	 * @param {boolean} incomplete progress rendering indicator
	 * 
	 */
	this.update = function (data, complete) {
		
		//~ console.log('graph data', data)
		
		// hide export button when layout is being computed
		d3.select('#actionLinks').style('display', 'none')

		textScale.domain([data.nodes[data.nodes.length-1].count, data.nodes[0].count])

		self.weightScale = d3.scaleLog()
			.domain(d3.extent(data.links, function (d) { return d.weight }))
			.range([.1, 1])
		
		// Apply the general update pattern to the nodes.
		let g = self.node.selectAll('.node').data(data.nodes, function(d) { return d.name})

		nodeSelection = g.enter().append('g')
			  .attr('class', 'node')
			  .call(d3.drag()
				  .on('start', dragstarted)
				  .on('drag', dragged)
				  .on('end', dragended))
				  
		nodeSelection.append('text')
		  .text(function(d) { return d.name})
		  .attr('fill', d => complete? color(d.group) : color(0))
		  .attr('dy', '2.5')
		  .attr('transform', function(d) { return 'scale(' + textScale(d.count) + ')'})
		
		// Apply the general update pattern to the links.
		self.link = self.link.data(data.links, function(d) { 
			return d.source.name + '-' + d.target.name
		})

		if (complete) {
		
			d3.select('#progressBadge').remove()
			
			self.simulation.on('end', ended)
		
			self.link = self.link.enter().append('path')
		
			// fill up legend
			self.legend = self.legend.data(d3.range(data.communitiesCount))
				.enter().append('div')
				  .attr('class', 'xs-twelve sm-six columns')
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
		}
		else {
			
		}
		

		// Update and restart the simulation.
		self.simulation.nodes(data.nodes)
			self.simulation.force('link', d3.forceLink([]).distance(linkDistanceScale(data.links.length)).strength(function(d) {return self.weightScale(d.weight)}))
			self.simulation.force('link').links(data.links)
			self.simulation.force('x', d3.forceX().strength(xForceScale(data.links.length)))
			self.simulation.alpha(1).restart()

	}

}

module.exports = ForceChart

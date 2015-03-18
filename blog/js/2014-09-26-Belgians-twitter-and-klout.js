$(document).ready(function() {

	// dashboard interactions
	d3.select('#barchart1').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return i!=0 && i!=13}).transition().style('opacity', .2)})
	d3.select('#barchart1').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})
	d3.select('#barchart2').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return [1, 2, 3, 14, 15, 16].indexOf(i) == -1}).transition().style('opacity', .2)})
	d3.select('#barchart2').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})
	d3.select('#barchart3').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return [9, 10, 11, 22, 23, 24].indexOf(i) == -1}).transition().style('opacity', .2)})
	d3.select('#barchart3').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})

	d3.select('#sankey1').on('mouseover', function() {d3.selectAll('.sankey1').transition().style('stroke-opacity', .75).style('stroke', '#26963C')})
	d3.select('#sankey1').on('mouseout', function() {d3.selectAll('.sankey1').transition().style('stroke-opacity', .2).style('stroke', 'black')})
	d3.select('#sankey2').on('mouseover', function() {d3.selectAll('.sankey2').transition().style('stroke-opacity', .75).style('stroke', '#26963C')})
	d3.select('#sankey2').on('mouseout', function() {d3.selectAll('.sankey2').transition().style('stroke-opacity', .2)	.style('stroke', 'black')})
	d3.select('#sankey3').on('mouseover', function() {d3.selectAll('.sankey3').transition().style('stroke-opacity', .75).style('stroke', '#26963C').style('stroke-width', 3)})
	d3.select('#sankey3').on('mouseout', function() {d3.selectAll('.sankey3').transition().style('stroke-opacity', .2).style('stroke', 'black').style('stroke-width', 1)})
	
	d3.select('#bars21').on('mouseover', function() {d3.selectAll('#bars2 rect').filter(function(d, i) {return i!=0}).transition().style('opacity', .2)})
	d3.select('#bars21').on('mouseout', function() {d3.selectAll('#bars2 rect').transition().style('opacity', 1)})
	
	d3.select('#donut1').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=0}).transition().style('opacity', .2)})
	d3.select('#donut1').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})
	d3.select('#donut2').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=4}).transition().style('opacity', .2)})
	d3.select('#donut2').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})
	d3.select('#donut3').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=2}).transition().style('opacity', .2)})
	d3.select('#donut3').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})

	//tooltips
	$('#barchart rect, #bars2 rect, .arc').tooltip({'container': 'body','placement': 'top'})
	$('.tlt').tooltip({'placement': 'top'})

	// zoomable bar chart
	var barchart = d3.select('#barchart svg')
		, bars2 = d3.select('#bars2 svg')
		, sankey = d3.select('#sankey svg')
		, donut = d3.select('#donut svg')
	//~ var zoom = d3.behavior.zoom().scaleExtent([1, 10]).on('zoom', zoomed)
	//~ barchart.call(zoom)

	function zoomed() {
		barchart.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
	}

	// responsive charts
	var barchartContainer = $('#barchart')
		, bars2Container = $('#bars2')
		, sankeyContainer = $('#sankey')
		, donutContainer = $('#donut')

	// initialize dataviz at the right size
	resize()

	// debouncing resize event based on http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-or-resize-event-and-only-then-perform-an-ac
	var rtime = new Date(1, 1, 1970, 12,00,00)
		, timeout = false
		, delta = 100
	$(window).on("resize", function() {
		rtime = new Date()
		if (timeout === false) {
			timeout = true
			setTimeout(resizeend, delta)
		}
	})
	//resize
	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta)
		} else {
			timeout = false
			resize()
			
		}
	}
	
	function resize() {
		// resize bar chart
		var x = barchartContainer.width()
			//~ , y = barchartContainer.height()
		barchart.transition().attr("width",x ).attr("height", x * 500 / 960 )

		// resize sankey chart
		var x = sankeyContainer.width()
		sankey.transition().attr("width", x).attr("height", x)

		// resize donut chart
		var x = donutContainer.width()
		donut.transition().attr("width", x).attr("height", x)

		// resize bars2 chart
		var x = bars2Container.width()
		bars2.transition().attr("width", x).attr("height", x * 250 / 500)
	}


})

$(document).ready(function() {
	// responsive charts
	var barchart = d3.select('#chartsContainer svg')

	var barchartContainer = $('#chartsContainer')

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
		var x = Math.min(650, barchartContainer.width())
		barchart.transition().attr("width", x ).attr("height", x * 500 / 650 )

	}

})

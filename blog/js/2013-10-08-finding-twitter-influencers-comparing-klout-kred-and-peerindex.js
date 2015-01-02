---
---
var step = 0 // step in the animation

var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 900 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom

var x = d3.scale.linear()
		.range([0, width])
	, xKred = d3.scale.linear()
	.range([0, width])

var y = d3.scale.linear()
	.range([height, 0])

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom')
	
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')

var svg = d3.select('#chartArea').append('svg')
	.attr('width', 720)
	.attr('height', 480)
	.attr('viewBox', '0 0 ' +  (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
	.attr('preserveAspectRatio', 'xMidYMid')
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	, kloutChart = svg.append('g').attr('id', 'kloutChart')
	, kredChart = svg.append('g').attr('id', 'kredChart')
	, peerIndexChart = svg.append('g').attr('id', 'peerIndexChart')
	, kloutScoresMap = {}
	, kredScoresMap = {}
	, piScoresMap = {}
	, kloutLogo
	, kredLogo
	, peerIndexLogo
	, helperElements

	helperElements = svg.append('g')

	helperElements.append('rect')
		.attr('x', - margin.left)
		.attr('y', - margin.top)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.attr('fill','#FCFCFC')
		.attr('fill-opacity', 0)
		.attr('stroke', 'grey')
		.attr('stroke-width', 12)
		.attr('stroke-dasharray', '80 370 80 370 80 220 80 220')
		.attr('stroke-dashoffset', 40)
		.transition()
		.attr('fill-opacity', 1)
	
	helperElements.append('text')
		.attr('x', 2000)
		.attr('y', 525)
		.attr('font-weight', 'bold')
		.attr('font-size', '25px')
		.attr('fill', 'grey')
		.transition()
		.attr('x', 365)
		.attr('y', 525)
		.text('Interactive visualization')
		
	helperElements.append('text')
		.attr('x', 2000)
		.attr('y', 555)
		.attr('font-weight', 'bold')
		.attr('font-size', '18px')
		.attr('fill', 'grey')
		.transition()
		.attr('x', 210)
		.attr('y', 555)
		.text('click anywhere on the chart area to see next slide')

	helperElements.append('image')
		.attr("xlink:href", "{{ site.url }}/blog/img/mango-is-play-button.png")
		.attr('x', 2000)
		.attr('y', 500)
		.attr("width", 70)
		.attr("height", 70)
		.transition()
		.attr("x", 730)
		.attr("y", 500)

	svg.append('image')
		.attr("xlink:href", "{{ site.url }}/blog/img/20130822-finn-ranking-intro-slide.png")
		.attr('id', 'coverImage')
		.attr("x", -1800)
		.attr("y", -2000)
		.attr("width", 672)
		.attr("height", 440)
		.transition().duration(1000)
		.attr("x", 55)
		.attr("y", 20)

d3.json("{{ site.url }}/blog/data/belgian-journalists-twitter-influence.json", function(error, jsonData) {
	var data = jsonData.journalists
		, xAxisLine
		, yAxisLine
		, dots // scatterplot dots
		, texts = [
			{title:'Extracting data', text:'First, we extracted 1500+ twitter accounts from various twitter lists. Then Finn refined the results, keeping only journalists.'}
			, {title:'Influence on twitter', text:'Then we got the influence scores each person in the list from Klout, the leading social media influence measurement tool.'}
			, {title:'Problem', text:'Klout scores are not only based on twitter activity. Klout registered users can link other social profiles (facebook, linkedIn ...) which affects the score. FINN wanted to rank only on twitter influence.'}
			, {title:'Looking around...', text:'So, we had a look at Klout\'s competitors and compared  them to what Klout provides. Both Kred and peerIndex provide a twitter-only score. We had to validate how accurate they were, compared to the Klout measure.'}
			, {title:'Adding Kred & peerIndex to the mix', text:'Kred seemed to provide higher scores than Klout for our dataset, whereas peerIndex assigned relatively lower scores.'}
			, {title:'Podiums comparison', text:'The top 5 journalists for each system were not exactly the same, though some faces are common to all three lists.'}
			, {title:'Removing peerIndex from the equation', text:'Because many journalists were missing from peerIndex, we discarded it.'}
			, {title:'Kred / Klout correlation', text:'Next we studied correlation between the Kred and Klout scores.'}
			, {title:'Why we chose Kred for the ranking', text:'The high rank correlation coefficient between Klout and Kred shows that Kred is a suitable replacement for Klout in our study; Hence this system was chosen, with the implications on the ranking. <strong>You can find FINN\'s ranking and other interesting results <a href="http://www.finn.be/blogs/top-100-most-influential-belgian-journalists-twitter-2013" target = "_blank">in FINN\'s Blog</a></strong>.'}
		]

	x.domain([0, 100])
	xKred.domain([0, 100])
	y.domain([0, 100])

	function showJournalists() {
	// Show one point per journalist
		
		d3.select('#coverImage').transition()
			.attr('x', 3000)
			.attr('y', 3000)
			.transition()
				.remove()
			
		helperElements.transition()
			.attr('x', 1000)
			.attr('y', 95)
			.transition()
				.remove()
		
		dots = kloutChart.selectAll(".dot")
			.data(data, function(d) { return d.twId})
		
		dots.enter().append("circle")
			.attr("class", "dot")
			.style("fill", "#cccccc")
			.transition().delay(function(d, i) { return i / data.length * 600 }).duration(600)
				.attr("r", 3)
				.attr("cx", function(d) { return x(d.kloutScore) })
				.attr("cy", function(d) {
					kloutScoresMap[d.kloutScore] = kloutScoresMap[d.kloutScore]+1 || 1
					return y(kloutScoresMap[d.kloutScore])
				})
				.attr("transform", function(d) {
					var cx = x(Math.random()*90 + 10 - d.kloutScore)
						, cy = y(Math.random()*120 + kloutScoresMap[d.kloutScore])
					d.cy = cy
					return 'translate(' + cx + ',' + cy + ')'
				})
			
		var discarded
		
		for (var i = 0; i<200; i++) {
			discarded = kloutChart.append("circle")
				.attr("class", "discard dot")
				.style("fill", "#cccccc")
			discarded.transition().delay(function(d, i) { return i / 300 }).duration(600)
				.attr("r", 3)
				.attr("cx", function() { return x(Math.random()*90+10) })
				.attr("cy", function() { return y(Math.random()*90+10) })
		}
		
		
		kloutChart.selectAll('.discard').transition().delay(function(d, i) { return i / 300 + 2000 }).duration(600)
			.style("fill", "red")
			.attr("r", 4)
		kloutChart.selectAll('.discard').transition().delay(2600).duration(600)
			.remove()

	}

	function addKloutScores() {
		
		// remove discard points in case not already done
		kloutChart.selectAll('.discard').remove()
		
		d3.transition().duration(800).each(function(){
			// draw x axis: represent Klout scores
			xAxis.scale(x)
			xAxisLine = kloutChart.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
			xAxisLine.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", 30)
				.style("text-anchor", "end")
				.text("(0-100)")
			kloutLogo = kloutChart.append("image")
				.attr("xlink:href", "{{ site.url }}/blog/img/klout-logo.png")
				.attr('id', 'kloutLogo')
				.attr("x", 400)
				.attr("y", 250)
				.attr("width", 300)
				.attr("height", 61)
				.transition().delay(400).duration(500)
				.attr("x", 715)
				.attr("y", height + 20)
				.attr("width", 62)
				.attr("height", 12)
				
			// draw y axis: represent number of users
			yAxisLine = kloutChart.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			yAxisLine.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Number of users")
				
			// update dots coordinates: number of users per Klout score
			dots.transition()
				//~ .attr("transform", function(d) { console.log(d.cx, x(d.cx), d.kloutScore, x(d.kloutScore)); return 'translate(' + (x(d.cx) - x(d.kloutScore)) + ',0)' })
				.attr("transform", function(d) { return 'translate(0,' + d.cy + ')' })
				//~ .attr("cx", function(d) { return x(d.kloutScore) })
				.style("fill", "#E44600")
				.transition().delay(750).duration(750)
					.attr("transform", function(d) { return 'translate(0,0)' })
					//~ .attr("cy", function(d) {
						//~ kloutScoresMap[d.kloutScore] = kloutScoresMap[d.kloutScore]+1 || 1
						//~ return y(kloutScoresMap[d.kloutScore])
					//~ })
		})
	}

	function kloutFunction() {
		kloutChart.append("image")
			.attr("xlink:href", "{{ site.url }}/blog/img/klout-function.png")
			.attr('id', 'kloutFunction')
			.attr("x", 180)
			.attr("y", 140)
			.attr("width", 498)
			.attr("height", 202)
	}

	function addCompetitors() {
		svg.selectAll('#kloutFunction').transition().remove()
		
		var t0 = svg.transition().duration(1200)
		
		t0.selectAll("#kloutChart")
			.attr('transform', 'translate(0, 0)scale(.45)')
			.selectAll('.axis').style('visibility', 'hidden')

		t0.selectAll("#kloutLogo")
			.attr('transform', 'scale(6)translate(-700, -475)')
		
		var t1 = t0.transition().delay(400)
		t1.selectAll("#kredChart")
		.attr('transform', 'translate(340, 0)scale(.45)')
		kredChart.append("image")
				.attr("xlink:href", "{{ site.url }}/blog/img/kred-logo.png")
				.attr('id', 'kredLogo')
				.attr("x", 180)
				.attr("y", 565)
				.attr("width", 600)
				.attr("height", 122)
		
		kredChart.selectAll(".dot")
			.data(data, function(d) { return d.twId})
			.enter()
			.append("circle")
			.attr("class", "dot")
			.style("fill", "#71be39")
			.transition().delay(function(d, i) { return 400 + i / data.length * 1000 }).duration(1000)
			.attr("r", 3)
			.attr("cx", function(d) { return xKred(Math.floor(d.kredScore/10)) })
			.attr("cy", function(d) {
				kredScoresMap[Math.floor(d.kredScore/10)] = kredScoresMap[Math.floor(d.kredScore/10)]+1 || 1
				return y(kredScoresMap[Math.floor(d.kredScore/10)])
			})

		var t2 = t1.transition().delay(1400)
		t2.selectAll("#peerIndexChart")
			.attr('transform', 'translate(150, 220)scale(.45)')
			
		peerIndexChart.append("image")
				.attr("xlink:href", "{{ site.url }}/blog/img/peerindex-logo.png")
				.attr('id', 'kredLogo')
				.attr("x", 180)
				.attr("y", 565)
				.attr("width", 600)
				.attr("height", 122)

		peerIndexChart.selectAll(".dot")
			.data(data, function(d) { return d.twId})
			.enter()
			.append("circle")
			.attr("class", "dot")
			.style("fill", "#22CAE2")
			.transition().delay(function(d, i) { return 1400 + i / data.length * 1000 }).duration(1000)
			.attr("r", 3)
			.attr("cx", function(d) { return x(d.piScore) })
			.attr("cy", function(d) {
				piScoresMap[d.piScore] = piScoresMap[d.piScore]+1 || 1
				return y(piScoresMap[d.piScore])
			})
	}

	function highlightPeaks() {
	
		svg.append("circle")
			.attr("id", "kredHighlight")
			.attr("cx", 570)
			.attr("cy", 200)
			.attr("r", 0)
			.style("fill", "red")
			.style("fill-opacity", 0)
			.transition().duration(600)
			.attr("r", 60)
			.style("fill-opacity", .4)
	
		svg.append("ellipse")
			.attr("id", "piHighlight")
			.attr("cx", 260)
			.attr("cy", 400)
			.attr("rx", 0)
			.attr("ry", 0)
			.style("fill", "red")
			.style("fill-opacity", 0)
			.transition().duration(600)
			.attr("rx", 50)
			.attr("ry", 70)
			.style("fill-opacity", .4)
	}

	function showTopFive() {
		
		var ranks = {
			klout : {
				rankName: 'klout'
				, finalX: 20
				, finalY: 90
				, initialX: 290
				, initialY: 240
				, delay: 0
				, color: '#E44600'
				, top: [
					{id : 14117639, screen_name : "AlainGerlache", profile_image_url : "/blog/img/2e4c2f951ff53ac2b82639e9e7988ecd_normal.jpeg", score : 77},
					{id : 1026561, screen_name : "davanac", profile_image_url : "/blog/img/37c84a0869345c39c5860721e82ef70e_normal.png", score : 75},
					{id : 85792506, screen_name : "AnneLowenthal", profile_image_url : "/blog/img/ik_normal.jpg", score : 75},
					{id : 621713, screen_name : "robinwauters", profile_image_url : "/blog/img/5f3b55299fa3260b7b22e8eadc0cc091_normal.jpeg", score : 72},
					{id : 369522634, screen_name : "AdrienDevyver", profile_image_url : "/blog/img/a6ec21a107b7179a6e6f511c6c059cc4_normal.jpeg", score : 71}
				]
			},
			kred : {
				rankName: 'kred'
				, finalX: 440
				, finalY: 90
				, initialX: 700
				, initialY: 240
				, delay: 600
				, color: '#71be39'
				, top: [
					{id: 621713, screen_name : "robinwauters", profile_image_url : "/blog/img/5f3b55299fa3260b7b22e8eadc0cc091_normal.jpeg", score : 958},
					{id: 44849274, screen_name : "Vannieuwkerke", profile_image_url : "/blog/img/Karl_voor_twitter__close__normal.jpg", score : 900},
					{id: 210456091, screen_name : "pvdmeersch", profile_image_url : "/blog/img/d44c2362ad144759fdae250d1e23af78_normal.jpeg", score : 852},
					{id: 14117639, screen_name : "AlainGerlache", profile_image_url : "/blog/img/2e4c2f951ff53ac2b82639e9e7988ecd_normal.jpeg", score : 832},
					{id: 292945752, screen_name : "jdceulaer", profile_image_url : "/blog/img/nieuwe_foto_normal.JPG", score : 822}
				]
			},
			pi : {
				rankName: 'pi'
				, finalX: 260
				, finalY: 330
				, initialX: 460
				, initialY: 450
				, color: '#22CAE2'
				, delay: 1200
				, top: [
					{id : 44849274, screen_name : "Vannieuwkerke", profile_image_url : "/blog/img/Karl_voor_twitter__close__normal.jpg", score : 79},
					{id : 161287978, screen_name : "wielerman", profile_image_url : "/blog/img/Resize_P08-09-10_08-53_normal.jpg", score : 74},
					{id : 210456091, screen_name : "pvdmeersch", profile_image_url : "/blog/img/d44c2362ad144759fdae250d1e23af78_normal.jpeg", score : 74},
					{id : 137639769, screen_name : "barteeckhout", profile_image_url : "/blog/img/f89be7af3aa61735e27386a2b0cd0c7a_normal.jpeg", score : 72},
					{id : 34901183, screen_name : "vadderiVRT", profile_image_url : "/blog/img/757b74b5368d95bdad30171ff987d4db_normal.jpeg", score : 71}
				]
			}
		}

		function displayRank(rank) {
		
			var topRank = svg.append('g').attr('id',  rank.rankName+ 'Rank').selectAll('.rank').data(rank.top).enter().append('g')
			
			topRank.append('rect')
				.attr('x', function(d, i) { return rank.initialX - i * 5 })
				.attr('y', rank.initialY)
				.attr('fill', rank.color)
				.attr('fill-opacity', .1)
				.attr('width', 30)
				.attr('height', 10)
				.transition().duration(600).delay(function(d, i) { return i * 300 + rank.delay })
					.attr('x', rank.finalX - 10)
					.attr('y', function(d, i) {return rank.finalY - 22 + i * 36 })
					.attr('rx', 20)
					.attr('ry', 20)
					.attr('width', 230)
					.attr('height', 32)
					.attr('fill-opacity', .7)
			topRank.append('text')
				.attr('x', function(d, i) { return rank.initialX - i * 5 })
				.attr('y', rank.initialY)
				.text(function(d) { return d.score})
				.style('font-size', '16px')
				.style('fill', 'white')
				.attr('fill-opacity', .1)
				.transition().duration(600).delay(function(d, i) { return i * 300 + rank.delay })
					.attr('x', rank.finalX)
					.attr('y', function(d, i) {return rank.finalY + i * 36 })
					.attr('fill-opacity', 1)
			topRank.append('image')
				.attr('x', function(d, i) { return rank.initialX - i * 5 })
				.attr('y', rank.initialY)
				.attr('xlink:href', function(d) { return d.profile_image_url})
				.attr('width', 0)
				.attr('height', 0)
				.attr('opacity', 0)
				.transition().duration(600).delay(function(d, i) { return i * 300 + rank.delay })
					.attr('x', rank.finalX + 35)
					.attr('y', function(d, i) {return rank.finalY - 20 + i * 36 })
					.attr('width', 30)
					.attr('height', 30)
					.attr('opacity', 1)
			topRank.append('text')
				.attr('x', function(d, i) { return rank.initialX - i * 5 })
				.attr('y', rank.initialY)
				.text(function(d) { return '@' + d.screen_name})
				.style('font-size', '16px')
				.style('fill', 'white')
				.attr('fill-opacity', .1)
				.transition().duration(600).delay(function(d, i) { return i * 300 + rank.delay })
					.attr('x', rank.finalX + 70)
					.attr('y', function(d, i) {return rank.finalY + i * 36 })
					.attr('fill-opacity', 1)
		}
		
		svg.selectAll('#kredHighlight, #piHighlight').transition().duration(200).attr('fill-opacity', 0)
		svg.selectAll('#kredHighlight, #piHighlight').transition().delay(300).remove()
		
		displayRank(ranks['klout'])
		displayRank(ranks['kred'])
		displayRank(ranks['pi'])
	}

	function dismissPi() {
		// remove top users ranking
		svg.selectAll('#kredRank, #kloutRank, #piRank').transition().duration(600)
			.attr('transform', 'translate(2000, 2000)')
			.transition().delay(250)
			.remove()
		
		// peerIndexChart.selectAll('.dot').each(function(d) { console.log(d)})
		// highlight scores 0
		var zeroes = peerIndexChart.selectAll('.dot').filter(function(d) { return d.piScore == 0 }).transition().duration(800).delay(function(d, i) { return i * 100 / data.length + 500})
			.style('fill', 'red')
			.style('stroke', 'white')
			.style('stroke-width', '2px')
			.attr('r', 12)
			
		//remove peerIndex chart
		peerIndexChart.transition().duration(800).delay(1500).remove()
		
	}

	function correlateKloutKred () {
		
		// remove peerIndex chart in case not already done
		peerIndexChart.remove()
		
		// First transition the line & label to the new city.
		var t0 = svg.transition().duration(1200)
		t0.selectAll("#kloutChart, #kloutLogo").attr('transform', 'translate(0, 0)scale(1)')
			.selectAll('.axis').style('visibility', 'visible')
		t0.selectAll("#kredChart").attr('transform', 'translate(0, 0)scale(1)')
		t0.selectAll("#kredLogo").attr('transform', 'scale(.17)translate(-220, -150)')

		// update y axis: represent Kred scores
		y.domain(d3.extent(data, function(d) { return d.kredScore }))
		yAxis.scale(y)
		
		var t1 = t0.transition().duration(800)
		// update dots coordinates
		t1.selectAll(".dot")
			.attr("cx", function(d) { return x(d.kloutScore) })
			.attr("cy", function(d) { return y(d.kredScore) })
			.style('fill', '#cccccc')
		// update y axis label
		t1.selectAll(".y.axis")
			.call(yAxis)
			.select('.label').text("(0-1000)")
		// remove duplicate dots
		t1.selectAll("#kredChart").selectAll(".dot").remove()
	}
	
	function validateKred() {
		
		var correlationMetric = svg.append('g')
			.attr('transform', 'translate(200, 350)')
			.attr('font-size', '22px')
			.style("fill-opacity", 0)
		, correlScale = d3.scale.linear()
			.domain([0, 1])
			.range([0, 400])
		
		correlationMetric.transition()
			.style("fill-opacity", 1)
		
		correlationMetric.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', 500)
			.attr('height', 250)
			.attr('fill-opacity', .9)
			.attr('fill', 'white')
			.attr('transform', 'translate(-40, -80)')
		
		
		correlationMetric.append('rect')
			.attr('x', 0)
			.attr('y', -30)
			.attr('width', 0)
			.attr('height', 20)
			.attr('fill', "red")
			.attr('fill-opacity', .7)
			.transition().duration(600).delay(600)
				.attr('width', correlScale(0.87))
				.attr('fill', "#26963C")
			
		correlationMetric.append('text')
			.attr('x', 390)
			.attr('y', 60)
			.text('high')
			
		correlationMetric.append('text')
			.attr('x', -10)
			.attr('y', 60)
			.text('low')		
			
		correlationMetric.append('text')
			.attr('x', 90)
			.attr('y', -55)
			.text('correlation coefficient')		
			
		correlationMetric.append('text')
			.attr('x', 340)
			.attr('y', -55)
			.attr('font-size', '26px')
			.transition().duration(600).delay(600)
				.attr('fill', "#26963C")
				.text(0.87)
		
		var axis = correlationMetric.append('g')
			.attr('class', 'x axis')
		axis.call(d3.svg.axis().scale(correlScale).ticks(3))
	}

	// replace second doNothing by display of Kred and peerIndex charts
	var animationFunctions = [showJournalists, addKloutScores, kloutFunction, addCompetitors, highlightPeaks, showTopFive, dismissPi, correlateKloutKred, validateKred]

	var $texts = $('div#texts')
		, $svg = $('svg')

	$('svg, #next').live('click', function() {
		if (step < animationFunctions.length) {
			animationFunctions[step]()
			$texts.html('<h2>' + texts[step].title + '</h2><p>' + texts[step].text + '</p>')
			step++
			if (step == animationFunctions.length)
				$('#next').remove()
		}
		return false
	})

	function resizeContent() {
		var oldWidth = $svg.attr('width')
			, newWidth = $('#chartArea').width() < 720 ? $('#chartArea').width() : 720

		$svg.attr('width', newWidth)
		$svg.attr('height', $svg.attr('height') * newWidth / oldWidth)
		$texts.css('maxWidth', newWidth)
	}

	// debouncing resize event based on http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-or-resize-event-and-only-then-perform-an-ac
	var rtime = new Date(1, 1, 1970, 12,00,00)
	, timeout = false
	, delta = 200
	$(window).on("resize", function() {
		rtime = new Date()
		if (timeout === false) {
			timeout = true
			setTimeout(resizeend, delta)
		}
	})
	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta)
		} else {
			timeout = false
			resizeContent()
		}               
	}

	$(function() {
		resizeContent()
		$('#next-container').html('<a class="btn btn-primary" href="#" id="next" title="next slide">next</a>')
	})

})

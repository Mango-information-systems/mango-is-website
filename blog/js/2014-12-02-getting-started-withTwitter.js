// Reveal.js print style
if( window.location.search.match( /print-pdf/gi ) ) {
	var link = document.createElement( 'link' );
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'css/print/reveal.pdf.css';
	document.getElementsByTagName( 'head' )[0].appendChild( link );
}

Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	mouseWheel: true,

	theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
	transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

	// Parallax scrolling
	// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
	// parallaxBackgroundSize: '2100px 900px',

	// Optional libraries used to extend on reveal.js
	dependencies: [
		{ src: '/js/utils/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
		{ src: '/js/utils/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
	]
})

// barchart stuff
var margin = {top: 0, right: 10, bottom: 20, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

var color = d3.scale.category15()

var x = d3.scale.linear()
    .domain([0, 12])
    .range([220, width])

function initBarchart(svg, data) {

	updateBarChart(svg, data)
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.svg.axis()
		.scale(x)
		.orient("bottom"))
		
}

updateBarChart = function(svg, data) {

	var index = d3.range(data.length)

	var y = d3.scale.ordinal()
		.domain(index)
		.rangeRoundBands([0, height], .1)

	var bar = svg.selectAll(".bar")
		.data(data, function(d) { return d.name; })

	 var barEnter = bar.enter().append("g")
		.attr("class", "bar")
		.attr("transform", function(d, i) {return "translate(0," + y(i) + ")"; })

	barEnter.append("text")
		.attr("class", "profile")
		.attr("x", 0)
		.attr("dy", ".35em")
		.style("fill", "black")
		.text(function(d) { return d.name; })

	barEnter.append("rect")
		.attr("x", 220)
		.attr("width", 0)
		.style("fill", function(d, i) { return color(i) })

	barEnter.append("text")
		.attr("class", "val")
		.attr("text-anchor", "end")
		.attr("x", function(d) { return x(d.val) - 6; })
		.attr("dy", ".35em")
		.text(function(d) { return d.val; })
    
    bar.select("rect").transition().duration(750)
		.attr("width", function(d) { return -220 + x(d.val) })
		.attr("height", y.rangeBand())
    bar.select(".profile").transition().duration(750)
		.attr("y", y.rangeBand() / 2)
    bar.select(".val").transition().duration(750)
		.attr("x", function(d) { return x(d.val) - 6; })
		.attr("y", y.rangeBand() / 2)
		.text(function(d) { return d.val; })

	index.sort(function(a, b) { return data[b].val - data[a].val; });

	y.domain(index);

	bar.transition()
	  .duration(750)
	  .delay(function(d, i) { return i * 50; })
	  .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
}

// interactions
var $body =$('body')
	//attendance profiles
	, $profilesBarchart = $('#profiles-barchart')
	, $profileForm = $('#profile-form')
	, $profileLabel = $('#profile-label')
	, $profileVal = $('#profile-val')
	// twitter use purpose 
	, $purposesBarchart = $('#purposes-barchart')
	, $purposeForm = $('#purpose-form')
	, $purposeLabel = $('#purpose-name')
	, $purposeVal = $('#purpose-val')
	// twitter tools
	, $tools = $('#twitter-tool')
	, $toolUrl = $('#tool-url')
	, $toolName = $('#tool-name')
	// twitter use cases
	, $cases = $('#twitter-case')
	, $caseUrl = $('#case-url')
	, $caseName = $('#case-name')
	// twitter tactic
	, $tactics = $('#twitter-tactic')
	, $tacticUrl = $('#tactic-url')
	, $tacticName = $('#tactic-name')
	, defaultData = {
		'profiles': JSON.stringify([{"name":"Entrepreneur","val":"5"},{"name":"Freelance","val":2},{"name":"Employee","val":"0"},{"name":"A bit of everything","val":"1"},{"name":"Other","val":"4"}])
		, 'tool': JSON.stringify({"Belgian Social Media Monitor":"http://bvlg.blogspot.com","Buffer":"http://bufferapp.com","twitter Analytics":"http://analytics.twitter.com","Bottlenose Sonar":"http://sonar.bottlenose.com/","paper.li":"http://paper.li"})
		, 'case': '{}'
		, 'tactic': '{}'
		, 'purposes': JSON.stringify([{"name":"promotion","val":"9"},{"name":"share opinions","val":"4"},{"name":"Intelligence","val":"5"},{"name":"Visibility","val":"8"},{"name":"market validation","val":"5"},{"name":"Support","val":"5"}])
	}
	, interactions = {
		lists: function(key){
			this.key = key
			this.list = {}
			this.init = function() {
				// load localStorage tools in memory
				var storedData = JSON.parse(localStorage.getItem(this.key))
				if (!storedData) {
					localStorage[this.key] = defaultData[this.key]
					storedData = JSON.parse(defaultData[this.key]) || {}
				}
				
				this.list = storedData
				// display existing links
				for(var name in this.list)  {
					this.show(name, this.list[name])
				}
			}
			this.add = function(link) {
			// add link to the links list
			
				if (!this.list[link.name])
					this.show(link.name, link.url)
					
				this.list[link.name] = link.url
				
				localStorage[this.key] = JSON.stringify(this.list)
			}
			this.show = function(name, url) {
			// add link to the slide
				var linkHTML = '<div id="tw-' + this.key + '-' + name + '" class="small-3 columns tw-' + this.key + '" style="display:none">'
				if (url)
					linkHTML +='<a href="' + url + '" target="_blank">' + name + '</a>'
				else 
					linkHTML += name
				linkHTML +='</div>'
				switch(this.key) {
					case 'tool':
						$(linkHTML).appendTo($tools).fadeIn()
					break;
					case 'case':
						$(linkHTML).appendTo($cases).fadeIn()
					break;
					case 'tactic':
						$(linkHTML).appendTo($tactics).fadeIn()
					break;
				}
					
			}
			this.remove =  function(name) {
			// remove a link
				delete this.list[name]
				
				localStorage[this.key] = JSON.stringify(this.list)
				
				this.hide(name)
			}
			this.hide = function(name) {
			// remove link from the slide
				$('#tw-' + this.key + '-' + name).slideUp().remove()
				
			}
		}
		, barchart: function(key){
			this.key = key
			this.list = []
			this.init = function($val) {
				// load localStorage tools in memory
				var storedData = JSON.parse(localStorage.getItem(key))
				if (!storedData) {
					localStorage[this.key] = defaultData[this.key]
					storedData = JSON.parse(defaultData[this.key]) || {}
				}
					
				this.list = storedData
				
				this.svg = d3.select('#' + key + '-barchart').append('svg')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
				  .append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
				// display bar chart
				initBarchart(this.svg, this.list)
				$val.val('')
			}
			this.update = function(opts) {
			// add Tool to the tools list
				var result = $.grep(this.list, function(d){ return d.name == opts.name; });

				//update value
				if (result.length > 0)
					result[0].val = opts.val
				else
					this.list.push({"name": opts.name, "val": opts.val})
				
				updateBarChart(this.svg, this.list)
				
				//persist data
				localStorage[this.key] = JSON.stringify(this.list)
			}
		}
	}

$(document).ready(function() {
	
	// setup profiles bar chart
	var profiles = new interactions.barchart('profiles')
	profiles.init($profileVal)
	
	// setup purposes bar chart
	var purposes = new interactions.barchart('purposes')
	purposes.init($purposeVal)
	
	// setup tools list
	var tools = new interactions.lists('tool')
	tools.init()
	
	// setup cases list
	var cases = new interactions.lists('case')
	cases.init()
	
	// setup tactics list
	var tactics = new interactions.lists('tactic')
	tactics.init()
	
	$profilesBarchart.on('click', '.profile', function(e) {
		console.log('here')
		$profileLabel.html($(e.target).html())
		$profileForm.show()
		$profileVal.focus()
	})
	
	$profileVal.on('keypress', function(e) {
		//~ console.log(d3.select(this).data(), e)
		if (e.keyCode == 13) {

			e.preventDefault()
			var profileName = $profileLabel.html()
				, val = e.target.value
				
			profiles.update({name:profileName, val: val})
			$profileForm.hide()
			$profileVal.val('')
			
		}
	})
	
	$purposeVal.on('keypress', function(e) {
		//~ console.log(d3.select(this).data(), e)
		if (e.keyCode == 13 && e.target.value) {

			e.preventDefault()
			var purposeName = $purposeLabel.val()
				, val = e.target.value

			purposes.update({name:purposeName, val: val})
			$purposeVal.val('')
			$purposeLabel.val('').focus()
			
		}
	})
	
	$body.on('keypress', '#tools-form', function(e) {
	// monitor typing on textinput to submit contributions
		// submit when Enter key is pressed, based on http://stackoverflow.com/a/6936262/1006854

		if (e.keyCode == 13) {
			e.preventDefault()
			handleTool(e.target.value)
		}
	})
	
	$body.on('keypress', '#tactics-form', function(e) {
	// monitor typing on textinput to submit contributions
		// submit when Enter key is pressed, based on http://stackoverflow.com/a/6936262/1006854

		if (e.keyCode == 13) {
			e.preventDefault()
			handleTactic()
		}
	})
	
	function handleTactic () {
		var tacticName = $tacticName.val()
			, tacticUrl = $tacticUrl.val()
		
		if (tacticName != '') {
			if (tactics.list.hasOwnProperty(tacticName) && !tacticUrl ) {
			// remove app in tactic it exists
				tactics.remove(tacticName)
				$tacticName.val('').focus()
			}
			else {
			// add new app
				if (tacticUrl.length > 0 && tacticUrl.substr(0, 4) != 'http')
					tacticUrl = 'http://' + tacticUrl
				tactics.add({name: tacticName, url: tacticUrl})
				$tacticName.val('').focus()
				$tacticUrl.val('')
			}
		}
	}
	
	$body.on('keypress', '#cases-form', function(e) {
	// monitor typing on textinput to submit contributions
		// submit when Enter key is pressed, based on http://stackoverflow.com/a/6936262/1006854

		if (e.keyCode == 13) {
			e.preventDefault()
			handleCase()
		}
	})
	
	function handleCase () {
		var caseName = $caseName.val()
			, caseUrl = $caseUrl.val()
		
		if (caseName != '') {
			if(caseUrl == '') {
			// remove app in case it exists
				cases.remove(caseName)
				$caseName.val('').focus()
			}
			else {
			// add new app
				if (caseUrl.substr(0, 4) != 'http')
					caseUrl = 'http://' + caseUrl
				cases.add({name: caseName, url: caseUrl})
				$caseName.val('').focus()
				$caseUrl.val('')
			}
		}
	}
	
	function handleTool () {
		var toolName = $toolName.val()
			, toolUrl = $toolUrl.val()
		
		if (toolName != '') {
			if(toolUrl == '') {
			// remove app in case it exists
				tools.remove(toolName)
				$toolName.val('').focus()
			}
			else {
			// add new app
				if (toolUrl.substr(0, 4) != 'http')
					toolUrl = 'http://' + toolUrl
				tools.add({name: toolName, url: toolUrl})
				$toolName.val('').focus()
				$toolUrl.val('')
			}
		}
	}
	
	// fix embedded tweets height issue
	setTimeout(function() {$('.twitter-tweet').animate({height: 200})}, 1500)

})

function tick(){path.attr("d",linkArc);path.style("stroke-width",3);circle.attr("transform",transform);text.attr("transform",transform)}function linkArc(e){var t=e.target.x-e.source.x,n=e.target.y-e.source.y,r=Math.sqrt(t*t+n*n);return"M"+e.source.x+","+e.source.y+"A"+r+","+r+" 0 0,1 "+e.target.x+","+e.target.y}function transform(e){return"translate("+e.x+","+e.y+")"}var links=[{source:"Toon",target:"Thys"},{source:"Sophie",target:"Jacques"},{source:"Sophie",target:"Lucie"},{source:"Lucie",target:"Jacques"},{source:"Lucie",target:"Sophie"},{source:"Jacques",target:"Lucie"},{source:"Jacques",target:"Toon"},{source:"Thys",target:"Toon"},{source:"Thys",target:"Mieke"},{source:"Mieke",target:"Thys"},{source:"Mieke",target:"Joke"},{source:"Mieke",target:"Dries"},{source:"Dries",target:"Joke"},{source:"Dries",target:"Thys"},{source:"Dries",target:"Mieke"},{source:"Joke",target:"Mieke"},{source:"Joke",target:"Thys"}];var nodes={Toon:{name:"Toon",cmnty:"both"},Thys:{name:"Thys",cmnty:"dutch"},Sophie:{name:"Sophie",cmnty:"french"},Lucie:{name:"Lucie",cmnty:"french"},Jacques:{name:"Jacques",cmnty:"french"},Mieke:{name:"Mieke",cmnty:"dutch"},Dries:{name:"Dries",cmnty:"dutch"},Joke:{name:"Joke",cmnty:"dutch"}};links.forEach(function(e){e.source=nodes[e.source]||(nodes[e.source]={name:e.source});e.target=nodes[e.target]||(nodes[e.target]={name:e.target})});var width=960,height=500;var force=d3.layout.force().nodes(d3.values(nodes)).links(links).size([width,height]).linkDistance(120).charge(-600).on("tick",tick).start();var svg=d3.select("#cmnty").append("svg").attr("width",width).attr("height",height);svg.append("defs").selectAll("marker").data(["follow"]).enter().append("marker").attr("id",function(e){return e}).attr("viewBox","0 -5 10 10").attr("refX",25).attr("refY",-1.5).attr("markerWidth",4).attr("markerHeight",4).attr("orient","auto").attr("fill","black").attr("opacity",.4).append("path").attr("d","M0,-5L10,0L0,5");var path=svg.append("g").selectAll("path").data(force.links()).enter().append("path").attr("class",function(e){return"link follow"}).attr("marker-end",function(e){return"url(#follow)"});var circle=svg.append("g").selectAll("circle").data(force.nodes()).enter().append("circle").attr("r",20).call(force.drag);var text=svg.append("g").selectAll("text").data(force.nodes()).enter().append("text").attr("x",8).attr("y",".31em").text(function(e){return e.name});svg.selectAll("circle").on("click",function(){var e=d3.select(this).data()[0].cmnty,t;switch(e){case"french":t="#1f54b4";break;case"dutch":t="#ffa70e";break;default:t="#47a02c";break}d3.select(this).style("fill",t)})

function resetStorage() {
	localStorage.tool = JSON.stringify({"socialBro":"http://socialBro.com","Buffer":"http://bufferapp.com"})
	localStorage.profiles = JSON.stringify([{"name":"Entrepreneur","val":"0"},{"name":"Freelance","val":0},{"name":"Employee","val":"0"},{"name":"A bit of everything","val":"0"},{"name":"Other","val":"0"}])
	localStorage.case = "{}"
	localStorage.tactic = "{}"
	localStorage.removeItem('purposes')
}
	

---
title: Pre-render d3.js charts at server side
subtitle: 'part1: proof-of-concept'
description: How to pre-render d3.js data visualizations at server side, using jsdom node.js module.  This is useful to support large graphics on slow machines.
category: engineering
date: 2013-10-23
language: en
author: mehdi
tags: mehdi
thumbnail: blog/img/thumbnails/2013-10-23-pre-render-d3-js-charts-at-server-side.png
scripts: [js/d3.v3.min.js, js/2013-10-23-pre-render-d3-js-charts-at-server-side.js]
---

<div class="section" markdown="1">
This guide explains how to use [d3.js](http://d3js.org/) on the server to pre-render data-visualization, which will be used client-side.

The main goal here is to do the heavy-lifting on the server in order to reduce page load time and other burden for the website visitors, while keeping all the power offered by d3.js, in terms of interactions on the browser.

This first article explains the concept via a very simple example, while a second one will illustrate its benefits when applied to a large chart.

</div>

<div class="section" markdown="1">

##Why pre-render?

<div class="section" markdown="1">
###For performance

d3.js is great to manipulate data on web pages, but performance quickly becomes an issue when we talk about a large volume of data. Some layout algorithms take an important time to run, and DOM manipulations also are very slow. Functionally, there is no need to do all this work at client side, and moving part of the work to the server is likely to solve these issues, as all the overhead of computing layout and adding DOM nodes is done once and for all on the server, instead of being executed on each visitor's device, sometimes crashing their web browsers...

Here is an overview of a dashboard we generate at [tribalytics](http://tribalytics.com), it combines several visualizations, force layout being the most expensive (we even prevent nodes overlapping):

![screenshot of tribalytics dashboard](/blog/img/tribalytics-dashboard-screenshot.png "data visualizations inside tribalytics.com's dashboard")

</div>

<div class="section" markdown="1">
###For SEO

A side benefit is that your svg content will be indexed by Google (Google indexes svg since 2010). If your visuals contain much text, then this might be an important boost to your ranking.

</div>
</div>

<div class="section" markdown="1">

##How to do it

We will now show how to generate an svg circle at server side with d3, and have it manipulated on the client side. This example is deliberately simple to be easily understandable; the actual use case for pre-rendering svgs is to gain performance on more complex visuals.

<div class="section">
<svg height="150" width="400">
	<line x1 = "200" y1 = "10" x2 = "200" y2 = "140" style = "stroke: #565656; stroke-width: 2;"/>
	<text x = "10" y = "30">On the server</text>
	<text x = "10" y = "50">draw a green circle</text>
	<text x = "210" y = "30">On the client</text>
	<a id="paintOrange"><text x = "210" y = "50" text-decoration = "underline" style="fill:#26963C; cursor:pointer"  onmouseover="evt.target.setAttribute('fill', '#175924');" onmouseout="evt.target.setAttribute('fill','#26963C)');">paint it orange</text></a>
	<circle fill = "#26963c" r = "30" cx = "50" cy = "100"/>
	<circle id = "targetCircle" fill = "#26963c" r = "30" cx = "250" cy = "100"/>
</svg>
<script>

</script>
</div>

A follow-up article will apply this technique to a large data visualization and measure performance effect on the client.

<div class="section" markdown="1">
###Dependencies

We assume that node.js is already installed. d3.js and [jsdom](https://github.com/tmpvar/jsdom) modules are necessary:

// TODO code highlight to setup here ( lang:bash)
npm install d3 jsdom

// end highlight
</div>

<div class="section" markdown="1">
###Generate an html page with jsdom

First step is to create an html document on the server with jsdom

This is the how the skull of our script looks like, we'll complete it step by step:

// TODO code highlight to setup here ( lang:javascript)
var d3 = require('d3')
	, jsdom = require('jsdom')
	, htmlStub = '<html><head></head><body><div id="dataviz-container"></div><script src="js/d3.v3.min.js"></script></body></html>' // html file skull with a container div for the d3 dataviz

// pass the html stub to jsDom
jsdom.env({ features : { QuerySelector : true }, html : htmlStub
	, done : function(errors, window) {
	// process the html document, like if we were at client side
		// code to generate the dataviz and process the resulting html file to be added here
	}
})

// end highlight

The code above creates an html document on the server, kept in memory. We have included base html tags, a container div for the svg, as well as a script loading d3.js on the client.

Thanks to jsdom we can manipulate the html file using d3.js just as if we were at client side. To do so, we have to use jsdom's querySelector  function and pass its result to d3.js.

We will select the dataviz container and the page's body. Container selection will be used to append the svg, body selection will be used to append the client-side d3.js script.


// TODO code highlight to setup here ( lang:javascript)var el = window.document.querySelector('#dataviz-container')
	, body = window.document.querySelector('body')

// end highlight

</div>

<div class="section" markdown="1">
###Render the dataviz with d3 node.js module

This is where things get interesting.

We will now draw a circle using d3.js, but instead of writing the usual client-side script, we will use d3.js to generate the svg on the server. We will serve a page already filled with the svg drawing, instead of having the visual generated only when the page is loaded.

We create an svg containing a green circle, and append it to the container:

// TODO code highlight to setup here ( lang:javascript)
// append the svg to the container selector
d3.select(el)
	.append('svg:svg')
		.attr('width', 600).attr('height', 300)
		.append('circle')
			.attr('cx', 300).attr('cy', 150).attr('r', 30).attr('fill', '#26963c')
// end highlight

Remember, the d3 code above is executed on the server. The html document we have generated contains the svg circle, and not the lines above.

</div>

<div class="section" markdown="1">
###Generate a d3.js client side script
Let's say we want to make the dataviz interactive, therefore also processed with d3.js on the client. Then we also need to inject the client script inside the html. In our example, the client-side script will select the circle by its Id and transition its fill color to orange.

We have to modify our code this way:

* add an Id to the circle (we simulate that the circle was created using dynamically retrieved values)
* write a script manipulating the d3 dataviz for the client, and append it to the html body. 

// TODO code highlight to setup here ( lang:javascript)
var circleId = 'a2324'  // say, this value was dynamically retrieved from a database

// append the svg to the selector
d3.select(el)
	.append('svg:svg')
		.attr('width', 600).attr('height', 300)
		.append('circle')
			.attr('cx', 300).attr('cy', 150).attr('r', 30).attr('fill', '#26963c')
			.attr('id', circleId) // we assign the circle to an Id here

// write the client-side script manipulating the circle
var clientScript = "d3.select('#" + circleId + "').transition().delay(1000).attr('fill', '#f9af26')"

// append the script to page's body
d3.select(body)
	.append('script')
		.html(clientScript)
// end highlight

Note that the `clientScript` is passed with the value of `circleId` which is dynamically retrieved on the server.

The solution depicted in this post still would require you to run d3.data() on the client. I am looking around to see whether there would be a way to pass d3 selections directly from the server to the client, and even to bind the DOM `__data__` information on the server already.

</div>

<div class="section" markdown="1">
###Use the result

All that is left to do is to consume the html file. We could, according to our requirements and infrastructure, either serve the output directly in node.js, save the svg in a database, to be consumed by the server later on, or save the whole html page and serve it as a static document.

Here is how to save the html file we produced:

// TODO code highlight to setup here ( lang:javascript)
// save result in an html file
var fs = require('fs')
	, svgsrc = window.document.innerHTML
	
fs.writeFile('index.html', svgsrc, function(err) {
	if(err) {
		console.log('error saving document', err)
	} else {
		console.log('The file was saved, open index.html to see the result')
	}
})
// end highlight

</div>
</div>

<div class="section" markdown="1">

##Wrapping it up

You can get the full code of the above proof-of-concept in [this gist](https://gist.github.com/mef/7044786).

The technique shown is quite simple and effective, providing the following gains:

* performance: layout is already computed on the server
* performance: generation of the DOM nodes is already done
* SEO: the page is served to Google bots with the content already generated

The second article of this series will measure how it affects the rendering of a force layout chart.

An alternative way to improve performance of d3 at client side, without pre-rendering on the server is via the use of DOM DocumentFragments, read the following [thread](https://news.ycombinator.com/item?id=6423960) to know how this can be done.

Further improvement would be to **pass the state of server-side d3 to the client-side**, I have to investigate about whether this is possible. **If you have an idea about this, please comment below**.


##Resources

The following pages were used as a base to this development:

* Matt Baker's gist [generating a pie chart on the server](https://gist.github.com/mattbaker/1511770)
* d3.js tests: [load.js](https://github.com/mbostock/d3/blob/master/test/load.js).

</div>

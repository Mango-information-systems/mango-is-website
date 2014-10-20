---
layout: post
language: en
title: How to choose the right web Data Visualization library
description: Review of the most relevant charting libraries for common web data visualizations and reporting projects use cases. Should you choose Highcharts or d3?
author: Mango Information Systems
tags: mehdi
date: 2014-10-01
last-update: 2014-10-20
thumbnail: blog/img/thumbnails/2014-10-01-how-to-choose-the-right-web-data-visualization-library.png
css: blog/css/2014-10-01-how-to-choose-the-right-web-data-visualization-library.css
scripts: [js/d3.v3.min.js, js/jquery-scrollto.js, js/internal-links-scrollTo.js, js/internal-links-scrollTo.js, blog/js/2014-10-01-how-to-choose-the-right-web-data-visualization-library.js]
---
<div class="section" markdown="1">
Web developers often ask me which charting or data visualization library they should choose for their projects. There are plenty of solutions available, several approaches and various levels of maturity. Based on what you are trying to achieve, different tools may be relevant.

I've narrowed down the use-cases in three categories, and recommended a personal selection of **mature and stable solutions** only.

1. [Reporting and dashboarding](#reporting-and-dashboarding){: .int }: **fully featured** charting libraries recommended for most situations.
2. [Advanced visualizations](#advanced-visualizations){: .int }: **more flexible** solutions for **data-intensive** and highly interactive projects.
3. [Specialized libraries](#specialized-libraries){: .int }: for specific requirements - **maps** or **graph** visualizations.

Then for those of you who want to explore more tools, I'm also [sharing my bookmarks](#more){: .int }.

<div class="section" markdown="1">

###TL;DR

Here's a visual summary of the solutions I recommend.

<!--[if lt IE 9]>
	
<small>Use a more recent web browser to see an interactive version of this visualization.</small>

<img src="{{ site.url }}/blog/img/fallback/dataviz-libraries-summary.png">
	
<![endif]-->

<!--[if gte IE 9]><!-->

<small>Click on the libraries names to visit their websites. bold = recommended, regular = other option</small>

<div id="chartsContainer"><svg width="650" height="500" preserveAspectRatio="xMinYMin" viewbox="0 0 650 500" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(40,20)"><path class="link" d="M164.66666666666666,61.53846153846154C247,61.53846153846154 247,30.76923076923077 329.3333333333333,30.76923076923077"></path><path class="link" d="M164.66666666666666,61.53846153846154C247,61.53846153846154 247,61.53846153846154 329.3333333333333,61.53846153846154"></path><path class="link" d="M164.66666666666666,61.53846153846154C247,61.53846153846154 247,92.3076923076923 329.3333333333333,92.3076923076923"></path><path class="link" d="M164.66666666666666,169.23076923076923C247,169.23076923076923 247,153.84615384615384 329.3333333333333,153.84615384615384"></path><path class="link" d="M164.66666666666666,169.23076923076923C247,169.23076923076923 247,184.6153846153846 329.3333333333333,184.6153846153846"></path><path class="link" d="M164.66666666666666,300C247,300 247,246.15384615384616 329.3333333333333,246.15384615384616"></path><path class="link" d="M164.66666666666666,300C247,300 247,353.84615384615387 329.3333333333333,353.84615384615387"></path><path class="link" d="M329.3333333333333,246.15384615384616C411.66666666666663,246.15384615384616 411.66666666666663,215.3846153846154 494,215.3846153846154"></path><path class="link" d="M329.3333333333333,246.15384615384616C411.66666666666663,246.15384615384616 411.66666666666663,246.15384615384616 494,246.15384615384616"></path><path class="link" d="M329.3333333333333,246.15384615384616C411.66666666666663,246.15384615384616 411.66666666666663,276.9230769230769 494,276.9230769230769"></path><path class="link" d="M329.3333333333333,353.84615384615387C411.66666666666663,353.84615384615387 411.66666666666663,338.46153846153845 494,338.46153846153845"></path><path class="link" d="M329.3333333333333,353.84615384615387C411.66666666666663,353.84615384615387 411.66666666666663,369.2307692307692 494,369.2307692307692"></path><g class="node" transform="translate(164.66666666666666,61.53846153846154)"><circle r="4.5"></circle>

<a class="int" xlink:href="#reporting-and-dashboarding"><text dx="-8" dy="3" text-anchor="end" style="font-size:18px;font-weight: bold;"><tspan x="0" dy="0">Reporting and</tspan><tspan x="0" dy="1.2em">dashboarding</tspan></text></a></g>

<g class="node" transform="translate(329.3333333333333,30.76923076923077)"><circle r="4.5"></circle><a xlink:href="http://highcharts.com/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">Highcharts</text></a></g><g class="node" transform="translate(329.3333333333333,61.53846153846154)"><circle r="4.5"></circle><a xlink:href="http://fusioncharts.com/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">Fusion Charts</text></a></g><g class="node" transform="translate(329.3333333333333,92.3076923076923)"><circle r="4.5"></circle><a xlink:href="https://developers.google.com/chart/"><text dx="8" dy="3" text-anchor="start">Google charts</text></a></g><g class="node" transform="translate(164.66666666666666,169.23076923076923)"><circle r="4.5"></circle>

<a class="int" xlink:href="#advanced-visualizations"><text dx="-8" dy="3" text-anchor="end" style="font-size:18px;font-weight: bold;"><tspan x="0" dy="0">Advanced</tspan><tspan x="0" dy="1.2em">visualizations</tspan></text></a>

</g><g class="node" transform="translate(329.3333333333333,153.84615384615384)"><circle r="4.5"></circle><a xlink:href="http://d3js.org/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">d3.js</text></a></g><g class="node" transform="translate(329.3333333333333,184.6153846153846)"><circle r="4.5"></circle><a xlink:href="http://raphaeljs.com/"><text dx="8" dy="3" text-anchor="start">Raphael.js</text></a></g><g class="node" transform="translate(164.66666666666666,300)"><circle r="4.5"></circle>

<a class="int" xlink:href="#specialized-libraries"><text dx="-8" dy="3" text-anchor="end" style="font-size:18px;font-weight: bold;"><tspan x="0" dy="0">Specialized</tspan><tspan x="0" dy="1.2em">libraries</tspan></text></a></g>

<g class="node" transform="translate(329.3333333333333,246.15384615384616)"><circle r="4.5"></circle>

<a class="int" xlink:href="#maps"><text dx="-8" dy="3" text-anchor="end" style="font-weight: bold;">Maps</text></a></g><g class="node" transform="translate(494,215.3846153846154)"><circle r="4.5"></circle><a xlink:href="http://openlayers.org/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">Openlayers</text></a></g><g class="node" transform="translate(494,246.15384615384616)"><circle r="4.5"></circle><a xlink:href="http://leafletjs.com/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">Leaflet</text></a></g><g class="node" transform="translate(494,276.9230769230769)"><circle r="4.5"></circle><a xlink:href="http://d3js.org/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">d3.js</text></a></g><g class="node" transform="translate(329.3333333333333,353.84615384615387)"><circle r="4.5"></circle>

<a class="int" xlink:href="#graphs"><text dx="-8" dy="3" text-anchor="end" style="font-weight: bold;">Graphs</text></a></g><g class="node" transform="translate(494,338.46153846153845)"><circle r="4.5"></circle><a xlink:href="http://sigmajs.org/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">sigma.js</text></a></g><g class="node" transform="translate(494,369.2307692307692)"><circle r="4.5"></circle><a xlink:href="http://d3js.org/"><text dx="8" dy="3" text-anchor="start" style="font-weight: bold;">d3.js</text></a></g></g></svg></div>

<!-- <![endif]-->

</div>

</div>

<div class="section" markdown="1">

##Reporting and dashboarding

Some libraries are fully-featured and cover the most common requirements. Three characteristics you care about are:

* **flexible** - you should be able to customize the visuals
* **interactive** - more than eye-candy, 
* **responsive** - scale well on any device
* **minimal learning curve** - efficiency never hearts
* **cross-browser compatible** - this is a pain, let the library handle it for you.

My recommendations are:

* **[Highcharts](http://www.highcharts.com/){: target="_blank" }**
* **[Fusion Charts](http://www.FusionCharts.com/){: target="_blank" }**

Both Highcharts and Fusion charts are commercial open source tools, with reasonable pricing. They are stable and mature, and work well on older browsers (IE6+). Hicharts is free for non-commercial projects.

<p class="text-center" markdown="1">

![Example dashboard from fusioncharts.com](/blog/img/example-dashboard.png "Example dashboard from fusioncharts.com"){: .img-polaroid}

<br/><small>Example dashboard from fusioncharts.com</small>

</p>

An alternative solution is [Google charts](https://developers.google.com/chart/){: target="_blank" }, which is free. The charts are hosted by Google, and you have a far lower flexibility regarding the customizations you may put in place. If you opt for this one, have a contingency plan for the situation when Google stops providing the service.

</div>

<div class="section" markdown="1">

##Advanced visualizations

Sometimes you need more:

* **less common chart types**
* **data-driven approach**
* extra **flexibility**

Then there's one solution for you: **[d3.js](http://d3js.org/){: target="_blank" }**. It's not a charting library, but data-driven visualization framework. You put data in, and have all you need to manipulate to generate the output you want. It contains so many essential primitives that make the work so easy. **Developers fall in love with d3** because it makes it more convenient to manage the data binding to the DOM. It's **the rolls-royce of web-based dataviz tools**. Strong, powerful, it is also free, open source, and there's a vibrant community around it.

<p class="text-center" markdown="1">

![example d3.js visualizations](/blog/img/d3.js-examples.png "Example d3.js visualizations"){: .img-polaroid}

<br/><small>Example d3.js visualizations (source: d3js.org)</small>

</p>

You may have stumbled upon the awesomeness of some visualizations created by Mike Bostock (the creator of d3.js) in the New York times, e.g. [Over the Decades, How States Have Shifted](http://www.nytimes.com/interactive/2012/10/15/us/politics/swing-history.html?_r=0){: target="_blank" } or [Sochi 2014 Interactive Stories](http://www.nytimes.com/interactive/2014/02/11/sports/sochi-2014-interactive-stories.html){: target="_blank" }.

So, as d3.js is so awesome, why should anyone ever use the libraries from the previous categories? Few things to have in mind:

* The data-driven approach of d3.js is pretty different from the logic of other libraries, so there's some extra time required in understanding how it works. Consider this **learning curve** seriously.
* d3.js is not a charting library, **you'll have to build your own re-usable charts templates** or use one of the existing ones built on top of it - although, some charting libraries are built on top of d3.
* d3.js does **not provide cross-browser compatibility** out of the box, although many hacks exist to implement it.

So, if you need charts for a business project and not just for the fun, don't have too much time, and are not familiar with d3.js, better stick to the plug-and-play tools, you'll get the work done quicker and more easily. If you really have problem with them, then be welcome in d3.

In the same category, it's also worth mentioning **[Raphaël](http://raphaeljs.com/){: target="_blank" }**, a "small JavaScript library that should simplify your work with vector graphics on the web". Raphaël makes it easy do draw things in SVG, and renders properly across all browsers (IE6+). Raphaël is less suitable for charting, but it might be a **good choice to design infographics**.

</div>

<div class="section" markdown="1">

##Specialized libraries

I thought I should mention solutions answering to some edge-case requirements.

<div class="section" markdown="1">

###maps

To draw maps, specific products do the job very well.  Have a look at **[Openlayers](http://openlayers.org/){: target="_blank" }** and **[leaflet](http://leafletjs.com/){: target="_blank" }**.

<p class="text-center" markdown="1">

![Chloropleth map visualization made with Leaflet](/blog/img/brussels-bike-theft-map.png "Chloropleth map visualization made with Leaflet"){: .img-polaroid}

<br/><small>Chloropleth map visualization made with Leaflet</small>

</p>

d3.js can also help you do very advanced things, like using [less common projections](https://github.com/mbostock/d3/wiki/Geo-Projections){: target="_blank" } or [combining interactive map with other charts](http://roadtolarissa.com/twisters/){: target="_blank" }. See [more than 200 examples](http://christopheviau.com/d3list/gallery.html#visualizationType=map){: target="_blank" }, and a [tutorial to get started](http://bost.ocks.org/mike/map/){: target="_blank" }.

</div>

<div class="section" markdown="1">

###Graphs

<p class="text-center" markdown="1">

![sigma.js graph](/blog/img/sigma.png "sigma.js graph"){: .img-polaroid}

<br/><small>sigma.js graph</small>

</p>

While d3.js deals well with graphs, you might prefer to use **[sigma.js](http://sigmajs.org/){: target="_blank" }** in case you're only dealing with graph visualizations. It's more **plug-and-play**, you can create **very smooth interactive graphs** very easily. Early 2014, version 1.0 was released, providing a more consistent API, making it easier to hack the default settings and extend sigma.

It is free and open source.

In terms of performance, I consider d3 and sigma as equivalent, with a small advantage for sigma. These libraries are **suitable for small graphs (up to a few thousand nodes) out of the box**, and you need to hack them in order to get a suitable performance on larger graphs. In terms of technology, both libraries let you render the way you want; d3 is more tied to SVG, whereas sigma has a canvas and a webgl renderer built-in.

To my eyes, another advantage sigma has over d3 for graphs is the built-in Force Atlas 2 algorithm, which is produces better results when you want to represent social graphs. d3.js' force layout algorithm tends to be difficult to tweak in order to highlight a community structure. Your mileage may vary, for many use cases this difference is not important.

</div>

<div class="section" markdown="1">

##More

While this article focuses on tools, it's also important to know **how to create good visualizations**. [The Visual Display of Quantitative Information](http://www.edwardtufte.com/tufte/books_vdqi){: target="_blank" } by Edward Tufte is a reference writing. There's also this ebook available for free online: [Data Visualization with JavaScript](http://jsdatav.is/intro.html){: target="_blank" } which may be of some help.

The personal selection of libraries presented above is far from exhaustive, my criteria to include tools was the maturity of the products. There are **many other libraries** that are **worth having a look at**. Here are some links from my personal bookmarks that I have tagged with "chart", in no particular order. Let me know in case some of them are broken.

* [mindmup.com](https://www.mindmup.com/){: target="_blank" }
* [github.com/andreaferretti/paths-js](https://github.com/andreaferretti/paths-js){: target="_blank" }
* [www.lovelycharts.com/](http://www.lovelycharts.com/){: target="_blank" }
* [chartio.com/](http://chartio.com/){: target="_blank" }
* [processing.org/](http://processing.org/){: target="_blank" }
* [github.com/RandomEtc/mind-gapper-js](https://github.com/RandomEtc/mind-gapper-js){: target="_blank" }
* [www.jstat.org/](http://www.jstat.org/){: target="_blank" }
* [smoothiecharts.org/](http://smoothiecharts.org/){: target="_blank" }
* [nickqizhu.github.io/dc.js/](http://nickqizhu.github.io/dc.js/){: target="_blank" }
* [www.drasticdata.nl/DDHome.php?m=0](http://www.drasticdata.nl/DDHome.php?m=0){: target="_blank" }
* [flowingdata.com/](http://flowingdata.com/){: target="_blank" }
* [www.aquire.com/](http://www.aquire.com/){: target="_blank" }
* [g.raphaeljs.com/](http://g.raphaeljs.com/){: target="_blank" }
* [code.google.com/p/flot/](http://code.google.com/p/flot/){: target="_blank" }
* [bonsaijs.org/](http://bonsaijs.org/){: target="_blank" }
* [tenxer.github.io/xcharts/](http://tenxer.github.io/xcharts/){: target="_blank" }
* [jsplumb.org/jquery/demo.html](http://jsplumb.org/jquery/demo.html){: target="_blank" }
* [www.diagram.ly/](http://www.diagram.ly/){: target="_blank" }
* [selection.datavisualization.ch/](http://selection.datavisualization.ch/){: target="_blank" }
* [www.graphviz.org/](http://www.graphviz.org/){: target="_blank" }
* [vschart.com/](http://vschart.com/){: target="_blank" }
* [github.com/novus/nvd3](https://github.com/novus/nvd3){: target="_blank" }
* [jolicharts.com/](https://jolicharts.com/){: target="_blank" }
* [polychart.com/](http://polychart.com/){: target="_blank" }
* [nvd3.org/](http://nvd3.org/){: target="_blank" }
* [trifacta.github.io/vega/](http://trifacta.github.io/vega/){: target="_blank" }
* [humblesoftware.com/flotr2/documentation](http://humblesoftware.com/flotr2/documentation){: target="_blank" }
* [www.polychartjs.com/](http://www.polychartjs.com/){: target="_blank" }
* [www.chartjs.org/](http://www.chartjs.org/){: target="_blank" }
* [trifacta.github.io/vega/](http://trifacta.github.io/vega/){: target="_blank" }
* [misoproject.com/d3-chart/](http://misoproject.com/d3-chart/){: target="_blank" }
* [dimplejs.org/](http://dimplejs.org/){: target="_blank" }
* [github.com/Quartz/Chartbuilder/](https://github.com/Quartz/Chartbuilder/){: target="_blank" }
* [datawrapper.de/](http://datawrapper.de/){: target="_blank" }
* [timeline.verite.co/](http://timeline.verite.co/){: target="_blank" }
* [www.draw.io/](https://www.draw.io/){: target="_blank" }
* [github.com/benfred/venn.js](https://github.com/benfred/venn.js){: target="_blank" }
* [plot.ly/](https://plot.ly/){: target="_blank" }


</div>

**Full disclosure**: While I have contributed in some of the open source tools recommended in this post, I am not affiliated with any of them.



</div>

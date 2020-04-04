---
layout: index
metaTitle: "myTagOverflow: showcase your top tags from stackOverflow"
title: "myTagOverflow <sup style='color:#aaa;'>beta</sup>"
subtitle: StackOverflow top tags data visualization
topBackgroundImage: 
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Need to demonstrate your technical abilities? myTagOverflow shows the tags you're most active on in a cool graph visualization.
thumbnail: /img/thumbnails/myTagOverflow.png
css: [myTagOverflow.css]
scripts: [https://api.stackexchange.com/js/2.0/all.js, js/myTagOverflowChecker.js]
sections:
 -
  # app
  content:
   - type: seLogin
 -
  # How it works
  content:
   - type: h3
     value: How it works
   - type: ol
     value: "
		<li>Connect your stackExchange account</li>
		<li>Visualize statistics about the tags you interact the most with on stackExchange</li>
		<li>Adjust the graph layout by dragging/dropping tags</li>
		<li>Use the visualization in your own website, CV or share on social media...</li>
		"
 -
  # About myTagOverflow
  content:
   - type: h3
     value: About myTagOverflow
   - type: p
     value: myTagOverflow creates a visualization of the top tags related to your activity on stackOverflow.
   - type: p
     value: It may be useful when you want to demonstrate your technical abilities, based on factual data ;).
   - type: p
     value: If you like it, you may be interested by <a href="http://p.migdal.pl/tagoverflow/?site=stackoverflow&size=16">tagOverflow</a>, a similar project (independent from myTagOverflow) generating a similar visualization for the whole stackExchange sites (not per user).
   - type: h4
     value: Your privacy is paramount
   - type: p
     value: Data from stackExchange never passes through our servers. It goes directly from StackExchange to your browsers.
   - type: h4
     value: Open source
   - type: p
     value: myTagOverflow is open source, dual-licensed under MIT and LGPL. You can find the source code of this app <a href="https://github.com/Mango-information-systems/mango-is-website/">here</a>.
   - type: p
     value: Suggestions and contributions are welcome, please have a look at the <a href="https://github.com/Mango-information-systems/mango-is-website/labels/myTagOverflow">current issues</a> on github.
 -
  # About us
  content:
   - type: h3
     value: About us
   - type: p
     value: Mango Information Systems is a small Belgian company specialized in Data Science / Business Intelligence.
   - type: p
     value: We help businesses with their data integration and analytics problems, making sure that both technology and processes are streamlined.
   - type: div
     class: row
     value: "
		<br>
		<div class='four offset-by-two columns'>
			<p>
				<a class='button u-full-width' href='/'><i class='fa fa-home' aria-hidden='true'></i> Read more</a>
			</p>
		</div>
		<div class='four columns'>
			<p>
				<a class='button button-primary u-full-width' href='/contact/'><i class='fa fa-envelope' aria-hidden='true'></i> Contact us</a>
			</p>
		</div>
		
		<br><br>
	"
---

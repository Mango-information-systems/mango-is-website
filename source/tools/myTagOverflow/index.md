---
layout: landing
title: "myTagOverflow: showcase your top tags from stackOverflow"
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Need to demonstrate your technical abilities? myTagOverflow shows the tags you're most active on in a cool graph visualization.
thumbnail: /img/thumbnails/myTagOverflow.png
css: [myTagOverflow.css]
scripts: [https://api.stackexchange.com/js/2.0/all.js, js/myTagOverflowChecker.js]
__index: true
sections:
 -
  # top section: title
  content:
   - type: h1
     class: small
     value: myTagOverflow - StackOverflow top tags data visualization<sup style="color:#aaa;">beta</sup>
   - type: h2
     class: small
     value: Showcase your stackExchange tags stats in a neat data visualization.
 -
  # app
  content:
   - type: div
     id: app
     class: row
     value: ""
 -
  # How it works
  content:
   - type: h3
     value: How it works
   - type: ol
     value: "<li>Connect your stackExchange account</li>
		<li>Visualize statistics about the tags you interact the most with on stackExchange</li>
		<li>Adjust the graph layout by dragging/dropping tags</li>
		<li>Use the visualization in your own website, CV or share on social media...</li>"
 -
  # About
  content:
   - type: h3
     value: About
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
---

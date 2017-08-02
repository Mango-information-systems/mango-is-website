---
layout: landing
title: "myTagOverflow: visualize your top tags on stackOverflow"
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Showcase your stackOverflow tags in a neat data visualization.
thumbnail: /img/thumbnails/myTagOverflow.png
css: [myTagOverflow.css]
scripts: [https://api.stackexchange.com/js/2.0/all.js, js/myTagOverflow.js]
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
     value: "<div id='user' class='two columns'></div><div id='chart' class='ten columns'><?xml version='1.0' encoding='utf-8'?><svg width='120px' height='120px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-ripple'><rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect><g> <animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#565656' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g><g><animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#FF6600' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g></svg><br><small>Loading...</small></div>"
 -
  # How it works
  content:
   - type: h3
     value: How it works
   - type: ol
     value: "<li>Connect your stackExchange account</li>
		<li>Visualize statistics about the tags you interact the most with on stackExchange</li>
		<li>Use the visualization in your own website, or share on social media...</li>"
 -
  # About
  content:
   - type: h3
     value: About
   - type: p
     value: This tool lets you visualize [...].
   - type: p
     value: It is useful when you need to [...].
   - type: h4
     value: Privacy friendly
   - type: p
     value: The websites traffic data coming from stackExchange transits directly from stackExchange to your browser screen, without ever passing through our servers.
   - type: h4
     value: Open source
   - type: p
     value: This tool is open source, dual-licensed under MIT and LGPL. You can find the source code of this app <a href="https://github.com/Mango-information-systems/mango-is-website/">here</a>.
---

---
layout: landing
title: Free multi-site live web traffic monitor
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Visualize the traffic across all of your websites in real time, with Google Analytics data.
thumbnail: img/thumbnails/ga-realtime.png
css: [g-realtime.css]
scripts: [js/g-realtime.js, https://apis.google.com/js/api.js?onload=gApiLoaded]
__index: true
sections:
 -
  # top section: title
  content:
   - type: h1
     class: small
     value: Realtime multi-site live google analytics dashboard
   - type: h2
     class: small
     value: Monitor the traffic across multiple sites in a single screen in realtime.
 -
  # app
  content:
   - type: div
     id: app
     value: "<?xml version='1.0' encoding='utf-8'?><svg width='120px' height='120px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-ripple'><rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect><g> <animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#565656' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g><g><animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#FF6600' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g></svg><br><small>Loading...</small>"
 -
  # How it works
  content:
   - type: h3
     value: How it works
   - type: ol
     value: "<li>Connect your google account</li>
		<li>View the number of visitors in each view of all properties of your Google Anaytics account</li>
		<li>Use the drop-down menu to view the visits for another account</li>"
 -
  # About
  content:
   - type: h3
     value: About
   - type: p
     value: This tool lets you visualize the number of visitors you have on several of your websites, from a single screen.
   - type: p
     value: It is useful when you need to perform some operations on your server, and would like to check whether some people are connected at the moment.
   - type: h4
     value: Privacy friendly
   - type: p
     value: The websites traffic data coming from Google Analytics transits directly from Google Analytics to your browser screen, without ever passing through our servers.
   - type: h4
     value: Open source
   - type: p
     value: This tool is open source, dual-licensed under MIT and LGPL. You can find the source code of this app <a href="https://github.com/Mango-information-systems/mango-is-website/">here</a>.
---

---
layout: index
title: "multiGa: realtime multi-website traffic dashboard"
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Free dashboard showing Google Analytics live traffic data on multiple websites. Ideal to find out if it's the right moment to upgrade your server ;)
thumbnail: /img/thumbnails/multiGa.png
scripts: [js/g-realtime.js, https://apis.google.com/js/api.js?onload=gApiLoaded]
sections:
 -
  # top section: title
  content:
   - type: h1
     value: "multiGa: realtime traffic dashboard for your websites"
   - type: h2
     value: A free dashboard to visualize Google Analytics live metrics for multiple sites.
 -
  # app
  content:
   - type: div
     id: app
     value: "<?xml version='1.0' encoding='utf-8'?><svg width='120px' height='120px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-ripple'><rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect><g> <animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#565656' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g><g><animate attributeName='opacity' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='1;1;0'></animate><circle cx='50' cy='50' r='40' stroke='#5A5758' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='r' dur='2s' repeatCount='indefinite' begin='1s' keyTimes='0;0.33;1' values='0;22;44'></animate></circle></g></svg><br><small>Loading...</small>"
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
  # About multiGa
  content:
   - type: h3
     value: About multiGa
   - type: p
     value: This tool lets you visualize the number of visitors you have across all of your websites, from a single screen.
   - type: p
     value: It is useful when you need to perform operations on your server, and would like to check whether people are connected at the moment.
   - type: h4
     value: Your privacy respected
   - type: p
     value: Data from Google Analytics never passes through our servers. It goes directly from Google Analytics to your browser.
   - type: h4
     value: Open source
   - type: p
     value: This tool is open source, dual-licensed under MIT and LGPL. You can find the source code of this app <a href="https://github.com/Mango-information-systems/mango-is-website/">here</a>.
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

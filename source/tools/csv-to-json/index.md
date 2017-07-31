---
layout: landing
title: Online CSV to JSON converter
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Easy, privacy-friendly and offline-first online csv to json converter
thumbnail: /img/thumbnails/2015-01-08-csv-to-json.png
css: [legacy/2015-01-08-csv-to-json.css]
scripts: [js/legacy/jquery.js, js/legacy/underscore-min.js, js/legacy/localforage.nopromises.min.js, js/legacy/papaparse.min.js, js/legacy/2015-01-08-csv-to-json.js]
__index: true
sections:
 -
  # top section: title
  content:
   - type: h1
     class: small
     value: Online CSV to JSON converter
   - type: h2
     class: small
     value: Monitor the traffic across multiple sites in a single screen in realtime.
 -
  # app
  content:
   - type: div
     value: "<noscript><span class='alert alert-error'>Please activate javascript in order to use the application.</span></noscript>"
   - type: div
     id: appWrapper
     value: "<div id='csvSelectorPane'>
		<div class='row'>
			<div id='dropZone' class='eight columns'>
				<h2>New conversion</h2>
				<p>
					<span>Drop or <strong>select a file</strong></span><br>
					<input id='fileSelect' type='file'/>
				</p>
				<p>
					Or <strong>paste CSV</strong> text <small><a id='sampleCSV'>sample</a></small>
				</p>
				<div class='row'>
					<textarea id='csvText' class='twelve columns' placeholder='Paste from spreadsheet' rows='7'></textarea>
					<div id='progress' style='float:right; min-height: 5px; width: 100%; background-color: #F47216;'></div>
				</div>
				<p>
					Or <strong>enter a URL</strong>
				</p>
				<div class='row'>
					<input type='url' name='csvUrl' id='csvUrl' class='twelve columns' placeholder='Type CSV Url then press Enter'/>
				</div>
				<div id='dropPlaceHolder'>
					<br>
					<p class='text-center muted'>Drop file here</p>
				</div>
			</div>
			<div class='four columns'>
				<h2>Your files</h2>
				<div id='filesList'>
				</div>
			</div>
		</div>
	</div>

	<div id='previewPane'>
	</div>

	<div id='resultsPane'>
	</div>"
 -
  # How it works
  content:
   - type: h3
     value: How it works
   - type: ol
     value: "<li>Load file or paste your CSV data</li>
			<li>Preview results and adapt parameters if necessary</li>
			<li>Get the results</li>"
 -
  # About
  content:
   - type: h3
     value: About
   - type: p
     value: This tools lets you convert CSV data to JSON format in a few clicks.
   - type: h4
     value: Offline first
   - type: p
     value: You can use the converter even when you're not connected to the Internet, it just works.
   - type: h4
     value: Privacy friendly
   - type: p
     value: "Your data never leaves your browser, thanks to the <a href='https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications' target='_blank'>HTML5 File API</a>."
   - type: h4
     value: Design
   - type: p
     value: "We focused on making it easy and efficient. Do not hesitate to <a href='https://github.com/Mango-information-systems/mango-is-website/issues'>contact us</a> to suggest improvements."
   - type: h4
     value: Powerful
   - type: p
     value: We've made sure that large files also get converted and don't lock your browser.
   - type: h4
     value: Open source
   - type: p
     value: "You can find the source code of this app <a href='https://github.com/Mango-information-systems/mango-is-website/tree/master/tools/csv-to-json'>on Github</a>."
   - type: p
     value: "We use the open source library <a href='http://papaparse.com/' target='_blank'>papaParse</a> to perform the conversions."
---

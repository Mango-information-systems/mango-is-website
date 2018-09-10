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
wide: true
sections:
 -
  # top section: title
  content:
   - type: h1
     class: small
     value: Online CSV to JSON converter
   - type: h2
     class: small
     value: Easy, privacy-friendly and offline-first online csv to json converter.
 -
  # app
  content:
   - type: div
     value: "<noscript><span class='alert alert-error'>Please activate javascript in order to use the application.</span></noscript>"
   - type: div
     id: appWrapper
     value: "<div id='csvSelectorPane'>
		<div class='row'>
			<div class='twelve columns'>
				
				<h3>New conversion</h3>
				<div id='dropZone' class='card'>
					<p>
						<span>Drop or <strong>select a CSV file</strong></span><br>
						<input id='fileSelect' type='file'/>
					</p>
					<div id='dropPlaceHolder'>
						<br>
						<p class='text-center muted'>Drop CSV file here</p>
					</div>
				</div>
				<div class='card'>
					<p>
						Or <strong>paste CSV</strong> text <small><a id='sampleCSV'>sample</a></small>
					</p>
					<div class='row'>
						<textarea id='csvText' class='twelve columns' placeholder='Paste from spreadsheet' rows='7'></textarea>
						<div id='pasteProgress' style='float:right; min-height: 5px; width: 100%; background-color: #F47216;'></div>
					</div>
				</div>
				<div class='card'>
					<p>
						Or <strong>enter a URL</strong>
					</p>
					<div class='row'>
						<input type='url' name='csvUrl' id='csvUrl' class='twelve columns' placeholder='Enter the URL of a CSV file'/>
						<div id='URLProgress' style='float:right; min-height: 5px; width: 100%; background-color: #F47216;'></div>
					</div>
				</div>
				<div class='row'>
					<div class='previewErrorContainer'></div>
				</div>
			</div>
			<div class='twelve columns'>
				
				<h3>Your JSON files</h3>
				<div id='filesList' class='card'>
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
  # About CSV to JSON converter
  content:
   - type: h3
     value: About CSV to JSON converter
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
     value: Powerful
   - type: p
     value: We've made sure that large files also get converted and don't lock your browser.
   - type: h4
     value: Feedback
   - type: p
     value: "We focused on making it easy and efficient. There is certainly some room for improvement left, do not hesitate to make suggestions. We can be reached on <a href='https://github.com/Mango-information-systems/mango-is-website/issues'>github</a> or <a href='/contact/'>here</a>."
   - type: h4
     value: Open source
   - type: p
     value: "You can find the source code of this app <a href='https://github.com/Mango-information-systems/mango-is-website/tree/master/tools/csv-to-json'>on Github</a>."
   - type: p
     value: "We use the open source library <a href='http://papaparse.com/' target='_blank'>papaParse</a> to perform the conversions."
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

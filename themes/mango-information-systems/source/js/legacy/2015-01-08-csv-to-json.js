var $body, $document, $fileSelector, $previewPane, $csvSelectorPane, $resultsPane, $csvText, $csvUrl, $filesList, $dropPlaceHolder, $sampleCSV // cached DOM elements selector
	, defaultParseOpts = {
		preview : 5
		, worker: true
		, dynamicTyping : true
		, skipEmptyLines : true
	}
	, currentParseOpts // kept in a global for manipulation from anywhere
	, files // cache of localforage data
	, undos = {} // deleted data, only kept in a volatile variable
	
var views = {
		filePreview : function(data) {
			// markup to display CSV parsing settings form and JSON file preview
			
			var tmpl = ' \
				<div class="row"> \
					<div class="five columns"> \
						<h3>Adjust settings</h3> \
						<form action="javascript:void(0)"> \
							<fieldset> \
								<legend>Header row</legend> \
								<label for="header"> \
									<input type="checkbox" name="header" id="header" <%= headerChecked %>/> \
									First line is header \
								</label> \
							</fieldset> \
							<fieldset> \
								<legend>Column delimiter</legend> \
								<div class="row"> \
									<div class="six columns"> \
										<label for="tab"> \
											<input type="radio" name="delimiter" value="\t" id="tab" <%= tabChecked %>/> \
											tab\
										</label> \
									</div> \
									<div class="six columns"> \
										<label for="comma"> \
											<input type="radio" name="delimiter" value="," id="comma" <%= commaChecked %>/> \
											comma (,) \
										</label> \
									</div> \
								</div> \
								<div class="row"> \
									<div class="six columns"> \
										<label for="semicolon"> \
											<input type="radio" name="delimiter" value=";" id="semicolon" <%= semicolonChecked %>/> \
											semicolon (;) \
										</label> \
									</div> \
									<div class="six columns"> \
										<label for="colon"> \
											<input type="radio" name="delimiter" value=":" id="colon" <%= colonChecked %>/> \
											colon (:)\
										</label> \
									</div> \
								</div> \
								<div class="row"> \
									<div class="six columns"> \
										<label for="space"> \
											<input type="radio" name="delimiter" value=" " id="space" <%= spaceChecked %>/> \
											space \
										</label> \
									</div> \
									<div class="six columns"> \
										<div class="row"> \
											<div class="two columns"> \
												<label for="custom"> \
														<input type="radio" name="delimiter" value="custom" id="custom" <%= customChecked %>/> \
												</label> \
											</div> \
											<div class="eight columns"> \
												<input type="text" class=" customdelimiters u-full-width" id="customdelimiterTxt" maxlength="1" value = "<%= customDelimiter %>" placeholder="custom"/> \
											</div> \
										</div> \
									</div> \
								</div> \
							</fieldset> \
						</form> \
						<%= errors %> \
					</div> \
					<div class="seven columns"> \
						<h3>Preview results</h3> \
						<pre class="resultsPreview"> \
<code><%- JSON.stringify(json, null, "\t") %></code> \
						</pre> \
					</div> \
				</div> \
				<div class="row"> \
					<div class="five columns"> \
						<a title="Undo and convert another file" class="back button button-default"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</a> \
						<a title="Process the whole file" class="convert button button-primary pull-right"> \
						<span class="spin-placeholder"></span> \
						Convert <i class="fa fa-chevron-right" aria-hidden="true"></i></a> \
					</div> \
				</div>'
			
			var tabChecked, commaChecked, semicolonChecked, colonChecked, spaceChecked, customChecked, customDelimiter, headerChecked
			
			switch(data.meta.delimiter) {
				case "	":
					tabChecked = 'checked'
				break;
				case ",":
					commaChecked = 'checked'
				break;
				case ";":
					semicolonChecked = 'checked'
				break;
				case ":":
					colonChecked = 'checked'
				break;
				case " ":
					spaceChecked = 'checked'
				break;
				default:
					customChecked = 'checked'
					customDelimiter = data.meta.delimiter
				break;
			}
			
			if (data.meta.header)
				headerChecked = 'checked'
			
			var errors = views.parseErrors(data.errors)
			
			return _.template(tmpl, {json: data.data, errors: errors, tabChecked: tabChecked, commaChecked: commaChecked, semicolonChecked: semicolonChecked, colonChecked: colonChecked, spaceChecked: spaceChecked, customChecked: customChecked, customDelimiter: customDelimiter, headerChecked: headerChecked})
		}
		, fullFile : function(data, fileName, errors) {
		// markup to display the JSON file result
			
			var tmpl = ' \
				<div class="row"> \
					<div class="twelve columns"> \
						<h4><%= fileName %></h4> \
						<% if (json.results.length > 1000) { %> \
							<div class="alert" role="alert"> \
								<p>Because the file is large file, it won\'t be saved in the browser\'s memory for later use.</p> \
								<p><i class="fa fa-arrow-left" aria-hidden="true"></i> Please use the download button.</p> \
							</div> \
						<% } %> \
						<%= errors %> \
						<% if (json.results.length < 1000) { %> \
							<textarea class="results twelve columns" rows="11"><%- JSON.stringify(json, null, "\t") %></textarea> \
						<% } else { %> \
							<p><%= button %></p> \
						<% } %> \
					</div> \
				</div> \
				<div class="row"> \
					<div class="twelve columns"> \
						<% if (json.results.length < 1000) { %> \
							<span class="pull-right" data-filename="<%= fileName %>"> \
								<a title="delete file" class="button button-default button-sm delete"><i class="fa fa-times" aria-hidden="true"></i> Delete</a> \
								<%= button %> \
							</span> \
						<% } %> \
					</div> \
				</div> \
				'

			if (data.results.length < 1000) {
				var button = views.fileDownloadButton(data, fileName, '<i class="fa fa-download" aria-hidden="true"></i> Download', '', 'button-primary button-sm')
			}
			else {
				var button = views.fileDownloadButton(data, fileName, 'Download results file', 'button-block', 'button-primary button-sm')
				
			}
			
			var errorsMarkup = errors? views.parseErrors(errors, true): views.parseErrors(errors)
			
			var res = _.template(tmpl, {json:data, fileName: fileName, errors: errorsMarkup || '', button: button})
			
			return res
		}
		, parseErrors: function(errors, fallback) {
			var tmpl = ' \
				<div class="alert alert-warning" role="alert"> \
					<p>Conversion warning(s):</p> \
					<ul> \
						<% _.each(errors, function(err) { %> \
							<li> \
								<%= err.message %> \
								<% if (err.row) { %> \
									<span class="pull-right"><em>line <%= err.row+1 %></em></span> \
								<% } %> \
							</li>\
						<% }) %> \
					<ul> \
					<% if (sliced) { %> \
					<p><strong>More errors are not listed</strong>.</p> \
					<% } %> \
				</div>'
			
			if (errors && errors.length) {
				var sliced = (errors.length > 10)
				
				return _.template(tmpl, {errors: errors.slice(0, 9), sliced: sliced})
			}
			else
				return fallback? '<div class="alert alert-success" role="alert">Conversion successful!</div>' : ''
		}
		, fileDownloadButton: function(data, fileName, label, size, style) {
			// vased on http://stackoverflow.com/a/15353235/1006854
			
			var tmpl = '<a class="download button <%= style %> <%= size %>" href="<%- window.URL.createObjectURL(json) %>" \
				download="<%= fileName %>"><%= label %></a>'
				
			var JSONBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
			
			var res = _.template(tmpl, {json: JSONBlob, fileName: fileName, label: label, size: size, style: style})
			
			return res
			
		}
		, conversionsList: function(fileNames) {
			//~if (!fileNames.length) {
				//~return '<div class="alert" role="alert">You haven\'t done any conversion yet.<br>Once you convert some CSVs to JSON, the results will show up here.</div>'
			//~}
			//~else {
			if (fileNames.length) {
				var listItems = _.map(fileNames, function(fileName) {
						return views.convertedFile(fileName)
					}).join('')
					
				return listItems
			}
			
		}
		, convertedFile: function(fileName) {
			var tmpl = '<div class="three columns"><a class="savedFile button u-full-width button-sm" href="" data-filename="<%= fileName %>"><%= fileName %></a></div>'
			
			return _.template(tmpl, {fileName: fileName})
		}
		, deletedConversion: function(fileName) {
			var tmpl = '<span class="deletedFile">Deleted <%= fileName %>. <small><a data-filename="<%= fileName %>" class="text-muted undo" href="">undo</a></small></span>'
			
			return _.template(tmpl, {fileName: fileName})
		}
	}
	, controller = {
		showCsvSelectorPane: function() {
			currentParseOpts = resetFileOpts()
			
			$('.previewErrorContainer').html('')

			$csvSelectorPane.slideDown()

			$resultsPane.slideUp().empty()
			$previewPane.slideUp().empty()

		}
		, previewParse: function(opts) {
		// parse CSV file, URL or data string
			
			currentParseOpts = resetFileOpts(currentParseOpts.data)
			
			currentParseOpts = _.extend(currentParseOpts, opts)

			currentParseOpts.complete = function(res) {

				if(typeof res === 'undefined') {
					var message
										
					if (opts.download)
						message = 'File could not be parsed. Please make sure that the URL is correct and that the file is hosted in a server allowing cross-origin requests.'
					else
						message = 'Error reading CSV data. Please check the entry and try again.'
						
					$('.previewErrorContainer').html('<div class="alert alert-danger" role="alert"> \
						<p>Conversion warning(s):</p> \
						<p>' + message + '</p> \
					</div>')
					
				}
				else {
					controller.showFilePreview(res)
				}
			}

			Papa.parse(currentParseOpts.data, currentParseOpts)
		}
		, fullParse: function() {
		// parse the full file and display the results
		
			delete currentParseOpts.preview
			
			currentParseOpts.worker = true
			
			currentParseOpts.complete = function(res) {
				
				// probably un-necessary, but safe
				$('.convert').removeAttr('disabled')
				$('.convert').removeClass('disabled')
				
				// remove spinner
				$('.spin-placeholder').html('')
				
				var errors = res.errors
				
				res = {results: res.data} // result is encapsulated inside a "results" property, in order to have a JSON and not an array.
				
				// set file name, replacing extension if applicable
				var fileName = typeof currentParseOpts.fileName !== 'undefined'? currentParseOpts.fileName.replace(/(.*)\.csv$/, '$1') : 'file'
				
				while (files[fileName+'.json']) {
				// a converted json file already has this name, add a suffix to it.
					if (/(.*)(-[0-9]+)$/.test(fileName)) {
						var match = fileName.match(/(.*-)([0-9]+)$/)
						fileName = match[1] + ((+match[2])+1)
					}
					else
						fileName = fileName + '-1'
				}
				
				fileName += '.json'
				
				
				if (res.results.length < 1000) {
				// file is not too large, save in local
						
					files[fileName] = {data: res}

					// save result in localForage
					localforage.setItem('files', files, function(err, res) { if (err) console.log(err)})
					
					// add to list of saved converted files
					controller.addToConversionsList(fileName)
					
				}
				
				// show results to the user
				controller.showResult(fileName, res, errors)

				currentParseOpts = resetFileOpts()
			}

			Papa.parse(currentParseOpts.data, currentParseOpts)
			
		}
		, showFilePreview: function(data) {
		// initial display of the preview of a parsed file to convert
			var content = views.filePreview(data)
			$csvSelectorPane.slideUp()
			$previewPane.html(content).slideDown()

			// handle Enter press to trigger conversion
			$document.on('keypress', function(e) {
				if (e.keyCode == 13) {
					if (e.target.id === 'customdelimiterTxt')
						// pressend enter in custom delimiter input, submit custom delimiter for preview
						$('#customdelimiterTxt').trigger('blur')
					else
						$('.convert').trigger('click')
				}
			})
		}
		, showResult: function(fileName, data, errors) {
		// show either a file download button or the whole file display
		
			var data = data || files[fileName].data
			var content = views.fullFile(data, fileName, errors)

			//~if ($csvSelectorPane.is(":visible"))
				//~$csvSelectorPane.slideUp()
			//~else
				$previewPane.hide()
				$csvSelectorPane.show()
				$previewPane.empty()
			
			$resultsPane.html(content).slideDown()

			$resultsPane.slideDown()
		}
		, showConversionsList: function() {
			var content = views.conversionsList(Object.keys(files))
			$filesList.html(content)
			
		}
		, addToConversionsList: function(fileName) {
			var content = views.convertedFile(fileName)
			
			
			$filesList.append(content)
		}
		, deleteFile: function(fileName) {
			undos[fileName] = files[fileName]
			delete files[fileName]
			localforage.setItem('files', files, function(err, res) { if (err) console.log(err)})
			var content = views.deletedConversion(fileName)
			$filesList.find('[data-filename="' + fileName + '"]').replaceWith(content)
			//~controller.showCsvSelectorPane()
			$resultsPane.slideUp().empty()
		}
		, undoDeleteFile: function(fileName) {
			
			files[fileName] = undos[fileName]
			
			localforage.setItem('files', files, function(err, res) {
				if (err)
					console.log(err)
				else // only delete from the undos once the save is successful
					delete undos[fileName]
			})
			
			var content = views.convertedFile(fileName)
			$filesList.find('[data-filename="' + fileName + '"]').closest('.columns').replaceWith(content)
		}
	}
	
function resetFileOpts(data) {
	parseOpts = _.clone(defaultParseOpts)
	
	if (typeof data !== 'undefined')
		parseOpts.data = data
		
	return parseOpts
}

currentParseOpts = resetFileOpts()

$(document).ready(function(){

	// cache DOM selectors
	$body = $('body')
	$document = $(document)
	$previewPane = $('#previewPane')
	$resultsPane = $('#resultsPane')
	$csvSelectorPane = $('#csvSelectorPane')
	$fileSelector = $('#fileSelect')
	$csvText = $('#csvText')
	$csvUrl = $('#csvUrl')
	$filesList = $('#filesList')
	$dropPlaceHolder = $('#dropPlaceHolder')
	$sampleCSV = $('#sampleCSV')
	
	var oldTextAreaValue = $csvText.val()
	
	localforage.getItem('files', function(err, res) {
		files = res || {}

		// show available JSON files
		controller.showConversionsList()
	})
	
	/* ---------------------------
	| handle user interactions
	------------------------------ */
	
	// file selection via button
	$fileSelector.on('change', function(e) {
		controller.previewParse({data: e.target.files[0], fileName:e.target.files[0].name})
	})
	$fileSelector.on('click', function() {
		// reset file value to null to allow the selection of the same file
		// based on http://stackoverflow.com/a/12102992
		this.value = null
	})
	
	// file drop inside the text area
	$('#dropZone').on('dragover', function(e) {
		e.stopPropagation()
		e.preventDefault()
		return false
	})
	$('#dropZone').on('dragenter', function(e) {
		e.stopPropagation()
		e.preventDefault()
		$dropPlaceHolder.show()
		return false
	})
	$('#dropZone').on('dragexit', function(e) {
		e.stopPropagation()
		e.preventDefault()
		$dropPlaceHolder.hide()
		return false
	})
	$('#dropZone').on('drop', function(e) {
		e.stopPropagation()
		e.preventDefault()
		$dropPlaceHolder.hide()
		controller.previewParse({data: e.originalEvent.dataTransfer.files[0], fileName: e.originalEvent.dataTransfer.files[0].name})
		return false
	})
	
	// sample CSV click
	$sampleCSV.on('click', function() {
		oldTextAreaValue = ''
		$csvText.val('Product;Price\nApple;2.50\nOrange;3.00\nMango;4.50\nPear;3.25')
		$csvText.trigger('keyup')
	})
	
	// paste into textarea
	var debounceTextAreaProcessing = _.debounce(processTextArea, 1000)
	
	$csvText.on('keyup paste', function(e) {
		resetAnimation($("#pasteProgress"))
		debounceTextAreaProcessing(e)
	})

	function resetAnimation(selector) {
		selector.stop(true)
			.width('100%')
			.animate({
				width: 0
			}, 1000)
	}

	function processTextArea(e) {
		if (e.target.value && e.target.value != oldTextAreaValue) {
			oldTextAreaValue = e.target.value
			controller.previewParse({data: e.target.value, fileName: 'pastedText'})
		}
	}
	
	// enter url
	var debounceURLProcessing = _.debounce(processURL, 1000)
	
	// The below does not work, probably needs an updated version of underscore.js
	//~$csvUrl.on('keyup', function(e) {
	//~// Cancel the processing when escape key is pressed
		//~if (e.keyCode == 27) {
			//~console.log('cancelling animation')
			//~debounceURLProcessing.cancel()
			//~$("#URLProgress").stop(true)
				//~.width('100%')
		//~}
	//~})
	
	$csvUrl.on('blur', function(e) {
		processURL(e)
	})
		
	$csvUrl.on('keyup paste', function(e) {
		resetAnimation($("#URLProgress"))
		debounceURLProcessing(e)
	})
	
	function processURL(e) {
		if (e.target.value) {
			var fileName = e.target.value.match(/[^/]+$/g)[0] // extract file name out of the url
			//~console.log('URL', fileName)
			controller.previewParse({data: e.target.value, download:true, fileName: fileName})
		}
	}
	
	
	// header checkbox click
	$body.on('click', '#header', function(e) {
		
		controller.previewParse({header: e.target.checked})
	})
	
	// delimiter checkbox click
	$body.on('click', 'input[name=delimiter]', function(e) {
		
		var delim = e.target.value === 'custom' ? $('#customdelimiterTxt')[0].value: e.target.value


		if ( e.target.value === 'custom' && !$('#customdelimiterTxt')[0].value)
			$('#customdelimiterTxt')[0].focus()
		else
			controller.previewParse({delimiter: delim})
		
	})
	// custom delimitor text entry
	$body.on('blur', '#customdelimiterTxt', function(e) {
		
		if (e.target.value)
			$('#custom').click()
	})
	
	// back button
	$body.on('click', '.back', function() {
		controller.showCsvSelectorPane()
		
			$("#pasteProgress").animate({
				width: 0
			}, 300)
	})
	
	// convert button
	$body.on('click', '.convert', function(e) {
		
		// avoid triggering conversion multiple times
		if (typeof $(e.target).attr('disabled') === 'undefined') {
			
			$document.off('keypress')
			$(e.target).attr('disabled', 'disabled')
			$(e.target).addClass('disabled')
			
			// show spinner
			$('.spin-placeholder').html('<i class="fa fa-cog fa-spin fa-fw"></i><span class="sr-only">Processing...</span> ')
			
			controller.fullParse()
		}
	})
	
	// view saved JSON file
	$body.on('click', '.savedFile', function(e) {
		e.preventDefault()
		controller.showResult(e.target.dataset.filename)
	})
	
	// delete saved JSON file
	$body.on('click', '.delete', function(e) {
		e.preventDefault()
		var fileName = $(e.target).closest('.pull-right').data('filename')

		controller.deleteFile(fileName)
	})
	
	// undo delete saved JSON file
	$body.on('click', '.undo', function(e) {
		e.preventDefault()
		var fileName = $(e.target).data('filename')

		controller.undoDeleteFile(fileName)
	})
	
	// select all JSON for copy-paste
	$body.on('focus', '.results', function(e) {
		e.target.select()
	})
})

var $body, $document, $fileSelector, $previewPane, $csvSelectorPane, $resultsPane, $csvText, $csvUrl, $filesList, $dropPlaceHolder, $sampleCSV // cached DOM elements selector
	, defaultParseOpts = {
		preview : 5
		, worker:true
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
					<div class="medium-4 medium-offset-1 columns"> \
						<h3>Adjust settings</h3> \
						<form action="javascript:void(0)"> \
							<fieldset> \
								<legend>Header row</legend> \
								<div class="form-group"> \
									<div class="span12"> \
										<div class="checkbox"> \
											<label for="header"> \
												<input type="checkbox" name="header" id="header" <%= headerChecked %>/> \
												First line is header \
											</label> \
										</div> \
									</div> \
								</div> \
							</fieldset> \
							<fieldset> \
								<legend>Column delimiter(s)</legend> \
								<div class="form-group"> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="tab"> \
												<input type="radio" name="delimiter" value="\t" id="tab" <%= tabChecked %>/> \
												tab\
											</label> \
										</div> \
									</div> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="comma"> \
												<input type="radio" name="delimiter" value="," id="comma" <%= commaChecked %>/> \
												comma (,) \
											</label> \
										</div> \
									</div> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="semicolon"> \
												<input type="radio" name="delimiter" value=";" id="semicolon" <%= semicolonChecked %>/> \
												semicolon (;) \
											</label> \
										</div> \
									</div> \
								</div> \
								<div class="form-group"> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="colon"> \
												<input type="radio" name="delimiter" value=":" id="colon" <%= colonChecked %>/> \
												colon (:)\
											</label> \
										</div> \
									</div> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="space"> \
												<input type="radio" name="delimiter" value=" " id="space" <%= spaceChecked %>/> \
												space \
											</label> \
										</div> \
									</div> \
									<div class="small-6 medium-4 columns"> \
										<div> \
											<label for="custom"> \
												<input type="radio" name="delimiter" value="custom" id="custom" <%= customChecked %>/> \
												<input type="text" class="customdelimiters" id="customdelimiterTxt" maxlength="1" value = "<%= customDelimiter %>" placeholder="custom"/> \
											</label> \
										</div> \
									</div> \
								</div> \
							</fieldset> \
						</form> \
						<%= errors %> \
					</div> \
					<div class="medium-6 columns end"> \
						<h3>Preview results</h3> \
						<pre class="resultsPreview"> \
<code><%- JSON.stringify(json, null, "\t") %></code> \
						</pre> \
					</div> \
				</div> \
				<div class="row"> \
					<div class="medium-4 medium-offset-1 columns"> \
						<a title="Undo and convert another file" class="back button secondary"><i class="fi-arrow-left"></i> Back</a> \
						<a title="Process the whole file" class="convert button right">Convert <i class="fi-arrow-right"></i></a> \
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
					<div class="small-6 medium-4 medium-offset-1"> \
						<h3><%= fileName %></h3> \
						<% if (json.results.length < 1000) { %> \
							<textarea class="results span12" rows="11"><%- JSON.stringify(json, null, "\t") %></textarea> \
						<% } else { %> \
							<p><%= button %></p> \
						<% } %> \
					</div> \
					<div class="span7"> \
						<% if (json.results.length > 1000) { %> \
							<div class="alert-box info" role="alert"> \
								<p>Because the file is large file, it won\'t be saved in the browser\'s memory for later use.</p> \
								<p><i class="fi-arrow-left"></i> Please use the download button.</p> \
							</div> \
						<% } %> \
						<%= errors %> \
					</div> \
				</div> \
				<div class="row"> \
					<div class="small-6 medium-4 medium-offset-1"> \
						<a title="convert another file" class="back button secondary"><i class="fi-arrow-left"></i> Convert another file</a> \
						<% if (json.results.length < 1000) { %> \
							<span class="right" data-filename="<%= fileName %>"> \
								<span class="muted"><em>Saved</em></span> \
								<a title="delete file" class="button secondary delete"><i class="fi-x"></i> Delete</a> \
								<%= button %> \
							</span> \
						<% } %> \
					</div> \
				</div> \
				'

			if (data.results.length < 1000) {
				var button = views.fileDownloadButton(data, fileName, '<i class="fi-download"></i> Download', '', '')
			}
			else {
				var button = views.fileDownloadButton(data, fileName, 'Download results file', '', '')
				
			}
			
			var errorsMarkup = errors? views.parseErrors(errors, true): views.parseErrors(errors)
			
			var res = _.template(tmpl, {json:data, fileName: fileName, errors: errorsMarkup || '', button: button})
			
			return res
		}
		, parseErrors: function(errors, fallback) {
			var tmpl = ' \
				<div class="alert-box warning" role="alert"> \
					<p>Conversion warning(s):</p> \
					<ul> \
						<% _.each(errors, function(err) { %> \
							<li> \
								<%= err.message %> \
								<% if (err.row) { %> \
									<span class="right"><em>line <%= err.row+1 %></em></span> \
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
				return fallback? '<div class="alert-box success" role="alert">Conversion successful!</div>' : ''
		}
		, fileDownloadButton: function(data, fileName, label, size, style) {
			// based on http://stackoverflow.com/a/15353235/1006854
			
			var tmpl = '<a class="download button <%= style %> <%= size %>" href="<%- window.URL.createObjectURL(json) %>" \
				download="<%= fileName %>"><%= label %></a>'
				
			var JSONBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
			
			var res = _.template(tmpl, {json: JSONBlob, fileName: fileName, label: label, size: size, style: style})
			
			return res
			
		}
		, conversionsList: function(fileNames) {
			if (!fileNames.length) {
				return '<div class="alert-box info" role="alert">You haven\'t done any conversion yet.<br>Once you convert some CSVs to JSON, the results will show up here.</div>'
			}
			else {
				var tmpl = '<ul> \
					<%= listItems %>\
					</ul>'
					, listItems = _.map(fileNames, function(fileName) {
						return views.convertedFile(fileName)
					}).join('')
					
				return _.template(tmpl, {listItems: listItems})
			}
			
		}
		, convertedFile: function(fileName) {
			var tmpl = '<li><a class="savedFile" href="" data-filename="<%= fileName %>"><%= fileName %></a></li>'
			
			return _.template(tmpl, {fileName: fileName})
		}
		, deletedConversion: function(fileName) {
			var tmpl = '<span class="deletedFile"><%= fileName %> <small>has been deleted</small>. <a data-filename="<%= fileName %>" class="muted undo" href="">undo</a></span>'
			
			return _.template(tmpl, {fileName: fileName})
		}
	}
	, controller = {
		showCsvSelectorPane: function() {
			resetFileOpts()
			$csvSelectorPane.slideDown()
			if ($resultsPane.is(":visible"))
				$resultsPane.slideUp().empty()
			else
				$previewPane.slideUp().empty()
			//~ $csvSelectorPane.slideDown(function() {$previewPane.slideUp().empty()})
		}
		, previewParse: function(opts) {
		// parse CSV file, URL or data string
			
			currentParseOpts = _.extend(currentParseOpts, opts)
			
			currentParseOpts.complete = function(res) {
				controller.showFilePreview(res)
			}

			Papa.parse(currentParseOpts.data, currentParseOpts)
		}
		, fullParse: function() {
		// parse the full file and display the results
		
			delete currentParseOpts.preview
			
			currentParseOpts.worker = true
			
			currentParseOpts.complete = function(res) {
				
				var errors = res.errors
				res = {results: res.data} // result is encapsulated inside a "results" property, in order to have a JSON and not an array.
				
				// set file name, replacing extension if applicable
				var fileName = currentParseOpts.fileName.replace(/(.*)\.csv$/, '$1')
				
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

				resetFileOpts()
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
					$('.convert').trigger('click')
				}
			})
		}
		, showResult: function(fileName, data, errors) {
		// show either a file download button or the whole file display
		
			var data = data || files[fileName].data
			var content = views.fullFile(data, fileName, errors)

			$resultsPane.html(content).slideDown()

			$resultsPane.slideDown()
			if ($csvSelectorPane.is(":visible")) {
				$csvSelectorPane.slideUp()
			}
			else
				$previewPane.slideUp().empty()
		}
		, showConversionsList: function() {
			var content = views.conversionsList(Object.keys(files))
			$filesList.html(content)
			
		}
		, addToConversionsList: function(fileName) {
			var content = views.convertedFile(fileName)
			
			var $trg = $filesList.find('ul')
			
			if (!$trg[0]) {
			// first time a file is saved, create and show the list container
				$filesList.html('<ul></ul>')
			}
			
			$filesList.find('ul').append(content)
		}
		, deleteFile: function(fileName) {
			undos[fileName] = files[fileName]
			delete files[fileName]
			localforage.setItem('files', files, function(err, res) { if (err) console.log(err)})
			var content = views.deletedConversion(fileName)
			$filesList.find('[data-filename="' + fileName + '"]').replaceWith(content)
			controller.showCsvSelectorPane()
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
			$filesList.find('[data-filename="' + fileName + '"]').closest('li').replaceWith(content)
		}
	}
	
function resetFileOpts() {
	currentParseOpts = _.clone(defaultParseOpts)
}
resetFileOpts()

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
	var debounceTextAreaProcessing = _.debounce(processTextArea, 1750)
	
	$csvText.on('keyup paste', function(e) {
		debounceTextAreaProcessing(e)
	})

	function processTextArea(e) {
		if (e.target.value && e.target.value != oldTextAreaValue) {
			oldTextAreaValue = e.target.value
			controller.previewParse({data: e.target.value, fileName: 'pastedText'})
		}
	}
	
	// enter url
	$csvUrl.on('keypress', function(e) {
	// process url when Enter key is pressed
		if (e.keyCode == 13 && e.target.value) {
			$csvUrl.blur()
		}
	})
	$csvUrl.on('blur', function(e) {
		if (e.target.value) {
			var fileName = e.target.value.match(/[^/]+$/g)[0] // extract file name out of the url
			controller.previewParse({data: e.target.value, download:true, fileName: fileName})
		}
	})
	
	// header checkbox click
	$body.on('click', '#header', function(e) {
		controller.previewParse({header: e.target.checked})
	})
	
	// delimiter checkbox click
	$body.on('click', 'input[name=delimiter]', function(e) {
		var delim = e.target.value == 'custom'? $('#customdelimiterTxt')[0].value: e.target.value

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
	})
	
	// convert button
	$body.on('click', '.convert', function() {
		$document.off('keypress')
		controller.fullParse()
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

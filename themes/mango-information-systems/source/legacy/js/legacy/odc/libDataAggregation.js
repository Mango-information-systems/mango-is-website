function dimInOutputArray ( elem, array ) {
// check whether elem exists in array
// created as workaround to $.inArray because elem is array in this case...
	for ( var i = 0, length = array.length; i < length; i++ ) {
		if ( array[i].join() === elem.join() ) {
			return i;
		}
	}
	return -1;
}	

function map(doc, dxLevel, dyLevel, dzLevel) {
// select data at given aggregation level

// todo: check whether the map can /should directly be done inside reduce function- what if no measures / no aggregation? is map really needed?
// todo: check whether feasible to use input variable doc as returned variable
	var result = {};
	result.dimensions = {};
	result.dimensions.dz = {};
	result.dimensions.dy = {};
	result.dimensions.dx = {};
	result.dimensions.dz.hierarchyName = doc.dimensions.dz.hierarchyName;
	result.dimensions.dy.hierarchyName = doc.dimensions.dy.hierarchyName;
	result.dimensions.dx.hierarchyName = doc.dimensions.dx.hierarchyName;
	result.dimensions.dx.labels = [];
	result.dimensions.dy.labels = [];
	result.dimensions.dz.labels = [];
	result.dimensions.dx.values = [];
	result.dimensions.dy.values = [];
	result.dimensions.dz.values = [];
	result.facts=[];

	// retrieving dx labels at selected level
	result.dimensions.dx.labels = $.map(doc.dimensions.dx.labels, function(element, i) {
		var dx=[];
		if(i>= dxLevel)
			dx.push(element);
		return dx;
	});
	
	// retrieving dy labels at selected level
	result.dimensions.dy.labels = $.map(doc.dimensions.dy.labels, function(element, i) {
		var dy=[];
		if(i>= dyLevel)
			dy.push(element);
		return dy;
	});
	
	// retrieving dz labels at selected level
	result.dimensions.dz.labels = $.map(doc.dimensions.dz.labels, function(element, i) {
		var dz=[];
		if(i >= dzLevel)
			dz.push(element);
		return dz;
	});
	
	// retrieving dx values at selected level
	result.dimensions.dx.values = $.map(doc.dimensions.dx.values, function(element) {
		var dx=[];
		var row=[];
		for(var i = dxLevel; i< element.length; i++)
			row.push(element[i]);
		dx.push(row);
		return dx;
	});
	
	// retrieving dy values at selected level
	result.dimensions.dy.values = $.map(doc.dimensions.dy.values, function(element) {
		var dy=[];
		var row=[];
		for(var i = dyLevel; i< element.length; i++)
			row.push(element[i]);
		dy.push(row);
		return dy;
	});
	
	// retrieving dz values at selected level
	result.dimensions.dz.values = $.map(doc.dimensions.dz.values, function(element) {
		var dz=[];
		var row=[];
		for(var i = dzLevel; i< element.length; i++)
			row.push(element[i]);
		dz.push(row);
		return dz;
	});

	result.facts = doc.facts.values;
	
	return result;
};

function reduce(doc, agFunctions, ignoreNulls) {
// apply aggregation function to measures

	var result = {};
	result.dimensions = {};
	result.dimensions.dz = {};
	result.dimensions.dy = {};
	result.dimensions.dx = {};
	result.facts = [];
	result.dimensions.dz.hierarchyName = doc.dimensions.dz.hierarchyName;
	result.dimensions.dy.hierarchyName = doc.dimensions.dy.hierarchyName;
	result.dimensions.dx.hierarchyName = doc.dimensions.dx.hierarchyName;
	result.dimensions.dz.labels = doc.dimensions.dz.labels;
	result.dimensions.dy.labels = doc.dimensions.dy.labels;
	result.dimensions.dx.labels = doc.dimensions.dx.labels;
	result.dimensions.dz.values = [];
	result.dimensions.dy.values = [];
	result.dimensions.dx.values = [];

	var changesCheck = [];
	//this variables keeps track of modified facts in output in order to handle 'ignore null values' feature
	
	$(doc.facts).each(function(fact) {
	// drill through measures
			
		// storing measures to aggregate for current fact
		factAgFunctions = agFunctions[fact];
		
		// expand output facts array structure for each fact
		result.facts.push([]);
		changesCheck.push([]);
			
		for(measure in factAgFunctions) {
		// expand output facts array structure according to the number of measures to compute
			result.facts[fact].push([]);
			changesCheck[fact].push([]);

			$(this).each(function(dzRow) {
			// drill through dz
				//checking whether the value for dz already exists in result dataset
				outputDzIndex=dimInOutputArray(doc.dimensions.dz.values[dzRow], result.dimensions.dz.values);

				if(outputDzIndex==-1) {
				// this dz value is new --> add dimension value
					// add dz dimension value to result dataset
					result.dimensions.dz.values.push(doc.dimensions.dz.values[dzRow]);
					
					// store dz index inside result dataset
					outputDzIndex = result.dimensions.dz.values.length-1;							
				}
				
				if (!result.facts[fact][measure][outputDzIndex]) {
				// expand facts array structure in case the branch has not already been created
					result.facts[fact][measure].push([]);
					changesCheck[fact][measure].push([]);						
				}
				
				$(this).each(function(dyRow) {
				// drill through dy
					//checking whether the value for dy already exists in result dataset
					outputDyIndex=dimInOutputArray(doc.dimensions.dy.values[dyRow], result.dimensions.dy.values);

					if(outputDyIndex==-1) {
					// this dy value is new --> add dimension value and fact branch.						
						// add dy dimension value to result dataset
						result.dimensions.dy.values.push(doc.dimensions.dy.values[dyRow]);
						
						// store dy index inside result dataset
						outputDyIndex = result.dimensions.dy.values.length-1;
					}
					
					if(!(result.facts[fact][measure][outputDzIndex][outputDyIndex])) {
					// expand facts array structure
						result.facts[fact][measure][outputDzIndex].push([]);
						changesCheck[fact][measure][outputDzIndex].push([]);
					}
					$(this).each(function(dxRow) {
					// drill through dx
// correction to be applied here?
						// checking whether the value for dx already exists in result dataset
						outputDxIndex = dimInOutputArray(doc.dimensions.dx.values[dxRow], result.dimensions.dx.values);

						if(outputDxIndex == -1)
						// the dx value is new --> add dimension value to output dataset
						{
							// add dx dimension value to result dataset
							result.dimensions.dx.values.push(doc.dimensions.dx.values[dxRow]);
							
							// store dx index inside result dataset
							outputDxIndex = result.dimensions.dx.values.length-1;
						}

						// initialize fact leaf in case branch is new
						if(result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] == null) {							

							switch(factAgFunctions[measure]) {
							// expand facts array structure
								case 'min':
									result.facts[fact][measure][outputDzIndex][outputDyIndex].push(Number.MAX_VALUE);
								break;
								case 'concat': {
// important: adapt statement below for handling of multiple facts for same dimensions values
										if(this.length !=0 && this != null) {
/*
todo: fix creation of un-needed leaves here.
if (outputDyIndex == 2) {
console.log(result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]);
console.log('extending facts array' + this)
console.log(this.join().length == 0)
}
*/
											result.facts[fact][measure][outputDzIndex][outputDyIndex].push('');
										}
									}
								case 'none':
									result.facts[fact][measure][outputDzIndex][outputDyIndex].push([]);
								break;
								default: {
									result.facts[fact][measure][outputDzIndex][outputDyIndex].push(0);
								}
								break;
							}
							
							// set changes check array leaf default value (0 = unchanged)
							changesCheck[fact][measure][outputDzIndex][outputDyIndex].push(0);
						}
						
						switch(factAgFunctions[measure]) {
						// aggregate fact
							case "sum":
								if(!isNaN(this)) {
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] += parseFloat(this);
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] = 1;
								}
								else {
									alert('data error: one fact is not a number - sum not applicable');
									break;
								}
							break;
							case "count":
								if(!(this.CROSSTAB)) {
								//testing existence of crosstab property because window object is returned in case fact value is null
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]+=1;
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]=1;
								}
							break;
							case "min":
								if(!isNaN(this)) {
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] = Math.min(this, result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]);
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]=1;
								}
							break;
							case "max":
								if(!isNaN(this)) {
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] = Math.max(this, result.facts[outputDzIndex][outputDyIndex][outputDxIndex]);
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]=1;
								}
							break;
							case "concat":
								if(!(this.CROSSTAB)) {
/*
if(this != '') {										
console.log('dz: '+outputDzIndex + ' ' + doc.dimensions.dz.values[dzRow]);
console.log('dy: '+outputDyIndex + ' ' + doc.dimensions.dy.values[dyRow]);
console.log('dx: '+outputDxIndex + ' ' + doc.dimensions.dx.values[dxRow]);
console.log('fact: ' + this);
}
*/
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex] += this.join('');
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]=1;
								}
							break;
							case "none":
								if(!(this.CROSSTAB)) {
								//testing existence of crosstab property because window object is returned in case fact value is null
									result.facts[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex].push(this);
									changesCheck[fact][measure][outputDzIndex][outputDyIndex][outputDxIndex]=1;
								}
							break;
							default:
								alert("error while performing measures aggregation");
						}
					});
				});
			});					
		}
	});
	
	if(ignoreNulls) {
	// reset unchanged facts to null
		$(changesCheck).each(function(i) {
			$(this).each(function(j) {
				$(this).each(function(k) {
					$(this).each(function(l) {
						$(this).each(function(m) {
							if(this==0)
								result.facts[i][j][k][l][m]= null;
						});
					});
				});
			});
		});
	}
	return result;
};

function computeMetrics(doc, metricsFormulas, factIndex) {
// compute metrics according to formulas defined inside crosstab
	var result = [];
	var pattern=/mng([0-9]+)/g;
	var p = new MathProcessor();
	
	$(doc.facts).each(function(fact) {
// todo : remove hard-coded metric selection right here:
		var metricsReferences= metricsFormulas[fact][0].match(pattern);
		result.push([]);
// todo : remove hard-coded fact selection right here:
		$(this[0]).each(function(dz) {
			result[fact].push([]);
			$(this).each(function(dy) {	
			result[fact][dz].push([]);
				$(this).each(function(dx) {
					//reset metrics formula output variable
					var outputFormula = metricsFormulas[fact][0];			
					$(metricsReferences).each(function() {
					// replace each metric definition by the measure value
						currentMeasure= parseInt(this.substr(3,3));
						outputFormula = outputFormula.replace(this, parseInt(doc.facts[fact][currentMeasure][dz][dy][dx]));
					});
// todo: replace number formatting here by proper formula
					result[fact][dz][dy].push( parseFloat(p.parse(outputFormula)).toFixed(0) );
				});					
			});
		});
	});
	return result;
}

function computeSummaryRow(doc) {
// compute summary row values according to aggregation function provided
// this calculation is equivalent to aggregation at highest dyLevel, using current dxLevel and dzLevel
	var result= map(doc.data, dxLevel, doc.settings.dyMaxLevel, dzLevel);

// todo: check whether this check is necessary: reduce in any case
	if(doc.data.measures)
	// compute measures in case some are defined
	// otherwise facts will not be aggregated
		result = reduce(result, agFunctions, doc.settings.ignoreNulls);
	
	if(doc.data.metrics)
	// compute metrics if applicable
		result.facts = computeMetrics(result, metricsFormulas, doc.settings.factIndex);
		
	return result.facts;
}

function computeSummaryColumn(doc) {
// compute summary column values according to aggregation function provided
// this calculation is equivalent to aggregation at highest dxLevel, using current dyLevel and dzLevel
	var result= map(doc.data, doc.settings.dxMaxLevel, dyLevel, dzLevel);
// todo: check whether this check is necessary: reduce in any case
	if(doc.data.measures)
	// compute measures in case some are defined
	// otherwise facts will not be aggregated
		result = reduce(result, agFunctions, doc.settings.ignoreNulls);
	
	if(doc.data.metrics)
	// compute metrics if applicable
		result.facts = computeMetrics(result, metricsFormulas, doc.settings.factIndex);
		
	return result.facts;
}

function computeSummaryTotal(doc) {
// compute summary total values according to aggregation function provided
// (intersection of total row and total column).
// Warning: this is the total for dx and dy, but dz detail is kept
// this calculation is equivalent to aggregation at highest dxLevel, highest dyLevel and current dzLevel
	var result= map(doc.data, doc.settings.dxMaxLevel, doc.settings.dyMaxLevel, dzLevel);
// todo: check whether this check is necessary: reduce in any case
	if(doc.data.measures)
	// compute measures in case some are defined
	// otherwise facts will not be aggregated
		result = reduce(result, agFunctions, doc.settings.ignoreNulls);
	
	if(doc.data.metrics)
	// compute metrics if applicable
		result.facts = computeMetrics(result, metricsFormulas, doc.settings.factIndex);
		
	return result.facts;
}

function resetAggregateNavigation(doc) {
// reset aggregate navigation after refresh of crosstab

	function resetControls() {
	// reset navigation controls after aggregate navigation
	
		if(doc.settings.dxMaxLevel) {
		// Set the navigation controls for dx in case dx has a hierarchy
			var $dxDown = $('#dx-level-down');
			var $dxUp = $('#dx-level-up');

			if (dxLevel == 0)
				$dxDown.addClass("paging-disabled");
				
			if (dxLevel == doc.settings.dxMaxLevel)
				$dxUp.addClass("paging-disabled");						
		}
		
		if(doc.settings.dyMaxLevel) {
		// Set the navigation controls for dy in case dy has a hierarchy
			var $dyDown = $('#dy-level-down');
			var $dyUp = $('#dy-level-up');
		
			if (dyLevel == 0)
				$dyDown.addClass("paging-disabled");
				
			if (dyLevel == doc.settings.dyMaxLevel)
				$dyUp.addClass("paging-disabled");	
		}
		
		if(doc.settings.dzMaxLevel) {
		// Set the navigation controls for dz in case dz has a hierarchy
			var $dzDown = $('#dz-level-down');
			var $dzUp = $('#dz-level-up');
			
			if (dzLevel == 0)
				$dzDown.addClass("paging-disabled");
				
			if (dzLevel == doc.settings.dzMaxLevel)
				$dzUp.addClass("paging-disabled");	
		}
		
		if(doc.settings.factIndex) {
		// Set the navigation controls for facts in case several metrics are present
			var $factSwitch = $('.fact-switch');
		}				
	
		// reset dxMaxIndex value according to current hierarchy level
		$dzMaxIndex = outputData.data.dimensions.dz.values.length-1;
		
		// reset dz navigation controls
		$dzMore = $('#dz-index-more');
		$dzLess = $('#dz-index-less');

		if($dzMaxIndex == 0) {
		// disable dz navigation if applicable
			$dzLess.addClass("paging-disabled");
			$dzMore.addClass("paging-disabled");
		}
		else if (outputData.settings.dzIndex == 0) {
			$dzLess.addClass("paging-disabled");
			$dzMore.removeClass("paging-disabled");
		}
		else if (outputData.settings.dzIndex == $dzMaxIndex) {
			$dzLess.removeClass("paging-disabled");
			$dzMore.addClass("paging-disabled");
		}
	
		$('#crosstabTitle >ul').hover(function() {
			$('li.fact-switch').toggle();
		}, 
		function() {
			$('li.fact-switch').hide();
		} 
		);
	}
	
	function refreshCrosstabDisplay(currentCrosstab, direction) {
	// update crosstab display
		// 1. run map function (project dimensions)
		result=map(doc.data, dxLevel, dyLevel, dzLevel);
// console.log(result);
		// 2. reduce (compute measures)
		if(doc.data.measures)
		// compute measures in case some are defined
		// otherwise facts will not be aggregated
			result = reduce(result, agFunctions, doc.settings.ignoreNulls);

 		// 3. compute metrics if applicable
		if(doc.data.metrics) {
		// compute metrics in case some metrics are defined
			if (doc.reportId == "001")
				result.facts = computeMetrics(result, metricsFormulas, doc.settings.factIndex);
			else {
				result.facts = computeMetrics(result, metricsFormulas, doc.settings.factIndex);
			}
		}
// console.log(result)

//todo: clean-this up (better integration of displayCrosstab with aggregation output structure
		outputData.data.dimensions = result.dimensions;
// warning - important - line below: hard-coded [0] for the purpose of this dataset.				
// facts structure should be reviewed: should handle multiple occurence of facts for same set of dimensions
		// temporarily re-processing fact structure - to be removed when reduction and metrics computation gets correct
		if (doc.reportId == "001")
			outputData.data.facts.values = result.facts;
		else
			outputData.data.facts.values = result.facts[0];

		if (doc.settings.summaryRow) {
		// 4. compute summary row if applicable
// warning - important - line below: hard-coded [0] for the purpose of this dataset.				
// facts structure should be reviewed: should handle multiple occurence of facts for same set of dimensions
			if (doc.reportId == "001")
				outputData.data.summaryRow = computeSummaryRow(doc);
			else
				outputData.data.summaryRow = computeSummaryRow(doc)[0];
		}
			
		if (doc.settings.summaryColumn) {
		// 5. compute summary column if applicable
// warning - important - line below: hard-coded [0] for the purpose of this dataset.				
// facts structure should be reviewed: should handle multiple occurence of facts for same set of dimensions
			if (doc.reportId == "001")
				outputData.data.summaryColumn = computeSummaryColumn(doc);
			else
				outputData.data.summaryColumn = computeSummaryColumn(doc)[0];
		}

		if (doc.settings.summaryRow && doc.settings.summaryColumn) {
		// 6. compute global summary cell if applicable
			if (doc.reportId == "001")
				outputData.data.summaryTotal = computeSummaryTotal(doc);
			else
				outputData.data.summaryTotal = computeSummaryTotal(doc)[0];
		}
		
		// 7. create and position container div for new crosstab to be displayed
		var currentTop = parseInt(currentCrosstab.css('top'));
		var currentLeft = parseInt(currentCrosstab.css('left'));
		var currentWidth = currentCrosstab.children('div:eq(0)').width();
		var currentHeight = currentCrosstab.children('div:eq(0)').height();

		switch(direction) {
			case "dxUp":
			// setup initial position for dx drill up
				var nextCrosstabInitialLeft = currentLeft;
				var nextCrosstabInitialTop = currentTop - currentHeight;
				var leavingCrosstabLeft = currentLeft;
				var leavingCrosstabTop = currentTop + currentHeight;
			break;
			case "dxDown":
			// setup initial position for dx drill down
				var nextCrosstabInitialLeft = currentLeft;
				var nextCrosstabInitialTop = currentTop + currentHeight;
				var leavingCrosstabLeft = currentLeft;
				var leavingCrosstabTop = currentTop - currentHeight;
			break;
			case "dyUp":
			// setup initial position for dy drill up
				var nextCrosstabInitialLeft = currentLeft - currentWidth;
				var nextCrosstabInitialTop = currentTop;
				var leavingCrosstabLeft = currentLeft + currentWidth;
				var leavingCrosstabTop = currentTop;
			break;
			case "dyDown":
			// setup initial position for dy drill down
				var nextCrosstabInitialLeft = currentLeft + currentWidth;
				var nextCrosstabInitialTop = currentTop;
				var leavingCrosstabLeft = currentLeft - currentWidth;
				var leavingCrosstabTop = currentTop;
			break;
			case "dzUp":
			// setup initial position for dz drill up
				var nextCrosstabInitialLeft = currentLeft - currentWidth;
				var nextCrosstabInitialTop = currentTop - currentHeight;
				var leavingCrosstabLeft = currentLeft + currentWidth;
				var leavingCrosstabTop = currentTop + currentHeight;
			break;
			case "dzDown":
			// setup initial position for dz drill down
				var nextCrosstabInitialLeft = currentLeft + currentWidth;
				var nextCrosstabInitialTop = currentTop + currentHeight;
				var leavingCrosstabLeft = currentLeft - currentWidth;
				var leavingCrosstabTop = currentTop - currentHeight;
			break;
			case "dzIndexMore":
				$nextCrosstab = currentCrosstab;
			break;
			case "dzIndexLess":
				$nextCrosstab = currentCrosstab;						
			break;
			default:
				var nextCrosstabInitialLeft = currentLeft;
				var nextCrosstabInitialTop = currentTop;
			break;
		}
		
// todo: remove hard-coded width
		if (direction != 'dzIndexMore' && direction != 'dzIndexLess' ) {
		// create new crosstab container
			$('<div id="nextCrosstab" style="position:absolute;opacity:0;left:'+ nextCrosstabInitialLeft +'px;top:'+ nextCrosstabInitialTop +'px; width:900px"></div>').insertBefore(currentCrosstab);

			$nextCrosstab = $('div#nextCrosstab');	
		// reset dz tabs if necessary
			resetDzTabs($nextCrosstab);
			$target = $('div.dzIndex', $nextCrosstab);
			if(outputData.data.dimensions.dz.values.length > 1) {
			// 3. display other dz indexes labels
				var dzHierarchyName = outputData.data.dimensions.dz.hierarchyName || "";
				for(i= outputData.settings.dzIndex+1; i<outputData.data.dimensions.dz.values.length; i++) {
				// display dz index label (dimension value) for above dz indexes
					$($target[i]).html("<span class='dzLabel' title='"+ dzHierarchyName +"'>" + outputData.data.dimensions.dz.values[i][0] + "</span>");
				}
			}
		}
		else
			$target = $('div.dzIndex', $nextCrosstab);
// console.log($target);
		
// todo: remove this step: only to be done at first run
// instead update status of controls (eg paging disabled, titles)?
		// . display dz navigation controls
		result = displayDzNavigation(outputData);

		$('#dz-controls').html(result);
// console.log(outputData);
		// 8. compute crosstab at given aggregation level and display table in the page
 		result = displayCrosstab(outputData);
		$($target[outputData.settings.dzIndex]).html(result);
		
		// 9.1 add title to the page
		result = displayReportTitle(outputData);
//		result = "Actual title of the report";
		$('#crosstabTitle').html(result);
/*
		// 9.2 add metadata element to the page
		result = displayMetadata(outputData);
		$('#sidebar').html(result);
*/		
		// 10. animate apparition of crosstab
		if (direction != 'dzIndexMore' && direction != 'dzIndexLess' ) {
			// 10.1 slide leaving div and remove
			currentCrosstab.animate(
				{
					'left': leavingCrosstabLeft,
					'top': leavingCrosstabTop,
					'opacity' : 0
				},
				{
					duration : 400,
					queue : false
				}
			);
			// 10.2 show and slide arriving div
			$nextCrosstab.animate({'opacity':'1', 'left':currentLeft, 'top':currentTop}, 400,
				function () {
// console.log(currentTop, currentLeft)
					// 10.3 remove leaving div
					currentCrosstab.remove();				
				});
			
// todo: remove hard-coded id
			// 10.4 consider arriving div as current div
			$nextCrosstab.attr('id','crosstab1');
		}

// todo: check whether this should be done here. rather handled outside of the fonction, in context of multiple crosstabs in a report
		// reset $currentCrosstab global variable
		$currentCrosstab = $('div#crosstab1');

// todo: is this necessary? could be moved at initialize step only 
		theTableElement = $('#crosstab');
		
		// 11. handle pagination / section according to options
// todo: handle sections
		if (doc.settings.dyPageLength)
			paginateDy(theTableElement, doc.settings.dyPageLength);
		
		if (doc.settings.dxPageLength)
			paginateDx(theTableElement, doc.settings.dxPageLength);

		if (doc.settings.dxDisplayMode == 'tabs')
		// display dx in tabs (only one value at a time)
		// in case the settting is set.
			tabulateDx(theTableElement);

// todo: add dx filter handler 					
// 				filterDx(theTableElement, ['02 2007']);

		// 12. activate highlighter according to options
		if (doc.settings.highlighter && (dxLevel != doc.settings.dxMaxLevel || dyLevel != doc.settings.dyMaxLevel))
			figuresHighlighter(theTableElement, doc.settings.highlighter);

		// 99. reset aggregate navigation mechanism if needed so that new structure is taken into acccount
		if (firstRun == false)
			resetAggregateNavigation(doc);
		else
			firstRun = false;
	};
	
	function resetDzTabs (target) {
	// generate the proper number of crosstab containers according to number of dz levels
	// to be called at first run and each time dz level changes
		// reset dxMaxIndex value according to current hierarchy level
		$dzMaxIndex = outputData.data.dimensions.dz.values.length-1;
		// measure difference with max number of dz tabs (leaf level)
//		var lengthDelta = $crosstab.data.dimensions.dz.values.length-1 - $dzMaxIndex;
		var zIndexCounter = 0;
		
		var result =[];
		// activePosition variables store the position of currently active dz tab
		var activePositionTop = ($crosstab.data.dimensions.dz.values.length-1) * 21;
		var activePositionLeft = ($crosstab.data.dimensions.dz.values.length-1) * 10;
// console.log(activePositionTop, activePositionLeft)

		// 1. generate tabs in front of current one
		for (i=0; i<outputData.settings.dzIndex ; i++) {
			result.push('<div style="left:');
			result.push(activePositionLeft - (outputData.settings.dzIndex-i)*10);
			result.push('px; top:');
			result.push(activePositionTop + (outputData.settings.dzIndex-i)*21);
			result.push('px; z-index:');
			result.push(zIndexCounter--);
			result.push('; opacity:');
			result.push(0);
			result.push(';" class="dzIndex dzIndexFront"');
			result.push('></div>');			
		}

		// 2. generate current tab
		result.push('<div style="left:');
		result.push(activePositionLeft);
		result.push('px; top:');
		result.push(activePositionTop);
		result.push('px; z-index:');
		result.push(zIndexCounter--);
		result.push(';" class="dzIndex"');
		result.push('></div>');
		
		
		// 3. generate tabs behind current one
		for (i=outputData.settings.dzIndex+1; i<=$dzMaxIndex ; i++) {
			result.push('<div style="left:');
			result.push(activePositionLeft + (i-outputData.settings.dzIndex)*10);
			result.push('px; top:');
			result.push(activePositionTop - (i-outputData.settings.dzIndex)*21);
			result.push('px; z-index:');
			result.push(zIndexCounter--);
			result.push('; opacity:');
			result.push(.7);
			result.push(';" class="dzIndex"');
			result.push('></div>');			
		}		

/*
		for (i=0; i<=$dzMaxIndex ; i++) {
		// append one dzIndex class to the crosstab container
			result.push('<div style="left:');
//todo: update initial position according to css
			result.push(i*10);
//			result.push((i+lengthDelta+outputData.settings.dzIndex)*10);
			result.push('px; top:');
			result.push(($dzMaxIndex-i)*21);
//			result.push(($dzMaxIndex-i+lengthDelta+outputData.settings.dzIndex)*21);
			result.push('px; z-index:');
			result.push(-i);
			if (i < outputData.settings.dzIndex) {
			// hide tabs in front
				result.push('; opacity:');
				result.push(0);
				result.push(';" class="dzIndex dzIndexFront"');
			}
			else if (i > outputData.settings.dzIndex) {
			// reduce opacity for tabs in background
				result.push('; opacity:');
				result.push(.7);
				result.push(';" class="dzIndex"');
			}
			else {
			// apply class dzIndex to current tab
				result.push(';" class="dzIndex"');
//console.log(i, lengthDelta, outputData.settings.dzIndex)
			}
			result.push('></div>');
		}
*/
		target.html(result.join(''));
	}
	
	function dxDrill(direction) {
	// Move higher and lower dx levels
		if (direction == "down") {
		// lower
			if (dxLevel >= 1) {
				dxLevel--;
				refreshCrosstabDisplay($currentCrosstab, 'dxDown');	
			}
		}
		else {
		// higher
			if (dxLevel <= doc.settings.dxMaxLevel-1) {
				dxLevel++;
				refreshCrosstabDisplay($currentCrosstab, 'dxUp');
			}
		}
	}
	
	function dyDrill(direction) {
	// Move higher and lower dy levels
		if (direction == "down") {
		// lower
			if (dyLevel >= 1) {
				dyLevel--;
				refreshCrosstabDisplay($currentCrosstab, 'dyDown');
			}
		}
		else {
		// higher
			if (dyLevel <= doc.settings.dyMaxLevel-1) {
				dyLevel++;
				refreshCrosstabDisplay($currentCrosstab, 'dyUp');
			}
		}			
	}
	
	function dzDrill(direction) {
	// Move higher and lower dz levels
		if (direction == "down") {
		// lower
			if (dzLevel >= 1) {
				// decrease dz level value
				dzLevel--;
				// activate dzChange flag in order to have number of dz indexes tabs regenerated
				$dzChange = true;
				// refresh crosstab display
				refreshCrosstabDisplay($currentCrosstab, 'dzDown');
			}
		}
		else {
		// higher
			if (dzLevel <= doc.settings.dzMaxLevel-1) {
				dzLevel++;
				outputData.settings.dzIndex = doc.settings.dzIndex;
				// activate dzChange flag in order to have number of dz indexes tabs regenerated
				$dzChange = true;
				// refresh crosstab display
				refreshCrosstabDisplay($currentCrosstab, 'dzUp');
			}
		}
	}
	
	function switchFact(index) {
	// Move higher and lower dz levels
		outputData.settings.factIndex = index;
		refreshCrosstabDisplay($currentCrosstab, 'none');
	}

	function dzNavigation(direction) {
	// Move higher and lower dz indexes
		if (direction == "<") {
		// previous (dzLess)
// todo: should outputData be used here?
			if (outputData.settings.dzIndex >= 1) {
				outputData.settings.dzIndex--;
				// 2. animate fadeIn of table getting in front
//				$($target[outputData.settings.dzIndex]).show();
				$($target[outputData.settings.dzIndex]).animate({
					'opacity': 1
				},
				{
					duration:300,
					queue:false
				})
				.removeClass('dzIndexFront');
				// 3. animate position of visible tables
				for (var i = 0; i <= $dzMaxIndex; i++) {
					var position = $($target[i]).position();
					$($target[i]).animate({
						'left': position.left + 10,
						'top': position.top - 21
					},
					{
						duration:300,
						queue:false
					});
				}
				// 4. animate fadeOut of table getting backward
				$($target[outputData.settings.dzIndex+1]).animate({
					'opacity': 0.7
				},
				300);
				
				// 5. replace the disapearing table by title of dz index (dimension value)
				var dzHierarchyName = outputData.data.dimensions.dz.hierarchyName || "";
				$($target[outputData.settings.dzIndex+1]).html("<span class='dzLabel' title='"+dzHierarchyName+"'>"+outputData.data.dimensions.dz.values[outputData.settings.dzIndex+1][0]+"</span>");
				refreshCrosstabDisplay($currentCrosstab, 'dzIndexLess');
			}
		}
		else if (direction == ">") {
		// next (dzMore)
			if (outputData.settings.dzIndex <= $dzMaxIndex - 1) {
				// increment dz index
				outputData.settings.dzIndex++;
							
				// 2. animate fadeOut of table getting ahead
				$($target[outputData.settings.dzIndex-1]).animate({
					'opacity': 0
				},
				{
					duration:300,
					queue:false
				}
				)
				.addClass('dzIndexFront');			

				// 3. animate position of visible tables
				// table which just got ahead is also updated to get proper effect when appearing back
				for (var i = 0; i<=$dzMaxIndex; i++) {
					var position = $($target[i]).position();
					$($target[i]).animate({
						'left': position.left - 10,
						'top': position.top + 21
					},
					300);
				}
				// 4. animate fadeIn of table getting in front
				$($target[outputData.settings.dzIndex]).animate({
					'opacity': 1
				},
				300);
				
				// 5. empty the disapearing table and hide the div in order to have the current dzIndex div clickable
				$($target[outputData.settings.dzIndex-1]).empty();
//				$($target[outputData.settings.dzIndex-1]).hide();
				refreshCrosstabDisplay($currentCrosstab, 'dzIndexLess');
			}
		}
		else {
		// direction contains a dzIndex
			direction = parseInt(direction) * -1;
			var directionDelta = direction - outputData.settings.dzIndex;
			if (directionDelta > 0)
			// no need to switch in case current dzTab has been clicked
			{
				// 1. animate fadeOut of tables getting ahead
				for (i = 0; i < direction; i++ ) {
					var position = $($target[i]).position();
					$($target[i])
						.animate({
							'left': position.left - 10 * directionDelta,
							'top': position.top + 21 * directionDelta,
							'opacity': 0
						},
						{
							duration:300,
							queue:false
						}
						)
						.addClass('dzIndexFront');
				}

				// 2. increment dz index
				outputData.settings.dzIndex = direction;

				// 3. animate position of visible tables
				for (var i = outputData.settings.dzIndex; i<=$dzMaxIndex; i++) {
					var position = $($target[i]).position();
					$($target[i]).animate({
						'left': position.left - 10 * directionDelta,
						'top': position.top + 21 * directionDelta
					},
					300);
				}
				// 4. animate fadeIn of table getting in front
				$($target[outputData.settings.dzIndex]).animate({
					'opacity': 1
				},
				300);
				
				// 5. empty the disapearing tables and hide the div in order to have the current dzIndex div clickable
				for (i = 0; i < direction; i++ ) {
					$($target[i])
						.empty()
//						.hide();
				}
				refreshCrosstabDisplay($currentCrosstab, 'dzIndexLess');
			}
		}
	}

// todo: clean this up?			
	var firstRun = false;

// todo: replace this by selection of crosstab using id according to user selection
	var $currentCrosstab = $('div#crosstab1');
	
	// initialize maximum dz index
	$dzMaxIndex = outputData.data.dimensions.dz.values.length-1 || doc.data.dimensions.dz.values.length-1;

	if ($currentCrosstab.text() == '') {
	// display crosstab at first run
		var firstRun = true;
		var $dzChange = true;
// todo change initialization animation

	// update crosstab position in case there is only small number of dz index tabs to be displayed
		if ($dzMaxIndex <4) {
			var currentPosition = $currentCrosstab.position();
			$currentCrosstab.css('left', currentPosition.left+60);
			$currentCrosstab.css('top', currentPosition.top+60);
			$('#dz-controls').css('top', currentPosition.top-50);
	}
	


		refreshCrosstabDisplay($currentCrosstab, 'dyDown');		
	}
	
	if(doc.settings.dxMaxLevel) {
	// Set up the navigation controls for dx in case dx has a hierarchy
		var $dxDown = $('#dx-level-down');
		var $dxUp = $('#dx-level-up');
		
		$dxDown.click(function() {
		// handle drill down click
			dxDrill('down');
		});
			
		$dxUp.click(function() {
		// handle drill up click
			dxDrill('up');
		});
	}
	
	if(doc.settings.dyMaxLevel) {
	// Set up the navigation controls for dy in case dy has a hierarchy
		var $dyDown = $('#dy-level-down');
		var $dyUp = $('#dy-level-up');
		
		$dyDown.click(function() {
		// handle drill down click
			dyDrill('down');
		});
			
		$dyUp.click(function() {
		// handle drill up click
			dyDrill('up');
		});
	}
	
	if(doc.settings.dzMaxLevel) {
	// Set up the navigation controls for dz in case dz has a hierarchy
		var $dzDown = $('#dz-level-down');
		var $dzUp = $('#dz-level-up');
		
		$dzDown.click(function() {
		// handle drill down click
			dzDrill('down');
		});
		$dzUp.click(function() {
		// handle drill up click
			dzDrill('up');
		});
	}
	
	if(doc.settings.factIndex) {
	// Set the navigation controls for facts in case several metrics are present
		var $factSwitch = $('.fact-switch');
		
		$factSwitch.click(function() {
		// handle fact switch click
			factIndex = $factSwitch.attr('id');
			switchFact(factIndex);
		});
	}
	
	//setup dz index navigation controls
	var $dzMore = $('#dz-index-more');
	var $dzLess = $('#dz-index-less');
	var $dzTab = $('.dzIndex');	

	//initialize navigation controls
	resetControls();

	$dzLess.click(function() {
		dzNavigation('<');
	});
	
	$dzMore.click(function() {
		dzNavigation('>');
	});

	$dzTab.click(function(e) {
	// handle dz direct navigation click
		dzNavigation($(e.target).closest('.dzIndex').css('z-index'));
	});	


}


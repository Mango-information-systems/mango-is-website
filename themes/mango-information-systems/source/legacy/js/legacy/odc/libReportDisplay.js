function displayReportTitle(doc) {
// display metadata about current crosstab display
	
	var result = "<h1>";
	
	if (doc.data.metrics) {
	// display other available metrics
		$(doc.data.metrics.labels).each(function(i) {
			 if(i != doc.settings.factIndex) {
				result += doc.data.metrics.labels[i];
			}
			else {
				result += doc.data.metrics.labels[i];
			}
		});
	}
	else if (doc.data.measures) {
	// display other available measures
		$(doc.data.measures.labels).each(function(i) {
			 if(i != doc.settings.factIndex) {
				result += doc.data.measures.labels[i];
			}
			else {
				result += doc.data.measures.labels[i];
			}
		});
	}
	else {
	// display other available facts
		$(doc.data.facts.labels).each(function(i) {
			 if(i != doc.settings.factIndex) {
				result += doc.data.facts.labels[i];
			}
			else {
				result += doc.data.facts.labels[i];
			}
		});
	}
	result +=" according to ";
	
	result += doc.data.dimensions.dx.hierarchyName + ", " + doc.data.dimensions.dy.hierarchyName + " and " +doc.data.dimensions.dz.hierarchyName
	result += "</h1>";
	return result;			
}

function displayMetadata(doc) {
// display metadata about current crosstab display
	
	var result = "<p>";
	
	result += "Currently showing "
	
	if (doc.data.metrics) {
	// display currently displayed metric
		result += doc.data.metrics.labels[doc.settings.factIndex];
	}
	else if (doc.data.measures) {
	// display currently displayed measure
		result += doc.data.measures.labels[doc.settings.factIndex];
	}
	else {
	// display currently displayed fact
		result += doc.data.facts.labels[doc.settings.factIndex];
	}			
	result +="<br/>See also<br/>";
	
	if (doc.data.metrics) {
	// display other available metrics
		var counter = 1;
		for (i in doc.data.metrics.labels) {
			result += "<div class='metricsSet'>";
			for (j in doc.data.metrics.labels[i]) {
				if(counter-1 != doc.settings.factIndex) {
					result += "<span class='fact-switch' id='"+ counter +"'>";
					result += doc.data.metrics.labels[i][j];
					result += "</span><br/>";
				}
				counter++;
			}
			result += "</div>";
		};
	}
	else if (doc.data.measures) {
	// display other available measures
		$(doc.data.measures.labels).each(function(i) {
			 if(i != doc.settings.factIndex) {
				result += doc.data.measures.labels[i];
				result += "<br/>";
			}
		});
	}
	else {
	// display other available facts
		$(doc.data.facts.labels).each(function(i) {
			 if(i != doc.settings.factIndex) {
				result += doc.data.facts.labels[i];
				result += "<br/>";
			}
		});
	}
	result +="</p>";			
	return result;			
}

function displayDzNavigation(doc) {
// display the dz navigation controls

// todo: display other dz values (background, tooltip, drop-down list?)
// to be confirmed: always displaying value for lowest level (0)

	var result = "";
	
	if(doc.settings.dzIndexNavigation) {
	// showing dx index more control in case there is more than one dz
		if( doc.data.dimensions.dz.values[doc.settings.dzIndex+1] )
			var dzIndexMoreTitle = doc.data.dimensions.dz.values[doc.settings.dzIndex+1][0] || "";
		else
			var dzIndexMoreTitle = "";
		result += "<div id='dz-index-more' title='"+ dzIndexMoreTitle +"' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
	}

	var hierarchyName = doc.data.dimensions.dz.hierarchyName;
	result+="<div id='dz-hierarchy-label'>"+hierarchyName+"</div>";



	if(doc.settings.dzMaxLevel) {
	// only display aggregate navigation controls in case hierarchy accross dz exists
		var dzLevelUpTitle = $crosstab.data.dimensions.dz.labels[dzLevel+1] || "";
		var dzLevelDownTitle = $crosstab.data.dimensions.dz.labels[dzLevel-1] || "";
		result += "<div><span title='"+ dzLevelUpTitle +"' id='dz-level-up'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
		result += "<span title='"+ dzLevelDownTitle +"' id='dz-level-down'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
	}

	if(doc.settings.dzIndexNavigation) {
	// showing dx index less control in case there is more than one dz
		if( doc.data.dimensions.dz.values[doc.settings.dzIndex-1] )
			var dzIndexLessTitle = doc.data.dimensions.dz.values[doc.settings.dzIndex-1][0] || "";
		else 
			var dzIndexLessTitle = "";
		result += "<div id='dz-index-less' title='"+ dzIndexLessTitle +"' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
	}
	
	return result;
}

function formatMeasure(measure) {
// adding thousand separator to the measure
// todo: handlue multiple formatting options
	measure += '';
	var expression = /(\d+)(\d{3})/;
	while (expression.test(measure)) {
		measure = measure.replace(expression, '$1' + '&nbsp;' + '$2');
	}
	return measure;
}

function displayCrosstab(doc) {
// display the crosstab according with provided metadata parameters
// to be confirmed: always displaying value for lowest level (0)

	var result = "";
	
	var dzHierarchyName = doc.data.dimensions.dz.hierarchyName || "";

	result += "<span class='dzLabel' title='"+ dzHierarchyName +"'>" + doc.data.dimensions.dz.values[doc.settings.dzIndex][0] + "</span>";

	// creating table element
	result += "<table id='crosstab' class='crosstab'><caption>";

	// adding crosstab title as caption
	result += doc.settingstitle;
	result += "</caption><thead>";

	if (doc.settings.dxHeaderDisplay) {
	// adding dx label as header row 0 if enabled option
	
		// calculate colspan value for dx label, to be reused few times below
		dxLabelColspan = doc.data.dimensions.dx.values.length;
		
		if (doc.data.summaryColumn)
		// increase colspan in case there si a summary column
			dxLabelColspan++;

		// calculate number of dy label columns to skip
		var dyLabelsOffset = "";

/*
		if (doc.settings.dyMaxLevel) {
		// 1a. offset two cells regarding dy level buttons
			dyLabelsOffset += "<th/><th/>" ;
			if (dyLevel == doc.settings.dyMaxLevel) {
			// skipping dy levels
				dyLabelsOffset += "<th/>";
			}
		}
*/
//		else
		// 1b. offset one cell in case no hierarchy on dy dimension to skip dy column
//			dyLabelsOffset += "<th/>";
			
			
			
		dyLabelsOffset += "<th/>";
// commented content below replaced by line above (context: showing only one dy label column)
/*
		for (i=0; i<doc.data.dimensions.dy.labels.length-1; i++) {
		// 2. skipping dy levels when there is a hierarchy on dy
			dyLabelsOffset += "<th/>";
		}
*/	


/*
		if (doc.settings.dxMaxLevel) {
			if (!doc.settings.minimalDxHeader || dxLevel != doc.settings.dxMaxLevel) {
			// display dx level increase button if dx hierarchy exists
			// only if minial display is not set or not top level
// todo: remove hard-coded height

				result += "<tr style='line-height:1px;'>";

				

				result += dyLabelsOffset;

// class ui-icon ui-icon-triangle-1-n			
				if (dxLevel < doc.settings.dxMaxLevel) {
				// display level up button (enabled)
					var dxLevelUpTitle = $crosstab.data.dimensions.dx.labels[dxLevel+1] || "";
					result += "<th colspan ='"+ dxLabelColspan +"'><span id='dx-level-up' title='"+ dxLevelUpTitle +"'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th></tr>";
				}
				else
				// display level up button with paging-disabled class in case top level is reached
					result += "<th colspan ='"+ dxLabelColspan +"'><span class='paging-disabled' id='dx-level-up'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th></tr>";
			}
		}
*/
		if (!doc.settings.minimalDxHeader || dxLevel != doc.settings.dxMaxLevel) {
		// display dx label only if minimal display is not set or not top level
			result += "<tr>";
			result += dyLabelsOffset;
	
			// header row 0: dx labels
			var dxHierarchyName = doc.data.dimensions.dx.hierarchyName || "";				
			var dxPreviousPageControl="";
			var dxNextPageControl="";
			
			if (doc.settings.dxPageLength) {
				dxPreviousPageControl = "<span id='dx-paging-back'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				dxNextPageControl = "<span id='dx-paging-next'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th>";
			}

			result += "<th title='"+ dxHierarchyName +"' colspan ="+ dxLabelColspan +">"
			result += dxPreviousPageControl ;
			
			if (dxLevel < doc.settings.dxMaxLevel) {
			// display level up button (enabled)
				var dxLevelUpTitle = $crosstab.data.dimensions.dx.labels[dxLevel+1] || "";
				result += "<span id='dx-level-up' title='"+ dxLevelUpTitle +"' style='margin-right:10px;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
			}
			else
			// display level up button with paging-disabled class in case top level is reached
				result += "<span class='paging-disabled' id='dx-level-up' style='margin-right:10px;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				
			result += doc.data.dimensions.dx.labels[0] 
			
				if (doc.settings.dxMaxLevel) {
				// display level down button
// todo: remove hard-coded $crosstab here, to be replaced by field from doc not present yet
// eg Next and Previous Dx labels medatada
					var dxLevelDownTitle = $crosstab.data.dimensions.dx.labels[dxLevel-1] || "";
					result += "<span id='dx-level-down' title='"+ dxLevelDownTitle +"' style='margin-left:10px;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				}
			
			result += dxNextPageControl;
			result += "</tr>";
		}
/*		
		if (doc.settings.dxMaxLevel) {
			if (!doc.settings.minimalDxHeader || dxLevel != 0) {
			// display dx level decrease button if there is a hierarchy defined on dx dimension
			// and only if (minimal display is not set or not bottom level)
// todo: remove hard-coded height
				result += "<tr style='line-height:1px;'>";
				
				result += dyLabelsOffset;
				
// todo: remove hard-coded height
				if (doc.settings.dxMaxLevel) {
				// display level down button
// todo: remove hard-coded $crosstab here, to be replaced by field from doc not present yet
// eg Next and Previous Dx labels medatada
					var dxLevelDownTitle = $crosstab.data.dimensions.dx.labels[dxLevel-1] || "";
					result += "<th colspan ="+ dxLabelColspan +"><span id='dx-level-down' title='"+ dxLevelDownTitle +"'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th></tr>";
				}
			}
		}
*/
	}
	
	// header row			
	result += "<tr id='dxHeaders'>";

	// dy labels display - might be put as optional, to be investigated
	if (doc.settings.dyMaxLevel) {
	//span label columns across dy level navigation buttons in case there is a hierarchy accross dy
		var dyHierarchyName = doc.data.dimensions.dy.hierarchyName || "";
		var dyLevelUpTitle = $crosstab.data.dimensions.dy.labels[dyLevel+1] || "";
		var dyLevelDownTitle = $crosstab.data.dimensions.dy.labels[dyLevel-1] || "";

		result += "<th class='dyHeader' title='"+ dyHierarchyName +"'>";

		// display dy level increase button
// todo: replace use of $crosstab
		result += "<span id='dy-level-up' title='"+ dyLevelUpTitle +"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";

		// display dimension label
		result += doc.data.dimensions.dy.labels[0];
		
		// display dy level decrease button
		result += "<span id='dy-level-down'title='"+ dyLevelDownTitle +"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
		result += "</th>";

// code below replaced by line above
/*		
		if (dyLevel == doc.settings.dyMaxLevel || doc.data.dimensions.dy.labels.length == 2) {
		// handle display at top level (total) or level below top level: only one column header
			result += "<th colspan='3' class='dyHeader' title='"+ dyHierarchyName +"'>" + doc.data.dimensions.dy.labels[0] + "</th>";
		}
		else {
		// handle display at other levels - two records at least
			// 1. display larger label column to span across dy level down button in case there is a hierarchy accross dy
			result += "<th colspan='2' class='dyHeader' title='"+ dyHierarchyName +"'>" + doc.data.dimensions.dy.labels[doc.data.dimensions.dy.labels.length-2] + "</th>";
			for (yHeader = doc.data.dimensions.dy.labels.length-3; yHeader >= 1; yHeader--) {
			// 2. other dy levels labels until level 1 (no colspan)
				result += "<th class='dyHeader' title='"+ dyHierarchyName +"'>" + doc.data.dimensions.dy.labels[yHeader] + "</th>";
			}
			// 3. display larger label column to span across dy level down button in case there is a hierarchy accross dy
			result += "<th colspan='2' class='dyHeader' title='"+ dyHierarchyName +"'>" + doc.data.dimensions.dy.labels[0] + "</th>";
		}
*/
	}
	else {
	// display the label of dx dimension
		result += "<th class='dyHeader'>" + doc.data.dimensions.dy.labels[0] + "</th>";
	}

	// header row 1: dx values
	for (index in doc.data.dimensions.dx.values) {

		colDisplayCheck = false;
// todo: replace for loop below by while clause for better performance
	for (dy in  doc.data.dimensions.dy.values) {
		// check whether there is at least one filled cell with this dx

			if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy]) {
				if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][index] != null) {
//							console.log(doc.data.dimensions.dx.values[index][0], doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][index].length);
// todo weird behaviour here for waste report, ok for trade report
// int measures length is undefined, added +'' to convert to string. leave like this? find more elegant solution?

					if((doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][index]+'').length >0 && doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][index]!=0) {
						colDisplayCheck=true;
					}
				}
			}
		}
		if (colDisplayCheck == true)
		// display dx value cell only if there are facts under this dimension value for the current dz index.
			result += "<th>" + doc.data.dimensions.dx.values[index][0];
			if (dxLevel == doc.settings.dxMaxLevel && doc.settings.minimalDxHeader) {
			// display level down button
				var dxLevelDownTitle = $crosstab.data.dimensions.dx.labels[dxLevel-1] || "";
				result += "<span id='dx-level-down' title='"+ dxLevelDownTitle +"' style='margin-left:10px;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
			}
			result += "</th>";
	}
	
	if (doc.data.summaryColumn && (dxLevel != doc.settings.dxMaxLevel))
	// display title for summary column
		result += "<th class='summary-column'>Total</th>";
	
	//end of header row
	result +=  "</tr></thead><tbody>";
	
// todo2: add support for colapsed aggregated row for hierarchized dimensions (rowspan) eg continent values)
	// data rows

// below previous version: needed to display more than one column with dy labels hierarchy	
/*
	if (dyLevel == doc.settings.dyMaxLevel)
		var dyPagingColspan = doc.data.dimensions.dy.labels.length;
	else
*/
	var dyPagingColspan = doc.data.dimensions.dy.labels.length-1;
	
/*	
	if (doc.settings.dyMaxLevel){
	// display dy level increase button if applicable
// todo: remove hard-coded width + replace use of $crosstab
		var dyLevelUpTitle = $crosstab.data.dimensions.dy.labels[dyLevel+1] || "";
// todo: adapt following when pagination mechanism is modified
		
		if (doc.settings.dyPageLength)
		// increase rowspan by two in case there  is vertical pagination, in order to span accross rows containing page up and down buttons
			dyLevelControlRowspan = dyLevelControlRowspan + 2;
		
		result += "<th style='width:6px' title='"+ dyLevelUpTitle +"' rowspan ="+ dyLevelControlRowspan +"><span id='dy-level-up'>&nbsp;&nbsp;&nbsp;&nbsp;</span></th>";
		
		for (i in doc.data.dimensions.dx.labels.length) {
			result +="<th/>";
		}
	
	// display dy level decrease button if applicable
// todo: remove hard-coded width
		var dyLevelDownTitle = $crosstab.data.dimensions.dy.labels[dyLevel-1] || "";
		result += "<tr class='navigationControls'><th/><th title='"+ dyLevelDownTitle +"' style='width:6px' rowspan ="+ dyLevelControlRowspan +"><span id='dy-level-down'>&nbsp;&nbsp;&nbsp;&nbsp;</span></th></tr>";
//		result += "<th colspan='"+ dyPagingColspan +"'/><th title='"+ dyLevelDownTitle +"' style='width:6px' rowspan ="+ dyLevelControlRowspan +"><span id='dy-level-down'>&nbsp;&nbsp;&nbsp;&nbsp;</span></th></tr>";
	}
*/
	if (doc.settings.dyPageLength && (dyLevel != doc.settings.dyMaxLevel || !doc.settings.dyMaxLevel )) {
	// display paging up button in case pagination is enabled accross vertical axis
// todo debug: adjust colspan 
// cause: removed dy navitaion buttons
		var dyLevelControlRowspan = doc.data.dimensions.dy.values.length + 3;
		result +=  "<tr class='navigationControls'><th colspan='"+ dyPagingColspan +"'><span id='dy-paging-back'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th>";											
		result +="<td colspan ="+ dxLabelColspan +"></td></tr>";
	}
	
// below previous version: needed to display more than one column with dy labels hierarchy
/*
	//initializing variable to be used in inner for loop as start boundary
	if (dyLevel == doc.settings.dyMaxLevel || !doc.settings.dyMaxLevel ) 
	//only top level to display
		dyLabelDisplayStart = doc.data.dimensions.dy.values[0].length-1;
	else 
	// initial dy level to display is top minus one (no display of 'all' level)
		dyLabelDisplayStart = doc.data.dimensions.dy.values[0].length-2;
*/
	for (y in doc.data.dimensions.dy.values) {
	// data row processing
	
		rowDisplayCheck = false;
// todo: replace for loop below by while clause for better performance
		for (dx in  doc.data.dimensions.dx.values) {
		// check whether there is at least one filled cell with this dy
			if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y]) {
				if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][dx] != null) {
//console.log(doc.data.dimensions.dx.values[index][0], doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][dx].length);
					if((doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][dx]+'').length >0 && doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][dx] !=0) {
						rowDisplayCheck=true;
					}
				}
			}
		}

		if (rowDisplayCheck == true) {
		// display dx value cell only if there are facts under this dimension value for the current dz index.
		
			result += "<tr>";
			if (doc.data.dimensions.dy.values[y][0].length>75) {
			// limiting dy value length to display in table cell in case long text
				result += "<th title='"+ doc.data.dimensions.dy.values[y][0] +"'>" + doc.data.dimensions.dy.values[y][0].substring(0,75) + "...</th>";
			}
			else {
			// display full dy value if text is short
				result += "<th>" + doc.data.dimensions.dy.values[y][0] + "</th>";
			}


// below previous version: displaying more than one column with dy labels hierarchy
/*
			for (dyDepth = dyLabelDisplayStart; dyDepth>=0; dyDepth--) {
			// adding y dimensions values
// todo: remove hard-coded width
// todo: remove hard-coded substring

				if (doc.data.dimensions.dy.values[y][dyDepth].length>75) {
				// limiting dy value length to display in table cell in case long text
					if (dyDepth == 0)
						result += "<th style='width:20%' title='"+ doc.data.dimensions.dy.values[y][dyDepth] +"'>" + doc.data.dimensions.dy.values[y][dyDepth].substring(0,75) + "...</th>";
					else
						result += "<th style='width:10%' title='"+ doc.data.dimensions.dy.values[y][dyDepth] +"'>" + doc.data.dimensions.dy.values[y][dyDepth].substring(0,75) + "...</th>";
				}
				else {
				// display full dy value if text is short
					if (dyDepth == 0)
						result += "<th style='width:20%'>" + doc.data.dimensions.dy.values[y][dyDepth] + "</th>";
					else
						result += "<th style='width:10%'>" + doc.data.dimensions.dy.values[y][dyDepth] + "</th>";
				}				
			}
*/
			for (x in doc.data.dimensions.dx.values){
			// adding fact cells
// todo: handle multiple metrics here. currently only first metric taken

		
				if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y]) {
/*
console.log('dz: ' + doc.settings.dzIndex);
console.log('dy: ' + y);
console.log('dx: ' + x);
console.log('fact: ' + doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][x]);
*/
					colDisplayCheck = false;
// todo: replace for loop below by while clause for better performance
					for (dy in  doc.data.dimensions.dy.values) {
					// check whether there is at least one filled cell with this dx
						if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy]) {
							if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x] != null) {
								if((doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x]+'').length >0 && doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x] !=0) {
									colDisplayCheck=true;
								}
							}
						}
					}
					if (colDisplayCheck == true) {
					// display dx value cell only if there are facts under this dimension value for the current dz index.
						if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][x] != null)
							if (typeof doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][x] == 'number')
								result += "<td>" + formatMeasure(doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][x]) + "</td>";
							else
								result += "<td>" + doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][y][x] + "</td>";
						else
							result += "<td></td>";
					}
				}
			}
			
			if (doc.data.summaryColumn && (dxLevel != doc.settings.dxMaxLevel))
			// display title for summary column
				result += "<td class='summary-column'>"+ doc.data.summaryColumn[doc.settings.factIndex][doc.settings.dzIndex][y][0] +"</td>";
			
			result +="</tr>";
		}
	}
	
	if (doc.settings.dyPageLength && (dyLevel != doc.settings.dyMaxLevel)) {
	//display paging down button in case pagination is enabled accross vertical axis
		result += "<tr class='navigationControls'><th colspan='"+dyPagingColspan+"'><span id='dy-paging-next'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></th>";				
		result +="<td colspan ="+ dxLabelColspan +"></td></tr>";
	}
	result +="</tbody>";
	
	if (doc.data.summaryRow && (dyLevel != doc.settings.dyMaxLevel)) {
	// display summary row if applicable

		result +="<tfoot><tr>";
		var footerLabelColspan = parseInt(doc.data.dimensions.dy.values[0].length)+1;
		
// todo: replace hard-coded 'total' by label stored inside summaryRow setting
		result +="<th colspan='"+ footerLabelColspan +"'>Total</th>";
		
		for (x in doc.data.dimensions.dx.values){
		//adding summary row cells
					colDisplayCheck = false;
// todo: replace for loop below by while clause for better performance
					for (dy in  doc.data.dimensions.dy.values) {
					// check whether there is at least one filled cell with this dx
						if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy]) {
							if (doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x] != null) {
								if((doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x]+'').length >0 && doc.data.facts.values[doc.settings.factIndex][doc.settings.dzIndex][dy][x] !=0) {
									colDisplayCheck=true;
								}
							}
						}
					}
			if (colDisplayCheck == true) {
// todo: handle multiple metrics here. currently only first metric taken
				if (doc.data.summaryRow[doc.settings.factIndex][doc.settings.dzIndex][0][x] != null)
					result += "<td>"+doc.data.summaryRow[doc.settings.factIndex][doc.settings.dzIndex][0][x] + "</td>";
				else
					result += "<td></td>";
			}
		}
		
		if (doc.data.summaryTotal && (dxLevel != doc.settings.dxMaxLevel)) {
		// add last cell containing total
console.log(doc.data.summaryTotal[doc.settings.factIndex][doc.settings.dzIndex])
					result += "<td class='summary-column'>"+doc.data.summaryTotal[doc.settings.factIndex][doc.settings.dzIndex][0][0] + "</td>";
		}
		result +="</tr></tfoot>";
	}

	//return html table
	return result;
}


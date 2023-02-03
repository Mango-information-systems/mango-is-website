function filterDx(table, dxValues) {
// filter columns containing a given value
	
	var $table = $(table);
	columnIndexes=[]
	
	for (i in dxValues) {
	// 1. process each value to record indexes of columns to filter
		var result = $('tr#dxHeaders>th').filter(function() {return $(this).text() == dxValues[i]});
		if(result[0])
			columnIndexes.push(result[0].cellIndex);
	}
	
	for (j in columnIndexes) {
		$columns = $table.find('#dxHeaders >th:not(.dyHeader, .summary-column), tbody >tr >td:not(.summary-column), tfoot >tr >td:not(.summary-column)');
		currentColumnIndex = columnIndexes[j];
		$columns.each(function() {
			if (this.cellIndex == currentColumnIndex)
				$(this).hide();
		});
	}			
}

function paginateDx(table, pageLength) {
// pagination for x axis

	// 1. Set up paging information
	var $table = $(table);
	var $columns = $table.find('#dxHeaders >th:not(.dyHeader, .summary-column), tbody >tr >td:not(.summary-column)');
	var $footerColumns = $table.find('tfoot >tr >td:not(.summary-column)');

	//counting number of dy header columns to skip for the th row
	var dyHeadersLength = $table.find('#dxHeaders >th.dyHeader').length;
	
	//measuring number of data columns
	var columnsLength = $('#dxHeaders >th:not(.dyHeader, .summary-column)').length;
	
	//counting number of pages
	var numPages = Math.ceil(columnsLength / pageLength) - 1;

	var current = 0;

	// 2. Set up the navigation controls
	var $xBack = $('#dx-paging-back');
	var $xNext = $('#dx-paging-next');

   // disable dyNext in case there is no upper index available
	if(numPages == 0)
		$xNext.addClass('paging-disabled');
	
	$xBack
		.addClass('paging-disabled')
		.click(function() {
			dxPagination('<');
		});
		
	$xNext.click(function() {
		dxPagination('>');
	});
	
	// 3. Show initial columns
	$columns.each(function() {
		if( this.cellIndex-dyHeadersLength >= 0 && this.cellIndex-dyHeadersLength < pageLength)
			$(this).show();
		else
			$(this).hide();
	});

	$footerColumns.each(function() {
		if( this.cellIndex-1 >= 0 && this.cellIndex-1 < pageLength)
			$(this).show();
		else
			$(this).hide();
	});

	dxPagination = function (direction) {
		reveal = function (current) {      
		// 5. Reveal the correct columns
			$xBack.removeClass("paging-disabled");
			$xNext.removeClass("paging-disabled");
		
			$columns.each(function() {
			// hiding or showing cell according to its position and current page
				if( this.cellIndex-dyHeadersLength >= current * pageLength && this.cellIndex-dyHeadersLength < current * pageLength + pageLength)
					$(this).show();
				else
					$(this).hide();
			}); 
							
			$footerColumns.each(function() {
			// hiding or showing cell according to its position and current page
				if( this.cellIndex-1 >= current * pageLength && this.cellIndex-1 < current * pageLength + pageLength)
					$(this).show();
				else
					$(this).hide();
			}); 
		};
		
		// 4. Move previous and next
		if (direction == "<") {
		// previous
			if (current > 1) {
				reveal(current -= 1);
			}
			else if (current == 1) {
				reveal(current -= 1);
				$xBack.addClass("paging-disabled");
			}
		}
		else {
		// next
			if (current < numPages - 1) {
			   reveal(current += 1);
			}
			else if (current == numPages - 1) {
				reveal(current += 1);
				$xNext.addClass("paging-disabled");
			}
		}
	}
};

function tabulateDx(table) {
// handle tabs display for dx

	// 1. Set up tabulating information
	
	// 1.1 selectors
	var $table = $(table);
	var $columns = $table.find('tbody >tr >td:not(.summary-column)');
	var $footerColumns = $table.find('tfoot >tr >td:not(.summary-column)');

	// 1.2 counting number of dy header columns to skip for the th row
	var dyHeadersLength = $table.find('#dxHeaders >th.dyHeader').length;
	// 1.3 counting number of data columns
	var columnsLength = $('#dxHeaders >th:not(.dyHeader, .summary-column)').length;

	var currentTabIndex = 0+dyHeadersLength;

	// 2. Set up the navigation controls
	var $dxTabs = $('#dxHeaders >th:not(.dyHeader, .summary-column)');
	
	$dxTabs.click(function() {
		dxTabulation(this.cellIndex);
	});

	// 3. set tabs colspan 
	$columns.each(function() {
		$(this).attr('colspan', columnsLength);
	});
	$footerColumns.each(function() {
		$(this).attr('colspan', columnsLength);
	});

	// 4. show initial tab content
	dxTabulation(currentTabIndex);
	
	function dxTabulation (cellIndex) {
	// 5. Reveal the correct columns
		
		// 5.1 show only active tab
		$columns.each(function() {
		// hiding or showing cell according to its position and current page
			if (this.cellIndex == cellIndex)
				$(this).show();
			else
				$(this).hide();
		}); 
						
		$footerColumns.each(function() {
		// hiding or showing cell according to its position and current page
			if (this.cellIndex == cellIndex)
				$(this).show();
			else
				$(this).hide();
		});
// todo: replace paging-disabled-class here by something else
		// 5.2 highlight current tab
		$($dxTabs).addClass('paging-disabled');
		$($dxTabs[cellIndex-1]).removeClass('paging-disabled');
	}

};

function paginateDy(table, pageLength) {
// pagination for y axis

	// 1. Set up paging information
	var $table = $(table);
	var $rows = $table.find('tbody > tr:not(.navigationControls)');
	var numPages = Math.ceil($rows.length / pageLength) - 1;
	var current = 0;

	// 2. Set up the navigation controls
	var $yBack = $('#dy-paging-back');
	var $yNext = $('#dy-paging-next');
   
   // disable dyNext in case there is no upper index available
	if(numPages == 0)
		$yNext.addClass('paging-disabled');
   
	$yBack
		.addClass('paging-disabled')
		.click(function() {
			dyPagination('<');
		});
		
	$yNext.click(function() {
		dyPagination('>');
	});
	
	// 3. Show initial rows
	$rows
		.hide()
		.slice(0, pageLength)
		.show();

	dyPagination = function (direction) {
		reveal = function (current) {            
		// 5. Reveal the correct rows
				$yBack.removeClass("paging-disabled");
				$yNext.removeClass("paging-disabled");
				$rows
					.hide()
					.slice(current * pageLength, current * pageLength + pageLength)
					.show();		
		};
		
		// 4. Move previous and next
		if (direction == "<") {
		// previous
			if (current > 1) {
				reveal(current -= 1);
			}
			else if (current == 1) {
				reveal(current -= 1);
				$yBack.addClass("paging-disabled");
			}
		}
		else {
		// next
			if (current < numPages - 1) {
			   reveal(current += 1);
			}
			else if (current == numPages - 1) {
				reveal(current += 1);
				$yNext.addClass("paging-disabled");
			}
		}
	}
};

function filterDy(selector, query) {  
//filter results based on query  
  query =   $.trim(query); //trim white space  
  query = query.replace(/&nbsp\;/gi, '|'); //add OR for regex query  
  
  $(selector).each(function() {  
	($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');  
  });  
}  

function figuresHighlighter(table, color) {
// pagination for y axis

	// 1. Set up variables
	var $table = $(table);
	var $columns = $table.find('tbody >tr:not(.navigationControls) >td:not(.summary-column)');
	// color scales for background, text and text shadow:
	var orangeBgScale = ['white', '#FFFAF2', '#FFF5E6', '#FFF0D9', '#FFE5BF', '#FFE0B3', '#FFDBA6', '#FFD699', '#FFD18C', '#FFCC80', '#FFC773', '#FFC266', '#FFBD59', '#FFB84D', '#FFB340', '#FFAE33', '#FFA926', '#FFA419', '#FF9F0D', '#FF9A00', '#FF8000'];
	var orangeTxtScale = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white'];
	var orangeTxtShadowScale = ['1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black'];
	var greenBgScale = ['white', '#E6F2E9','#CFE6D5','#BFE0C9','#AFDBBC','#A3D9B3','#96D6A9','#8AD4A0','#7ACB92','#70CB8B','#5BB576','#51B56F','#48B568','#3FB561','#36B55A','#2DB553','#24B54C','#1BB545','#12B53E','#09B537','#00B530','#079B2E'];
	var greenTxtScale = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white', 'white', 'white'];
	var greenTxtShadowScale = ['1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px white', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black', '1px 1px 1px black'];

	// 2. calculate min and max values
	var minValue = Number.MAX_VALUE;
	var maxValue = Number.MIN_VALUE;
	$columns.each(function() {
		if (parseInt($(this).text().replace(/\u00A0/gi,'')) < minValue)
			minValue = parseInt($(this).text().replace(/\u00A0/gi,''))
// console.log($(this).text().replace(/\u00A0/gi,''))
		if (parseInt($(this).text().replace(/\u00A0/gi,'')) > maxValue)
			maxValue = parseInt($(this).text().replace(/\u00A0/gi,''))
	});
// console.log(minValue); 	
	// 3. assign background colour to each cell according to its value
	if (color == "green") {
		$columns.each(function() {
			$(this).css({
				'background-color': greenBgScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))],
				'color': greenTxtScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))],
				'text-shadow': greenTxtShadowScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))]
			});
	//		$(this).css('color', 'black');
	// console.log(parseInt($(this).text().replace(/\u00A0/gi,'')), Math.round(parseInt($(this).text().replace(/\u00A0/gi,''))*10/maxValue))
		});
	}
	else {
		$columns.each(function() {
			$(this).css({
				'background-color': orangeBgScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))],
				'color': orangeTxtScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))],
				'text-shadow': orangeTxtShadowScale[Math.round((parseInt($(this).text().replace(/\u00A0/gi,''))-minValue)*20/(maxValue-minValue))]
			});
		});
	}
};
/**
* SVG export function
* 
* Based on https://stackoverflow.com/a/37387449/1006854
* 
* @constructor
* 
*/
function SVGExport() {

	//~ var self = this
	
	var containerElements = ['svg','g']
		, relevantStyles = {
			path: ['fill','stroke','stroke-width', 'stroke-opacity']
			//~ , circle: ['fill','stroke','stroke-width']
			, text:['fill','font-size','font-family','text-anchor', 'cursor','stroke','stroke-width']
		}
	
	/******************************************
	 * 
	 * Private functions
	 * 
	 * ***************************************/
	
	
	/**
	* traverse tree to apply computed style
	* 
	* @param {} 
	* 
	* @private
	*/	

	function read_Element(parentNode, origData){
		var children = parentNode.childNodes
		var origchildDat = origData.childNodes     

		for (var cd = 0; cd < children.length; cd++){
			var child = children[cd]

			var tagName = child.tagName

			if (containerElements.indexOf(tagName) != -1) {
				read_Element(child, origchildDat[cd])
			} else if (tagName in relevantStyles){
				
				var styleDef = window.getComputedStyle(origchildDat[cd])

				var styleString = ''
				console.log
					
				for (var st = 0; st < relevantStyles[tagName].length; st++){
					
					styleString += relevantStyles[tagName][st] + ':' + styleDef.getPropertyValue(relevantStyles[tagName][st]) + '; '
				}

				child.setAttribute('style',styleString)
			}
		}

	}
	
	/******************************************
	 * 
	 * Public functions
	 * 
	 * ***************************************/
	
	/**
	* get stackOverflow tags graph
	* 
	* @param {selection} SVGElem to be exported
	* @param {node} export link target
	* 
	*/

	this.export = function (SVGElem, target){


		var oDOM = SVGElem.cloneNode(true)
		
		read_Element(oDOM, SVGElem)
		var data = new XMLSerializer().serializeToString(oDOM)
		
		var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
		
		var url = URL.createObjectURL(svg)
		
		target.href = url
		
		target.click()

	}
}

module.exports = SVGExport

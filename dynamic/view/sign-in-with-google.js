var fs = require('fs')
	, d3 = require('d3-selection')
	, ejs = require('ejs')

function render(opts) {

	var template = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/sign-in-with-google.ejs', 'utf-8'))

	opts.target.html(template({
		hasError: opts.hasError || false
	}))
	
	d3.select('#login').on('click', function() {
		
		d3.event.preventDefault()
		d3.event.stopPropagation()
		
		opts.action()
		
		return false
	})

}

module.exports = {
	render: render
}

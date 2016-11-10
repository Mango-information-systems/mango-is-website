var fs = require('fs')
	, d3 = require('d3')
	, ejs = require('ejs')

function render(opts, callback) {

	var dashboardTemplate = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/ga-realtime/dashboard.ejs', 'utf-8'))

	opts.target.html(dashboardTemplate({
		accounts: opts.data
		, donuts: opts.donuts
	}))
	
	d3.select('#logout').on('click', function() {
		
		d3.event.preventDefault()
		d3.event.stopPropagation()
		
		opts.action()
		
		return false
	})
	
	callback()
	
}

module.exports = {
	render: render
}

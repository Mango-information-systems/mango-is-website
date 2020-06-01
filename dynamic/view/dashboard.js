var d3 = require('d3-selection')
	, ejs = require('ejs')
	, fs = require('fs')

function render(opts, callback) {

	var dashboardTemplate = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/ga-realtime/dashboard.ejs', 'utf-8'))

	opts.target.html(dashboardTemplate({
		accounts: opts.data
	}))
	
	var accountSelector = d3.select('#accountSelector')
	
	accountSelector.on('change', function() {
		
		opts.selectFn(accountSelector.node().value)
		
		return false
	})
	
	d3.select('#logout').on('click', function() {
		
		d3.event.preventDefault()
		d3.event.stopPropagation()
		
		opts.logOutFn()
		
		return false
	})
	
	callback()
	
}

module.exports = {
	render: render
}

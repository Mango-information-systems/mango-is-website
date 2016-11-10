var fs = require('fs')
	, ejs = require('ejs')

function render(opts, callback) {

	var dashboardTemplate = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/ga-realtime/dashboard.ejs', 'utf-8'))

	opts.target.html(dashboardTemplate({
		accounts: opts.data
		, donuts: opts.donuts
	}))
	
	callback()
	
}

function update(opts) {
	
}

module.exports = {
	render: render
	, update: update
}

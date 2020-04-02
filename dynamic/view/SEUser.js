var fs = require('fs')
	, ejs = require('ejs')
	, d3 = require('d3-format')
	
/**
* Display basic StackExchange user info
*
* @params {selection} target
* @params {object} user
* 
*/
function render(target, user) {

	var template = ejs.compile(fs.readFileSync(__dirname + '/../../themes/mango-information-systems/layout/_partial/SE-user-panel.ejs', 'utf-8'))

	user.creationDate = new Date(user.creation_date * 1000)
	
	// format numbers
	if (typeof user.reputation === 'number')
		user.reputation = d3.format(',.2d')(user.reputation)
	
	Object.keys(user.badge_counts).forEach(function(badge) {
		if (typeof user.badge_counts[badge] === 'number')
			user.badge_counts[badge] = d3.format(',.2d')(user.badge_counts[badge])
	})


	target.html(template(user))

}

module.exports = {
	render: render
}

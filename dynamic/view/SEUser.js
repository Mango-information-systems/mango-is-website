var fs = require('fs')
	, ejs = require('ejs')
	
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
	
	user.goldBadge = user.badge_counts.gold? '<span title="' + user.badge_counts.gold + ' gold badges"><i class="fa fa-circle" aria-hidden="true" style="color:#FFCC01;"></i> ' + user.badge_counts.gold + '</span> ': ''
	
	user.silverBadge = user.badge_counts.silver? '<span title="' + user.badge_counts.silver + ' silver badges"><i class="fa fa-circle" aria-hidden="true" style="color:#B4B8BC;"></i> ' + user.badge_counts.silver + '</span> ': ''
		
	user.bronzeBadge = user.badge_counts.bronze? '<span title="' + user.badge_counts.bronze + ' bronze badges"><i class="fa fa-circle" aria-hidden="true" style="color:#D1A684;"></i> ' + user.badge_counts.bronze + '</span> ': ''


	target.html(template(user))

}

module.exports = {
	render: render
}

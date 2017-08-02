/**
* Display basic StackExchange user info
*
* @params {selection} target
* @params {object} user
* 
*/
function render(target, user) {
	
	var creationDate = new Date(user.creation_date * 1000)
		, goldBadge = user.badge_counts.gold? '<span title="' + user.badge_counts.gold + ' gold badges"><i class="fa fa-circle" aria-hidden="true" style="color:#FFCC01;"></i> ' + user.badge_counts.gold + '</span> ': ''
		, silverBadge = user.badge_counts.silver? '<span title="' + user.badge_counts.silver + ' silver badges"><i class="fa fa-circle" aria-hidden="true" style="color:#B4B8BC;"></i> ' + user.badge_counts.silver + '</span> ': ''
		, bronzeBadge = user.badge_counts.bronze? '<span title="' + user.badge_counts.bronze + ' bronze badges"><i class="fa fa-circle" aria-hidden="true" style="color:#D1A684;"></i> ' + user.badge_counts.bronze + '</span> ': ''
	
	target.html('<div class="row">'
		 + '<h5><a href="' + user.link + '">' + user.display_name + '</a></h5>'
		+ '<p>' + user.location + '</p>'
		+ '<p>member since ' + creationDate.toLocaleString('en-us', { month: 'short' }) + ' ' + creationDate.getFullYear() + '</p>'
		+ '</div>'
		+ '<p>'
		+ goldBadge
		+ silverBadge
		+ bronzeBadge
		+ '<p class="lead">' + user.reputation + '</p>'
		
	)
}

module.exports = {
	render: render
}

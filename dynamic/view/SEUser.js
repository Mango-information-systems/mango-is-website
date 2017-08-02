/**
* Display basic StackExchange user info
*
* @params {selection} target
* @params {object} user
* 
*/
function render(target, user) {
	
	target.html(user.display_name)
}

module.exports = {
	render: render
}

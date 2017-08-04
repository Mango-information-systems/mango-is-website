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

	target.html(template(user))

}

module.exports = {
	render: render
}

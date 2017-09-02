/**
* Warning alert message view
*
* @params {object} opts
*   - {selection} target
*   - {string} title
*   - {string} message
*   - {boolean?} append flag whether alert should be appended to the target (instead of replacing its content)
* 
*/
function render(opts) {
	
	if (opts.append)
		opts.target = opts.target.append('div')
		
	if (typeof opts.target.html === 'function') {
		opts.target.html(
			'<div class="alert alert-danger"> \
				<h5><i class="fa fa-exclamation-triangle"></i> ' + opts.title + '</h5> \
				' + opts.message + ' \
			</div>'
		)
	}
	else {
		opts.target.innerHTML = '<div class="alert alert-danger"> \
				<h5><i class="fa fa-exclamation-triangle"></i> ' + opts.title + '</h5> \
				' + opts.message + ' \
			</div>'
	}
}

module.exports = {
	render: render
}

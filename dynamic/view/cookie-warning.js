var fs = require('fs')
	, d3 = require('d3')
	, ejs = require('ejs')

function render(opts) {
		opts.target.html(
	'<div class="alert alert-danger"> \
		<h5><i class="fa fa-exclamation-triangle"></i> Third-party cookies required</h5> \
		<p>Sorry, this site requires third-party cookies to be enabled.</p> \
		<p>Please consider one of the following solutions:</p> \
		<ul> \
		<li>Enable third-party cookies in your browser (<a href="https://www.google.be/search?q=how+to+enable+third+party+cookies">instructions</a>)</li> \
		<li>Use another browser enabling these by default, like firefox.</li> \
		</ul> \
	</div>')
}

module.exports = {
	render: render
}

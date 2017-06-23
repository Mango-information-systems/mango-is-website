function render(opts) {
		opts.target.html(
	'<div class="alert alert-danger"> \
		<h5><i class="fa fa-exclamation-triangle"></i> Third-party cookies required</h5> \
		<p>This tool requires Google to store cookies (data) in this web page.</p> \
		<p>Solutions:</p> \
		<ul> \
		<li>Enable third-party cookies in your browser (<a href="https://www.google.com/search?q=how+to+enable+third+party+cookies">instructions</a>)</li> \
		<li>Or use another browser, like Firefox</li> \
		</ul> \
	</div>')
}

module.exports = {
	render: render
}

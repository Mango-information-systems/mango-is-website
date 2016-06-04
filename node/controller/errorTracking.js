
// error reporting
window.onerror = function(message, file, line) {
	gaCustom.toGa('exception', {
		description: file + ':' + line + '-' + message
	})
}

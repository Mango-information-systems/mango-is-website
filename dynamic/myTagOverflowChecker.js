var Checker = require('./controller/es6Checker')
	, warningMessage = require('./view/warning-message')

var checker = new Checker()

checker.loadIfSupportES6('/js/myTagOverflow.js', function() {
	warningMessage.render({
			target: document.getElementById('app')
			, title: 'Browser not supported'
			, message: '<p>This tool is not compatible with your browser. Please try using Firefox or Chrome instead.</p>Preview:</p><img class="u-img-responsive" alt="myTagOverflow visualization preview" src="/img/myTagOverflow-demo.jpg"/>'
		})
	
})

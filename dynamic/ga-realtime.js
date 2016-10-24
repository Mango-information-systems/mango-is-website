var fs = require('fs')

var d3 = require('d3')
	, ejs = require('ejs')
	, views = {}
	, appContainer = d3.select('#app')

views.connectWithGoogle = ejs.compile(fs.readFileSync(__dirname + '/../themes/mango-information-systems/layout/_partial/connect-with-google.ejs', 'utf-8'))



appContainer.html(views.connectWithGoogle({
	redirectUri: 'http://localhost:4000/tools/ga-realtime/'
	, scope: 'https://www.googleapis.com/auth/analytics.readonly'
	, clientId: '920031075835-45tvjaphsuuqg4psqfbseuh04md7tes1.apps.googleusercontent.com'
}))


console.log('loaded', window.location.hash)

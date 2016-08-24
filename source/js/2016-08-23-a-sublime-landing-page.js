// Reveal.js print style
if( window.location.search.match( /print-pdf/gi ) ) {
	var link = document.createElement( 'link' );
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'css/legacy/print/reveal.pdf.css';
	document.getElementsByTagName( 'head' )[0].appendChild( link );
}

Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	mouseWheel: true,

	theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
	transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

	// Parallax scrolling
	// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
	// parallaxBackgroundSize: '2100px 900px',

	// Optional libraries used to extend on reveal.js
	dependencies: [
		{ src: '/js/legacy/utils/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
		{ src: '/js/legacy/utils/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
	]
})

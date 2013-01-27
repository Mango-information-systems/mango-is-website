<cfprocessingdirective pageencoding="utf-8" />
<cfheader statuscode="404" statustext="Not found" />
<cfsavecontent variable="description">Page not found - error 404</cfsavecontent>
<cfsavecontent variable="title">Page not found</cfsavecontent>
<cfsavecontent variable="content">
	<h2>Sorry, the page you are looking for was not found</h2>
	<br/>
	<p>
		You can try to <strong>go back to our home page <a href="/" title="Home page" rel="me">http://mango-is.com</a></strong>...
	</p>
	<br/><br/>
	<p>... or if you are looking for some distraction...</p>
	<iframe src="http://embed.ted.com/talks/renny_gleeson_404_the_story_of_a_page_not_found.html" width="560" height="315" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</cfsavecontent>
<cfinclude template="/default.cfm" />


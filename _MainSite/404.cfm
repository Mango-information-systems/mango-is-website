<cfprocessingdirective pageencoding="utf-8" />
<cfsavecontent variable="description">Page not found - error 404</cfsavecontent>
<cfsavecontent variable="title">Page not found</cfsavecontent>
<cfsavecontent variable="content">
	<h2>Sorry, the page you are looking for was not found</h2>
	<p>
		You can try to back to our <a href="/" title="Home page">home page</a>...
	</p>
</cfsavecontent>
<cfinclude template="/default.cfm" />


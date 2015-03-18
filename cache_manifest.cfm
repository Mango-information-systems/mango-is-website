---
---
<!---
  Coldfusion trick to serve the cach manifest.
  Solution found here: http://www.bennadel.com/blog/1944-experimenting-with-html5-s-cache-manifest-for-offline-web-applications.htm
--->
<cfsavecontent variable="cacheManifest">
CACHE MANIFEST
#{{ site.version }}

CACHE:
/css/bootstrap.min.css
/css/bootstrap-responsive.min.css
/css/syntax.css
/tool/css/2015-01-08-csv-to-json.css
/img/mango-information-systems-logo-medium.png
/img/glyphicons-halflings-white.png
/img/glyphicons-halflings.png
/js/jquery.js
/js/bootstrap.min.js
/js/underscore-min.js
/js/localforage.nopromises.min.js
/js/papaparse.min.js
/tool/js/2015-01-08-csv-to-json.js

FALLBACK:
/ /offline.html

NETWORK:
*
 
</cfsavecontent>
 
 
<!--- ----------------------------------------------------- --->
<!--- ----------------------------------------------------- --->
 
 
<!---
Let's reset the output and set the appropriate content type.
It is critical that the manifest file be served up as a type
"text/cache-manifest" mime-type.
NOTE: We need to be careful about the whitespace here since
the very first line of the file must contain the phrase,
"CACHE MANIFEST". As such, we must TRIM() the content.
--->
<cfcontent
type="text/cache-manifest"
variable="#toBinary( toBase64( trim( cacheManifest ) ) )#"
/> 

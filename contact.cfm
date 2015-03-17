<cfif not isdefined("form.contactType") or not len(form.contactType)>
	<cfheader statuscode="403" statustext="Not authorized" />
<cfelse>
	<cfif isdefined("form.email") and isvalid("email",form.email)>
		<cftry>
			<!--- Mail the message --->
			<cfmail
				from="<#HTMLEditFormat(form.email)#>"
				server="alt1.aspmx.l.google.com" 
				to="contact@mango-is.com" 
				subject="#form.firstName# #form.lastName# - #form.contactType# on mango-is.com" 
				type="html">
					<cfif len(form.firstName) or len(form.lastName)>#form.firstName# #form.lastName#<cfelse>#form.email#</cfif> <cfif len(form.company)> from #form.company# </cfif> has just sent the following message:<br>
					#HTMLEditFormat(form.message)#												
					<br><hr>
					Sender's IP address: <cfdump var="#cgi.remote_addr#" />
			</cfmail>
			<!--- confirm sent message ok --->	
			<cfheader statuscode="200" statustext="Success" />			
		<cfcatch type="any">
			<cfheader statuscode="500" statustext="Server error" />
		</cfcatch>
		</cftry>
	<cfelse>
		<cfheader statuscode="400" statustext="Bad Request" />
	</cfif>
</cfif>

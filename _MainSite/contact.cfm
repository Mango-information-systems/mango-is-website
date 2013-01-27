<cfif len(form.hPot)>
	<cfheader statuscode="403" statustext="Not authorized" />
	{"status": "error", "message": "Invalid form entry. Unlabeled text input should remain empty."}
<cfelse>
	<cfif isdefined("form.email") and isvalid("email",form.email)>
		<cftry>
			<!--- Mail the message --->
			<cfmail
				from="<#HTMLEditFormat(form.email)#>"
				server="alt1.aspmx.l.google.com" 
				to="contact@mango-is.com" 
				subject="#form.firstName# #form.lastName# - #form.company# contact via Mango-is.com" 
				type="html">
					#HTMLEditFormat(form.message)#												
					<hr />												
					<cfdump var="#form#" label="form" />
					<cfdump var="#cgi#" label="cgi" />
			</cfmail>
			<!--- confirm sent message ok --->				
			{"status": "success", "message": "Message has been sent, thank you."}
		<cfcatch type="any">
			{"status": "error", "message": "Error occured while sending message - please try again later or email contact@mango-is.com"}
		</cfcatch>
		</cftry>
	<cfelse>
			{"status": "invalid-email", "message": "Invalid email address."}
	</cfif>
</cfif>

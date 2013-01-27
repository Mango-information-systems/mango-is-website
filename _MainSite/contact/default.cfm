<cfprocessingdirective pageencoding="utf-8" />
<cfsavecontent variable="description">Contact form</cfsavecontent>
<cfsavecontent variable="title">Contact us</cfsavecontent>
<cfsavecontent variable="content">
	<div class="row" id="contact">
		<h1>Contact</h1>
		<div class="span5 modal-body">
		<cfif isdefined("form.contactSubmit") and form.contactSubmit eq "Send"> 
			<cfif len(form.hPot)>
				<cfheader statuscode="403" statustext="Not authorized" />
				<div class="alert alert-error">Invalid form entry. Unlabeled text input should remain empty.</div>
				<form method="POST" action="" id="contact-form" name="contact-form" class="form-horizontal">
					<fieldset>
						<legend>Leave us a message</legend>
						<div class="control-group">
							<label for="firstName" class="control-label">First name</label>
							<div class="controls">
								<input type="text" id="firstName" name="firstName">
							</div>
						</div>
						<div class="control-group">
							<label for="lastName" class="control-label">Last name</label>
							<div class="controls">
								<input type="text" id="lastName" name="lastName">
							</div>
						</div>
						<div class="control-group">
							<label for="company" class="control-label">Company</label>
							<div class="controls">
								<input type="text" id="company" name="company">
							</div>
						</div>
						<div class="control-group">
							<label for="email" class="control-label">Email*</label>
							<div class="controls">
								<input type="text" id="email" name="email">
							</div>
						</div>
						<div class="control-group">
							<label for="message" class="control-label">Message</label>
							<div class="controls">
								<textarea rows = "3" id="message" name="message"></textarea>
							</div>
						</div>
						<input type="text" id="hPot" name="hPot"/>
						<input class="btn btn-primary pull-right" id="contactSubmit" name="contactSubmit" type="submit" value="Send"/>
					</fieldset>
				</form>
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
						<div class="alert alert-success">Message has been sent, thank you.</div>
					<cfcatch type="any">
						<!--- Warn about error at server side --->
						<div class="alert alert-error">Error occured while sending message - please try again later or email contact@mango-is.com</div>
					</cfcatch>
					</cftry>
				<cfelse>
					<div class="alert alert-error">Invalid email address. Please double-check your input and try again.</div>
					<form method="POST" action="" id="contact-form" name="contact-form" class="form-horizontal">
						<fieldset>
							<legend>Leave us a message</legend>
							<div class="control-group">
								<label for="firstName" class="control-label">First name</label>
								<div class="controls">
									<input type="text" id="firstName" name="firstName">
								</div>
							</div>
							<div class="control-group">
								<label for="lastName" class="control-label">Last name</label>
								<div class="controls">
									<input type="text" id="lastName" name="lastName">
								</div>
							</div>
							<div class="control-group">
								<label for="company" class="control-label">Company</label>
								<div class="controls">
									<input type="text" id="company" name="company">
								</div>
							</div>
							<div class="control-group">
								<label for="email" class="control-label">Email*</label>
								<div class="controls">
									<input type="text" id="email" name="email">
								</div>
							</div>
							<div class="control-group">
								<label for="message" class="control-label">Message</label>
								<div class="controls">
									<textarea rows = "3" id="message" name="message"></textarea>
								</div>
							</div>
							<input type="text" id="hPot" name="hPot"/>
							<input class="btn btn-primary pull-right" id="contactSubmit" name="contactSubmit" type="submit" value="Send"/>
						</fieldset>
					</form>
				</cfif>
			</cfif>
		<cfelse>
			<form method="POST" action="" id="contact-form" name="contact-form" class="form-horizontal">
				<fieldset>
					<legend>Leave us a message</legend>
					<div class="control-group">
						<label for="firstName" class="control-label">First name</label>
						<div class="controls">
							<input type="text" id="firstName" name="firstName">
						</div>
					</div>
					<div class="control-group">
						<label for="lastName" class="control-label">Last name</label>
						<div class="controls">
							<input type="text" id="lastName" name="lastName">
						</div>
					</div>
					<div class="control-group">
						<label for="company" class="control-label">Company</label>
						<div class="controls">
							<input type="text" id="company" name="company">
						</div>
					</div>
					<div class="control-group">
						<label for="email" class="control-label">Email*</label>
						<div class="controls">
							<input type="text" id="email" name="email">
						</div>
					</div>
					<div class="control-group">
						<label for="message" class="control-label">Message</label>
						<div class="controls">
							<textarea rows = "3" id="message" name="message"></textarea>
						</div>
					</div>
					<input type="text" id="hPot" name="hPot"/>
					<input class="btn btn-primary pull-right" id="contactSubmit" name="contactSubmit" type="submit" value="Send"/>
				</fieldset>
			</form>
		</cfif>

		</div>
		<div class="span5 offset1">
			<div id="hcard-Mango-Information-Systems" class="vcard well">
				<img src="/img/mango-information-systems-logo-medium.png" alt="logo of Mango Information Systems" class="logo"/>
				<br/>
				<p>
					<a class="url fn org" href="http://mango-is.com/">Mango Information Systems</a> 
					<span class="organization-type fn">SPRL</span>
				</p>
				<p class="adr">
					<span class="street-address">Avenue Ernestine 11 - bte 12</span>
					<br/>
					<span class="postal-code">1050 </span>
					<span class="region">Brussels</span>
					<br/>
					<span class="country-name">Belgium</span>
				</p>
				<p>
				Belgian VAT number: 
				<span class="x-vat-number">BE.0829.240.825</span>
				</p>
				<p>
				Belgian Company number: 
				<span class="x-company-number">0829.240.825</span>
				</p>
				<p>
				twitter: 
				<a class="url" href="http://twitter.com/mango_info" rel="me" target = "_blank">@mango_info</a>
				</p>
				<p>
				linkedIn 
				<a class="url" href="http://www.linkedin.com/company/mango-information-systems-sprl" rel="me" target = "_blank">company page</a>
				</p>
				<ul class="tags hide">
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/analytics">analytics</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/business_intelligence">business intelligence</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/startup">startup</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/innovation">innovation</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/web">web</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/social_media">social media</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/consulting">consulting</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/brussels">Brussels</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/belgium">Belgium</li>
					<li rel="tag" target="_blank" href="http://en.wikipedia.org/wiki/europe">Europe</li>
				</ul>
			</div>
			<a href="http://coworking.betagroup.be/" target = "_blank">
				<img alt="betagroup-coworking-logo" src="/img/coworking-brussels-betagroup-logo.png">
			</a>
			<p>
				<strong>Meet us</strong> at the <a href="http://coworking.betagroup.be/" target = "_blank">Betagroup coworking space</a>, a great place for tech startups in Belgium.
			</p>
		</div>
	</div>
</cfsavecontent>
<cfinclude template="../default.cfm" />

---
layout: page
language: en
title: Contact Mango Information Systems SPRL
author: Mango Information Systems
description: Contact Mango Information Systems. Get in touch if you need help for facts-based decision making in your company.
keywords: 
thumbnail: mango.png
css: css/landing.css
scripts: js/contactsPage.js
---
<cfprocessingdirective pageencoding="utf-8" />
<section class="row" id="contact">
	<h1>{{ page.title }}</h1>
	<div class="span6">
		<form method="POST" action="/contact.cfm" id="contact-form" name="contact-form" class="form-horizontal">
			<p>We'll follow-up shortly</p>
			{% include contact-form-body.html %}
			<div id="contactFeedback"></div>
			<div class="span4">
				<button class="btn btn-primary" id="contact-form-submit"><i class="icon-envelope icon-white"></i> Send</button>
			</div>
		</form>
	</div>
	<div class="span5">
		<div class="well">
			{% include company-microdata.html %}
		</div>
	</div>
</section>

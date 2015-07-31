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
	<div class="medium-6 columns">
		<form method="POST" action="/contact.cfm" id="contact-form" name="contact-form">
			<p>We'll follow-up shortly</p>
			{% include contact-form-body.html %}
			<div id="contactFeedback"></div>
			<div class="medium-4 columns">
			<button class="button small success"><i class="fi-mail"></i> Send</button>
			</div>
		</form>
	</div>
	<div class="medium-5 columns">
		<div>
			{% include company-microdata.html %}
		</div>
	</div>
</section>

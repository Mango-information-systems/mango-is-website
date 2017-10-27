---
layout: landing
title: "pullReceipt: simple invoice extractor"
author: Mango Information Systems
date: 2016-10-24 16:29:26
description: Need help to forward all the incoming invoices to your accountant? pullReceipt automates the boring parts of your business administration.
thumbnail: /img/thumbnails/pullReceipt.png
css: [pullReceipt.css]
scripts: [js/pullReceipt.js]
__index: true
sections:
 -
  # top section: title
  content:
   - type: div
     value: "<img id='pullReceipt-logo' src='/img/pullReceipt-logo.png' alt='pullReceipt logo, a friendly robot' class='u-pull-right'>"
   - type: h1
     class: small
     value: pullReceipt - simple invoice extractor <span class='u-pull-right'><small><sup style="color:#aaa;">coming soon</sup></small></span>
   - type: h2
     class: small
     value: Save time. Focus on your business.
   - type: div
     value: <br><br>
   - type: cta
     href: "#pricing"
     primary: true
     trg: /pullreceipt-pricing
     value: View plans
 -
  # Visual
  content:
   - type: p
     value: Do you feel like you waste too much time working on administrative tasks?
   - type: h3
     value: pullReceipt automates the processing your incoming invoices.
   - type: div
     class: row sequence-container
     value: "
		 <div class='four columns'>
			 <br>
			 <img class='u-img-responsive' src='/img/pullReceipt-connect.png' alt='illustration of pullReceipt connections manager' width='350px'/>
			 <br>
			 <p>1. Connect your email accounts</p>
			 <span class='next-right'><i class='fa fa-angle-right fa-lg' aria-hidden='true'></i></span>
			 <span class='next-bottom'><i class='fa fa-angle-down fa-lg' aria-hidden='true'></i></span>
		 </div>
		 <div class='four columns'>
			 <br>
			 <img class='u-img-responsive' src='/img/pullReceipt-detect.png' alt='illustration of pullReceipt connections manager' width='350px'/>
			 <br>
			 <p>2. pullReceipt identifies all the invoices</p>
			 <span class='next-right'><i class='fa fa-angle-right fa-lg' aria-hidden='true'></i></span>
			 <span class='next-bottom'><i class='fa fa-angle-down fa-lg' aria-hidden='true'></i></span>
		 </div>
		 <div class='four columns'>
			 <br>
			 <img class='u-img-responsive' src='/img/pullReceipt-process.png' alt='illustration of pullReceipt connections manager' width='350px'/>
			 <br>
			 <p>3. Decide how to process each document</p>
		 </div>
		"
 -
  # Benefits
  content:
   - type: h3
     value: Benefits
   - type: h4
     value: <i class="fa fa-calendar-o fa-fw fa-lg" aria-hidden="true"></i> Get more time to focus on what matters
   - type: h4
     value: <i class="fa fa-check-circle fa-fw fa-lg" aria-hidden="true"></i> Reduce errors caused by manual processing of data
   - type: h4
     value: <i class="fa fa-bar-chart fa-fw fa-lg" aria-hidden="true"></i> Track your expenses and reduce your costs
 -
  # How it works
  content:
   - type: h3
     value: How it simplifies your business administration
   - type: p
     value: pullReceipt detects all incoming invoices and receipts in your mailbox and forwards them to your management software or your accountant automatically.
   - type: div
     value: <br>
   - type: columns
     columns:
      - content:
        - type: p
          value: "<i class='fa fa-random fa-2x fa-fw u-pull-left' aria-hidden='true'></i> <strong>Flexible</strong>: you choose what should be done with the incoming invoices: forward to your accountant by email, copy them to dropBox or your google drive, etc..."
      - content:
        - type: p
          value: "<i class='fa fa-bolt fa-2x fa-fw u-pull-left' aria-hidden='true'></i> <strong>Powerful</strong>: pullReceipt retrieves attached invoices, as well as those to be downloaded by clicking a link."
   - type: div
     value: <br>
   - type: columns
     columns:
      - content:
        - type: p
          value: "<i class='fa fa-flag fa-2x fa-fw u-pull-left' aria-hidden='true'></i> <strong>Multilingual</strong>: pullReceipt recognizes the invoices in foreign languages. English, Spanish, German, French, Italian currently supported."
      - content:
        - type: p
          value: "<i class='fa fa-key fa-2x fa-fw u-pull-left' aria-hidden='true'></i> <strong>Safe</strong>: You stay in control: for each provider, you can choose either to have the documents processed automatically, or after your approval."
   - type: div
     value: <br>
   - type: p
     value: "<i class='fa fa-calendar-check-o fa-2x fa-fw u-pull-left' aria-hidden='true'></i> <strong>Adaptable</strong>: You work at your own pace. Connect every day, every Month, or only once per quarter, as you prefer. pullReceipt fits in your process."
 -
  # Pricing
  content:
   - type: h3
     id: pricing
     value: Pricing
   - type: pricing
     offers:
      -
       title: Large<br>200<small>€ / Month</small>
       type: large
       content:
        - Up to 20 email accounts
        - 1500 invoices per quarter
        - unlimited actions
        - analysis of expenses
       CTA:
        label: Sign up
        trg: /pullReceipt-large
      -
       title: Medium<br>35<small>€ / Month</small>
       type: medium
       content:
        - Up to 5 email accounts
        - 750 invoices per quarter
        - unlimited actions
        - 
       CTA:
        label: Sign up
        trg: /pullReceipt-medium
      -
       title: Small<br>10<small>€ / Month</small>
       type: small
       primary: true
       content:
        - 1 email account
        - 150 invoices per quarter
        - unlimited actions
        - 
       CTA:
        label: Sign up
        trg: /pullReceipt-small
   - type: p
     class: u-text-center small
     value: 14 days free trial for all plans
   - type: custom
     value: <br>
   - type: div
     class: u-text-center alert
     value: Custom and enterprise plans - <a href="/contact/">contact us</a>
 -
  # About
  content:
   - type: h3
     value: About
   -
    type: div
    class: row
    value: "<div class='four columns'>
			<img src='/img/mehdi-el-fadil-1.jpg' class='u-img-responsive'/>
		</div>
		<div class='eight columns'>
			<p>The idea for pullReceipt came to Mehdi El Fadil, as he was spending his quarterly 8 hours to retrieve all incoming invoices in his mailbox and send them to his accountant.</p>
			
			<p>The concept is to have a very simple and user-friendly tool doing the job, and have more free time to do value-added work - or simply to relax ;)</p>
			
			<p>Feedback and feature requests are welcome, <a href='/contact/'>send us a message</a>.</p>
		</div>"
   - type: custom
     value: "
		<div class='modal'>
		   <div class='modal__dialog'>
			  <div class='modal-inner container'>
				  <form action='//mango-is.us16.list-manage.com/subscribe/post?u=a27b17b4350acdfeb2df9c9c6&amp;id=c59f539df6' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' target='_blank'>
				  <div class='modal-close-icon'>
					 <a href='javascript:void(0)' class='js-modal-hide'><i class='fa fa-times' aria-hidden='true'></i></a>
				  </div>
				  
				 <h4>Launching in Q1 2018</h4>
				 <p>Get an update when it's ready.<span class='u-pull-right'><small><sup>*</sup> indicates required</small></span></p>
				 
				 
				 <div class='mc-field-group'>
					<label for='mce-EMAIL'>Email address  <sup>*</sup>
					</label>
					<input type='email' value='' name='EMAIL' class='u-full-width' required id='mce-EMAIL'>
					<div class='response text-danger' id='mce-error-response'></div>
				 </div>
				 <div class='row'>
					 <div class='six columns'>
						 <div class='mc-field-group'>
							<label for='mce-FNAME'>First name </label>
							<input type='text' value='' name='FNAME' class='u-full-width' id='mce-FNAME'>
						 </div>
					 </div>
					 <div class='six columns'>
						 <div class='mc-field-group'>
							<label for='mce-LNAME'>Last name </label>
							<input type='text' value='' name='LNAME' class='u-full-width' id='mce-LNAME'>
						 </div>
					 </div>
				 </div>
				 <div class='mc-field-group'>
					<label for='mce-COMPANY'>Company </label>
					<input type='text' value='' name='COMPANY' class='u-full-width' id='mce-COMPANY'>
				 </div>
				 <div class='mc-field-group'>
					<label>Mail provider </label>
					 <div class='row'>
						 <div class='four columns'>
							 <div class='mc-field-group'>
								<label for='mce-MAILER-0'><input type='radio' id='mce-MAILER-0'
								 name='MAILER' value='Gmail'> <span class='label-body'><i class='fa fa-google fa-fw' aria-hidden='true'></i> Gmail</span></label>
							 </div>
						 </div>
						 <div class='four columns'>
							 <div class='mc-field-group'>
								<label for='mce-MAILER-1'><input type='radio' id='mce-MAILER-1'
								 name='MAILER' value='Outlook'> <span class='label-body'><i class='fa fa-windows fa-fw' aria-hidden='true'></i> Outlook</span></label>
							 </div>
						 </div>
						 <div class='four columns'>
							 <div class='mc-field-group'>
								<label for='mce-MAILER-2'><input type='radio' id='mce-MAILER-2'
								 name='MAILER' value='Other'> <span class='label-body'><i class='fa fa-envelope fa-fw' aria-hidden='true'></i> Other</span></label>
							 </div>
						 </div>
					 </div>
					
				 </div>
				 <br>
				 <p><small>Early adopters will be rewarded with a discount 👌</small></p>
				 <div class='u-pull-right'>
					 <input type='hidden' value='' name='PLAN' class='u-full-width' id='mce-PLAN'>
					 <!-- real people should not fill this in and expect good things - mailChimp HP-->
					<div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='b_a27b17b4350acdfeb2df9c9c6_c59f539df6' tabindex='-1' value=''></div>
					<button class='js-modal-hide button-sm'>Cancel</button> 
					<button id='form-submit' class='button-primary button-sm'>Subscribe</button>
				 </div>
			  </div>
		   </div>
		</div>
     "
---

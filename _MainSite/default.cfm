<cfprocessingdirective pageencoding="utf-8" />
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel= "schema.DC" href="http://purl.org/DC/elements/1.0/">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>
    <cfif isdefined("title")>
		<cfoutput>#title#</cfoutput>
	<cfelse>Web analytics - Business Intelligence
	</cfif> - Mango Information Systems
	</title>
    <meta name="DC.title" content="
	<cfif isdefined("title")>
		<cfoutput>#title#</cfoutput>
	<cfelse>Web analytics - Business Intelligence
	</cfif> - Mango Information Systems">
    <meta name="DC.Subject" content="
	<cfif isdefined("title")>
		<cfoutput>#title#</cfoutput>
	<cfelse>Homepage
	</cfif> - Mango Information Systems, web analytics, social media and business intelligence">
    <meta name="subject" content="
	<cfif isdefined("title")>
		<cfoutput>#title#</cfoutput>
	<cfelse>Homepage
	</cfif> - Mango Information Systems, web analytics, social media and business intelligence">
    <meta name="DC.Description" content="
	<cfif isdefined("description")>
		<cfoutput>#description#</cfoutput>
	<cfelse>We turn web data into knowledge for your company
	</cfif> - Mango Information Systems, a startup operating from Brussels, Belgium.">
    <meta name="description" content="
	<cfif isdefined("description")>
		<cfoutput>#description#</cfoutput>
	<cfelse>We turn web data into knowledge for your company
	</cfif> - Mango Information Systems, a startup operating from Brussels, Belgium.">
    <meta name="DC.Creator" content="Mehdi El Fadil">
    <meta name="author" content="Mehdi El Fadil">
    <meta name="DC.Format" content="html">
    <meta name="format" content="html">
    <meta name="DC.Language" content="en">
    <meta name="language" content="en">
    <meta name="DC.Rights" content="CC BY SA">
    <meta name="rights" content="CC BY SA">
	<meta name="DC.Date" content="2012-04-01">
	<meta name="revised" content="2012-04-01">
    <meta name="DC.type" content="Interactive Resource">
    <meta name="DC.keywords" content="analytics, business intelligence, data services, social media, twitter, real time, data-warehouse, data integration, web, ETL, SAP, BO, SAP BOXI, Business Objects, Oracle, database, reporting, dimensional modelling, business analysis, star schema, BOXI, startup, innovation, projects, information systems, organization, change management, consultancy, consulting" /> 
    <meta name="keywords" content="analytics, business intelligence, data services, social media, twitter, real time, data-warehouse, data integration, web, ETL, SAP, BO, SAP BOXI, Business Objects, Oracle, database, reporting, dimensional modelling, business analysis, star schema, BOXI, startup, innovation, projects, information systems, organization, change management, consultancy, consulting" /> 

    <!-- Le styles -->
    <link href="/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="/img/favicon.ico"/>
    <link rel="apple-touch-icon" href="/img/apple-touch-icon.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="/img/apple-touch-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="/img/apple-touch-icon-114x114.png"/>
    <link rel="image_src" href="/img/apple-touch-icon-114x114.png" />
	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-25766439-1']);
		_gaq.push(['_trackPageview']);

		(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
  </head>

  <body>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="/" rel="home">
			<img src="/img/mango-information-systems-logo-medium.png" alt="Mango Information Systems">
          </a>
          <div class="nav-collapse">
            <ul class="nav">
              <li><a href="/">Home</a></li>
              <li><a href="/web-analytics/">Web analytics</a></li>
              <li><a href="/business-intelligence/">Business Intelligence</a></li>
              <li><a href="/company/">Company</a></li>
              <li><a href="#contact" data-toggle="modal">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
    <cfif isdefined("content")>
		<cfoutput>#content#</cfoutput>
	<cfelse>
		<!-- Main hero unit for a primary marketing message or call to action -->
		<div class="hero-unit">
			<div class="row">
				<span class="span3">
					<img src="/img/social-media-analytics-logo.png" alt="social media analytics">
				</span>
				<span class="span7">
					<h1>Web analytics</h1>
					<p>We provide services in <strong>web data integration</strong> and innovative analytics applications. Learn how <strong>social media</strong> data can provide value to your activity.</p>
					<p><a class="btn btn-primary btn-large" href="/web-analytics">View details »</a></p>
				</span>
			</div>
		</div>
	
		<!-- Example row of columns -->
		<div class="row">
			<div class="span4">
			  <h1 id="business-intelligence">Business Intelligence</h1>
			   <p>We have expertise in corporate business intelligence projects, with strong focus on <strong>data-warehouse architecture</strong>, complex <strong>data integration</strong> (ETL) and performance tuning.
				</p>
			  <p><a class="btn" href="/business-intelligence">Read more »</a></p>
			</div>
			<div class="span4">
			  <h1 id="company">About us</h1>
			   <p>Our startup operates from Brussels, Belgium since 2010. We provide organizations with knowledge, using data they own or that is publicly available.</p>
			  <p><a class="btn" href="/company">Read more »</a></p>
			</div>
			<div id="social" class="span4">
			  <h1>Get in touch</h1>
			  <p>We are online</p>
			  <p><a class="btn btn-info" href="http://twitter.com/mango_info" rel="me" target = "_blank"><i class="icon-twitter"></i> Follow us on twitter »</a></p>
			  <p><a class="btn" href="https://github.com/mango-information-systems" rel="me" target = "_blank"><i class="icon-github"></i> Our github repo »</a></p>
			  <p><a class="btn" href="#contact" data-toggle="modal"><i class="icon-pencil"></i> Contact »</a></p>
			</div>
		</div>
	</cfif>
	<footer>
		<p>
			<span>Mango Information systems 2012. </span>
			<span><a href="/terms">Copyright - terms of use</a></span>
		</p>
	</footer>
		<div class="modal hide fade" id="contact">
			<div class="modal-header">
				<a data-dismiss="modal" class="close">×</a>
				<h2>Contact</h2>
			</div>
			<div class="modal-body">
				<form method="post" action="contact.cfm" id="contact-form" name="contact-form" class="form-horizontal">
				<fieldset>
					<legend>Thanks for leaving us a message</legend>
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
						<label for="email" class="control-label">Email</label>
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
				</fieldset>
				</form>
			</div>
			<div class="modal-footer">
				<div class="span4">
					<a class="btn btn-primary" id="contact-form-submit"><i class="icon-envelope icon-white"></i> Send</a>
					<a data-dismiss="modal" class="btn" href="#">Close</a>
				</div>
			</div>
		</div>
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/js/jquery.js"></script>
    <script src="/js/bootstrap-button.js"></script>
    <script src="/js/bootstrap-modal.js"></script>
    <script>
		$(document).ready(function () {

			// toggle active class for navbar link 
			// based on code found here: https://gist.github.com/1600924
			var $navbarElements = $(".navbar .nav a");
			$navbarElements.each(function() {
				if ($(this).attr('href')== window.location.pathname) {
					$(this).parent().toggleClass("active")
				}
			});
			
			// set contact modal visibility according to current location
			if (window.location.pathname == '/contact/')
				show_modal = true;
			else
				show_modal = false;
				
			// setup contact modal
			$('#contact').modal({show:show_modal});
			
			//handle contact form submission
			$('#contact-form-submit').click(function() {
				$('#contact-form-submit').addClass('disabled');
				$.ajax({
					type: 'POST',
					url: '/contact.cfm',
					data: $('#contact-form').serialize(),
					success: function(data) {
						response = JSON.parse(data)
						switch(response.status) {
							case 'success':
								$target = $('.modal-body', '#contact');
								$target.fadeOut(function() {
									$target.html('<div class="alert alert-success">'+ response.message +'</div>')
									$target.fadeIn();
									setTimeout(function() {
										$('#contact').modal('hide');
									}
									, 4000);
								});
								
							break;
							case 'error':
								$('#contact-form-submit').removeClass('disabled');
								$('<div class="alert alert-error">'+ response.message +'</div>').appendTo($('.modal-body'))
							break;
							case 'invalid-email':
								$('#contact-form-submit').removeClass('disabled');
								$('#email').parents('.control-group').addClass('error');
								$('<span class="help-inline">'+ response.message + '</span>').insertAfter($('#email'))
							break;
						}
					}
				});
			});
			
		});
    </script>
    <script src="/js/bootstrap-transition.js"></script>
    <script src="/js/bootstrap-collapse.js"></script>
    <script src="/js/bootstrap-tab.js"></script>
<!--
    <script src="/js/bootstrap-dropdown.js"></script>
    <script src="/js/bootstrap-scrollspy.js"></script>
    <script src="/js/bootstrap-alert.js"></script>
    <script src="/js/bootstrap-tooltip.js"></script>
    <script src="/js/bootstrap-popover.js"></script>
    <script src="/js/bootstrap-carousel.js"></script>
    <script src="/js/bootstrap-typeahead.js"></script>
-->

</body></html>
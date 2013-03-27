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
			<cfelse>Analytics and Business Intelligence
		</cfif> - Mango Information Systems
		</title>
		<meta name="DC.title" content="
			<cfif isdefined("title")>
			<cfoutput>#title#</cfoutput>
			<cfelse>Analytics and Business Intelligence
			</cfif> - Mango Information Systems">
		<meta name="DC.Subject" content="
			<cfif isdefined("title")>
			<cfoutput>#title#</cfoutput>
			<cfelse>Homepage
			</cfif> - Mango Information Systems, social media analytics and business intelligence">
		<meta name="subject" content="
			<cfif isdefined("title")>
			<cfoutput>#title#</cfoutput>
			<cfelse>Homepage
			</cfif> - Mango Information Systems, social media analytics and business intelligence">
		<meta name="DC.Description" content="
			<cfif isdefined("description")>
			<cfoutput>#description#</cfoutput>
			<cfelse>We turns social media data into actionable knowledge. Checkout our apps tribalytics and news Pipe or get custom data extraction or real time monitoring service
			</cfif>">
		<meta name="description" content="
			<cfif isdefined("description")>
			<cfoutput>#description#</cfoutput>
			<cfelse>We turns social media data into actionable knowledge. Checkout our apps tribalytics and news Pipe or get custom data extraction or real time monitoring service
			</cfif>">
		<meta name="DC.Creator" content="Mehdi El Fadil">
		<meta name="author" content="Mehdi El Fadil">
		<meta name="DC.Format" content="html">
		<meta name="format" content="html">
		<meta name="DC.Language" content="en">
		<meta name="language" content="en">
		<meta name="DC.Rights" content="CC BY SA">
		<meta name="rights" content="CC BY SA">
		<meta name="DC.Date" content="2013-01-26">
		<meta name="revised" content="2013-01-26">
		<meta name="DC.type" content="Interactive Resource">
		<meta name="DC.keywords" content="analytics, business intelligence, data services, social media, twitter, real time, data-warehouse, data integration, web, ETL, SAP, BO, SAP BOXI, Business Objects, Oracle, database, reporting, dimensional modelling, business analysis, star schema, BOXI, startup, innovation, projects, information systems, organization, change management, consultancy, consulting" /> 
		<meta name="keywords" content="analytics, business intelligence, data services, social media, twitter, real time, data-warehouse, data integration, web, ETL, SAP, BO, SAP BOXI, Business Objects, Oracle, database, reporting, dimensional modelling, business analysis, star schema, BOXI, startup, innovation, projects, information systems, organization, change management, consultancy, consulting" /> 

		<!-- Le styles -->
		<link href="/css/bootstrap.min.css" rel="stylesheet">
		<link href="/css/bootstrap-responsive.min.css" rel="stylesheet">

		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		  <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<!-- Le fav and touch icons -->
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png">
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png">
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/apple-touch-icon-72x72-precomposed.png">
		<link rel="apple-touch-icon-precomposed" href="/touch-icon-iphone-precomposed.png">
		<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48 64x64" type="image/vnd.microsoft.icon">
		<cfif cgi.HTTP_HOST is "mango-is.com">
			<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-25766439-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
			window.onerror = function(message, file, line) {
				var sFormattedMessage = '[' + file + ' (' + line + ')] ' + message;
				_gaq.push(['_trackEvent', 'Exceptions', 'Application', sFormattedMessage, null, true]);
			}
			</script>
		</cfif>
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
			  <img src="/img/mango-information-systems-logo-medium.png" alt="Mango Information Systems" width = "145px" height = "35px">
			  </a>
			  <div class="nav-collapse">
				<ul class="nav">
				  <li><a href="/">Home</a></li>
				  <li><a href="/products/">Products</a></li>
				  <li><a href="/services/">Services</a></li>
				  <li><a href="/company/">Company</a></li>
				  <li><a href="/contact/" class="contact-link">Contact</a></li>
				</ul>
			  </div><!--/.nav-collapse -->
			</div>
		  </div>
		</div>

		<div class="container">
		<cfif isdefined("content")>
			<cfoutput>#content#</cfoutput>
		<cfelse>
			<!-- Main hero unit -->
			<div class="hero-unit">
				<div class="row">
					<span class="span3">
						<a href="http://tribalytics.com" target="_blank">
							<img id="tribalytics" src="img/tribalytics.jpg" alt="tribalytics">
						</a>
					</span>
					<span class="span7">
						<h1>Tribalytics - segment your Twitter followers</h1>
						<p>Tribalytics analyzes social graphs to identify the <strong>breakdown of different communities in your followers</strong>, providing a detailed profile for each.</p>
						<p><a class="btn btn-primary btn-large" href="http://tribalytics.com" target="_blank">Checkout tribalytics.com »</a></p>
					</span>
				</div>
			</div>
		
			<!-- row of links to main sections -->
			<div class="row">
				<div id="products" class="span4">
					<h1>Products</h1>
					<p>We develop powerful <strong>social media monitoring and analytics</strong> solutions. Our goal is to help organizations better manage their activity thanks to social media data.</p>
					<p><a class="btn" href="/products/">See our products »</a></p>
				</div>
				<div class="span4">
				  <h1 id="services">Services</h1>
				   <p>Whether you need to extract online data, have complex data integration or reporting issues, we can help. We provide consulting services in <strong>web data analytics</strong>, as well as <strong>corporate business intelligence</strong> projects.
					</p>
				  <p>
					  <a class="btn" href="/services/">Read more »</a> or 
					  <a class="btn btn-primary contact-link" href="/contact/">Contact us »</a>
				  </p>
				</div>
				<div class="span4">
				  <h1 id="about-us">About us</h1>
				   <p>Our startup operates from Brussels, Belgium since 2010. We help businesses run better, using data they own or that is publicly available to produce actionable information and <strong>enhance their decision-making</strong>.</p>
				  <p><a class="btn" href="/company/">Read more »</a></p>
				</div>
			</div>
		</cfif>
		<cfif cgi.PATH_INFO is not "/contact/Default.cfm">
			<div class="modal hide fade" id="contact">
			<div class="modal-header">
				<a data-dismiss="modal" class="close">×</a>
				<h2>Contact</h2>
			</div>
			<div class="modal-body">
				<form method="POST" action="/contact.cfm" id="contact-form" name="contact-form" class="form-horizontal">
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
						<label for="email" class="control-label">Email*</label>
						<div class="controls">
							<input type="text" id="email" name="email">
						</div>
					</div>
					<div class="control-group">
						<label for="message" class="control-label">Message</label>
						<div class="controls">
							<textarea rows = "2" id="message" name="message"></textarea>
						</div>
					</div>
					<input type="text" id="hPot" name="hPot">
				</fieldset>
				</form>
			</div>
			<div class="modal-footer">
				<div class="span4">
				<a data-dismiss="modal" class="btn" href="#">Close</a>
				<a class="btn btn-primary" id="contact-form-submit"><i class="icon-envelope icon-white"></i> Send</a>
				</div>
			</div>
			</div>
		</cfif>
		</div> <!-- /container -->
		<footer>
			<div class="container">
				<div class="span5">
					<span>Mango Information systems 2010 - 2013. </span>
					<span><a href="/terms/">Copyright - terms of use</a></span>
				</div>
				<div class="span5">
					<a href="/contact/" class="btn btn-primary pull-right contact-link"><i class="icon-pencil icon-white"></i> Contact »</a><span class="pull-right"> &nbsp; </span>
					<a target="_blank" rel="me" href="http://twitter.com/mango_info" class="btn btn-info pull-right "><i class="icon-twitter"></i>  twitter »</a><span class="pull-right"> &nbsp; </span>
					<a target="_blank" rel="me" href="https://github.com/mango-information-systems" class="btn pull-right"><i class="icon-github"></i> github »</a>
				</div>
			</div>
		</footer>

		<!-- Le javascript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="/js/jquery.js"></script>
		<script src="/js/bootstrap-button.js"></script>
		<script src="/js/bootstrap-modal.js"></script>
		<script>
		$(document).ready(function () {
			<cfif cgi.PATH_INFO is not "/contact/Default.cfm">
			// progressive enhancement: modal contact form for javascript enabled browsers
			$('.contact-link').attr('href', '#contact')
			$('.contact-link').attr('data-toggle', 'modal')
			// setup contact modal
			$('#contact').modal({show:false})
			</cfif>
			// toggle active class for navbar link 
			// based on code found here: https://gist.github.com/1600924
			var $navbarElements = $(".navbar .nav a");
			$navbarElements.each(function() {
			if ($(this).attr('href')== window.location.pathname) {
				$(this).parent().toggleClass("active")
			}
			})

			<cfif isdefined("readyActions")>
			<cfoutput>#readyActions#</cfoutput>
			</cfif>

			//handle contact form submission
			$('#contact-form-submit').click(function(e) {
				e.preventDefault()
				$('#contact-form-submit').addClass('disabled');
				$.ajax({
					type: 'POST',
					url: '/contact.cfm',
					data: $('#contact-form').serialize(),
					success: function(data) {
						response = JSON.parse(data)
						switch(response.status) {
							case 'success':
							$target = $('#contact');
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
					},
					error: function(data) {
						response = JSON.parse(data.responseText)
						$('#contact-form-submit').removeClass('disabled');
						$('<div class="alert alert-error">'+ response.message +'</div>').appendTo($('.modal-body'))
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
	</body>
</html>

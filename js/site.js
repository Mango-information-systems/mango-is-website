---
sitemap:
  exclude: 'yes'
---
var $body
	, contactModalMetadata = {
		'not-set': {
			title: 'Contact Us'
			, trg: '/contact-us'
			, type: 'contact'
		}
		, '/package-web-analytics': {
			title: 'Measure my conversions'
			, trg: '/contact-web-analytics'
			, type: 'Conversions analytics package inquiry'
		}
		, '/package-web-consulting': {
			title: 'Show me how I can improve'
			, trg: '/contact-web-consulting'
			, type: 'Conversions consulting package inquiry'
		}
		, '/package-web-full-service': {
			title: 'Fix my website'
			, trg: '/contact-web-full-service'
			, type: 'Conversions full service package inquiry'
		}
		, '/package-social': {
			title: 'Social media strategy'
			, trg: '/contact-social'
			, type: 'Social media offer inquiry'
		}
		, '/package-bi-fixer': {
			title: 'Business Intelligence fixer'
			, trg: '/contact-bi-fixer'
			, type: 'Business Intelligence fixer offer inquiry'
		}
		, '/package-bi-analysis': {
			title: 'Business Intelligence analysis'
			, trg: '/contact-bi-analysis'
			, type: 'Business Intelligence analysis offer inquiry'
		}
		, '/package-bi-development': {
			title: 'Business Intelligence development'
			, trg: '/contact-bi-development'
			, type: 'Business Intelligence development offer inquiry'
		}
		, '/package-bi-full': {
			title: 'Business Intelligence full service'
			, trg: '/contact-bi-full'
			, type: 'Business Intelligence full service offer inquiry'
		}
		, '/package-dataviz': {
			title: 'Data visualization'
			, trg: '/contact-dataviz'
			, type: 'Data visualization offer inquiry'
		}
		, '/package-web-apps': {
			title: 'Web apps'
			, trg: '/contact-web-apps'
			, type: 'Data-driven web apps offer inquiry'
		}
	}

// Google Analytics
{% if site.ga %}
	;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga')

	ga('create', '{{ site.ga }}', 'auto')
	ga('set', 'dimension1', '{{ site.version }}')
	toGa('pageview')
	
	// page views, exceptions and events tracking
	function toGa(type, opts)  {
		var opts = opts || {}
		switch(type) {
			case 'exception':
				var exceptionData = {
					exDescription: opts.description
				}
				if (opts.fatal)
					exceptionData.exFatal= opts.fatal
				ga('send', 'exception', exceptionData)
				// also record an event in order to benefit from Intelligence events
				ga('send', 'event', 'site', 'Exception')

			break;
			case 'event':
				var eventData = {
					hitType: 'event'
					, eventCategory: opts.category
					, eventAction: opts.action
				}
				if (opts.label)
					eventData.eventLabel = opts.label
				if (opts.value)
					eventData.eventValue = opts.value
				if (opts.nonInteraction)
					eventData.nonInteraction = 1
				ga('send', eventData)
			break;
			case 'pageview':
				var pageViewData = {}
				if (opts.page)
					pageViewData.page = opts.page
				ga('send', 'pageview', pageViewData)
			break;
		}
	}
{% else %}
	function toGa(type, opts) {
		console.log('Dry run - Google Analytics custom tracking:', type, opts)
	}
	$.scrollDepth = function() {}
{% endif %}

// error reporting
window.onerror = function(message, file, line) {
	toGa('exception', {
		description: file + ':' + line + '-' + message
	})
}

$(document).ready(function() {

	$body = $('body')
	
	//measure proportion of pages read as events in Google analytics
	$.scrollDepth({
		userTiming: false
		, pixelDepth: false
	})

	// scrollTo feature for internal links
	$('.int').click(function(evt) {
		var $trg = $(evt.target)
			, destination = $trg.attr('href') || $trg.closest('a').attr('xlink:href') // where links points to
			, trg = $trg.data('trg') // virtual page for ga

		$(destination).ScrollTo()
		
		if (trg) {
		// record virtual pageview in case the internal link is a CTA
			toGa('pageview', {page: trg})
		}
		
		return false
	})
	
	$body.on('click', '.contact', function(e) {
	// package order button has been clicked
	// display conversion (contact) form
		if($('#contactModal').length) {
			e.preventDefault()
		
			var trg = $(e.target).data('trg') || $(e.target).closest('a').data('trg') || 'not-set'
			
			$('#mpty').hide()
			var $modal = $('#contactModal')

			$modal.find('h3').html(contactModalMetadata[trg].title) // modal title
			$modal.find('#contactType').attr('value', contactModalMetadata[trg].type) // inquiry type, to be shown in contact message email
			$modal.data('trg', contactModalMetadata[trg].trg) // ga funnel tracking
			$('#contactFeedback').empty()
			$modal.modal()
			
			toGa('pageview', {page: trg})
		}
	})
	
	$('#contact-form').on('submit', function(e) {
	// send contact form
		e.preventDefault()
		$('#contact-form-submit').addClass('disabled')
		
		$.ajax({
			type: 'POST'
			, url: '/contact.cfm'
			, data: $('#contact-form').serialize()
			, success: function(data) {
				$('#contact-form-submit').removeClass('disabled')
				$('#contactFeedback').empty().html('<div class="alert alert-success">Thanks for your inquiry. We\'ll be back to you very soon.</div>')
				
				setTimeout(function() {
					$('#contactModal').modal('hide')
				}
				, 4000)
			}
			, error: function(data) {
				try {
					var msg = JSON.parse(data.responseText).message
				}
				catch(e) {
					// server returned a full HTML error page as a response
					var msg = $(data.responseText).text().replace(/(\r\n|\n|\r)/gm, ' ')
				}
				contactFatalError(msg, data.status)
			}
		})
		
		var trg = $('#contactModal').data('trg') || 'not-set'
		
		toGa('pageview', {page: trg})
	})
})

function contactFatalError(serverMessage, status) {
// show error message to user and track error in ga

	switch(status) {
		case 403:
			var msg = '<p>Sorry, but your message was rejected by our anti-spam system.</p><p>Please email us directly at contact@mango-is.com</p>'
		break
		case 400:
			var msg = '<p>Sorry, it seems that you have used an invalid email address.</p><p>Please double-check your entry and try again.</p>'
		break
		default:
			var msg = '<p>Sorry, an error has occured and your message was not sent.</p><p>Please email us directly at contact@mango-is.com, or try again later.</p><p><small>We\'ve been alerted about this problem and will look into it.</small></p>'
			
			var exceptionDescription = 'contact form not sent: '
			exceptionDescription += status ? status + ' - ' : ''
			exceptionDescription += serverMessage
							
			toGa('exception', {description: exceptionDescription, fatal: true})
		break
	}
	$('#contact-form-submit').removeClass('disabled')
	$('#contactFeedback').empty().html('<div class="alert alert-error">' + msg + '</div>')
	
}

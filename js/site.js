---
---
var $body
	, contactModalMetadata = {
		'not-set': {
			title: 'Contact Us'
			, trg: 'contact'
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
			title: 'Supercharge my site'
			, trg: '/contact-web-full-service'
			, type: 'Conversions full service package inquiry'
		}
		, '/package-social': {
			title: 'Social media strategy'
			, trg: '/contact-social'
			, type: 'Social media offer inquiry'
		}
		, '/package-bi': {
			title: 'Business Intelligence'
			, trg: 'contact-bi'
			, type: 'Business intelligence offer inquiry'
		}
		, '/package-dataviz': {
			title: 'Data visualization'
			, trg: '/contact-dataviz'
			, type: 'Business intelligence offer inquiry'
		}
	}

// Google Analytics
{% if site.ga %}
	;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga')

	ga('create', '{{ site.ga }}', 'auto')
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
				ga('send', eventData)
			break;
			case 'pageview':
				var pageViewData = {}
				if (opts.title)
					pageViewData.title = opts.title
				ga('send', 'pageview', pageViewData)
			break;
		}
	}
{% else %}
	function toGa(type, opts) {
		console.log('Google Analytics custom tracking:', type, opts)
	}
	$.scrollDepth = function() {}
{% endif %}

// error reporting
window.onerror = function(message, file, line) {
	toGa('exception', {
		description: file + ':' + line + '-' + message
	})
}

// scrollTo feature
$('.int').click(function(evt) {
	var trg = $(evt.target).attr('href') || $(evt.target).closest('a').attr('xlink:href')
	
	$(trg).ScrollTo()
	
	return false
})

$(document).ready(function() {

	$.scrollDepth()

	$body = $('body')
	
	$body.on('click', '#gotoPricing', function(e) {
	// main CTA button clicked
	// scroll to pricing section
		
	})
	
	$body.on('click', '.contact', function(e) {
	// package order button has been clicked
	// display conversion (contact) form
		e.preventDefault()
	
		var trg = $(e.target).data('trg') || $(e.target).closest('a').data('trg') || 'not-set'
		
		$('#mpty').hide()
		var $modal = $('#contactModal')
console.log($modal.find('#contactType'))
		$modal.find('h3').html(contactModalMetadata[trg].title) // modal title
		$modal.find('#contactType').attr('value', contactModalMetadata[trg].type) // inquiry type, to be shown in contact message email
		$modal.data('trg', contactModalMetadata[trg].trg) // ga funnel tracking
		$modal.modal()
		
		toGa('pageview', {title: trg})
	})
	
	$('#contact-form').on('submit', function(e) {
	// send contact form
		e.preventDefault()
		$('#contact-form-submit').addClass('disabled')
		
		$.ajax({
			type: 'POST',
			url: '/contact.cfm',
			data: $('#contact-form').serialize(),
			success: function(data) {
				response = JSON.parse(data)
				switch(response.status) {
					case 'success':
						$target = $('#contactModal')
						$target.fadeOut(function() {
							$target.html('<div class="alert alert-success">'+ response.message +'</div>')
								.fadeIn()
							setTimeout(function() {
								$target.modal('hide')
							}
							, 4000)
						})
					break
					case 'error':
						contactFatalError(response.message)
					break
					case 'invalid-email':
						$('#contact-form-submit').removeClass('disabled')
						$('#email').parents('.control-group').addClass('error')
						$('<span class="help-inline">'+ response.message + '</span>').insertAfter($('#email'))
					break
				}
			},
			error: function(data) {
				try {
					var msg = JSON.parse(data.responseText).message
				}
				catch(e) {
					var msg = $(data.responseText).text().replace(/(\r\n|\n|\r)/gm, ' ')
				}
				contactFatalError(msg, data.status)
			}
		})
		
		var trg = $('#contactModal').data('trg') || 'not-set'
		
		toGa('pageview', {title: trg})
	})
})

function contactFatalError(message, status) {
// show error message to user and track error in ga
	$('#contact-form-submit').removeClass('disabled')
	$('.modal-body').append('<div class="alert alert-error"><p>Sorry, an error has occured and your message was not sent.</p><p>Please email us at contact@mango-is.com, or try again later.</p><p><small>We\'ve been alerted about this problem and will look into it.</small></p></div>')
	
	var exceptionDescription = 'contact form not sent: '
	exceptionDescription += status ? status + ' - ' : ''
	exceptionDescription += message
					
	toGa('exception', {description: exceptionDescription, fatal: true})
}

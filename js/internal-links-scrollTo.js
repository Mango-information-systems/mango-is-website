// scrollTo feature
$('.int').click(function(evt, tgt) {
	var trg = $(evt.target).attr('href') || $(evt.target).closest('a').attr('xlink:href')
	
	$(trg).ScrollTo();
	
	return false
})

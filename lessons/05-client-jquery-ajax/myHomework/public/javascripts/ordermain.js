var orderedIDs = [];

$('.ing-check').click(function() {
	if ($(this).prop('checked')) {
		// Add item to order and price total
		thisID = $(this).attr('value');
		console.log(thisID)
	} else {
		// Remove item from order and price total
		console.log('unchecked')
	}
})
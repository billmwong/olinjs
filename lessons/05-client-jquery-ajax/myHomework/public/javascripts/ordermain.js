var orderedIDs = [];
var priceTot = 0;

$('.ing-check').click(function() {
	thisID = $(this).attr('id');
	var thisPrice = $(this).attr('value');

	if ($(this).prop('checked')) {
		// Add item to order and price total
		orderedIDs.push(thisID);
		priceTot += parseFloat(thisPrice)
		$('#priceTot').html(priceTot);
	} else {
		// Remove item from order and price total
		orderedIDs.splice(orderedIDs.indexOf(thisID), 1);
		priceTot -= parseFloat(thisPrice)
		$('#priceTot').html(priceTot);
	}
})
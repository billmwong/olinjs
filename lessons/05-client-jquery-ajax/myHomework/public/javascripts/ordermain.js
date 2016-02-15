var $orderForm = $('#submit-order-form');

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
});

var onSuccessAddOrder = function(data, status) {
	// Show submitted text, then fade it out gradually
	$('#submitted-text').show();
	$('#submitted-text').fadeOut(3000, function() { })
};

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

$orderForm.submit(function(event) {
	event.preventDefault();
	$.post("addOrder", {
		ingredients: orderedIDs
	})
		.done(onSuccessAddOrder)
		.error(onError);
});
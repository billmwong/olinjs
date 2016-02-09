// var hbs = require('hbs');
// var Handlebars = hbs.Handlebars;

var $addForm = $('#add-ingredient-form');

var onSuccessAddIng = function(data, status) {
	var compiledTemplate = Handlebars.templates['tableRowTemplate.hbs'];
	$('#ing-table').append(compiledTemplate(data));
};

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

var onSuccessStock = function(data, status) {
	var compiledTemplate = Handlebars.templates['tableRowTemplate.hbs'];
	$('#'+data._id).replaceWith(compiledTemplate(data));
	console.log('successfully toggled stock')
};

$addForm.submit(function(event) {
	event.preventDefault();
	var name = $addForm.find("[name='name']").val();
	var price = $addForm.find("[name='price']").val();
	$.post("addIng", {
		name: name,
		price: price
	})
		.done(onSuccessAddIng)
		.error(onError);
});

var toggleStock = function() {
	var thisRowId = $(this).closest("tr").attr('id');
	$.post('stockIng', {
		id: thisRowId
	})
		.done(onSuccessStock)
		.error(onError);
};

$('.outStockBtn').click(toggleStock);
$('.inStockBtn').click(toggleStock);
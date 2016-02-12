// var hbs = require('hbs');
// var Handlebars = hbs.Handlebars;

var $addForm = $('#add-ingredient-form');
var $ingTable = $('#ing-table');
var $editDiv = $('#edit-div');
var $editForm = $('#edit-ingredient-form');

var onSuccessAddIng = function(data, status) {
	var compiledTemplate = Handlebars.templates['tableRowTemplate.hbs'];
	$ingTable.append(compiledTemplate(data));
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

$ingTable.on('click', '.outStockBtn', toggleStock);
$ingTable.on('click', '.inStockBtn', toggleStock);

$ingTable.on('click', '.editBtn', function() {
	var $thisRow = $(this).closest("tr")
	var thisRowId = $thisRow.attr('id');
	// $editDiv.toggle()
	if ($editDiv.is(':visible')) {
		$editDiv.hide()
	} else {
		$editDiv.show()
		var name = $thisRow.find("td:nth-child(1)").text();
		var price = $thisRow.find("td:nth-child(2)").text();
		$('#edit-name').val(name);
		$('#edit-price').val(price);
	}
});
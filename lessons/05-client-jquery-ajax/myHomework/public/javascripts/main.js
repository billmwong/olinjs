var $addForm = $('#add-ingredient-form');
var $ingTable = $('#ing-table');
var $editDiv = $('#edit-div');
var $editForm = $('#edit-ingredient-form');

// Made this a global variable, is this bad practice?
var editID = "";

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
	console.log('successfully toggled stock');
};

var onSuccessEditIng = function(data, status) {
	var compiledTemplate = Handlebars.templates['tableRowTemplate.hbs'];
	$('#'+data._id).replaceWith(compiledTemplate(data));
	$editDiv.hide()
	console.log('successfully edited ingredient');
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
	if ($editDiv.is(':visible')) {
		$editDiv.hide()
	} else {
		var $thisRow = $(this).closest("tr")
		var thisRowId = $thisRow.attr('id');
		editID = thisRowId;
		var name = $thisRow.find("td:nth-child(1)").text();
		var price = $thisRow.find("td:nth-child(2)").text();
		$('#edit-name').val(name);
		$('#edit-price').val(price);
		$editDiv.show()
	}
});

$editForm.submit(function(event) {
	event.preventDefault();
	var name = $editForm.find("[name='name']").val();
	var price = $editForm.find("[name='price']").val();
	$.post("editIng", {
		id: editID,
		name: name,
		price: price
	})
		.done(onSuccessEditIng)
		.error(onError);
});
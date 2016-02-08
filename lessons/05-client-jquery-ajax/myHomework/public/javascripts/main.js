// var hbs = require('hbs');
// var Handlebars = hbs.Handlebars;

var $addForm = $('#add-ingredient-form');
console.log('loaded main.js')

var onSuccess = function(data, status) {
	var template = Handlebars.compile("<tr><td>{{name}}</td><td>{{price}}</td><td>out of stock button</td><td>edit button</td></tr>")
	$('#ing-table').append(template(data));
};

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

$addForm.submit(function(event) {
	event.preventDefault();
	var name = $addForm.find("[name='name']").val();
	var price = $addForm.find("[name='price']").val();
	$.post("addIng", {
		name: name,
		price: price
	})
		.done(onSuccess)
		.error(onError);
});
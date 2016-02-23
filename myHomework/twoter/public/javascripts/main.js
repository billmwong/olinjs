var $newTwoteForm = $('#new-twote-form');
var $twoteWall = $('#twote-wall');

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	console.log('response',data.responseText);
};

var onSuccessNewTwote = function(data, status) {
	// Show the new twote
	var compiledTemplate = Handlebars.templates['twoteTemplate.hbs'];
	$twoteWall.prepend(compiledTemplate(data));
};

var onSuccessDeleteTwote = function(data, status) {
	// Delete the twote from the display
	$('#'+data._id).remove();
};

$newTwoteForm.submit(function(event) {
	event.preventDefault()
	var text = $newTwoteForm.find("[name='text']").val();
	$.post("newTwote", {
		twoteText: text
	})
		.done(onSuccessNewTwote)
		.error(onError);
});

$twoteWall.on('click', '.delete-twote-btn', function() {
	var twoteID = $(this).closest("div").attr('id');
	console.log(twoteID);
	$.post('delTwote', {
		id: twoteID
	})
		.done(onSuccessDeleteTwote)
		.error(onError);
})
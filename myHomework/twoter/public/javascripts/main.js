var $newTwoteForm = $('#new-twote-form')

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	console.log('response',data.responseText);
};

var onSuccessNewTwote = function(data, status) {
	// Show the new twote
	$('#twote-wall').prepend('<div class="well">' +
		data.text +
		' --' +
		data.creator.name+
		'</div>')
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
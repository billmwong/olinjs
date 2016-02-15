var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

var onSuccessCompleted = function(data, status) {
	$('#'+data._id).remove();
};

$('.completedBtn').click(function() {
	var thisOrderId = $(this).closest("li").attr('id');
	$.post('delOrder', {
		id: thisOrderId
	})
		.done(onSuccessCompleted)
		.error(onError);
})
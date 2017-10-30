$(document).ready(function(){
	$('.delete-carad').on('click', function(){
		var id = $(this).data('id');
		var url = '/delete/'+id;
		if(confirm('Delete Ad?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					console.log('Deleting Ad...');
					window.location.href='/';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});

	$('.edit-carad').on('click', function(){
		$('#edit-form-adtitle').val($(this).data('adtitle'));
		$('#edit-form-carbrand').val($(this).data('carbrand'));
		$('#edit-form-carmodel').val($(this).data('carmodel'));
		$('#edit-form-type').val($(this).data('type'));
		$('#edit-form-mileage').val($(this).data('mileage'));
		$('#edit-form-fuel').val($(this).data('fuel'));
		$('#edit-form-numberdoors').val($(this).data('numberdoors'));
		$('#edit-form-state').val($(this).data('state'));
		$('#edit-form-id').val($(this).data('id'));
	});
});
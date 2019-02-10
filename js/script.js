//Focus on name field on page load
$('#name').focus();

//Hide 'Your Job Role' field on page load
$('#other-title').hide();

//Show 'Your Job Role' field only if 'other' is selected in 'Job Role' field
$('#title').on('change', function(event) {
  if ($(event.target).val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

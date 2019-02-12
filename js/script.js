const $regexActivity = /^\s.+\s.\s([A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]).\s\$\d+$/;
const $regexDayTime = /[A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]/;

//Focus on name field on page load
$('#name').focus();

//Hide 'Your Job Role' field on page load
$('#other-title').hide();

//Hide tshirt color field on page load
$('#colors-js-puns').hide();

//Show 'Your Job Role' field only if 'other' is selected in 'Job Role' field
$('#title').on('click', function() {
  if ($(this).val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//Display only the color options that match the tshirt design
$('#design').on('change', function() {
  $('#colors-js-puns').show();
  $('#color option').hide();
  if ($(this).val() === 'js puns') {
    $('#color option:contains("JS Puns shirt only")').show();
    $('#color option[value="cornflowerblue"]').prop('selected', 'selected');
  } else if ($(this).val() === 'heart js') {
    $('#color option:contains("JS shirt only")').show();
    $('#color option[value="tomato"]').prop('selected', 'selected');
  } else {
    $('#colors-js-puns').hide();
  }
});


// $("input[type='checkbox']:not(:checked)").each(function(){
//   const $checkText = $(this).parent().text();
//   console.log($checkText);
//   console.log($checkText.match($regexDayTime));
// })



//Disable activities that compete with those already checked
  //Listen for an activity to be checked
$('.activities input').on('change', function(event) {
  const $selectedActivity = $(event.target);
  const $selectedText = $($selectedActivity).parent().text();

  if ($regexActivity.test($selectedText)) {
    const $selectedDayTime = ($selectedText.match($regexDayTime));

    if ($selectedActivity.prop('checked')) {

      $("input[type='checkbox']:not(:checked)").each(function(){
        const $uncheckedActivity = $(this);
        const $uncheckedText = $($uncheckedActivity).parent().text();
        if ($regexActivity.test($uncheckedText)) {
          const $uncheckedDayTime = ($uncheckedText.match($regexDayTime));
          if ($selectedDayTime[0] === $uncheckedDayTime[0]) {
            $uncheckedActivity.prop('disabled', true);
          }
        }
     });
   }
     if (!$selectedActivity.prop('checked')) {

       $("input[type='checkbox']:not(:checked)").each(function(){
         const $uncheckedActivity = $(this);
         const $uncheckedText = $($uncheckedActivity).parent().text();
         if ($regexActivity.test($uncheckedText)) {
           const $uncheckedDayTime = ($uncheckedText.match($regexDayTime));
           if ($selectedDayTime[0] === $uncheckedDayTime[0]) {
             $uncheckedActivity.prop('disabled', false);
           }
         }
      });
    }
  }
});



//Re-enable activities when competing ones are unchecked
  //Listen for an activity to be unchecked
  //Find day and time of activity
  //Loop through other activities and enable those which match

//Running total of selected activities
